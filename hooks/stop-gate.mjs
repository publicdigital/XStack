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
import { REPORT_FILE, runChecks, formatText, walk, findRoots } from '../scripts/xstack-check.mjs';

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

const roots = findRoots(cwd);

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
