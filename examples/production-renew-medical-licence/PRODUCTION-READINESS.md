# Production-readiness report – Renew medical licence (front-end)

**Generated:** 2026-05-16. Constraint evidence regenerated 2026-11-19
**Skill:** `xstack:build-for-production` via `/xstack:productionise`
**Source iteration:** `examples/build-renew-medical-licence/prototype-1-phone-first/iteration-3/index.html`
**Target phase gate:** Alpha → Beta

> This report covers the **front-end's contribution** to the alpha-to-beta gate. The backend, threat model, pen test, dependency scans, operational readiness, and the SLA negotiation with the Medical Council are owned by the developer, the cyber engineer, and the delivery manager via other parts of xstack. Standards 5, 6, 11, and 13 are where this report carries the most weight; the others are scaffolded for the wider beta-gate assessment.

## Headline

Every "must" constraint that can be checked without a server now holds. The front-end is **not yet ready** for private beta, until every constraint passes in CI. Locally, 16 of the 17 constraints pass at the `ci` stage. The last, the gitleaks secret scan, runs in CI.

Two constraints failed when the checks were first run, and both are fixed:

- `SEC-004` – the CPD upload in `public/cpd.html` now sends its file by POST, with an upload button so it works without JavaScript. The local server accepts the POST, discards the file and redirects.
- `WFT-001` – the ten missing pages now exist: help, contact, feedback, privacy, accessibility, and five pages for correcting details. The privacy page says the full notice is still to come.

An earlier version of this report rated a static audit as a pass. That audit was written in the same run as the code it checked, and it recorded 50 dead links as information. The checks now ship with xstack (`xstack-check`), and the results below come from its output.

Still open:

- **The new pages are not in the test suites** – add them to `tests/accessibility/a11y.spec.ts`, also a protected path.
- **Accessibility, end-to-end and security suites pass in all five browser profiles** (140 of 140, macOS, 2026-11-19), and axe finds nothing on any of the 19 pages. Their first run failed 11 tests. The fixes: secondary text now uses GovBB grey-70 (`#595959`) because `#777777` failed contrast, the summary list on the check page is valid `dl` markup, and two test locators were wrong.
- **Not yet run locally:** gitleaks, which runs in CI, and k6. `npm audit` finds no vulnerabilities, and the lockfile is now committed.

**Recommended action:** wire `npm run check:ci` into CI and make it pass against staging before the formal Standards self-assessment.

## What's in this build

```
public/                    ← 19 HTML pages + shared CSS + minimal app.js
tests/e2e/                 ← 3 Playwright specs covering happy path, abroad context, error states
tests/accessibility/       ← axe-core suite across every page in every state
tests/security/            ← Playwright header tests + a bash script for CI without a browser
tests/load/                ← k6 peak (Oct–Dec profile) and 8-hour soak tests
scripts/                   ← serve, run-all
.xstack/                   ← constraints.json and the vendored xstack-check runner
playwright.config.ts       ← 5-project matrix (Chromium, Firefox, WebKit, mobile Chrome, mobile Safari)
package.json               ← npm scripts for everything
```

## Standards assessment

### Standard 5 – Works first time

**Rating:** Partly met with a plan.

**Evidence:**
- Per-page HTML with proper URLs, semantic landmarks, and skip-to-main-content links
- Forms have `required`, `pattern`, `autocomplete`, and `aria-describedby` set correctly
- Each form action points at the next page; the journey works without JavaScript
- The Playwright happy-path spec walks the journey end to end with accessible selectors
- Validation pattern uses the GovBB error-summary-at-top + inline pattern (server-rendered in production)

**Outstanding:**
- Server-side validation needs to mirror the client patterns when the back end is wired up
- The CPD upload still uses a single GET form action for the static demo; production needs proper multipart POST with progress reporting
- The address-override flow is currently a placeholder link – needs the actual screens in iteration 4

**Next action:** developer agent wires up server-side handlers per ADR-008.

### Standard 6 – Right tools and technology

**Rating:** Met.

**Evidence:**
- Vanilla HTML + CSS with progressive-enhancement JS – no heavy frameworks, no build step required
- Stylesheet linked from `assets/govbb.css`; not inlined; placeholder for the published `@govtech-bb/styles` CDN
- Playwright + axe-core + k6 are mainstream open-source tools, well-supported, easy to find skills for in the Caribbean tech market
- All `govbb-` design-system classes used; no Tailwind, no bespoke colours
- `TECH-001` confirms CSS is not inlined in any of the 19 pages

**Outstanding:**
- Publish the design system to a CDN MIST can endorse, then swap the local CSS link for the CDN

### Standard 11 – Trust, safety, confidentiality

**Rating:** Partly met with a plan.

**Evidence (front-end half):**
- ✅ **Content-Security-Policy** – `default-src 'self'` with explicit allow-lists for Google Fonts only
- ✅ **Strict-Transport-Security** – `max-age=31536000; includeSubDomains` (1 year)
- ✅ **X-Content-Type-Options** – `nosniff`
- ✅ **X-Frame-Options** – `DENY`
- ✅ **Referrer-Policy** – `strict-origin-when-cross-origin`
- ✅ **Permissions-Policy** – `geolocation=(), camera=(), microphone=()`
- ✅ CSP forbids `unsafe-inline` for scripts
- ✅ All security headers test passed against a live local server (see `tests/security/headers.sh` output)
- ✅ Minimal JS uses `addEventListener`, no inline event handlers – CSP-compatible

**Outstanding (full Standard 11):**
- **Pen test required before public beta** – cyber engineer to plan, external supplier to execute
- **Threat model refresh required** – the production form actions and the new address-override flow touch data flows that the iteration-3 threat model didn't cover
- **Dependency scanning** – wire into CI with the cyber engineer's policy
- **Cookie security** – when the back end is wired and sets cookies, the existing Playwright test will check Secure / HttpOnly / SameSite
- **DPIA** – with the Council's DPO before public beta

**Next action:** cyber-engineer agent refresh threat model and plan pen test. `/xstack:threat-model` for the refresh.

### Standard 13 – Monitor, manage, measure performance

**Rating:** Partly met with a plan.

**Evidence:**
- Load tests written: `tests/load/peak.js` matches the Oct–Dec peak profile (~70% of annual volume in three months, doubled for headroom) and `tests/load/soak.js` is an 8-hour drift test
- Custom metrics in k6: page-load trend, error rate, completed journeys
- Thresholds: P95 under 500ms, error rate under 1%
- HTML pages structured so the four GDS baseline metrics (digital take-up, completion rate, cost per transaction, user satisfaction) can be wired in once the back end is in place

**Outstanding:**
- Analytics not yet implemented – needs a privacy-preserving wiring (probably Plausible or a self-hosted equivalent) per cyber engineer's data-minimisation guidance
- k6 binary not installed in the generation environment – the tests are written but require a real CI run against a staging environment for evidence

**Next action:** developer + delivery-manager to wire metrics. Schedule the k6 peak run against staging before private beta closes.

---

## Test results from this run

### Constraint evidence

Generated by `xstack-check` at stage `stop` on 2026-11-19. Do not edit by hand – run the check again.

#### Trust, security and privacy

| Constraint | Result | Severity | Owner | Evidence |
|---|---|---|---|---|
| `SEC-001` No secrets in source | PASS | must | cyber-engineer | 40 file(s) or command(s) checked |
| `SEC-002` No inline event handlers | PASS | must | developer | 19 file(s) or command(s) checked |
| `SEC-003` No inline scripts | PASS | must | developer | 19 file(s) or command(s) checked |
| `SEC-004` Forms that send files or passwords use POST | PASS | must | developer | 19 file(s) or command(s) checked |
| `SEC-005` No secrets leaked in git history or working tree (gitleaks) | NOT RUN | must | cyber-engineer | runs at: ci |
| `SEC-006` No known high or critical vulnerabilities in dependencies | NOT RUN | must | cyber-engineer | runs at: ci |
| `OPEN-001` No prototype chrome in production | PASS | must | developer | 19 file(s) or command(s) checked |
| `SVC-SEC-001` The server sends the six security headers, with a CSP that forbids inline script | NOT RUN | must | cyber-engineer | runs at: ci |

#### Sustainable and reliable

| Constraint | Result | Severity | Owner | Evidence |
|---|---|---|---|---|
| `SEC-007` Dependencies are pinned by a lockfile | NOT RUN | must | developer | runs at: ci |

#### Inclusion

| Constraint | Result | Severity | Owner | Evidence |
|---|---|---|---|---|
| `A11Y-001` Every page declares its language, has a title and a main landmark | PASS | must | content-designer | 19 file(s) or command(s) checked |
| `A11Y-002` Every image has an alt attribute | PASS | must | content-designer | 19 file(s) or command(s) checked |
| `SVC-A11Y-001` Every page in every state passes axe at WCAG 2.1 AA | NOT RUN | must | content-designer | runs at: ci |

#### Works first time

| Constraint | Result | Severity | Owner | Evidence |
|---|---|---|---|---|
| `WFT-001` Every internal link and form action goes somewhere | PASS | must | developer | 19 file(s) or command(s) checked |
| `SVC-WFT-001` A doctor can renew end to end, including from abroad and through every error state | NOT RUN | must | developer | runs at: ci |

#### Right technology

| Constraint | Result | Severity | Owner | Evidence |
|---|---|---|---|---|
| `TECH-001` Styles are linked, not inlined | PASS | must | developer | 19 file(s) or command(s) checked |
| `BB-DS-001` Every page uses the GovBB design system and its skip link | PASS | must | content-designer | 19 file(s) or command(s) checked |

#### Plain language

| Constraint | Result | Severity | Owner | Evidence |
|---|---|---|---|---|
| `BB-STYLE-001` No em dashes in citizen-facing pages | PASS | must | content-designer | 19 file(s) or command(s) checked |

**Total:** 11 pass, 0 fail, 0 waived, 6 not run, 0 not applicable.

A theme can be rated **Met** only if every one of its constraints is PASS at the `ci` stage. FAIL, WAIVED and NOT RUN are at best **Partly met**.

The six constraints marked NOT RUN need a server, browsers or scanners. `npm run check:ci` runs them.

### Security headers – PASS (against live local server)

All 6 required headers present and within policy:

```
OK  Content-Security-Policy
OK  Strict-Transport-Security  (max-age=31536000; includeSubDomains)
OK  X-Content-Type-Options     (nosniff)
OK  X-Frame-Options            (DENY)
OK  Referrer-Policy            (strict-origin-when-cross-origin)
OK  Permissions-Policy         (geolocation=(), camera=(), microphone=())
```

### Test code – PASS

All TypeScript test files passed `tsc` syntax check (with import resolution skipped – that runs in CI where `npm install` has completed). All k6 JavaScript test files passed Node's `--check` parser.

### Requires CI environment

| Test category | Why this generation environment can't run it | What CI needs |
|---|---|---|
| Playwright E2E | Browser binaries (Chromium, Firefox, WebKit) not installed | `npx playwright install --with-deps` |
| Axe accessibility | Same – needs Playwright + axe-core npm package | `npm install` + `npx playwright install` |
| k6 load tests | k6 binary not installed | `apt-get install k6` or the official Docker image |
| OWASP ZAP DAST | ZAP not installed; needs network access to the staging service | The cyber engineer's pen-test workflow |

Each of these is a single CI step. The test code is ready; the runner script (`scripts/run-all.sh`) orchestrates everything once the binaries are present.

---

## Where the rest of beta readiness lives

Front-end readiness is a slice of beta readiness. The other slices, owned by other xstack agents and commands:

| Workstream | Owner | xstack tool |
|---|---|---|
| Backend architecture and ADRs | developer | direct invocation |
| Trident ID integration | developer + MIST briefing | direct invocation |
| Payment gateway integration | developer + MIST briefing | direct invocation |
| Council review backstage interface | **needs its own `/xstack:build` track** – brief from `feedback-round-2.md` round-2 transcript with Sandra Layne | `/xstack:build` |
| Threat model refresh | cyber engineer | `/xstack:threat-model` |
| Pen test plan and execution | cyber engineer + external supplier | direct invocation |
| DPIA | cyber engineer + Medical Council DPO | direct invocation |
| Incident runbook | cyber engineer + delivery manager | direct invocation |
| Operational readiness | delivery manager | direct invocation |
| Analytics wiring (4 GDS metrics) | developer + delivery manager | direct invocation |
| Standards self-assessment | delivery manager (orchestrating all agents) | `/xstack:assess` |
| Phase gate | delivery manager | `/xstack:assess` |

The Standards self-assessment (`/xstack:assess for the beta gate`) is the formal moment where this report's `Partly met with a plan` ratings get either evidence to become `Met`, or a documented reason to remain partly met.

---

## Recommendation

**Do not proceed until condition 1 is met:**

1. **Make every "must" constraint pass at the `ci` stage** (`npm run check:ci`), or have the service owner record a dated waiver. Required.
2. **Wire the test suite into CI** before private beta opens to citizens. Required.
3. **Run the full Playwright matrix against staging** (5 device profiles). Required for Standards 3 and 5.
4. **Run the k6 peak load test against staging** (twice expected Oct–Dec volume). Required for Standards 5 and 13.
5. **Refresh the threat model** to cover the production form actions and the address-override flow. Required for Standard 11.
6. **Pen test plan signed off** before public beta. Cyber engineer owns; external supplier executes.
7. **Council backstage interface** scoped as a parallel `/xstack:build` track. Not blocking for private beta if Sandra and one or two officers can review applications manually; blocking for public beta.

If conditions 1–5 are met, the team is ready for private beta on the front end. Conditions 6–7 must be met before public beta.

---

## What this skill explicitly did not do

For honesty, the things this report does *not* speak to:

- The backend code – not in scope; developer agent
- Backend security – pen test, dependency scans, secrets management
- The CI configuration – the team picks GitHub Actions, GitLab CI, or similar
- Deployment and hosting – part of operational readiness
- The Council's review interface – its own workstream
- Privacy notice content – content & interaction designer + cyber engineer
- The four GDS metrics actually being collected – requires the backend
- Incident response readiness – delivery manager + cyber engineer
