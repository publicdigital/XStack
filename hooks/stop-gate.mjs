#!/usr/bin/env node
// Stop and SubagentStop hook.
//
// Before the agent can say it is done, run the "stop" stage of xstack-check
// for every constrained folder that has changed since it last passed. If a
// "must" constraint fails, the agent is sent back with the findings.
//
// It sends the agent back once per stop. If the agent still cannot make the
// checks pass it may stop, and .xstack/check-report.json records the failure –
// so the readiness report and CI still show it.

import fs from 'node:fs';
import path from 'node:path';
import { CONSTRAINTS_FILE, REPORT_FILE, runChecks, formatText, walk } from '../scripts/xstack-check.mjs';

const SKIP = new Set(['node_modules', '.git', 'dist', 'build']);

function rootsUnder(dir, depth, out) {
  if (fs.existsSync(path.join(dir, CONSTRAINTS_FILE))) out.add(dir);
  if (depth === 0) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) if (e.isDirectory() && !SKIP.has(e.name) && !e.name.startsWith('.')) rootsUnder(path.join(dir, e.name), depth - 1, out);
}

function rootsAbove(dir, out) {
  for (let d = path.dirname(dir); d !== path.dirname(d); d = path.dirname(d)) if (fs.existsSync(path.join(d, CONSTRAINTS_FILE))) out.add(d);
}

function unchangedSinceLastPass(root) {
  const reportPath = path.join(root, REPORT_FILE);
  let report, since;
  try { report = JSON.parse(fs.readFileSync(reportPath, 'utf8')); since = fs.statSync(reportPath).mtimeMs; } catch { return false; }
  if (!report.passed) return false;
  return !walk(root).some((f) => f !== '.xstack/check-report.json' && fs.statSync(path.join(root, f)).mtimeMs > since);
}

let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { /* run with defaults */ }
const cwd = input.cwd || process.cwd();

const roots = new Set();
rootsUnder(cwd, 4, roots);
rootsAbove(cwd, roots);

const failures = [];
for (const root of roots) {
  if (unchangedSinceLastPass(root)) continue;
  try {
    const report = runChecks(root, 'stop');
    fs.writeFileSync(path.join(root, REPORT_FILE), `${JSON.stringify(report, null, 2)}\n`);
    if (!report.passed) failures.push(`${path.relative(cwd, root) || '.'}\n${formatText(report, { onlyProblems: true })}`);
  } catch (e) {
    failures.push(`${path.relative(cwd, root) || '.'}\nxstack-check could not run: ${e.message}`);
  }
}

if (!failures.length || input.stop_hook_active) process.exit(0);

process.stderr.write([
  'xstack: the work is not done – these constraints do not hold.',
  '',
  failures.join('\n\n'),
  '',
  'Fix the code so the constraints hold. If one cannot be met, stop and tell the user which constraint fails and why;',
  'only a person can add a waiver. Do not edit .xstack/constraints.json, the checks or the tests to get a pass.',
].join('\n'));
process.exit(2);
