// Tests for the constraint runner and the two hooks. Run: node --test scripts/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { runChecks, globToRegExp } from './xstack-check.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HOOKS = path.join(HERE, '..', 'hooks');
// Built at run time so secret scanners do not flag this file.
const FAKE_KEY = `const k = '${'AKIA'}${'ABCDEFGHIJKLMNOP'}';`;
const PAGE = (body) => `<!DOCTYPE html>\n<html lang="en"><head><title>T</title></head><body><main>\n${body}\n</main></body></html>\n`;

function service(files = {}, extra = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xstack-check-'));
  const all = { 'public/index.html': PAGE('<a href="next.html">Next</a>'), 'public/next.html': PAGE('<p>Hello</p>'), ...files };
  for (const [rel, text] of Object.entries(all)) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), text);
  }
  fs.mkdirSync(path.join(root, '.xstack'), { recursive: true });
  fs.writeFileSync(path.join(root, '.xstack', 'constraints.json'), JSON.stringify({ version: 1, service: 'test', extends: ['xstack:baseline'], constraints: [], waivers: [], ...extra }));
  return root;
}

const status = (report, id) => report.results.find((r) => r.id === id).status;
const hook = (name, input) => spawnSync('node', [path.join(HOOKS, name)], { input: JSON.stringify(input), encoding: 'utf8' });
const decision = (res) => (res.stdout ? JSON.parse(res.stdout).hookSpecificOutput.permissionDecision : 'none');

test('globs', () => {
  assert.ok(globToRegExp('public/**/*.html').test('public/a.html'));
  assert.ok(globToRegExp('public/**/*.html').test('public/a/b.html'));
  assert.ok(!globToRegExp('public/*.html').test('public/a/b.html'));
  assert.ok(globToRegExp('**/*').test('a/b/c.js'));
});

test('a clean service passes the stop stage', () => {
  const report = runChecks(service(), 'stop');
  assert.equal(report.passed, true, JSON.stringify(report.results.filter((r) => r.blocking)));
});

test('each baseline rule catches its mistake', () => {
  const cases = {
    'SEC-001': { 'src/config.js': FAKE_KEY },
    'SEC-002': { 'public/a.html': PAGE('<button onclick="go()">Go</button>') },
    'SEC-003': { 'public/a.html': PAGE('<script>alert(1)</script>') },
    'SEC-008': { 'public/a.html': PAGE('<p style="margin: 0">Hi</p>') },
    'SEC-004': { 'public/a.html': PAGE('<form method="get" action="next.html"><input type="file" name="f"></form>') },
    'A11Y-001': { 'public/a.html': '<!DOCTYPE html><html><head><title>T</title></head><body><main></main></body></html>' },
    'A11Y-002': { 'public/a.html': PAGE('<img src="next.html">') },
    'WFT-001': { 'public/a.html': PAGE('<a href="missing.html">Gone</a>') },
    'TECH-001': { 'public/a.html': PAGE('<style>p{color:red}</style>') },
    'OPEN-001': { 'public/a.html': PAGE('<aside class="xstack-assumptions"></aside>') },
  };
  for (const [id, files] of Object.entries(cases)) {
    const report = runChecks(service(files), 'stop');
    assert.equal(status(report, id), 'fail', id);
    assert.equal(report.passed, false, id);
  }
});

test('markup inside an HTML comment is neither credited nor blamed', () => {
  const body = '<!-- <form method="post"> <a href="missing.html">x</a> -->\n<form method="get" action="next.html"><input type="file" name="f"></form>';
  const report = runChecks(service({ 'public/a.html': PAGE(body) }), 'stop');
  assert.equal(status(report, 'SEC-004'), 'fail');
  assert.equal(status(report, 'WFT-001'), 'pass');
});

test('backend routes are not treated as dead links', () => {
  const report = runChecks(service({ 'public/a.html': PAGE('<form method="post" action="/api/renewal/pay"></form>') }), 'stop');
  assert.equal(status(report, 'WFT-001'), 'pass');
});

test('waivers: active waives, expired and incomplete do not', () => {
  const files = { 'public/a.html': PAGE('<a href="missing.html">Gone</a>') };
  const w = (over) => ({ waivers: [{ id: 'WFT-001', reason: 'r', approvedBy: 'A. Person', expires: '2999-01-01', ...over }] });
  assert.equal(status(runChecks(service(files, w({})), 'stop'), 'WFT-001'), 'waived');
  assert.equal(runChecks(service(files, w({})), 'stop').passed, true);
  assert.equal(status(runChecks(service(files, w({ expires: '2020-01-01' })), 'stop'), 'WFT-001'), 'fail');
  assert.equal(status(runChecks(service(files, w({ approvedBy: '' })), 'stop'), 'WFT-001'), 'fail');
});

test('a service cannot redefine a baseline constraint', () => {
  const dup = { id: 'SEC-001', title: 't', theme: 't', source: 's', owner: 'o', severity: 'should', when: ['ci'], check: { type: 'file-exists', path: 'x' } };
  assert.throws(() => runChecks(service({}, { constraints: [dup] }), 'stop'), /defined twice/);
});

test('at the ci stage a must constraint that cannot run blocks', () => {
  const c = { id: 'SVC-001', title: 't', theme: 't', source: 's', owner: 'o', severity: 'must', when: ['ci'], check: { type: 'command', requires: 'no-such-tool-xyz', run: 'true' } };
  const root = service({}, { constraints: [c] });
  const ci = runChecks(root, 'ci').results.find((r) => r.id === 'SVC-001');
  assert.equal(ci.status, 'not-run');
  assert.equal(ci.blocking, true);
  assert.ok(!runChecks(root, 'stop').results.find((r) => r.id === 'SVC-001').blocking);
});

test('write guard: denies a bad write, asks on a protected path, ignores the rest', () => {
  const root = service({}, { protected: ['tests/security/**'] });
  const call = (file_path, content) => hook('guard-write.mjs', { cwd: root, tool_name: 'Write', tool_input: { file_path, content } });
  assert.equal(decision(call('public/a.html', '<button onclick="go()">Go</button>')), 'deny');
  assert.equal(decision(call('src/k.js', FAKE_KEY)), 'deny');
  assert.equal(decision(call('.xstack/constraints.json', '{}')), 'ask');
  assert.equal(decision(call('tests/security/headers.sh', 'exit 0')), 'ask');
  assert.equal(decision(call('public/a.html', '<p>Fine</p>')), 'none');
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'xstack-none-'));
  assert.equal(decision(hook('guard-write.mjs', { cwd: outside, tool_name: 'Write', tool_input: { file_path: path.join(outside, 'k.js'), content: FAKE_KEY } })), 'none');
});

test('stop gate: sends the agent back once, records the result, skips when unchanged', () => {
  const bad = service({ 'public/a.html': PAGE('<a href="missing.html">Gone</a>') });
  const first = hook('stop-gate.mjs', { cwd: bad, stop_hook_active: false });
  assert.equal(first.status, 2);
  assert.match(first.stderr, /WFT-001/);
  assert.equal(hook('stop-gate.mjs', { cwd: bad, stop_hook_active: true }).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(bad, '.xstack', 'check-report.json'), 'utf8')).passed, false);

  const good = service();
  assert.equal(hook('stop-gate.mjs', { cwd: good }).status, 0);
  const reportPath = path.join(good, '.xstack', 'check-report.json');
  const before = fs.readFileSync(reportPath, 'utf8');
  assert.equal(hook('stop-gate.mjs', { cwd: good }).status, 0);
  assert.equal(fs.readFileSync(reportPath, 'utf8'), before);
});
