// Reads KESTRIA_PERSONAS straight out of profiles/kestria/dpi.md, so the sandbox and the
// in-browser mock always use the same made-up people. Nothing here is real data.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

export const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const DPI_MD = REPO_ROOT + 'profiles/kestria/dpi.md';

export function loadPersonas(file = DPI_MD) {
  const md = readFileSync(file, 'utf8');
  const start = md.indexOf('const KESTRIA_PERSONAS = [');
  if (start < 0) throw new Error('KESTRIA_PERSONAS not found in ' + file);
  const end = md.indexOf('\n];', start);
  const src = md.slice(start, end + 3).replace('const KESTRIA_PERSONAS =', 'KESTRIA_PERSONAS =');
  const ctx = {};
  vm.runInNewContext(src, ctx);
  return ctx.KESTRIA_PERSONAS;
}

// The KUIN without spaces is the individual ID people type on the eSignet screen.
export function individualId(persona) {
  return persona.claims.nationalId ? persona.claims.nationalId.replace(/\s/g, '') : null;
}
