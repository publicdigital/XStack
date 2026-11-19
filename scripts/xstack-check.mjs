#!/usr/bin/env node
// xstack-check – run a service's constraints and report the evidence.
//
// The checks ship with xstack. The agent that writes the code does not write
// the checker. No dependencies: Node 20 or later.
//
//   xstack-check [--root DIR] [--stage write|stop|ci] [--format text|json|md]
//                [--no-report]
//   xstack-check --vendor [--root DIR]   copy the runner and its layers into
//                                        DIR/.xstack/vendor so CI can run it
//
// Exit codes: 0 all "must" constraints hold, 1 at least one does not,
// 2 the constraints file is missing or invalid.
//
// See constraints/README.md for the file format.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CONSTRAINTS_FILE = path.join('.xstack', 'constraints.json');
export const REPORT_FILE = path.join('.xstack', 'check-report.json');
const SKIP_DIRS = new Set(['node_modules', '.git', 'reports', 'test-results', 'playwright-report', 'dist', 'build', 'coverage']);
const BINARY = /\.(png|jpe?g|gif|webp|ico|pdf|woff2?|ttf|otf|eot|zip|gz|mp4|mov|docx|pptx|xlsx)$/i;
const STAGES = ['write', 'stop', 'ci'];
// A path the agent may not change without a person saying yes.
export const ALWAYS_PROTECTED = ['.xstack/constraints.json', '.xstack/vendor/**'];

// ---------- small helpers ----------

export function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        i++;
        if (glob[i + 1] === '/') { i++; re += '(?:.*/)?'; } else re += '.*';
      } else re += '[^/]*';
    } else if (c === '?') re += '[^/]';
    else re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`^${re}$`);
}

export function matchesAny(rel, globs = []) {
  return globs.some((g) => globToRegExp(g).test(rel));
}

export function walk(root) {
  const out = [];
  const visit = (dir) => {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) visit(path.join(dir, e.name));
      } else if (e.isFile()) {
        out.push(path.relative(root, path.join(dir, e.name)).split(path.sep).join('/'));
      }
    }
  };
  visit(root);
  return out.sort();
}

function subst(value, vars) {
  if (typeof value === 'string') return value.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
  if (Array.isArray(value)) return value.map((v) => subst(v, vars));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, subst(v, vars)]));
  return value;
}

// Blank out HTML comments but keep the line numbers, so markup that is only
// described in a comment is neither credited nor blamed.
function withoutComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// ---------- loading and merging layers ----------

function layerCandidates(name, root) {
  const vendor = path.join(root, '.xstack', 'vendor');
  if (name === 'xstack:baseline') {
    return [path.join(vendor, 'baseline.json'), path.join(HERE, 'baseline.json'), path.join(HERE, '..', 'constraints', 'baseline.json')];
  }
  if (name.startsWith('profile:')) {
    const p = name.slice('profile:'.length);
    if (!/^[\w-]+$/.test(p)) throw new Error(`Bad profile name in extends: ${name}`);
    return [path.join(vendor, `profile-${p}.json`), path.join(HERE, `profile-${p}.json`), path.join(HERE, '..', 'profiles', p, 'constraints.json')];
  }
  return [path.resolve(root, name)];
}

export function resolveLayer(name, root) {
  const found = layerCandidates(name, root).find((f) => fs.existsSync(f));
  if (!found) throw new Error(`Cannot find the constraints layer "${name}"`);
  return found;
}

export function loadConstraints(root) {
  const file = path.join(root, CONSTRAINTS_FILE);
  if (!fs.existsSync(file)) throw new Error(`No ${CONSTRAINTS_FILE} in ${root}`);
  const project = readJson(file);
  const layers = (project.extends || ['xstack:baseline']).map((name) => ({ name, ...readJson(resolveLayer(name, root)) }));
  layers.push({ name: 'service', ...project });

  const vars = Object.assign({}, ...layers.map((l) => l.vars || {}));
  const byId = new Map();
  for (const layer of layers) {
    for (const c of layer.constraints || []) {
      // A later layer can add constraints. It cannot redefine an earlier one:
      // loosening a rule is a waiver, with a name and an expiry on it.
      if (byId.has(c.id)) throw new Error(`Constraint ${c.id} is defined twice (in "${byId.get(c.id).layer}" and "${layer.name}"). To relax a constraint, add a waiver.`);
      validate(c, layer.name);
      byId.set(c.id, { ...subst(c, vars), layer: layer.name });
    }
  }
  return {
    service: project.service || path.basename(root),
    vars,
    constraints: [...byId.values()],
    waivers: project.waivers || [],
    protected: [...ALWAYS_PROTECTED, ...subst(project.protected || [], vars)],
  };
}

function validate(c, layer) {
  const bad = (msg) => { throw new Error(`Constraint ${c.id || '(no id)'} in "${layer}": ${msg}`); };
  for (const k of ['id', 'title', 'theme', 'source', 'owner', 'severity', 'when', 'check']) if (c[k] === undefined) bad(`missing "${k}"`);
  if (!['must', 'should'].includes(c.severity)) bad('severity must be "must" or "should"');
  if (!Array.isArray(c.when) || !c.when.length || c.when.some((s) => !STAGES.includes(s))) bad(`"when" must list one or more of ${STAGES.join(', ')}`);
  if (!CHECKS[c.check.type]) bad(`unknown check type "${c.check.type}"`);
  if (c.when.includes('write') && c.check.type !== 'forbid-pattern') bad('only forbid-pattern checks can run at the "write" stage');
}

// ---------- the checks ----------

function selectFiles(ctx, check) {
  return ctx.files.filter((f) => matchesAny(f, check.files) && !matchesAny(f, check.exclude) && !BINARY.test(f));
}

function read(ctx, rel) {
  try { return fs.readFileSync(path.join(ctx.root, rel), 'utf8'); } catch { return ''; }
}

export function findForbidden(text, check) {
  const hits = [];
  for (const p of check.patterns) {
    const re = new RegExp(p, `g${check.flags || ''}`);
    let m;
    while ((m = re.exec(text)) && hits.length < 50) {
      hits.push({ line: lineOf(text, m.index), pattern: p });
      if (m[0] === '') re.lastIndex++;
    }
  }
  return hits;
}

const CHECKS = {
  'forbid-pattern'(ctx, check) {
    const files = selectFiles(ctx, check);
    const findings = [];
    for (const f of files) for (const h of findForbidden(read(ctx, f), check)) findings.push(`${f}:${h.line} matches /${h.pattern}/`);
    return { ok: findings.length === 0, findings, checked: files.length };
  },

  'require-pattern'(ctx, check) {
    const files = selectFiles(ctx, check);
    const findings = [];
    for (const f of files) {
      const text = read(ctx, f);
      for (const p of check.patterns) if (!new RegExp(p, check.flags || '').test(text)) findings.push(`${f} has nothing matching /${p}/`);
    }
    return { ok: findings.length === 0, findings, checked: files.length };
  },

  'links-resolve'(ctx, check) {
    const files = selectFiles(ctx, check);
    const webRoot = path.join(ctx.root, check.root || '.');
    const findings = [];
    for (const f of files) {
      const text = withoutComments(read(ctx, f));
      const re = /\s(?:href|action|src)\s*=\s*["']([^"']*)["']/gi;
      let m;
      const seen = new Set();
      while ((m = re.exec(text))) {
        const target = m[1].trim();
        if (!target || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\{\{)/i.test(target)) continue; // external, fragment or template
        const clean = target.split('#')[0].split('?')[0];
        if (!clean || seen.has(clean) || matchesAny(clean, check.ignore)) continue;
        seen.add(clean);
        const base = clean.startsWith('/') ? path.join(webRoot, clean) : path.resolve(path.join(ctx.root, path.dirname(f)), clean);
        const candidates = [base, `${base}.html`, path.join(base, 'index.html')];
        if (!candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile())) findings.push(`${f}:${lineOf(text, m.index)} links to ${target}, which does not exist`);
      }
    }
    return { ok: findings.length === 0, findings, checked: files.length };
  },

  'form-method'(ctx, check) {
    const files = selectFiles(ctx, check);
    const findings = [];
    for (const f of files) {
      const text = withoutComments(read(ctx, f));
      const re = /<form\b([^>]*)>([\s\S]*?)<\/form>/gi;
      let m;
      while ((m = re.exec(text))) {
        const sensitive = /<input\b[^>]*\stype\s*=\s*["']?(?:file|password)\b/i.test(m[2]);
        const post = /\smethod\s*=\s*["']?post\b/i.test(m[1]);
        if (sensitive && !post) findings.push(`${f}:${lineOf(text, m.index)} form with a file or password input does not use method="post"`);
      }
    }
    return { ok: findings.length === 0, findings, checked: files.length };
  },

  'file-exists'(ctx, check) {
    const want = check.anyOf || [check.path];
    const ok = want.some((p) => fs.existsSync(path.join(ctx.root, p)));
    return { ok, findings: ok ? [] : [`none of ${want.join(', ')} exists`], checked: 1 };
  },

  command(ctx, check) {
    if (check.requires) {
      if (!/^[\w.-]+$/.test(check.requires)) return { ok: false, findings: [`"requires" must be a plain tool name, not ${check.requires}`], checked: 1 };
      const probe = spawnSync(`command -v ${check.requires}`, { shell: true, encoding: 'utf8' });
      if (probe.status !== 0) return { notRun: `${check.requires} is not installed` };
    }
    const res = spawnSync(check.run, { shell: true, cwd: ctx.root, encoding: 'utf8', timeout: (check.timeoutSeconds || 600) * 1000, env: process.env });
    if (res.error && res.error.code === 'ETIMEDOUT') return { ok: false, findings: [`timed out: ${check.run}`], checked: 1 };
    const tail = `${res.stdout || ''}${res.stderr || ''}`.trim().split('\n').slice(-15);
    return { ok: res.status === 0, findings: res.status === 0 ? [] : [`\`${check.run}\` exited ${res.status}`, ...tail], checked: 1 };
  },
};

// ---------- running ----------

export function waiverFor(id, waivers, today) {
  const w = waivers.find((x) => x.id === id);
  if (!w) return null;
  const complete = w.reason && w.approvedBy && /^\d{4}-\d{2}-\d{2}$/.test(w.expires || '');
  if (!complete) return { ...w, state: 'invalid' };
  return { ...w, state: w.expires < today ? 'expired' : 'active' };
}

export function runChecks(root, stage = 'stop') {
  const cfg = loadConstraints(root);
  const ctx = { root, files: walk(root) };
  const today = new Date().toISOString().slice(0, 10);
  const results = [];

  for (const c of cfg.constraints) {
    const base = { id: c.id, title: c.title, theme: c.theme, source: c.source, owner: c.owner, severity: c.severity, layer: c.layer, fix: c.fix };
    // The ci stage runs everything. Earlier stages run only what is tagged for them.
    if (stage !== 'ci' && !c.when.includes(stage)) { results.push({ ...base, status: 'not-run', detail: `runs at: ${c.when.join(', ')}` }); continue; }
    if (c.onlyIf?.exists && !fs.existsSync(path.join(root, c.onlyIf.exists))) { results.push({ ...base, status: 'not-applicable', detail: `no ${c.onlyIf.exists}` }); continue; }

    const r = CHECKS[c.check.type](ctx, c.check);
    if (r.notRun) { results.push({ ...base, status: 'not-run', detail: r.notRun, blocking: stage === 'ci' && c.severity === 'must' }); continue; }
    if (r.ok) { results.push({ ...base, status: 'pass', checked: r.checked }); continue; }

    const w = waiverFor(c.id, cfg.waivers, today);
    if (w?.state === 'active') results.push({ ...base, status: 'waived', findings: r.findings, waiver: w });
    else results.push({ ...base, status: 'fail', findings: r.findings, waiver: w || undefined, blocking: c.severity === 'must' });
  }

  const blocking = results.filter((r) => r.blocking);
  const count = (s) => results.filter((r) => r.status === s).length;
  return {
    service: cfg.service,
    stage,
    generated: new Date().toISOString(),
    passed: blocking.length === 0,
    summary: { pass: count('pass'), fail: count('fail'), waived: count('waived'), notRun: count('not-run'), notApplicable: count('not-applicable'), blocking: blocking.length },
    results,
  };
}

// ---------- output ----------

const MARK = { pass: 'PASS', fail: 'FAIL', waived: 'WAIVED', 'not-run': 'NOT RUN', 'not-applicable': 'N/A' };

export function formatText(report, { onlyProblems = false } = {}) {
  const lines = [`xstack-check: ${report.service} (stage: ${report.stage})`, ''];
  for (const r of report.results) {
    if (onlyProblems && !r.blocking) continue;
    lines.push(`${MARK[r.status].padEnd(8)} ${r.id.padEnd(13)} ${r.severity.padEnd(6)} ${r.title}${r.detail ? ` (${r.detail})` : ''}`);
    if (r.status === 'fail' || r.status === 'waived') {
      for (const f of (r.findings || []).slice(0, 8)) lines.push(`           ${f}`);
      if ((r.findings || []).length > 8) lines.push(`           ...and ${r.findings.length - 8} more`);
      if (r.status === 'fail' && r.fix) lines.push(`           Fix: ${r.fix}`);
      if (r.waiver?.state === 'active') lines.push(`           Waived until ${r.waiver.expires} by ${r.waiver.approvedBy}: ${r.waiver.reason}`);
      if (r.waiver?.state === 'expired') lines.push(`           The waiver expired on ${r.waiver.expires}.`);
      if (r.waiver?.state === 'invalid') lines.push('           The waiver is missing a reason, approvedBy or an expires date (YYYY-MM-DD).');
    }
  }
  const s = report.summary;
  lines.push('', `${s.pass} pass, ${s.fail} fail, ${s.waived} waived, ${s.notRun} not run, ${s.notApplicable} not applicable.`);
  lines.push(report.passed ? 'All "must" constraints that ran at this stage hold.' : `${s.blocking} "must" constraint(s) do not hold.`);
  return lines.join('\n');
}

export function formatMarkdown(report) {
  const themes = [...new Set(report.results.map((r) => r.theme))];
  const out = [`## Constraint evidence`, '', `Generated by \`xstack-check\` at stage \`${report.stage}\` on ${report.generated.slice(0, 10)}. Do not edit by hand – run the check again.`, ''];
  for (const theme of themes) {
    out.push(`### ${theme}`, '', '| Constraint | Result | Severity | Owner | Evidence |', '|---|---|---|---|---|');
    for (const r of report.results.filter((x) => x.theme === theme)) {
      let ev = r.detail || '';
      if (r.status === 'pass') ev = `${r.checked} file(s) or command(s) checked`;
      if (r.status === 'fail') ev = `${r.findings.length} finding(s), first: ${String(r.findings[0]).replace(/\|/g, '\\|')}`;
      if (r.status === 'waived') ev = `${r.findings.length} finding(s). Waived until ${r.waiver.expires} by ${r.waiver.approvedBy}: ${r.waiver.reason}`;
      out.push(`| \`${r.id}\` ${r.title} | ${MARK[r.status]} | ${r.severity} | ${r.owner} | ${ev} |`);
    }
    out.push('');
  }
  const s = report.summary;
  out.push(`**Total:** ${s.pass} pass, ${s.fail} fail, ${s.waived} waived, ${s.notRun} not run, ${s.notApplicable} not applicable.`, '');
  out.push('A theme can be rated **Met** only if every one of its constraints is PASS at the `ci` stage. FAIL, WAIVED and NOT RUN are at best **Partly met**.');
  return out.join('\n');
}

// ---------- vendoring ----------

function vendor(root) {
  const project = readJson(path.join(root, CONSTRAINTS_FILE));
  const dest = path.join(root, '.xstack', 'vendor');
  fs.mkdirSync(dest, { recursive: true });
  const copied = [];
  const copy = (from, name) => { fs.copyFileSync(from, path.join(dest, name)); copied.push(name); };
  const self = fileURLToPath(import.meta.url);
  if (path.resolve(self) !== path.resolve(dest, 'xstack-check.mjs')) copy(self, 'xstack-check.mjs');
  for (const name of project.extends || ['xstack:baseline']) {
    if (name === 'xstack:baseline') copy(resolveLayer(name, path.join(root, '.nonexistent')), 'baseline.json');
    else if (name.startsWith('profile:')) copy(resolveLayer(name, path.join(root, '.nonexistent')), `profile-${name.slice(8)}.json`);
  }
  return copied;
}

// ---------- command line ----------

function main(argv) {
  const args = { root: process.cwd(), stage: 'stop', format: 'text', report: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root') args.root = path.resolve(argv[++i]);
    else if (a === '--stage') args.stage = argv[++i];
    else if (a === '--format') args.format = argv[++i];
    else if (a === '--no-report') args.report = false;
    else if (a === '--vendor') args.vendor = true;
    else if (a === '--help' || a === '-h') { console.log('Usage: xstack-check [--root DIR] [--stage write|stop|ci] [--format text|json|md] [--no-report] | --vendor [--root DIR]'); return 0; }
    else { console.error(`Unknown option: ${a}`); return 2; }
  }
  if (!STAGES.includes(args.stage)) { console.error(`--stage must be one of ${STAGES.join(', ')}`); return 2; }

  try {
    if (args.vendor) {
      console.log(`Copied into ${path.join(args.root, '.xstack', 'vendor')}: ${vendor(args.root).join(', ')}`);
      return 0;
    }
    const report = runChecks(args.root, args.stage);
    if (args.report) fs.writeFileSync(path.join(args.root, REPORT_FILE), `${JSON.stringify(report, null, 2)}\n`);
    console.log(args.format === 'json' ? JSON.stringify(report, null, 2) : args.format === 'md' ? formatMarkdown(report) : formatText(report));
    return report.passed ? 0 : 1;
  } catch (e) {
    console.error(`xstack-check: ${e.message}`);
    return 2;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
