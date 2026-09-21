---
name: build-for-production
description: Take a validated prototype iteration and produce a production-ready front-end – per-page HTML files, the government design system's published stylesheet linked (not inlined), the assumptions panel and mock markers stripped, plus a comprehensive test suite (E2E regression, accessibility, security, load). Use when an alpha prototype has earned its place through testing and the team is moving toward beta. Triggers on "/xstack:productionise", "build for production", "harden this prototype", "alpha to beta", "production readiness", "regression tests", "load test the service".
---

# Build for production

This skill is the bridge between a validated alpha prototype and the front-end of a beta service. It takes the prototype the team has chosen to take forward (typically after three or four iteration rounds with users), and produces:

1. **Per-page HTML files** with proper URLs, real navigation (links and forms, not JS state), the design system's published stylesheet linked rather than inlined, the xstack assumptions panel and mock-data markers stripped.
2. **A comprehensive test suite** – E2E regression (Playwright), accessibility (axe-core), security (headers, CSP, basic OWASP checks), and load (k6).
3. **A runner** that orchestrates the suite locally and in CI.
4. **A production-readiness report** assessed against the **Works first time**, **Right technology**, **Trust, security and privacy** and **Measuring performance** themes (or the profile's own standards that map to them).

It supports the transition from alpha to beta. It explicitly does **not** make the service production-ready end to end – the backend, the integrations, the threat model, the runbook, and the operational readiness are owned by the developer, the cyber engineer, and the delivery manager via other parts of xstack. This skill is the front-end's half of beta-readiness.

For the larger workflow, read `PLAYBOOK.md` – the *alpha to beta transition* section.

**Before you start, find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, or a bundled profile named in the project's `CLAUDE.md` (e.g. `xstack profile: barbados`). Use its standard, design system, platforms, terms and data formats. If there is no profile, use `references/service-standard-baseline.md` and `references/house-style.md`, and say so once at the top of `PRODUCTION-READINESS.md`.

**This is production code, so nothing is assumed.** The technology stack and hosting, the design system and its published stylesheet or package, the identity platform and the payment platform all come from the profile (its design system, shared platforms, and law and policy sections). Where the profile is silent, or there is no profile, the developer asks the team – and the platform team if there is one – and records the answer in an ADR. Don't default to any particular government's platforms, and don't ship the xstack neutral style as if it were a design system: if the government has no design system yet, say so in the readiness report and agree with the team what the service will use.

---

## When to use

- The team has run 3+ rounds of testing on a prototype and one candidate has emerged
- The standards self-assessment for the alpha-to-beta gate is being prepared and needs evidence on the Works first time, Right technology, Trust, security and privacy and Measuring performance themes
- The team is ready to ship private beta and needs production-grade front-end code
- A vendor or external developer is about to pick the work up and the prototype is being handed over

**Do not use this skill** if:

- The prototype hasn't been tested with users yet (run `/xstack:iterate` rounds first)
- The team is still comparing prototypes (this commits one prototype as the chosen path)
- The backend isn't yet decided (the test suite assumes a backend; if it's not designed yet, the load tests can't be meaningful)

---

## What this skill produces

For each run, a folder containing:

```
production-[service-slug]/
├── README.md                          ← how to run everything
├── PRODUCTION-READINESS.md            ← assessed against the four themes above
├── public/                            ← the deliverable HTML
│   ├── index.html                     ← redirects to /start
│   ├── start.html
│   ├── context.html
│   ├── [other-pages].html
│   └── assets/
│       └── [design-system].css        ← the shared stylesheet (linked, not inlined), or a link to the published package
├── tests/
│   ├── e2e/                           ← Playwright regression tests
│   │   ├── happy-path.spec.ts
│   │   ├── abroad-path.spec.ts
│   │   └── error-states.spec.ts
│   ├── accessibility/
│   │   └── a11y.spec.ts               ← axe-core across every page, every state
│   ├── security/
│   │   ├── headers.spec.ts            ← CSP, HSTS, X-Frame-Options, X-Content-Type-Options
│   │   └── headers.sh                 ← runnable bash check for CI
│   └── load/
│       ├── peak.js                    ← k6 peak-load test (matches the service's peak volumes)
│       └── soak.js                    ← k6 8-hour soak test
├── scripts/
│   ├── serve.sh                       ← local server for testing
│   ├── run-all.sh                     ← orchestrator
│   └── audit.sh                       ← static checks (HTML validity, link integrity, design-system class usage)
├── playwright.config.ts
└── package.json
```

---

## The HTML transformation

The single-file prototype becomes a multi-file site. Specifically:

| Before (prototype) | After (production) |
|---|---|
| `<section id="page-start" class="page page--active">...</section>` (one of many in one file) | `start.html` – its own file with full `<!DOCTYPE html>` boilerplate |
| `<button onclick="goTo('page-id-lookup')">Start now</button>` | `<a href="/id-lookup" class="[design-system button class]">Start now</a>` – a real link |
| `<button onclick="this.parentElement.querySelector(...).select()">Yes that's me</button>` | `<form method="POST" action="/api/confirm-details">` with proper inputs |
| Inline `<style>` block ~1000 lines | `<link rel="stylesheet" href="[the design system's published stylesheet]">` |
| `<aside id="assumptions" class="xstack-assumptions">…` | **Removed.** Production users never see this. |
| `<span class="fake-data">Dr. Sarah K. Williams</span>` | `<span data-source="identity-platform">{{ user.name }}</span>` (or the equivalent for whichever templating layer is chosen) |
| JS-driven navigation | Server-side navigation; JS only as progressive enhancement |
| `<div class="xstack-banner">` | **Removed.** Production users never see this. |

The production HTML is **progressive enhancement**: every flow works without JavaScript. JS adds polish (animations, immediate validation feedback) but never gates the journey.

---

## The test suite – what it covers

### Regression (Playwright)

Three default specs, customised per service:

- `happy-path.spec.ts` – the most common citizen journey, end to end
- `abroad-path.spec.ts` – the most-different alternative path (if the service has one; otherwise an edge case)
- `error-states.spec.ts` – validation failures, network failures, session timeout, expired payment

Each test:
- Starts at the entry URL
- Walks the journey using accessible selectors (role, label, text – not classes or IDs)
- Asserts on what the citizen sees, not on implementation
- Includes an accessibility snapshot at each step

### Accessibility (axe-core)

A single suite that visits every page in every state (happy, error, completed) and runs axe with WCAG 2.1 AA rules (or the level the profile says your law requires). **Inclusion** floor. Anything below AA fails the build.

### Security

Two parts:

- A Playwright test for security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- A bash script for headless checks that runs in CI without a browser

These cover the front-end's contribution. **The full security testing for beta** requires the cyber engineer's pen test, dependency scans, SAST/DAST, and the threat model refresh – all separate workflows. This skill produces the front-end-specific tests only.

### Load (k6)

Two profiles:

- `peak.js` – ramps to twice the expected peak. Take the peak from the service's own data – for example, a renewal service might see most of its annual volume in one quarter. `[VERIFY WITH DATA]` if you don't have it. The test runs against a staging environment, not production.
- `soak.js` – sustained moderate load for 8 hours to surface memory leaks, connection-pool exhaustion, and gradual degradation.

Thresholds (defaults; tune per service):
- P95 response time under 500ms
- Error rate under 1%
- No more than 0.5% of requests timing out

If thresholds fail, the beta gate is not met for **Works first time**.

---

## What this skill does and doesn't do

### Does

- Splits the chosen prototype iteration into per-page HTML
- Strips alpha-only chrome (xstack banner, assumptions panel, mock markers)
- Links to the design system's published stylesheet (from the profile, or as the team confirms) instead of inlining
- Generates the four test categories above
- Writes a runnable orchestrator
- Produces a production-readiness report against the relevant standards

### Does not

- **Write the backend.** Identity-platform integration, payment-platform calls, the back-office review queue, session management – these are the developer's responsibility, designed in ADRs and built in beta.
- **Run the pen test.** That's the cyber engineer's job, with an external supplier, before public beta.
- **Configure CI/CD.** The team picks the platform (GitHub Actions, GitLab CI, etc.) and wires the runner script in.
- **Deploy the service.** Hosting and deployment is part of beta operational readiness.
- **Replace the threat model.** The security tests in this skill cover the front end. The threat model covers the whole system.

---

## How the skill runs

When invoked, the skill:

1. **Reads the chosen iteration** – e.g. `prototype-1-phone-first/iteration-3/index.html`
2. **Asks the user** which iteration is the chosen one if it isn't obvious (don't guess)
3. **Splits the HTML** into per-page files, mapping each `.page` section to its own `.html`
4. **Replaces the inline CSS** with the design system's published stylesheet or package named in the profile. If the profile doesn't name one, or the URL isn't confirmed, extract the inline CSS into `public/assets/[design-system].css` with a comment saying what it should be swapped for, and raise it with the platform team
5. **Rewires navigation** – `onclick` becomes `<a href>` or `<form action>`; JS state becomes server-side navigation
6. **Strips alpha-only markup** – assumptions panel out, xstack banner out, fake-data markers replaced with semantic placeholders
7. **Generates the test suite** based on the journey it just split
8. **Writes the scripts and config**
9. **Runs the static checks** – HTML validity, link integrity (do internal links resolve?), design-system class usage (are we using the design system's class prefix consistently?)
10. **Attempts to run the dynamic tests** if the environment has the tooling; otherwise reports what would happen
11. **Writes PRODUCTION-READINESS.md** with the assessment

The skill calls into the developer agent for technical decisions and the cyber engineer agent for the security tests.

---

## Standards anchors

Every output cites the standards it serves.

Every output cites the profile's own standard by its number and title (e.g. "Standard 4 (Use simple and relatable language)"); without a profile, it cites the baseline theme by name.

- **Works first time:** the regression suite and the peak-load test
- **Right technology:** the technology choices (Playwright, k6, axe-core) are mainstream, well-supported, easy to find skills for
- **Trust, security and privacy:** the security tests (headers, CSP); the threat model is handled by the cyber engineer in parallel
- **Measuring performance:** the load tests establish the baseline performance characteristics; the four GDS metrics are wired into the production HTML

The assessment in PRODUCTION-READINESS.md walks every standard in the profile (or all 14 baseline themes), but these four are where this skill carries the most weight.

---

## Defaults this skill is opinionated about

Document any departure as an ADR.

| Question | Default | Why |
|---|---|---|
| E2E tool | Playwright | Modern, fast, supports accessibility tests natively |
| Accessibility tool | axe-core via Playwright | Industry standard, WCAG 2.1 AA coverage |
| Load tool | k6 | Code-driven, modern, free; scales to national-service volumes easily |
| Security tool (front-end) | Bespoke header tests + OWASP ZAP config | Headers are the front-end's job; ZAP for DAST in CI |
| Test naming | Behaviour-led (`doctor renews their licence end-to-end`) | Reads like documentation; Plain language in tests too |
| Selectors | Role + accessible name | Tests fail when accessibility breaks – two birds |
| HTML approach | Server-rendered or static; JS as progressive enhancement | Inclusion (everyone can use it – including no-JS contexts) |
| CSS approach | Linked stylesheet, not inlined | Right technology (sustainable; shared with other services) |
| Form method | POST to a real endpoint | Trust, security and privacy (state-changing requests are POST, never GET) |
| Error pattern | Error summary at top + inline error, with `aria-invalid` and `aria-describedby` | The profile's design system (or `references/house-style.md`); Inclusion + Works first time |

---

## When the team should override

These are the cases where the team should *not* use this skill's defaults:

- **The department or platform team has an existing test-tooling investment** that's well-supported locally. Use that.
- **The service is so simple a full Playwright suite is overkill.** A shorter checklist may be more honest.
- **The service needs server-rendered templating** (e.g. Express + EJS, Flask + Jinja). The skill produces static HTML; the team will adapt it.
- **The load profile is genuinely different.** A renewal service peaks around its renewal deadline; a birth-registration service has different curves. The k6 thresholds need tuning.

---

## What a successful run looks like

By the end of the skill's run, the team should have:

- A `public/` folder they can serve with a one-line static server, and the journey works end-to-end without JavaScript
- A `tests/` folder that runs locally with `npm test`
- A `PRODUCTION-READINESS.md` with each standard (or theme) marked Met / Partly met / Not met, with evidence
- A clear next-step list: what the cyber engineer needs to do, what the developer needs to wire up to the backend, what the delivery manager needs to set up for operational readiness

If the report has `Not met` for any of the four themes above, the team is not ready for the beta gate. **Trust, security and privacy** is the most common reason – the front-end can pass and the backend can still fail. That's a `/xstack:threat-model` and pen-test conversation, not a `/xstack:productionise` retry.
