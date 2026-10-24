#!/usr/bin/env node
// Registers xstack's prototypes with eSignet as an OIDC client, the way a service onboards with
// the identity platform. It authenticates with private_key_jwt: the keypair is made here on the
// first run, the public half is registered, and the private half stays in sandbox/.secrets/,
// which git ignores. Safe to run again: the client is updated in place.
//
//   node sandbox/register-client.mjs          ESIGNET_URL=… to use another eSignet
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { REPO_ROOT } from './lib/personas.mjs';
import { generateKeypair } from './lib/jose.mjs';
import { config } from './lib/config.mjs';

const SECRETS = REPO_ROOT + 'sandbox/.secrets/';
const KEY_FILE = SECRETS + 'xstack-client.json';
const now = () => new Date().toISOString();

function loadOrCreateKey() {
  if (existsSync(KEY_FILE)) return JSON.parse(readFileSync(KEY_FILE, 'utf8'));
  mkdirSync(SECRETS, { recursive: true });
  const saved = { clientId: config.clientId, ...generateKeypair(), createdAt: now() };
  writeFileSync(KEY_FILE, JSON.stringify(saved, null, 2), { mode: 0o600 });
  return saved;
}

async function call(method, url, body) {
  const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, json };
}
const errorsOf = (j) => (j && j.errors && j.errors.length ? j.errors : null);

const key = loadOrCreateKey();
const fields = {
  clientName: 'xstack Kestria prototypes (sandbox)',
  clientNameLangMap: { eng: 'xstack Kestria prototypes (sandbox)' },
  logoUri: config.adapterUrl + '/sandbox/logo.svg',
  redirectUris: [config.adapterUrl + '/sandbox/callback'],
  userClaims: ['name', 'birthdate', 'phone_number', 'address', 'gender', 'email', 'picture'],
  authContextRefs: ['mosip:idp:acr:generated-code', 'mosip:idp:acr:password', 'mosip:idp:acr:biometrics'],
  grantTypes: ['authorization_code'],
  clientAuthMethods: ['private_key_jwt'],
  additionalConfig: { require_pushed_authorization_requests: false, dpop_bound_access_tokens: false, require_pkce: true, userinfo_response_type: 'JWS' }
};
const base = config.esignetUrl + '/client-mgmt/client';

let r;
try {
  r = await call('POST', base, { requestTime: now(), request: { clientId: key.clientId, relyingPartyId: 'kestria-kds', publicKey: key.publicJwk, ...fields } });
} catch {
  console.error(`eSignet isn't answering at ${config.esignetUrl}. Start it first: see sandbox/README.md.`);
  process.exit(1);
}
let verb = 'Registered';
if (errorsOf(r.json) && JSON.stringify(r.json.errors).includes('duplicate_client_id')) {
  r = await call('PUT', base + '/' + encodeURIComponent(key.clientId), { requestTime: now(), request: { ...fields, status: 'active' } });
  verb = 'Updated';
}
if (r.status >= 300 || errorsOf(r.json)) {
  console.error(`Couldn't register the client: HTTP ${r.status} ${JSON.stringify(r.json)}`);
  if (JSON.stringify(r.json).includes('invalid_public_key')) console.error('That key is registered under another client id.');
  console.error('If eSignet has this client with a key you no longer have, reset eSignet and run this again.');
  process.exit(1);
}
console.log(`${verb} OIDC client "${key.clientId}" with eSignet (${config.esignetUrl}), using private_key_jwt.`);
console.log('Private key: sandbox/.secrets/xstack-client.json (git ignores it).');
