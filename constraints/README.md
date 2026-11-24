# Constraints

A constraint is a rule a production service must meet, written so a machine can check it. xstack enforces constraints in three places, so they do not depend on an agent remembering an instruction.

| Where | What happens | File |
|---|---|---|
| When the agent writes a file | A write that adds a secret, an inline script or prototype chrome is refused. A change to a protected path needs a person to say yes | `hooks/guard-write.mjs` |
| When the agent runs a shell command | A command that looks like it changes a protected path needs a person to say yes. Running the checks is never held up | `hooks/guard-bash.mjs` |
| When the agent says it is done | The checks run. If a "must" constraint fails, the agent is sent back with the findings | `hooks/stop-gate.mjs` |
| In CI | Every constraint runs, including the ones that need a server, browsers and scanners | `scripts/xstack-check.mjs --stage ci` |

The checks ship with xstack. The agent that writes the code does not write the checker.

Constraints raise the floor. They do not replace the threat model, the pen test or the DPIA.

## Turning it on

A folder is constrained when it has `.xstack/constraints.json`. `/xstack:productionise` creates one. Everywhere else the hooks do nothing.

```json
{
  "version": 1,
  "service": "renew-medical-licence",
  "extends": ["xstack:baseline", "profile:barbados"],
  "vars": { "web": "public" },
  "protected": ["tests/security/**"],
  "constraints": [],
  "waivers": []
}
```

Then copy the runner into the service so CI can run it without the plugin:

```bash
node "$CLAUDE_PLUGIN_ROOT/scripts/xstack-check.mjs" --vendor --root .
```

## Layers

Constraints come from three layers. Later layers add constraints. They cannot redefine one from an earlier layer.

1. **Baseline** – `constraints/baseline.json`. Ships with xstack and applies in every country.
2. **Profile** – `profiles/<name>/constraints.json`. The government's design system, house style, platforms and law. Barbados and Kestria have one. To write your own, start from `profiles/_template/constraints.json`.
3. **Service** – the `constraints` list in the service's own file. Each threat-model mitigation, each field in the data inventory and each test suite that must pass.

## A constraint

```json
{
  "id": "SVC-SEC-002",
  "title": "The licence number is never written to a log",
  "theme": "Trust, security and privacy",
  "source": "threat model T-04 (information disclosure)",
  "owner": "cyber-engineer",
  "severity": "must",
  "when": ["stop", "ci"],
  "check": { "type": "forbid-pattern", "files": ["src/**/*.ts"], "patterns": ["log\\w*\\([^)]*licenceNumber"] },
  "fix": "Log the application reference instead."
}
```

- `theme` is a theme from `references/service-standard-baseline.md`. The readiness report groups evidence by theme.
- `source` says where the rule comes from: a standard, a law, a threat, a profile file.
- `severity` is `must` (blocks) or `should` (reported).
- `when` lists the stages the check runs at: `write`, `stop`, `ci`. The `ci` stage runs everything.
- `onlyIf` is optional: `{ "exists": "package.json" }` skips the constraint when the file is absent.

## Check types

| Type | Passes when | Options |
|---|---|---|
| `forbid-pattern` | No file matches any pattern. The only type that can run at `write` | `files`, `exclude`, `patterns`, `flags` |
| `require-pattern` | Every file matches every pattern | `files`, `exclude`, `patterns`, `flags` |
| `links-resolve` | Every internal `href`, `action` and `src` points at a file | `files`, `root`, `ignore` |
| `form-method` | Every form with a file or password input uses POST | `files` |
| `max-size` | No file is larger than `bytes` | `files`, `exclude`, `bytes` |
| `file-exists` | The file, or one of `anyOf`, exists | `path` or `anyOf` |
| `command` | The command exits 0. Use it to wrap a scanner or a test suite | `run`, `requires`, `timeoutSeconds` |

If the tool a `command` check `requires` is not installed, the result is NOT RUN. At the `ci` stage a "must" constraint that did not run counts as a failure.

## Waivers

A team relaxes a constraint with a waiver, not by editing or deleting it.

```json
{ "id": "WFT-001", "reason": "Help and privacy pages arrive in sprint 9", "approvedBy": "A. Person, service owner", "expires": "2027-01-31" }
```

A waiver needs all three of `reason`, `approvedBy` and `expires`. An expired or incomplete waiver does nothing. The constraints file is a protected path, so only a person can add one. Agents: if a constraint cannot be met, say which and why, and ask.

## Reading the results

```bash
node .xstack/vendor/xstack-check.mjs --stage stop            # text
node .xstack/vendor/xstack-check.mjs --stage ci --format md  # the evidence section for PRODUCTION-READINESS.md
```

Results are PASS, FAIL, WAIVED, NOT RUN or N/A. Each run writes `.xstack/check-report.json`.

A theme is **Met** only if every one of its constraints is PASS at the `ci` stage. FAIL, WAIVED and NOT RUN are at best **Partly met**. A rating in a readiness report or a standards assessment cites the constraint ids it rests on.

## CI

The hooks only see the Write and Edit tools, so CI is the backstop. `constraints/ci/github-actions.yml` is a workflow for a service: copy it to `.github/workflows/constraints.yml`, make the job a required check, and require review for changes under `.xstack/`.

xstack's own workflow, `.github/workflows/constraints.yml`, tests the runner and hooks (`node --test scripts/xstack-check.test.mjs`), checks that vendored copies match the source, and runs the `ci` stage on the medical-licence example.

## Limits

- The write guard covers the Write and Edit tools. The shell guard reads a command as text, so it is a tripwire, not a wall: a command can be written to slip past it. CI is the backstop – see the CI section above.
- Pattern checks find known shapes of mistake. They do not prove their absence.
- The baseline covers the front end and the repository. Back-end constraints – authorisation, input validation, logging – arrive with the back-end scaffold.
