# The xstack playbook

How a team uses xstack to take a service from "the Ministry wants something" to a running live service. Worked through using the medical-licence-renewal example from `examples/discovery-renewing-medical-licence/` – the worked example for the **Barbados profile**. The service, the Medical Council and the doctors are from that example; the steps are the same for any government and any profile. Swap in your own service, department and platforms.

> The plugin is opinionated, not magical. It nudges the team toward the right thing at the right phase, but the team still has to talk to citizens, write the code, and ship the work. If you're looking for a generator that turns a brief into a service, this isn't it. If you're looking for a way to make sure the team builds something that actually meets a need, passes the service standard, and is maintainable five years from now – read on.

---

## The shape

```
Idea  →  Discovery  →  Alpha  →  Private beta  →  Public beta  →  Live  →  Iterate forever  →  Retire
 (1d)     (6–12 wk)   (8–12 wk)   (8–16 wk)        (12–26 wk)    (∞)                          (when no longer needed)
                          │              │              │           │
                       Gate 1         Gate 2         Gate 3      Gate 4 (annual)
                       /xstack:assess        /xstack:assess        /xstack:assess     /xstack:assess
```

Realistic timelines for a service the size of a medical-licence renewal: **discovery 8 weeks, alpha 10 weeks, private beta 12 weeks, public beta open-ended, first live release around month 9 from kickoff**. Anyone telling you a citizen service can go from brief to live in six weeks is selling you a brochure.

---

## Setup (day one)

Install the plugin in Claude Code:

```
/plugin marketplace add /path/to/xstack
/plugin install xstack
```

Confirm the five agents and the slash commands are loaded:

```
/agents
/help
```

Set the country profile, so the agents work to your government's service standard, design system, platforms and terms:

```
/xstack:profile
```

That writes `.xstack/profile.md` in the project. To use a bundled profile instead, name it – for example `/xstack:profile barbados`. With no profile, the agents use the 14 baseline themes and the xstack neutral style, and say so. See `profiles/README.md`.

Make a working folder for the service. By convention:

```
services/renew-medical-licence/
├── discovery/          ← outputs of the discovery phase
├── alpha/              ← prototypes and design
├── beta/               ← production source (or a link to its repo)
├── weeknotes/          ← every week
├── show-and-tells/     ← every fortnight
├── assessments/        ← phase-gate self-assessments
└── decisions/          ← ADRs
```

Brief the team in 30 minutes:

- The five agents and what each owns (`AGENTS.md`)
- The seven-verb sprint (`WORKFLOW.md`)
- The service standard – your profile's, or the 14 baseline themes (`references/service-standard-baseline.md`)
- The country profile, if you have one (`.xstack/profile.md`, or the bundled profile named in `CLAUDE.md`)
- The phase model (`references/gds-way-phases.md`)
- The house style (`references/house-style.md`)
- The ethos (`ETHOS.md`)

You're now ready to start.

---

## The rapid prototyping loop

xstack has a fast inner loop that runs *inside* the multi-week phases. Use it when the team has a brief and needs to feel testable prototypes within days, not weeks.

```
Brief  →  /xstack:build  →  3 prototypes (+ assumptions + test plan)  →  /xstack:synthetic (pre-flight)  →  fix blockers  →  user testing  →  /xstack:iterate  →  v2  →  testing  →  /xstack:iterate  →  v3  →  …
  └──────────────────────────── 5 working days ──────────────────────────────────────────────────────────────┘                  └─── 3 working days ───┘
```

By round 3 (≈ 4 weeks of elapsed time), the team should have one prototype with most of its assumptions resolved and a clear case for taking it into beta. If you don't, the brief was probably too thin – go back to discovery, not into another round.

### Each loop has four parts

**1. /xstack:build.** Takes a brief and produces 2–3 candidate HTML prototypes, each in your profile's design system (or the xstack neutral style if there isn't one), each surfacing its assumptions in a toggleable panel. Worked example (Barbados profile): `examples/build-renew-medical-licence/` – three genuinely different design hypotheses for renewing a doctor's licence.

The skill (`brief-to-prototypes`) deliberately produces more than one prototype. A single prototype is a guess made visible. Three is real signal.

**1½. Pre-flight (optional but recommended).** Run `/xstack:synthetic` against the prototypes before recruiting real participants. Synthetic personas stress-test the form for comprehension failures, logic gaps, and edge-case exclusions – the failures real users shouldn't have to discover. Fix the blockers first; then recruit. This step raises the floor before real research, never replaces it.

**2. Test.** The build comes with a `test-plan.md`. 5–6 doctors per prototype, mixed cohorts, comparative. Capture quotes, hesitations, surprises. Don't pick a winner in round 1.

**3. /xstack:iterate.** Hand the feedback to `/xstack:iterate [prototype]`. The skill (`prototype-iteration`) produces the next version *and* a `CHANGES.md` linking every change to a specific piece of feedback and to the relevant standard or theme. Each iteration is stored as `iteration-N/` next to the original so the team can compare and the next team can see how the thinking evolved.

**4. Repeat.** Three to four rounds, getting tighter each time. Resolved assumptions move out of the panel; new ones move in.

### What you do not do in the rapid loop

- **Don't skip the brief.** /xstack:build assumes the brief is evidence-led. Use `/xstack:discover` first if it isn't.
- **Don't merge prototypes mid-cycle.** Each prototype iterates on its own. Merging is the alpha-gate decision (`/xstack:assess`).
- **Don't promote a prototype to production without a phase gate.** /xstack:build produces throwaway HTML. Beta needs production code on the stack your platform team approves, threat-modelled and accessibility-audited.
- **Don't run iterations without structured feedback.** "Make it nicer" is not feedback. The skill refuses.

### Worked example in this repo

[`examples/build-renew-medical-licence/`](./examples/build-renew-medical-licence/) is a complete `/xstack:build` output for the medical-licence brief. Three clickable HTML prototypes, an assumptions register (42 items across all three), a test plan for 18 doctors across 6 cohorts. Open any of the `index.html` files in a browser to feel the loop.

This is xstack's answer to "how do I take a brief and produce something I can actually test?" – not in 10 weeks, in 10 hours.

### Closing the loop with transcripts

`/xstack:iterate` accepts two kinds of input – pre-structured feedback files or **raw research transcripts**. When fed transcripts, the skill synthesises them first (saving the result as `feedback-round-K.md` next to the prototype) and the team reviews the synthesis before the new iteration is produced. The worked example at `examples/build-renew-medical-licence/prototype-1-phone-first/` shows two rounds: round 1 with structured feedback, round 2 with 5 raw transcripts including a Medical Council renewals officer whose insights reshaped the entire mental model of "a doctor renews".

---

## Alpha to beta – /xstack:productionise

When one prototype has earned its place through three or four iteration rounds, the team is ready to take it production. That's what `/xstack:productionise` does.

```
Validated iteration → /xstack:productionise → per-page HTML + test suite + PRODUCTION-READINESS.md
                       (a few hours)
```

The skill produces:

- **Per-page HTML files** with proper URLs, real navigation (links and forms, not JS state), the design system's published stylesheet linked rather than inlined
- **The xstack chrome stripped** – no assumptions panel, no fake-data markers
- **A comprehensive test suite** – Playwright E2E regression (3 specs), axe-core accessibility, security headers + CSP, k6 load tests (peak + 8-hour soak)
- **A runner** (`scripts/run-all.sh`) orchestrating everything locally and in CI
- **A production-readiness report** assessed against the **Works first time**, **Right technology**, **Trust, security and privacy** and **Measuring performance** themes (cited by your profile's own standard numbers, if you have one)

The Barbados-profile worked example at [`examples/production-renew-medical-licence/`](./examples/production-renew-medical-licence/) takes prototype-1 iteration-3 through this skill: 9 separate HTML files, the inlined CSS extracted to its own stylesheet in `public/assets/`, 5 test files across the 4 categories, configuration for Playwright running across 5 device profiles (desktop Chromium / Firefox / WebKit + mobile Chrome + mobile Safari), k6 load profiles matching the Oct–Dec peak Sandra Layne described in the round-2 transcripts.

### What /xstack:productionise does not do

For honesty:

- **Not the backend.** The identity platform, the payment platform, the Medical Council register, session management – the developer's job, designed in ADRs.
- **Not the pen test.** The cyber engineer plans it with an external supplier before public beta.
- **Not the CI config.** The team picks GitHub Actions / GitLab CI / similar. `scripts/run-all.sh` is the entry point.
- **Not the deployment.** Hosting and operational readiness is the delivery manager's territory.
- **Not the Council's review interface.** That's its own `/xstack:build` track, briefed from the round-2 transcript with Sandra Layne.

### When to run /xstack:productionise

- After at least 3 iteration rounds with users
- When the standards self-assessment for the alpha gate is `Met` or `Partly met with a plan` on every standard
- When the team has chosen one prototype as the path forward
- When a vendor or external developer is about to pick up the work

**Don't run it** if the prototype hasn't been tested with users, the team is still comparing prototypes, or the backend isn't yet decided.

---

## The day-to-day rhythm

xstack assumes a two-week sprint and one daily stand-up. Inside that, the rhythm is:

| Day | Default activity |
|---|---|
| Monday | Sprint plan or sprint review; team picks up the highest-priority cards |
| Tuesday | Research / build / test work; user sessions tend to land here |
| Wednesday | Research / build / test work |
| Thursday | Research / build / test work; design crit before lunch |
| Friday | Standards check-in (15 min), `/xstack:weeknote`, end-of-fortnight `/xstack:show` |

Every Friday: `/xstack:weeknote`. Every second Friday: `/xstack:show`. Every phase gate: `/xstack:assess`. Every quarter: a deeper retrospective.

The agents are tools the team reaches for inside this rhythm – not a process the team marches through.

---

## Phase 1: Discovery (weeks 1–8)

**Goal:** find out whether to build, and if so, what for whom.

**Team:** service designer, content & interaction designer, delivery manager, subject-matter expert from the department that owns the service. **No engineers in production code mode yet** (developer joins briefly for the technical landscape audit).

**Output:** a discovery report with a clear recommendation – proceed to alpha, redesign the problem, or stop.

### Week 1

The first thing you type:

```
/xstack:discover renewing a medical licence
```

That invokes the **service-designer** agent and the **discovery-kit** skill, and produces the six artefacts you already have in `examples/discovery-renewing-medical-licence/`. The agent will ask you a couple of clarifying questions (owning department, timeline, existing context) – answer briefly or tell it to use flagged assumptions.

Then, with the delivery manager agent:

```
@delivery-manager refine this stakeholder map for the Medical Council.
Here are the contacts I have: [list]. What's missing, and what's the engagement
plan for the next two weeks?
```

Book the first conversations. Specifically:

- The Registrar of the Medical Council
- A shadowing slot at the renewals desk
- A briefing meeting with the doctors' professional association
- A briefing call with the platform team about identity-platform feasibility for doctors

End of week 1: first `/xstack:weeknote`. Even if all you did was scaffold and book meetings, publish it.

### Weeks 2–4

Run the research. Before the first session, use the `research-planning` skill to pin down the objectives and build the discussion guide – it will push back on vague objectives and opinion-shaped questions, add the digital literacy warm-up block, and attach a note on the false close for the room. For each interview round:

```
@service-designer I've just finished an interview with a private-practice GP.
Notes attached. Pull out the 5 most surprising things and
suggest the next two probes for the next interview.
```

After each interview, file the anonymised notes (with the objectives copied into the front matter, word for word). The `transcript-analysis` skill reads each transcript for behaviour rather than opinion and cross-references prior rounds; `research-presenting` shapes the findings into a readout the team will act on. The agent helps the team synthesise but doesn't replace the researcher's judgement – if a researcher is unsure where they are in the cycle or wants feedback on their craft, `research-coach` is the front door.

After every fortnight:

```
/xstack:show end of sprint 2 for the medical-licence discovery. We've talked to
8 doctors and shadowed the Council for a half-day. Here's what surprised
us: [bullets]. Here's the prototype we want to show: [link or n/a].
```

That produces the running order and the deck brief, then hands off to any presentation skill listed in your profile's Related skills for the .pptx.

Every Friday: `/xstack:weeknote`.

### Weeks 5–7

Synthesise. Theme the interviews. Draft user needs. Map the current state.

```
@service-designer here are the synthesised themes from 14 interviews.
Use the discovery-kit template to draft the first cut of the prioritised
user needs (5–10), with evidence citations for each.
```

```
@service-designer draft the current-state journey for the renewal,
broken out by doctor category. Flag where the journey differs between
categories.
```

Bring the content & interaction designer in:

```
@content-designer audit the current Medical Council renewal copy
(attached or linked) using /xstack:plain-language. Tell me which words and
patterns to swap and which already work.
```

### Week 8: the discovery report and the first gate

Fill in the `05-discovery-report-template.md` from the kit. Then:

```
/xstack:assess for the alpha gate. Service: renew medical licence.
Phase being assessed for: alpha. Evidence lives in
services/renew-medical-licence/discovery/.
```

That walks every standard in your profile (or the 14 baseline themes), asks each agent to pitch in on the standards they own, and produces a structured report with a recommendation. **A typical discovery should not have every standard marked `Met` for alpha** – several will be `Partly met with a plan` because that's what an honest alpha gate looks like.

Hold a show-and-tell of the discovery report. Invite the department, the platform team, the professional association, and any other departments involved. Working in the open.

Decision: proceed, redesign, or stop. If proceed: write the alpha plan.

---

## Phase 2: Alpha (weeks 9–18)

**Goal:** prototype the riskiest assumptions, pick one path into beta.

**Team:** add the developer (prototype-mode, not production), bring in the cyber engineer for threat-horizon scanning. The same core stays.

**Output:** designs that have been tested and iterated; a recommendation for which approach to take into beta; a beta plan with risks.

### Week 9: kickoff

```
@delivery-manager plan a 10-week alpha for the medical-licence renewal,
with three candidate alphas based on the discovery's user needs. Bring
the cyber-engineer in for threat horizon scanning by week 2.
```

Multiple alphas, not one. For a renewal service, candidates might be:

1. A phone-first end-to-end renewal with an identity-platform lookup and CPD upload
2. A hospital-HR-mediated bulk-renewal model (one renewal per hospital, signed off by the doctor)
3. A hybrid: phone-first by default, with assisted-digital channel for doctors without smartphones

### Weeks 10–14: prototype each candidate

For each candidate, in roughly two weeks:

```
@content-designer scaffold a clickable prototype of Candidate 1 in
our design system (from the profile). Follow one-thing-per-page. Start
with the Start page, the identity lookup page, three question pages,
Check Your Answers, and Confirmation.
```

The content designer drafts copy and assembles the prototype using the design system's published components (and any house-style skills listed in the profile). The developer agent provides the technical scaffolding:

```
@developer scaffold the alpha as an HTML prototype using our design
system. No production code yet. Mock the identity platform, register
and CPD endpoints. Hardcoded data is fine.
```

Test each prototype with real doctors. After every round:

```
@service-designer synthesise the 5 doctor sessions on Candidate 2.
What's the strongest signal? What did we get wrong? What should we
change before testing Candidate 3?
```

Threat horizon, in parallel:

```
/xstack:threat-model for the medical-licence renewal. Phase: alpha.
Personal data inventory: [doctor name, national ID number, contact, CPD
evidence, fee payment record, registration history]. Shared platforms
in scope: identity platform, payment platform, Medical Council register.
```

The cyber engineer produces a first STRIDE-based threat model with controls assigned and a roadmap for the beta-grade controls.

### Weeks 15–17: pick a path, plan the beta

```
@service-designer compare the three candidates against the prioritised
user needs from discovery. Which one best meets needs 1–5? Where are
the trade-offs? Recommend one path into beta and name what we'd lose.
```

Then:

```
@delivery-manager draft the beta plan. Team, budget, timeline, risks,
phase-gate criteria. Include both private beta and public beta.
```

```
@developer draft the alpha→beta technical readiness report. Stack
choice, integrations, hosting, CI/CD, observability, the four GDS
baseline metrics. Document each decision as an ADR in
services/renew-medical-licence/decisions/.
```

### Week 18: the alpha gate

```
/xstack:assess for the beta gate. Service: renew medical licence.
Phase being assessed for: beta. Evidence lives in
services/renew-medical-licence/alpha/.
```

For a beta gate, the bar is higher than for alpha. The standards covering **Works first time**, **Right technology** and **Trust, security and privacy** must be at least `Partly met with a plan` with clear evidence.

Show-and-tell the alpha findings publicly. Working in the open.

Decision: proceed to beta, run another alpha round, or stop.

---

## Phase 3: Beta (weeks 19–44)

**Goal:** build the real service and put real citizens on it. Private beta first, public beta when it's ready.

**Team:** full multidisciplinary team. Developers, designers, researchers, ops, cyber, delivery, front-line staff from the department.

**Output:** working software handling real transactions; source in a public repo; the four metrics being reported.

### Private beta (weeks 19–30)

Build in production. From this point on, the developer agent is producing real code, in a real repository, on the stack your platform team approves.

```
@developer build out the production version of the chosen alpha. Public
GitHub repo from day one. Use our design system's published package,
the national identity platform and the shared government payment
platform, as named in the profile. Wire the four GDS baseline
metrics from day one. CI/CD into a staging environment by end of week 19.
```

Production copy, by the content designer:

```
@content-designer take the alpha copy to production. Every state – happy
path, every error, the confirmation, the assisted-digital fallback, the
suspension state, the lapsed state, the renewal-from-abroad state. Run
/xstack:plain-language across everything.
```

Threat model refresh:

```
/xstack:threat-model refresh for beta. Service: renew medical licence.
Phase: beta. New since alpha: real identity-platform integration, real
payment integration, real register write-back. Plan a pen test
before private beta closes.
```

Recruit the private-beta cohort. The service designer leads, the delivery manager coordinates with the department:

```
@service-designer plan the private-beta cohort. Target 30–50 doctors
across all categories. Recruit via the Medical Council with explicit
consent. Set up a feedback channel inside the service. Brief them on
what's expected.
```

During private beta, the rhythm is: ship small releases, watch the metrics, run weekly research with a handful of the cohort. The cyber engineer is monitoring everything that touches personal data.

```
@delivery-manager after sprint 3 of private beta, summarise the four
GDS baseline metrics so far and the qualitative signal from the
research. Recommend whether we're ready to widen the cohort.
```

### The pen test and the beta gate

Before public beta, mandatory:

- Independent penetration test (cyber engineer plans, external supplier executes)
- Full WCAG 2.1 AA accessibility audit
- Performance test at twice the expected peak load
- Incident runbook tested via a tabletop exercise
- Operational handover to whoever runs the live service

```
@cyber-engineer plan the pen test scope and the remediation triage
process. Test must complete with all High and Critical findings
remediated before public beta.
```

```
@content-designer run a full accessibility audit using the design:
accessibility-review skill across every page and every state.
```

```
@developer run a load test at twice expected peak. Document the
results. If we're not within SLO, name the bottleneck and the fix.
```

Then:

```
/xstack:assess for the live gate. Service: renew medical licence.
Phase being assessed for: live. Evidence lives in
services/renew-medical-licence/beta/.
```

This is the strict one. Every standard needs evidence. A `Met` for **Trust, security and privacy** needs the pen-test report and the controls list. A `Met` for **Measuring performance** needs four-metric dashboards already in use, not just wired up. A `Met` for **Sustainable and reliable** needs a named live team and a six-month rolling budget. (With a profile, the assessment cites your own standards for these themes.)

### Public beta (weeks 31–44)

Open the service. Communicate. Keep iterating. Watch the metrics.

By this point the delivery manager is the busiest agent in the stack – wrangling the comms, the cadence, the metrics, the standards reassessment.

Every Friday: `/xstack:weeknote`. Every second Friday: `/xstack:show`. Every six weeks: a `/xstack:assess` lite – the same template but a temperature check, not a gate.

---

## Phase 4: Live (week 45 onward, indefinitely)

**Goal:** keep meeting the user need as the world changes. Iterate, don't stagnate.

**Team:** smaller than beta. Roughly: 1 service designer, 1 content & interaction designer, 1–2 developers, 1 delivery manager, 1 cyber engineer at part-time, front-line staff from the department embedded. Senior decision-makers still reachable.

**Output:** a service that still works in three years. Open performance data. A successor plan when the need changes.

The day-to-day rhythm doesn't go away. Live is a long, slow beta.

```
@service-designer plan continuous research – two doctor sessions per
fortnight, themed quarterly. Include the under-represented voices we
struggled to reach in discovery.
```

```
@content-designer triage the support-team's most common questions
into copy and content fixes. Ship at least three content improvements
every fortnight.
```

```
@developer maintain the service. Weekly dependency-scan triage,
patch cadence by severity, refactor where the data shows pain. No
big-bang rebuilds.
```

```
@cyber-engineer quarterly threat model refresh, annual pen test,
incident-response tabletop twice a year.
```

```
@delivery-manager publish the four GDS baseline metrics monthly.
Annual /xstack:assess against the service standard. Annual conversation
with the department about whether the service still fits the need.
```

### Retirement

When the underlying need is gone or another service has absorbed it:

```
@delivery-manager plan the retirement of the medical-licence renewal
service. What's replacing it? How do we communicate? What's the data-
retention plan? Trust, security and privacy.
```

Standards retirement is rare but possible. It's still a deliberate decision, not a slow fade.

---

## What you do not do

Things xstack actively pushes against, even when senior people ask.

- **Skip discovery.** Even if "we've done this before". User needs starts with research, not with the team's prior beliefs.
- **Build production code in alpha.** Throwaway is the point. If you can't bear to throw it away, you haven't prototyped enough.
- **Go straight to public beta.** Private beta first. Always. The cost of public failure is worse than the cost of being late.
- **Lock in a single vendor.** Right technology; Sustainable and reliable. Document any vendor choice as an ADR with the exit plan baked in.
- **Treat live as maintenance mode.** Continuous improvement fails the moment the team gets sent elsewhere and only on-call remains.
- **Hide the work.** Working in the open means the weeknotes go out even when the week was rough. Especially when the week was rough.

---

## Quick reference card

| You want to… | You type… | It produces… |
|---|---|---|
| Set up your country profile | `/xstack:profile [country]` | `.xstack/profile.md`, or a pointer to a bundled profile |
| Start a discovery | `/xstack:discover [service]` | The six-artefact discovery kit |
| Turn a brief into testable prototypes | `/xstack:build [brief]` | 2–3 clickable HTML prototypes + assumptions + test plan |
| Roll feedback into the next version | `/xstack:iterate [prototype]` | Next version + CHANGES.md changelog |
| Take an iteration to production-ready | `/xstack:productionise [iteration]` | Per-page HTML + 4-category test suite + readiness report |
| Plan a research session | `@service-designer plan…` (uses `research-planning`) | Decision-linked objectives + a behavioural discussion guide |
| Get unstuck anywhere in the research cycle | "research coach" / "how am I doing" (uses `research-coach`) | Coaching, handoff checks, direct feedback |
| Analyse transcripts | `@service-designer analyse…` (uses `transcript-analysis`) | Themes with evidence, confirmed/contradicted/new against prior rounds |
| Turn findings into a readout | "research readout" (uses `research-presenting`) | 2–4 themes, owned recommendations, honest unknowns |
| Review copy | `/xstack:plain-language [text]` | A marked-up rewrite with citations |
| Build a prototype | `@content-designer scaffold…` or `@developer scaffold…` | An HTML prototype in your design system (or the xstack neutral style) |
| Make a tech choice | `@developer recommend a stack for…` | An ADR draft with trade-offs |
| Threat-model | `/xstack:threat-model [service]` | A STRIDE/LINDDUN model with controls |
| Write a weeknote | `/xstack:weeknote` | A draft weeknote in the team's voice |
| Prepare a show-and-tell | `/xstack:show` | A running order and a deck brief |
| Assess against the service standard | `/xstack:assess` | A self-assessment against every standard in your profile (or the 14 baseline themes) with a recommendation |
| Decide whether to ship | `/xstack:assess` for the relevant phase gate | Same |

---

## Working with the agents in practice

Three things that make the agents more useful, learned the hard way.

1. **Tell them the phase.** "We're in alpha, week 6." Every agent's defaults change with the phase. If you don't tell them, they'll ask – which is fine, but slower.
2. **Give them the evidence.** "We did 14 interviews. Here are the themes. Here's the prototype." Agents that hallucinate context are agents that produce confident nonsense. User needs.
3. **Push back when they're wrong.** The agents are opinionated, not infallible. If a recommendation doesn't fit the department's reality, say so. Ask them to explain their reasoning, then make the call.

---

## What xstack is not

For full honesty:

- **Not a project management tool.** It doesn't track tickets, run stand-ups, or chase deliverables. Use whatever the team uses for that.
- **Not a substitute for the team.** The agents are how the team thinks together, not what replaces them. A service designed by agents and never tested with citizens is a brochure with state.
- **Not the only way.** Other teams will adapt the seven-verb sprint, swap agents, change the gates. Working in the open means we welcome that and learn from it.

---

## See also

- `README.md` – the elevator pitch and team roster
- `ETHOS.md` – the eight beliefs underneath the plugin
- `WORKFLOW.md` – the *Listen → Map → Make → Test → Ship → Show → Iterate* mantra
- `AGENTS.md` – the detailed agent roster
- `references/service-standard-baseline.md` – the 14 baseline themes
- `profiles/README.md` – country profiles, and how agents find yours
- `references/gds-way-phases.md` – the phase model with what each phase does and doesn't include
- `examples/discovery-renewing-medical-licence/` – a worked example of the discovery kit (Barbados profile)

If you ship something with xstack, write us a weeknote about it.
