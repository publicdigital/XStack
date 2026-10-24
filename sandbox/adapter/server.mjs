#!/usr/bin/env node
// xstack sandbox adapter. One localhost server that:
//   - serves this repo's prototype folders over http (eSignet won't redirect to file://)
//   - signs people in with real eSignet: authorization code + PKCE, private_key_jwt, signed userinfo
//   - answers data.fetch from mock registers built from KESTRIA_PERSONAS (no X-Road locally)
// Payments stay on the in-browser mock. references/dpi-sandbox.js is the page side.
//
//   node sandbox/adapter/server.mjs        then open http://localhost:4400
import http from 'node:http';
import { readFile, stat, readdir } from 'node:fs/promises';
import path from 'node:path';
import { config } from '../lib/config.mjs';
import { REPO_ROOT } from '../lib/personas.mjs';
import { randomToken } from '../lib/jose.mjs';
import { startAuthorization, finishAuthorization, getDiscovery, ACR_LEVEL } from './oidc.mjs';
import { matchPerson, claimsFor, registerClaims, actsFor, fetchFacts, person } from './registers.mjs';

const pending = new Map();   // OIDC state → { clientTx, verifier, nonce, actingFor, … }  (sign-in in progress)
const results = new Map();   // clientTx → { sid, result }                                (waiting for the page)
const sessions = new Map();  // session cookie → { self, subject, actor, options }
const TEN_MINUTES = 10 * 60 * 1000;

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);

function send(res, status, body, headers = {}) {
  const isJson = typeof body === 'object' && !Buffer.isBuffer(body);
  res.writeHead(status, { 'Content-Type': isJson ? 'application/json' : 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(isJson ? JSON.stringify(body) : body);
}

function cookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').map((c) => c.trim().split('=')).filter((kv) => kv[0]));
}
const sessionOf = (req) => sessions.get(cookies(req).xsb) || null;

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 1e5) throw new Error('body too large'); }
  return raw ? JSON.parse(raw) : {};
}

function sweep() {
  const cutoff = Date.now() - TEN_MINUTES;
  for (const [k, v] of pending) if (v.createdAt < cutoff) pending.delete(k);
  for (const [k, v] of results) if (v.at < cutoff) results.delete(k);
}

// A page in the sign-in window that tells the prototype the result is ready, then closes.
function donePage(clientTx, status) {
  const message = status === 'signed_in' || status === 'choose_for' ? 'You are signed in.' : 'Going back to the service.';
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>KestriaID</title><body style="font-family:system-ui,sans-serif;font-size:18px;padding:24px">
<p>${esc(message)} You can close this window if it doesn't close itself.</p>
<script>
  var msg = { type: 'xstack-sandbox', tx: ${JSON.stringify(clientTx)} };
  try { new BroadcastChannel('xstack-sandbox').postMessage(msg); } catch (e) {}
  try { if (window.opener) window.opener.postMessage(msg, location.origin); } catch (e) {}
  setTimeout(function () { window.close(); }, 400);
</script></body></html>`;
}

// ── Sign-in ──────────────────────────────────────────────────────────────────────────────────

async function login(req, res, url) {
  sweep();
  const clientTx = url.searchParams.get('tx');
  if (!clientTx) return send(res, 400, 'Missing tx');
  const acr = url.searchParams.get('acr') || undefined;
  const { url: to, tx } = await startAuthorization({ acr, locale: url.searchParams.get('locale') || 'en' });
  pending.set(tx.state, { ...tx, clientTx, actingFor: url.searchParams.get('acting_for') === '1' });
  res.writeHead(302, { Location: to, 'Cache-Control': 'no-store' });
  res.end();
}

async function callback(req, res, url) {
  const tx = pending.get(url.searchParams.get('state') || '');
  if (!tx) return send(res, 400, '<p>This sign-in has expired or was already used. Go back to the service and try again.</p>');
  pending.delete(tx.state);
  const finish = (result, sid) => {
    results.set(tx.clientTx, { result, sid, at: Date.now() });
    const headers = sid ? { 'Set-Cookie': `xsb=${sid}; Path=/; HttpOnly; SameSite=Lax` } : {};
    send(res, 200, donePage(tx.clientTx, result.status), headers);
  };

  // eSignet sends people back with ?error= when they cancel, refuse consent or fail.
  const error = url.searchParams.get('error');
  if (error) {
    const cancelled = ['access_denied', 'consent_rejected', 'user_cancelled', 'login_required'].includes(error);
    console.log(`sign-in ${cancelled ? 'cancelled' : 'failed'}: ${error} ${url.searchParams.get('error_description') || ''}`);
    return finish({ status: cancelled ? 'cancelled' : 'failed', reason: error });
  }

  try {
    const { idToken, userinfo } = await finishAuthorization(tx, url.searchParams.get('code'));
    const p = matchPerson(userinfo);
    if (!p) {
      console.log('sign-in failed: no National Population Register match for', userinfo.name);
      return finish({ status: 'failed', reason: 'no_register_match' });
    }
    const level = ACR_LEVEL[idToken.acr] || 'low';
    const self = { sub: userinfo.sub, personaId: p.id, claims: claimsFor(userinfo, p), level };
    const sid = randomToken();
    const session = { self, subject: self, actor: null, options: [] };
    sessions.set(sid, session);
    console.log(`signed in: ${self.claims.fullName} (acr ${idToken.acr}, pairwise sub ${userinfo.sub.slice(0, 10)}…)`);

    const options = tx.actingFor ? actsFor(p) : [];
    if (options.length) {
      session.options = options;
      return finish({ status: 'choose_for', self: { claims: self.claims }, options: options.map((x) => ({
        name: x.person.claims.fullName, relationship: x.link.relationship || null, authority: x.link.authority || {} })) }, sid);
    }
    finish(signedIn(session), sid);
  } catch (e) {
    console.log('sign-in failed:', e.message);
    finish({ status: 'failed', reason: 'adapter_error' });
  }
}

// `payment` is the persona's scenario for the in-browser payments mock (Desa's is 'declined').
function signedIn(s) {
  const paymentOf = (id) => (person(id) || {}).payment || null;
  const actor = s.actor && { subject: s.actor.sub, claims: { ...s.actor.claims }, persona: s.actor.personaId,
    relationship: s.actor.relationship, authority: { ...s.actor.authority }, payment: paymentOf(s.actor.personaId) };
  return { status: 'signed_in', subject: s.subject.sub, claims: { ...s.subject.claims }, level: s.self.level, persona: s.subject.personaId,
    payment: paymentOf(s.subject.personaId), actor: actor || null };
}

// The page picks up the result once the sign-in window says it's ready.
function result(req, res, url) {
  const r = results.get(url.searchParams.get('tx') || '');
  if (!r) return send(res, 202, { status: 'pending' });
  results.delete(url.searchParams.get('tx'));
  send(res, 200, r.result);
}

// After signing in as themselves, an intermediary picks whose behalf they're acting on.
async function actFor(req, res) {
  const s = sessionOf(req);
  if (!s) return send(res, 401, { error: 'not signed in' });
  const { choice } = await readJson(req);
  if (choice === 'self') { s.subject = s.self; s.actor = null; return send(res, 200, signedIn(s)); }
  const x = s.options[Number(choice)];
  if (!x) return send(res, 400, { error: 'no such option' });
  const a = x.link.authority || {};
  if (a.validUntil && a.validUntil < today()) return send(res, 403, { error: 'authority ended', validUntil: a.validUntil });
  // The person acted for has no eSignet session, so they get an opaque subject for this session only.
  s.subject = { sub: 'kestria-ai-' + randomToken(12), personaId: x.person.id, claims: registerClaims(x.person) };
  s.actor = { ...s.self, relationship: x.link.relationship || null, authority: a };
  send(res, 200, signedIn(s));
}

// ── Data exchange ────────────────────────────────────────────────────────────────────────────

async function data(req, res) {
  const s = sessionOf(req);
  if (!s) return send(res, 401, { error: 'not signed in' });
  const body = await readJson(req);
  if (body.subject !== s.subject.sub) return send(res, 403, { error: 'subject is not the signed-in person or the person they act for' });
  const wanted = Array.isArray(body.attributes) ? body.attributes.map(String) : [];
  const { values, missing } = fetchFacts(person(s.subject.personaId), wanted);
  const consentId = 'CONSENT-' + randomToken(4).toUpperCase();
  console.log(`data.fetch for ${s.subject.claims.fullName}: got [${Object.keys(values)}], missing [${missing}] – ${body.purpose || 'no purpose given'}`);
  send(res, 200, { status: Object.keys(values).length ? 'ok' : 'not_found', consentId, values, missing, asOf: today() });
}

// ── Static files ─────────────────────────────────────────────────────────────────────────────

async function staticFile(req, res, url) {
  let rel;
  try { rel = decodeURIComponent(url.pathname); } catch { return send(res, 400, 'Bad path'); }
  // Never serve dotfiles or dot-folders (.git, sandbox/.secrets).
  if (rel.split('/').some((seg) => seg.startsWith('.'))) return send(res, 404, 'Not found');
  const file = path.join(REPO_ROOT, rel);
  if (!file.startsWith(REPO_ROOT)) return send(res, 404, 'Not found');
  let st;
  try { st = await stat(file); } catch { return send(res, 404, 'Not found'); }
  if (st.isDirectory()) {
    if (!rel.endsWith('/')) { res.writeHead(301, { Location: rel + '/' }); return res.end(); }
    try { return staticFile(req, res, new URL(rel + 'index.html', url)); } catch { /* fall through */ }
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(await readFile(file));
}

async function listing(res, rel) {
  const entries = (await readdir(path.join(REPO_ROOT, rel), { withFileTypes: true })).filter((e) => !e.name.startsWith('.'));
  send(res, 200, `<!doctype html><meta charset="utf-8"><title>${esc(rel)}</title><body style="font-family:system-ui,sans-serif">
<h1>${esc(rel)}</h1><ul>${entries.map((e) => `<li><a href="${esc(e.name)}${e.isDirectory() ? '/' : ''}">${esc(e.name)}${e.isDirectory() ? '/' : ''}</a></li>`).join('')}</ul>`);
}

async function home(res) {
  let esignet = 'not reachable – start it from your kestria-sandbox checkout with ./esignet.sh up (see sandbox/README.md)';
  try { esignet = 'running, issuer ' + (await getDiscovery()).issuer; } catch { /* shown below */ }
  send(res, 200, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>xstack sandbox</title><body style="font-family:system-ui,sans-serif;max-width:680px;margin:32px auto;padding:0 16px;line-height:1.5">
<h1>xstack sandbox – Kestria</h1>
<p>eSignet: <strong>${esc(esignet)}</strong></p>
<ul>
  <li><a href="/examples/build-household-support-grant/prototype-1-once-only/sandbox/">Household Support Grant, signing in with real eSignet</a></li>
  <li><a href="/examples/sim-registration/sandbox/">Register a SIM card, signing in with real eSignet</a></li>
  <li><a href="/examples/">All examples</a> (mock prototypes work here too)</li>
</ul>
<p>Sign in as Ines Kestel: KUIN <code>9900817347</code>, one-time code <code>111111</code>. See <code>sandbox/README.md</code>.</p>
</body></html>`);
}

const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0B4F6C"/><text x="32" y="41" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#fff" text-anchor="middle">xs</text></svg>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, config.adapterUrl);
  try {
    const route = req.method + ' ' + url.pathname;
    if (route === 'GET /') return await home(res);
    if (route === 'GET /sandbox/login') return await login(req, res, url);
    if (route === 'GET /sandbox/callback') return await callback(req, res, url);
    if (route === 'GET /sandbox/result') return result(req, res, url);
    if (route === 'POST /sandbox/act-for') return await actFor(req, res);
    if (route === 'POST /sandbox/data') return await data(req, res);
    if (route === 'POST /sandbox/sign-out') { sessions.delete(cookies(req).xsb); return send(res, 200, { ok: true }, { 'Set-Cookie': 'xsb=; Path=/; Max-Age=0' }); }
    if (route === 'GET /sandbox/logo.svg') return send(res, 200, LOGO, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'max-age=3600' });
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');
    if (url.pathname.endsWith('/')) {
      try { await stat(path.join(REPO_ROOT, url.pathname, 'index.html')); } catch { return await listing(res, url.pathname); }
    }
    return await staticFile(req, res, url);
  } catch (e) {
    console.error(req.method, url.pathname, e);
    if (!res.headersSent) send(res, 500, { error: 'adapter error', detail: e.message });
  }
});

server.on('error', (e) => {
  if (e.code !== 'EADDRINUSE') throw e;
  console.error(`Port ${config.adapterPort} is in use – probably another adapter is already running.`);
  console.error(`Open ${config.adapterUrl}, stop the other one, or start this one with ADAPTER_PORT=4401.`);
  console.error('A different port also needs: ADAPTER_PORT=4401 node sandbox/register-client.mjs');
  process.exit(1);
});

server.listen(config.adapterPort, '127.0.0.1', () => {
  console.log(`xstack sandbox adapter on ${config.adapterUrl}  (eSignet ${config.esignetUrl})`);
});
