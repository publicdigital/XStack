#!/usr/bin/env node
// Seeds the local eSignet sandbox:
//   1. creates every KESTRIA_PERSONAS person (profiles/kestria/dpi.md) as an identity in
//      MOSIP's mock identity system, so they can sign in on the real eSignet screens
//   2. registers xstack as an OIDC client (private_key_jwt), keeping the private key in
//      sandbox/.secrets/, which git ignores
// Safe to run again: existing identities are updated and the client is updated in place.
//
//   node sandbox/esignet/seed.mjs
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { loadPersonas, individualId, REPO_ROOT } from '../lib/personas.mjs';
import { generateKeypair } from '../lib/jose.mjs';
import { config } from '../lib/config.mjs';

const SECRETS = REPO_ROOT + 'sandbox/.secrets/';
const KEY_FILE = SECRETS + 'xstack-client.json';

// A 1×1 grey PNG. The mock identity system requires a photo; nobody's face goes in a demo.
const PHOTO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGNgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
const eng = (value) => [{ language: 'eng', value }];

// What each person looks like in the mock identity system. Personas without a KUIN in their
// claims are skipped – that includes Aru Danvell, who can't sign in online, so typing his
// KUIN on the eSignet screen fails the way it would for him.
function identityFor(p) {
  const id = individualId(p);
  const a = (p.data && p.data.address) || {};
  return {
    individualId: id,
    pin: '111111',
    password: 'Kestria@2026',
    email: p.id + '@example.test',             // personas have no email; reserved .test domain
    phone: p.claims.phone,
    fullName: eng(p.claims.fullName),
    givenName: eng(p.claims.givenName),
    familyName: eng(p.claims.familyName),
    gender: eng('Not recorded'),               // required by the mock; personas don't say, and services shouldn't ask
    dateOfBirth: p.claims.dateOfBirth.replace(/-/g, '/'),
    streetAddress: eng(a.street || a.landmark || 'No street'),
    locality: eng([a.village, a.district].filter(Boolean).join(', ') || 'No fixed address'),
    region: eng(a.region || 'Not recorded'),
    country: eng('Kestria'),
    postalCode: a.postcode || 'NONE',
    preferredLang: 'eng',
    locale: 'en',
    zoneInfo: 'Etc/UTC',
    encodedPhoto: PHOTO
  };
}

async function call(method, url, body) {
  const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, json };
}
const now = () => new Date().toISOString();
const errorsOf = (j) => (j && j.errors && j.errors.length ? j.errors : null);

async function seedIdentities(personas) {
  const url = config.mockIdentityUrl + '/v1/mock-identity-system/identity';
  for (const p of personas) {
    if (!individualId(p)) { console.log(`  skip  ${p.claims.fullName} – no KUIN`); continue; }
    const body = { requestTime: now(), request: identityFor(p) };
    let r = await call('POST', url, body);
    let verb = 'added';
    if (errorsOf(r.json) && JSON.stringify(r.json.errors).match(/exist|duplicate/i)) {
      r = await call('PUT', url, { requestTime: now(), request: identityFor(p) });
      verb = 'updated';
    }
    if (r.status >= 300 || errorsOf(r.json)) throw new Error(`identity ${p.id}: HTTP ${r.status} ${JSON.stringify(r.json)}`);
    console.log(`  ${verb.padEnd(7)} ${p.claims.fullName.padEnd(14)} KUIN ${p.claims.nationalId}`);
  }
}

function loadOrCreateKey() {
  if (existsSync(KEY_FILE)) return JSON.parse(readFileSync(KEY_FILE, 'utf8'));
  mkdirSync(SECRETS, { recursive: true });
  const pair = generateKeypair();
  const saved = { clientId: config.clientId, ...pair, createdAt: now() };
  writeFileSync(KEY_FILE, JSON.stringify(saved, null, 2), { mode: 0o600 });
  return saved;
}

async function registerClient() {
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
  let r = await call('POST', base, { requestTime: now(), request: { clientId: key.clientId, relyingPartyId: 'kestria-kds', publicKey: key.publicJwk, ...fields } });
  let verb = 'registered';
  if (errorsOf(r.json) && JSON.stringify(r.json.errors).includes('duplicate_client_id')) {
    r = await call('PUT', base + '/' + encodeURIComponent(key.clientId), { requestTime: now(), request: { ...fields, status: 'active' } });
    verb = 'updated';
  }
  if (r.status >= 300 || errorsOf(r.json)) {
    throw new Error(`client: HTTP ${r.status} ${JSON.stringify(r.json)}\n` +
      'If the client exists with a key you no longer have, reset the sandbox: sandbox/esignet/esignet.sh reset');
  }
  console.log(`  ${verb} OIDC client "${key.clientId}" (private_key_jwt). Private key: sandbox/.secrets/xstack-client.json`);
}

const personas = loadPersonas();
console.log(`Seeding ${personas.length} Kestria personas into the mock identity system (${config.mockIdentityUrl})`);
await seedIdentities(personas);
console.log(`Registering the xstack client with eSignet (${config.esignetUrl})`);
await registerClient();
console.log('Done.');
