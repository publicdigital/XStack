// The OIDC relying-party side of the adapter: authorization code + PKCE against eSignet,
// the token exchange with private_key_jwt, and verifying the signed ID token and userinfo.
import { readFileSync, existsSync } from 'node:fs';
import { clientAssertion, verifyJwt, decodeJwt, pkcePair, randomToken } from '../lib/jose.mjs';
import { config } from '../lib/config.mjs';
import { REPO_ROOT } from '../lib/personas.mjs';

const KEY_FILE = REPO_ROOT + 'sandbox/.secrets/xstack-client.json';
export const REDIRECT_URI = config.adapterUrl + '/sandbox/callback';

// The claims a service gets from KestriaID. eSignet only releases what's listed here, and the
// person sees the list on its consent screen. KestriaID won't release the KUIN (see dpi.md).
const CLAIMS = { userinfo: { name: { essential: true }, birthdate: { essential: true }, phone_number: { essential: false } } };

// eSignet acr values → the contract's level (dpi.md, Identity: Assurance levels).
export const ACR_LEVEL = {
  'mosip:idp:acr:generated-code': 'low',
  'mosip:idp:acr:password': 'low',
  'mosip:idp:acr:linked-wallet': 'substantial',
  'mosip:idp:acr:biometrics': 'high'
};

let discovery = null, jwks = null, jwksAt = 0;

export async function getDiscovery() {
  if (!discovery) {
    const res = await fetch(config.esignetUrl + '/.well-known/openid-configuration');
    if (!res.ok) throw new Error('eSignet discovery: HTTP ' + res.status);
    discovery = await res.json();
  }
  return discovery;
}

async function getJwks(force) {
  if (!jwks || force || Date.now() - jwksAt > 10 * 60 * 1000) {
    const res = await fetch((await getDiscovery()).jwks_uri);
    if (!res.ok) throw new Error('eSignet JWKS: HTTP ' + res.status);
    jwks = await res.json();
    jwksAt = Date.now();
  }
  return jwks;
}

// Retry once with a fresh JWKS, in case eSignet rotated its keys.
async function verify(jwt, opts) {
  try { return verifyJwt(jwt, await getJwks(), opts); }
  catch (e) { if (/no key/.test(e.message)) return verifyJwt(jwt, await getJwks(true), opts); throw e; }
}

function clientKey() {
  if (!existsSync(KEY_FILE)) throw new Error('No client key. Run: node sandbox/esignet/seed.mjs');
  return JSON.parse(readFileSync(KEY_FILE, 'utf8'));
}

// Step 1: where to send the person, and what to remember until they come back.
export async function startAuthorization({ acr = 'mosip:idp:acr:generated-code', locale = 'en' } = {}) {
  const d = await getDiscovery();
  const { verifier, challenge } = pkcePair();
  const tx = { state: randomToken(), nonce: randomToken(), verifier, acr, createdAt: Date.now() };
  const url = new URL(d.authorization_endpoint);
  const params = {
    client_id: clientKey().clientId, redirect_uri: REDIRECT_URI, response_type: 'code',
    scope: 'openid', state: tx.state, nonce: tx.nonce,
    code_challenge: challenge, code_challenge_method: 'S256',
    acr_values: acr, claims: JSON.stringify(CLAIMS), ui_locales: locale,
    // eSignet remembers consent. In research every session is a new participant, so ask every
    // time unless ESIGNET_PROMPT says otherwise (set it to 'none' to allow remembered consent).
    ...(config.prompt !== 'none' ? { prompt: config.prompt } : {})
  };
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return { url: url.toString(), tx };
}

// Step 2: swap the code for tokens, check the ID token, then get and check the signed userinfo.
export async function finishAuthorization(tx, code) {
  const d = await getDiscovery();
  const key = clientKey();
  const body = new URLSearchParams({
    grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI, client_id: key.clientId,
    code_verifier: tx.verifier,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    // eSignet 2.0 wants the issuer as the assertion's audience; the token endpoint is refused.
    client_assertion: clientAssertion(key.clientId, d.issuer, key.privateJwk)
  });
  const tokenRes = await fetch(d.token_endpoint, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  const tokens = await tokenRes.json().catch(() => ({}));
  if (!tokenRes.ok || !tokens.access_token) throw new Error('token exchange: HTTP ' + tokenRes.status + ' ' + JSON.stringify(tokens));

  if (process.env.SANDBOX_DEBUG) console.log('id_token', JSON.stringify(decodeJwt(tokens.id_token)));
  const idToken = await verify(tokens.id_token, { issuer: d.issuer, audience: key.clientId });
  if (idToken.nonce !== tx.nonce) throw new Error('ID token nonce does not match');

  const uiRes = await fetch(d.userinfo_endpoint, { headers: { Authorization: 'Bearer ' + tokens.access_token } });
  const uiText = (await uiRes.text()).trim();
  if (!uiRes.ok) throw new Error('userinfo: HTTP ' + uiRes.status + ' ' + uiText);
  if (uiText.startsWith('{')) throw new Error('userinfo came back unsigned; the client must use userinfo_response_type JWS');
  if (process.env.SANDBOX_DEBUG) console.log('userinfo', JSON.stringify(decodeJwt(uiText)));
  const userinfo = await verify(uiText, { issuer: d.issuer, audience: key.clientId });
  if (userinfo.sub !== idToken.sub) throw new Error('userinfo sub does not match the ID token');

  return { idToken, userinfo };
}
