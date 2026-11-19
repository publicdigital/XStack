#!/usr/bin/env node
// PreToolUse hook for Write, Edit and MultiEdit.
//
// In a folder with .xstack/constraints.json it does two things:
//   1. Asks a person before the agent changes a protected path – the
//      constraints file, the vendored runner, and anything the service lists
//      under "protected". The agent cannot loosen its own rules unseen.
//   2. Refuses a write whose new text breaks a constraint tagged "write"
//      (a secret, an inline script, prototype chrome).
//
// Anywhere else it does nothing.

import fs from 'node:fs';
import path from 'node:path';
import { CONSTRAINTS_FILE, loadConstraints, matchesAny, findForbidden, waiverFor } from '../scripts/xstack-check.mjs';

function findRoot(start) {
  let dir = start;
  for (;;) {
    if (fs.existsSync(path.join(dir, CONSTRAINTS_FILE))) return dir;
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}

function decide(decision, reason) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: reason } }));
  process.exit(0);
}

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }

const ti = input.tool_input || {};
if (!ti.file_path) process.exit(0);
const file = path.resolve(input.cwd || process.cwd(), ti.file_path);
const root = findRoot(path.dirname(file));
if (!root) process.exit(0);

let cfg;
try { cfg = loadConstraints(root); } catch (e) {
  // A broken constraints file must be fixable, so never lock the folder.
  if (path.relative(root, file).split(path.sep).join('/') === '.xstack/constraints.json') decide('ask', `xstack: the constraints file is invalid (${e.message}). A person should approve the repair.`);
  process.exit(0);
}

const rel = path.relative(root, file).split(path.sep).join('/');

if (matchesAny(rel, cfg.protected)) {
  decide('ask', `xstack: ${rel} is a protected path for ${cfg.service}. It defines or enforces the service's constraints, so a person must approve changes to it. If a constraint is wrong, say why and ask – do not work around it.`);
}

const text = [ti.content, ti.new_string, ...(ti.edits || []).map((e) => e.new_string)].filter((x) => typeof x === 'string').join('\n');
if (!text) process.exit(0);

const today = new Date().toISOString().slice(0, 10);
const broken = [];
for (const c of cfg.constraints) {
  if (!c.when.includes('write') || c.check.type !== 'forbid-pattern') continue;
  if (!matchesAny(rel, c.check.files) || matchesAny(rel, c.check.exclude)) continue;
  if (waiverFor(c.id, cfg.waivers, today)?.state === 'active') continue;
  if (findForbidden(text, c.check).length) broken.push(c);
}

if (broken.length) {
  const lines = broken.map((c) => `- ${c.id} ${c.title} (${c.severity}). ${c.fix || ''}`);
  const blocking = broken.some((c) => c.severity === 'must');
  const msg = `xstack: this change to ${rel} breaks ${broken.length} constraint(s):\n${lines.join('\n')}`;
  if (blocking) decide('deny', `${msg}\nChange the content so it meets the constraint, then write it again.`);
  process.stderr.write(`${msg}\n`);
}
process.exit(0);
