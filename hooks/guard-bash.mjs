#!/usr/bin/env node
// PreToolUse hook for Bash.
//
// The write guard only sees the Write and Edit tools. This one asks a person
// before a shell command that looks like it changes a protected path: the
// constraints file, the vendored runner, or anything the service lists under
// "protected". Running the checks and reading those files is never held up.
//
// It reads the command as text, so it is a tripwire, not a wall: a determined
// command can be written to slip past it. CI is the backstop.

import fs from 'node:fs';
import path from 'node:path';
import { findRoots, loadConstraints } from '../scripts/xstack-check.mjs';

// Commands that change, move or remove files, or rewrite them from git.
const WRITERS = /(?:^|[\s;&|(`$])(?:rm|mv|cp|tee|sed|perl|awk|truncate|chmod|chown|ln|dd|install|patch|touch|rsync|unlink|git\s+(?:checkout|restore|rm|mv|apply|stash|reset|clean))(?=\s)/;

let input;
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
const command = input.tool_input?.command;
if (typeof command !== 'string' || !command.trim()) process.exit(0);

const cwd = input.cwd || process.cwd();
const hits = new Set();
for (const root of findRoots(cwd)) {
  let prot;
  try { prot = loadConstraints(root).protected; } catch { prot = ['.xstack/constraints.json', '.xstack/vendor/**']; }
  for (const glob of prot) {
    // The fixed part of the glob, e.g. "tests/security/" from "tests/security/**".
    const prefix = glob.split('*')[0];
    if (prefix.length < 4 || !command.includes(prefix)) continue;
    const at = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const redirected = new RegExp(`>>?\\s*["']?[^\\s"']*${at}`).test(command);
    if (redirected || WRITERS.test(command)) hits.add(glob);
  }
}
if (!hits.size) process.exit(0);

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'ask',
    permissionDecisionReason: `xstack: this command looks like it changes a protected path (${[...hits].join(', ')}). Those paths define or enforce the service's constraints, so a person must approve. If a constraint is wrong, say why and ask – do not work around it.`,
  },
}));
process.exit(0);
