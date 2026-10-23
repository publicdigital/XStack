// Mock registers, built from KESTRIA_PERSONAS in profiles/kestria/dpi.md. Locally there's no
// X-Road (KesLink), so the adapter answers data.fetch from these, for the signed-in person only.
import { loadPersonas, individualId } from '../lib/personas.mjs';

const personas = loadPersonas();
const byId = new Map(personas.map((p) => [p.id, p]));

const norm = (s) => String(s || '').normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
const isoDate = (s) => String(s || '').replace(/\//g, '-').slice(0, 10);

// eSignet gives each service a pairwise `sub`, never the KUIN. The National Population Register
// match – name and date of birth from the verified claims – stands in for the identifier the
// NIA gives KesLink. In a real service that link stays inside KesLink.
export function matchPerson(userinfo) {
  const name = norm(userinfo.name), dob = isoDate(userinfo.birthdate);
  return personas.find((p) => individualId(p) && norm(p.claims.fullName) === name && p.claims.dateOfBirth === dob) || null;
}

export const person = (id) => byId.get(id) || null;

// The contract's claims: verified values from KestriaID where it released them, the rest from
// the National Population Register record the match found.
export function claimsFor(userinfo, p) {
  return {
    fullName: userinfo.name || p.claims.fullName,
    givenName: p.claims.givenName || null,
    familyName: p.claims.familyName || null,
    dateOfBirth: userinfo.birthdate ? isoDate(userinfo.birthdate) : p.claims.dateOfBirth,
    nationalId: p.claims.nationalId,
    phone: userinfo.phone_number || p.claims.phone || null
  };
}

export const registerClaims = (p) => Object.assign({}, p.claims);

// Who this person can act for, from the NIA's authorised intermediary records.
export function actsFor(p) {
  return (p.actsFor || []).map((link) => ({ link, person: byId.get(link.persona) })).filter((x) => x.person);
}

export function fetchFacts(p, wanted) {
  const data = (p && p.data) || {};
  const values = {}, missing = [];
  for (const key of wanted) {
    if (data[key] == null) missing.push(key);
    else values[key] = data[key];
  }
  return { values, missing };
}
