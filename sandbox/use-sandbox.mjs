#!/usr/bin/env node
// Copies a prototype and swaps its inlined references/dpi-mock.js for references/dpi-sandbox.js.
// Nothing else on the page changes. The original is left alone.
//
//   node sandbox/use-sandbox.mjs <prototype index.html> <new folder>
//   node sandbox/use-sandbox.mjs examples/build-household-support-grant/prototype-1-once-only/iteration-4/index.html \
//        examples/build-household-support-grant/prototype-1-once-only/sandbox
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/personas.mjs';

const [from, toDir] = process.argv.slice(2);
if (!from || !toDir) { console.error('Usage: node sandbox/use-sandbox.mjs <prototype index.html> <new folder>'); process.exit(1); }

const html = readFileSync(from, 'utf8');
const client = readFileSync(REPO_ROOT + 'references/dpi-sandbox.js', 'utf8');

// The mock is the <script> block whose header comment starts "xstack DPI mock".
const marker = html.indexOf('xstack DPI mock');
if (marker < 0) { console.error('No inlined dpi-mock.js found in ' + from); process.exit(1); }
const open = html.lastIndexOf('<script>', marker);
const close = html.indexOf('</script>', marker);
const out = html.slice(0, open) + '<script>\n' + client.trimEnd() + '\n  ' + html.slice(close);

mkdirSync(toDir, { recursive: true });
const dest = path.join(toDir, 'index.html');
writeFileSync(dest, out);
console.log(`Wrote ${dest}: dpi-mock.js (${close - open} chars) replaced by dpi-sandbox.js. Open it through the adapter, http://localhost:4400/${path.relative(REPO_ROOT, dest)}`);
