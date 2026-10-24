// The few JOSE operations the sandbox needs, on node:crypto alone: an RSA keypair as JWKs,
// a PS256 private_key_jwt client assertion, and verifying eSignet's signed JWTs.
import crypto from 'node:crypto';

const PSS = { padding: crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength: 32 };
// eSignet 2.0 signs ID tokens with PS256. The signed userinfo is the mock identity system's
// token, signed RS256 with a key eSignet publishes in its JWKS (labelled PS256 there), although
// discovery only lists PS256. Accept both; nothing weaker.
const VERIFY = { PS256: PSS, RS256: { padding: crypto.constants.RSA_PKCS1_PADDING } };

export const b64url = (buf) => Buffer.from(buf).toString('base64url');
const json64 = (obj) => b64url(JSON.stringify(obj));

export function generateKeypair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const pub = publicKey.export({ format: 'jwk' });
  const kid = b64url(crypto.createHash('sha256').update(JSON.stringify({ e: pub.e, kty: pub.kty, n: pub.n })).digest());
  return {
    privateJwk: { ...privateKey.export({ format: 'jwk' }), kid, use: 'sig' },
    publicJwk: { kty: pub.kty, n: pub.n, e: pub.e, kid, use: 'sig' }
  };
}

export function signJwt(payload, privateJwk, header = {}) {
  const head = { alg: 'PS256', typ: 'JWT', kid: privateJwk.kid, ...header };
  const input = json64(head) + '.' + json64(payload);
  const key = crypto.createPrivateKey({ key: privateJwk, format: 'jwk' });
  return input + '.' + b64url(crypto.sign('sha256', Buffer.from(input), { key, ...PSS }));
}

export function clientAssertion(clientId, audience, privateJwk) {
  const now = Math.floor(Date.now() / 1000);
  return signJwt({ iss: clientId, sub: clientId, aud: audience, jti: crypto.randomUUID(), iat: now, exp: now + 60 }, privateJwk);
}

export function decodeJwt(jwt) {
  const [h, p] = String(jwt).split('.');
  return { header: JSON.parse(Buffer.from(h, 'base64url')), payload: JSON.parse(Buffer.from(p, 'base64url')) };
}

// Verifies the signature against the issuer's JWKS and the standard time and audience checks.
export function verifyJwt(jwt, jwks, { issuer, audience, leewaySecs = 30 } = {}) {
  const parts = String(jwt).split('.');
  if (parts.length !== 3) throw new Error('not a signed JWT (JWS compact form)');
  const { header, payload } = decodeJwt(jwt);
  if (!VERIFY[header.alg]) throw new Error('unexpected alg ' + header.alg);
  const jwk = (jwks.keys || []).find((k) => k.kid === header.kid) || (jwks.keys || []).find((k) => k.kty === 'RSA' && !header.kid);
  if (!jwk) throw new Error('no key in JWKS for kid ' + header.kid);
  const key = crypto.createPublicKey({ key: jwk, format: 'jwk' });
  const ok = crypto.verify('sha256', Buffer.from(parts[0] + '.' + parts[1]), { key, ...VERIFY[header.alg] }, Buffer.from(parts[2], 'base64url'));
  if (!ok) throw new Error('bad signature');
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now > payload.exp + leewaySecs) throw new Error('expired');
  if (payload.nbf && now + leewaySecs < payload.nbf) throw new Error('not yet valid');
  if (issuer && payload.iss !== issuer) throw new Error('wrong issuer ' + payload.iss);
  if (audience) {
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(audience)) throw new Error('wrong audience ' + payload.aud);
  }
  return payload;
}

export function pkcePair() {
  const verifier = b64url(crypto.randomBytes(32));
  return { verifier, challenge: b64url(crypto.createHash('sha256').update(verifier).digest()) };
}

export const randomToken = (n = 24) => b64url(crypto.randomBytes(n));
