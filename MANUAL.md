# xstack usage manual

A guide for government digital teams, the departments they work with, and vendor teams who want to use xstack to build digital services.

If you're new to xstack, start here. If you've used xstack before, this is your reference.

---

## Contents

1. [What is xstack](#1-what-is-xstack)
2. [Why xstack exists](#2-why-xstack-exists)
3. [Before you start](#3-before-you-start)
4. [Install xstack and set your country profile](#4-install-xstack-and-set-your-country-profile)
5. [The team you have just hired](#5-the-team-you-have-just-hired)
6. [The seven-verb sprint](#6-the-seven-verb-sprint)
7. [The four phases](#7-the-four-phases)
8. [The commands at your fingertips](#8-the-commands-at-your-fingertips)
9. [Your first day with xstack](#9-your-first-day-with-xstack)
10. [Your first week with xstack](#10-your-first-week-with-xstack)
11. [The two workflows you'll use most](#11-the-two-workflows-youll-use-most)
12. [Common questions](#12-common-questions)
13. [Anti-patterns to avoid](#13-anti-patterns-to-avoid)
14. [Getting help](#14-getting-help)
15. [Where to read next](#15-where-to-read-next)
16. [Glossary](#16-glossary)

---

## 1. What is xstack

**xstack brings the key user-centred design roles into a government digital delivery team as AI team members (running on Claude).** It is a Claude Code plugin that gives the team five opinionated specialist agents – service designer, content & interaction designer, delivery manager, developer and cybersecurity engineer – plus a set of slash commands and shared skills. Everything is anchored to a service standard (your government's own, through a country profile, or the xstack baseline), the GOV.UK Design Principles, and the GDS Way.

It works for any government. It is especially useful for teams in regions that can't easily hire or keep these roles: where there is no service designer, content designer or security engineer on the team, the agents stand in for the missing discipline – openly, and alongside the people you do have.

It is a process, not a collection of tools. The plugin nudges the team toward the right thing at the right phase – speaking to citizens before designing anything, writing in plain language, reusing the design system, working in the open, iterating based on evidence.

**The plugin does not build the service for you.** The team still talks to citizens, makes design decisions, writes the code, and ships the work. What xstack does is keep the team on the rails – making sure no one accidentally ships a service that fails the service standard on the day a citizen first sees it.

The current version is **v0.1**. Expect changes. File issues. Improve it.

---

## 2. Why xstack exists

Government digital teams build services that touch citizens at moments that matter – when they're sick, when they've just had a baby, when they're starting a business, when they're renewing a licence they need to drive to work. Every interaction is a small test of whether the social contract still holds.

Building services that meet that bar – consistently, across many teams, across many years – is hard. The same mistakes keep happening across government departments around the world:

- Teams design before they research, and ship the wrong thing
- Civil-service language creeps into citizen-facing copy, and citizens who need the service most struggle to use it
- Each department rebuilds the same components, instead of reusing the shared platforms and design system the government already has
- Services launch well and decay slowly when nobody is funded to keep improving them
- Security is treated as a sign-off at the end, instead of designed in from the start
- Working in the open gets replaced by closed teams who lose the wider feedback loop

And many teams face a harder problem first: they can't staff the roles that prevent those mistakes. User research, service design, content design and security engineering are scarce skills, and in many regions they are hard to hire or keep in government.

xstack bakes the antidotes into the team's day-to-day workflow, and gives the team those missing disciplines as AI team members. Every agent reads the same standards. Every slash command anchors its output to the same principles. Every iteration is auditable – a future team member can trace why each decision was taken.

xstack started as "bimstack" at GovTech Barbados, and has since been generalised for any government.

**Read more:** [`ETHOS.md`](./ETHOS.md) for the eight beliefs underneath the plugin.

---

## 3. Before you start

You need three things:

1. **Claude Code or Cowork installed.** Either works. xstack runs in both.
2. **Git and a terminal.** Standard.
3. **A short brief.** Even a few sentences. xstack is most useful with a real problem to work on. If you don't have one yet, you can still install it and walk through the worked example.

Plus one thing that's not technical but matters more than the rest:

4. **An honest team.** xstack is opinionated. The agents will push back if you ask them to skip discovery, ship without private beta, or hide bad news. That's the point. If your culture punishes honesty, the plugin will be unpleasant to use.

Nothing else. No special accounts, no API keys, no infrastructure provisioning.

---

## 4. Install xstack and set your country profile

### From a local folder (for testing)

```bash
cd /path/to/xstack
git init && git add . && git commit -m "xstack v0.1"
```

Then in any Claude Code or Cowork session:

```
/plugin marketplace add /path/to/xstack
/plugin install xstack@xstack
```

### From GitHub (once you've pushed)

```
/plugin marketplace add publicdigital/XStack
/plugin install xstack@xstack
```

### Confirm it worked

In a new session:

- Type `/xstack:` and the autocomplete should reveal the commands, including `/xstack:profile`, `/xstack:build`, `/xstack:iterate`, `/xstack:productionise`, `/xstack:discover`, `/xstack:weeknote`, `/xstack:assess`, `/xstack:show`, `/xstack:plain-language`, `/xstack:threat-model`. (Claude Code namespaces plugin commands by plugin name, so the bare `/discover` form won't appear – type the `/xstack:` prefix first.)
- Run `/agents` to list the agents Claude Code can route to. You should see service-designer, content-designer, delivery-manager, developer, cyber-engineer alongside the agents you already had.
- Try a task that matches an agent's description, e.g. *"Plan a discovery for renewing a fishing licence."* Claude Code routes it to the service-designer automatically – you don't `@-mention` agents in Claude Code, you describe the task.

### Set your country profile

xstack itself is country-agnostic. Everything specific to one government – its service standard, design system, shared platforms, terms and data formats – lives in a **country profile**. See [`profiles/README.md`](./profiles/README.md).

- **Without a profile**, the agents use the **baseline**: the 14 service standard themes in [`references/service-standard-baseline.md`](./references/service-standard-baseline.md) and the generic conventions in [`references/house-style.md`](./references/house-style.md). Prototypes use the xstack neutral style. Every agent says once, at the top of its output, that it is using the baseline.
- **With a profile**, the agents cite *your* standard by *your* numbering, build prototypes in *your* design system, and use your government's names for departments, platforms and data formats.

To set one up, run:

```
/xstack:profile
```

It asks about your government, standard, design system and platforms, then writes `.xstack/profile.md` in your project. Commit `.xstack/` so the whole team shares it. You don't need every answer on day one – agents fall back to the baseline for anything the profile leaves out.

xstack bundles one complete profile, **Barbados** (`profiles/barbados/`). To use a bundled profile, add a line such as `xstack profile: barbados` to your project's `CLAUDE.md`, or run `/xstack:profile barbados`.

### Install the supporting plugins

xstack works well alongside these (they add broader design and service-design skill libraries). All are open and reusable:

- Anthropic `design`, `service-design`, `frontend-design` plugin marketplaces
- Any house-style skills your organisation has for its own visual identity – list them in the Related skills section of your profile so the agents know to use them

xstack still works without them but is more powerful with them installed. The load-bearing skills – the research cycle, journey maps, service blueprints, ecosystem maps, experience maps, and workshop plans – are native to xstack, so nothing dead-ends if the Anthropic plugins are absent.

---

## 5. The team you have just hired

When you install xstack, you've added five new specialists to your team. They don't replace the team you already have. They sit alongside it.

### The Service Designer (`@service-designer`)

The Service Designer is quietly insistent and sceptical of solutions that arrive before problems. They lead discovery, plan research, synthesise interviews, map journeys and ecosystems, write problem statements.

They carry a dedicated research toolkit: `research-planning` (decision-linked objectives before any discussion guide, behavioural questions over opinion questions), `transcript-analysis` (what participants did, not what they said, cross-referenced against prior rounds), `research-presenting` (readouts a delivery team will act on), and `research-coach` (the mentor and router across the whole cycle – ask it "how am I doing" and it will tell you specifically).

**Use them when:** starting a new service, planning user research, running or debriefing interviews, mapping a current-state journey, synthesising interview notes or transcripts, preparing a research readout, asking "what user need does this serve?"

**They own:** the **User needs**, **Whole problem**, **Works first time** and **Continuous improvement** themes.

### The Content & Interaction Designer (`@content-designer`)

The Content & Interaction Designer is gentle but uncompromising on plain language. They write and review copy, build prototypes in your government's design system, run accessibility audits, design forms and error states.

**Use them when:** writing or rewriting citizen-facing copy, designing a form, naming a button, wording an error message, running an accessibility check, building a clickable prototype.

**They own:** the **Inclusion**, **Plain language**, **Works first time** and **Findable** themes.

### The Delivery Manager (`@delivery-manager`)

The Delivery Manager is direct, calm, and unflustered. They are the connective tissue of the team – not the boss. They run sprints, write weeknotes, prepare show-and-tells, run standards self-assessments, manage phase transitions.

**Use them when:** planning a sprint, writing the Friday weeknote, preparing a show-and-tell, running an honest self-assessment against the service standard, deciding whether the team is ready for a phase gate.

**They own:** the **Multidisciplinary team**, **Sustainable and reliable**, **Working in the open** and **Measuring performance** themes.

### The Developer (`@developer`)

The Developer is direct, plain, and useful. They scaffold prototypes, build production code, integrate with the national identity platform and the shared government payment platform, write architecture decision records (ADRs), run technical-readiness reports.

**Use them when:** making a technology choice, building a prototype or production page, integrating with a shared government platform, deciding hosting and CI/CD, wiring up the four GDS baseline metrics.

**They own:** the **Works first time**, **Right technology**, **Open platforms and standards**, **Sustainable and reliable** and **Measuring performance** themes.

### The Cybersecurity Engineer (`@cyber-engineer`)

The Cybersecurity Engineer is calm, plain, and concrete. They produce threat models, write privacy notices, plan pen tests, refresh DPIAs, write incident runbooks.

**Use them when:** designing a feature that touches personal data, planning a pen test, writing or reviewing a privacy notice, responding to a security finding, briefing a team on data protection.

**They own:** the **Trust, security and privacy** theme, and support **Inclusion**, **Right technology**, **Sustainable and reliable** and **Working in the open**.

With a country profile, the agents cite your own standard's numbers for these themes.

**Read more:** [`AGENTS.md`](./AGENTS.md) for the full per-agent specification.

---

## 6. The seven-verb sprint

xstack's workflow mantra:

```
Listen → Map → Make → Test → Ship → Show → Iterate
```

Every sprint. Every phase. Every service.

- **Listen** – user research, stakeholder interviews, front-line shadowing
- **Map** – journeys, blueprints, ecosystem maps, problem statements
- **Make** – plain-language copy, prototypes, production code
- **Test** – usability, accessibility, security, performance
- **Ship** – discovery → alpha → beta → live, in small releases
- **Show** – weeknotes, show-and-tells, working in the open
- **Iterate** – continuously, while the citizen still needs the service

These are activities the team rotates through – not a process you march through in order. A team in alpha that's heavy on Make and light on Listen has misread the phase. A team in beta that hasn't started Test is heading for trouble.

**Read more:** [`WORKFLOW.md`](./WORKFLOW.md) for each verb in detail.

---

## 7. The four phases

xstack uses the GDS Way phases. Each phase has a clear purpose. The team produces different things in each.

| Phase | Purpose | Typical duration | What you produce |
|---|---|---|---|
| **Discovery** | Find out whether to build, and for whom | 6–12 weeks | A problem statement, a prioritised list of user needs, a recommendation to proceed / redesign / stop |
| **Alpha** | Prototype the riskiest assumptions, pick a path | 8–12 weeks | Multiple clickable prototypes tested with citizens, one chosen path into beta |
| **Beta** | Build the real service and put it in front of real citizens | 12–26 weeks for private beta; ongoing for public beta | Working production code, the four GDS metrics being reported, source in a public repository |
| **Live** | Keep meeting the user need as the world changes | Indefinite – until the service is retired | Continuous improvement, published performance data, a service that still works in three years |

**Each phase ends with a gate** – the team self-assesses against the service standard – your profile's, or the xstack baseline. xstack's `/xstack:assess` command runs the self-assessment. A formal panel reassessment follows.

**The agents adjust by phase.** Ask the Developer to "build production code in alpha" and they'll push back – production code belongs in beta. Tell every agent what phase you're in; they'll adjust what they produce.

**Read more:** [`references/gds-way-phases.md`](./references/gds-way-phases.md) for what each phase does and doesn't include.

---

## 8. The commands at your fingertips

xstack adds these slash commands: one for setup, four for major workflows, five for daily work.

### Setup

| Command | What it does | When to run |
|---|---|---|
| `/xstack:profile [country]` | Sets up or updates the country profile, so agents use your government's standard, design system, platforms and terms | Once, when you start using xstack; again when something changes |

### Major workflows

| Command | What it does | When to run |
|---|---|---|
| `/xstack:discover [service]` | Scaffolds a discovery: problem statement, stakeholder map, research plan, interview guide, ecosystem map starter, discovery report template | A department's brief has landed and no research has been done yet |
| `/xstack:build [brief]` | Turns a brief into 2–3 clickable HTML prototypes in your profile's design system (or the xstack neutral style), with assumptions surfaced inline and a test plan attached | Discovery is done and the team wants testable artefacts in hours, not weeks |
| `/xstack:iterate [prototype]` | Takes user-testing feedback (structured notes or raw transcripts) and produces the next version with a changelog linking every change to the feedback that drove it | After every round of user testing |
| `/xstack:productionise [iteration]` | Splits a validated prototype iteration into per-page HTML, removes the alpha-only chrome, generates a comprehensive test suite (E2E, accessibility, security, load), produces a production-readiness report | When a prototype has earned its place through several iteration rounds and the team is ready for beta |

### Daily work

| Command | What it does | When to run |
|---|---|---|
| `/xstack:weeknote` | Drafts a weekly note in the GDS style – honest, plain, public, with a one-line headline | Every Friday |
| `/xstack:show` | Prepares a show-and-tell session: running order, deck brief, prep checklist | End of every sprint |
| `/xstack:assess` | Walks your profile's service standard (or the 14 baseline themes) with evidence, producing a self-assessment report | Before every phase gate; annually in live |
| `/xstack:plain-language [text]` | Reviews a piece of citizen-facing text against the xstack word-swap list, reading age, voice, and tone | Whenever you're writing or reviewing copy |
| `/xstack:threat-model [service]` | Produces (or refreshes) a STRIDE/LINDDUN threat model for a service | Alpha onwards; quarterly in live |

When you're not sure which command to run, ask `@delivery-manager` – they'll route you.

---

## 9. Your first day with xstack

About two hours, end to end.

### Hour 1 – Read

Read these three files. They are short and they will save you hours of confusion later.

1. **[README.md](./README.md)** (10 minutes) – the elevator pitch, the team, the install
2. **[ETHOS.md](./ETHOS.md)** (15 minutes) – the eight beliefs underneath every iron law
3. **[references/service-standard-baseline.md](./references/service-standard-baseline.md)** (25 minutes) – the 14 themes every agent reasons in. If your team has a country profile, read your own standard alongside it. You will refer back to these constantly.

### Hour 2 – Walk the worked example

Open the medical-licence renewal example. It is the worked example for the Barbados profile, so it cites the Barbados standards and uses the Barbados design system – the loop is the same whatever your profile. Click through it. Read how it was built.

1. **[examples/discovery-renewing-medical-licence/](./examples/discovery-renewing-medical-licence/)** – the discovery kit. Open the problem statement and the research plan.
2. **[examples/build-renew-medical-licence/](./examples/build-renew-medical-licence/)** – the three clickable prototypes. Open each `index.html` in a browser. Toggle the assumptions panel.
3. **[examples/build-renew-medical-licence/prototype-1-phone-first/](./examples/build-renew-medical-licence/prototype-1-phone-first/)** – the iteration history. Open iteration-1, iteration-2 (CHANGES.md), feedback-round-1.md, transcripts-round-2/, feedback-round-2.md, iteration-3/. Walk the loop.
4. **[examples/production-renew-medical-licence/](./examples/production-renew-medical-licence/)** – the production version. Open `public/index.html` and a few of the others. Read PRODUCTION-READINESS.md.

By the end of two hours you have seen: a discovery, three candidate alphas, three rounds of iteration (including the one driven by raw transcripts including a frontline-staff voice), and the production transition. That is one complete service journey from idea to beta-ready in front of you.

---

## 10. Your first week with xstack

Pick a real brief – something your team is genuinely working on. Run the loop.

| Day | Activity | Command |
|---|---|---|
| Monday | Run a discovery scaffold on your brief | `/xstack:discover [your service]` |
| Tuesday | Refine the stakeholder map with your delivery manager; book the first two interviews | `@delivery-manager` |
| Wednesday | Do the first user interview. Take notes. | – |
| Thursday | Synthesise the notes; ask the service designer for the first themes | `@service-designer synthesise…` |
| Friday | Write your first weeknote | `/xstack:weeknote` |

Don't expect the discovery to be complete by the end of the week. Expect to feel the *shape* of the loop and to have something concrete to discuss with your team and the department that owns the service.

If you finish a discovery in a week, you didn't do a discovery. You did a guess.

---

## 11. The two workflows you'll use most

### Workflow A – From brief to testable prototypes in a week

This is the xstack rapid-prototyping loop. Cycle time is days, not weeks.

```
Brief → /xstack:build → 3 testable HTML prototypes → user testing → /xstack:iterate → v2 → testing → /xstack:iterate → v3 → … → /xstack:productionise
```

**Step 1 – Build.** Type `/xstack:build` followed by your brief or a pointer to your discovery report. The skill produces 2–3 candidate prototypes with the assumptions surfaced inline and a test plan attached.

```
/xstack:build renewing a fishing licence
```

**Step 1½ – Pre-flight (optional but recommended).** Before recruiting real participants, run `/xstack:synthetic-research` against the prototypes. It generates synthetic personas grounded in population data and walks them through the form, surfacing comprehension failures, logic gaps, and edge-case exclusions. Fix the blockers it finds before real testing – it raises the floor, never replaces real research.

**Step 2 – Test.** Run the test plan with 5–6 citizens per prototype, mixed across cohorts. Capture quotes, hesitations, surprises. Don't pick a winner in round 1.

**Step 3 – Iterate.** Feed the feedback to `/xstack:iterate`. You can pass:
- A structured feedback file with "what worked / what didn't / observed but unresolved" sections, or
- A folder of raw transcripts – `/xstack:iterate` synthesises them into a structured file first, then produces the new iteration

```
/xstack:iterate prototype-1-phone-first using transcripts in transcripts-round-2/
```

The skill produces the next version *and* a `CHANGES.md` linking every change to a specific piece of feedback and the relevant standard or theme.

**Step 4 – Repeat.** Three or four rounds, getting tighter each time. By round 4, one prototype has usually earned its place and the team is ready to take it forward.

**Step 5 – Productionise.** When a prototype is chosen, `/xstack:productionise` splits it into per-page HTML, generates the test suite, and produces a standards-anchored production-readiness report.

```
/xstack:productionise prototype-1-phone-first/iteration-3
```

The worked example at `examples/build-renew-medical-licence/` shows this whole loop end to end (using the Barbados profile).

### Workflow B – The full delivery rhythm

Inside the rapid loop, the broader delivery cadence runs in parallel.

**Every Friday:**
```
/xstack:weeknote
```
The Delivery Manager drafts the weekly note – honest, plain, public, in your team's voice. Publish it. Even when the week was rough.

**Every second Friday:**
```
/xstack:show
```
The Delivery Manager prepares the show-and-tell – running order, deck brief, prep checklist. Run the session live. Invite the department that owns the service, other departments, civil society. Show real work to real people.

**Before every phase gate (alpha→beta, beta→live):**
```
/xstack:assess for the beta gate
```
The Delivery Manager orchestrates a self-assessment against your profile's service standard, or the 14 baseline themes if you have no profile. Every other agent contributes evidence for the standards they own. The output is a structured report with a clear recommendation: proceed, proceed with conditions, do not proceed.

**Whenever you're writing copy:**
```
/xstack:plain-language [paste text]
```
The Content & Interaction Designer reviews against the xstack word-swap list, reading age, voice, tone. Produces specific rewrites, not vague advice.

**Alpha onwards, then quarterly:**
```
/xstack:threat-model
```
The Cybersecurity Engineer produces or refreshes the threat model with STRIDE and LINDDUN frames, controls assigned to owners with dates.

**Read more:** [`PLAYBOOK.md`](./PLAYBOOK.md) for the full phase-by-phase day-to-day rhythm.

---

## 12. Common questions

**Does xstack replace my team?**

No. The agents are how your team thinks together, not what replaces them. A service designed by agents alone, never tested with citizens, is a brochure with state. The agents are tools the team reaches for inside a normal sprint rhythm.

**What if the department wants me to skip discovery?**

xstack will push back. The Service Designer's iron law is "no build without a user need." If the department insists, document the disagreement using the Delivery Manager's agent and escalate via the senior decision-maker named in the stakeholder map. Don't quietly skip the phase – name the cost.

**What if the department changes a requirement mid-flight?**

That's normal in government delivery. Use `/xstack:iterate` to apply the change, and the changelog will record what the change cost (which user need is now harder to meet, which standard the change pushes against). That way the team has a written audit trail when the next show-and-tell rolls around. Working in the open.

**Is xstack just for forms?**

No. It works for any digital service. The medical-licence example is form-heavy because that's the service we used to develop xstack. The same loop applies to content pages, service guides, decision-support tools, anything citizen-facing.

**Can I use xstack for internal-only tools?**

Yes, with caveats. Most of the rules still apply (Inclusion, Working in the open, Plain language). Some shift weight – internal tools have different user-research recruitment, different cohort definitions. Tell the agents the audience up front. The general shape of the loop holds.

**What if I disagree with one of the agents?**

Push back. The agents are opinionated, not infallible. Ask them to explain their reasoning. If the recommendation doesn't fit the department's reality, say so. The agents will adjust or escalate. The team makes the final call.

**Can I customise the agents for our team?**

Yes. Each agent is a Markdown file with YAML frontmatter in `agents/`. Edit it. Pull request the change back to the xstack repo if it's a generally useful improvement. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

**What if my brief is just a few sentences and we haven't done research yet?**

Run `/xstack:discover` first. Don't run `/xstack:build` against an unevidenced brief – you'll get prototypes that look good and meet a need nobody actually has.

**Do I need to install all the supporting plugins (`design`, `service-design`, house-style skills)?**

xstack works without them but is more powerful with them. If your organisation has house-style skills for its visual identity, install them and list them in your profile. The core service-design artefacts (journey maps, service blueprints, ecosystem maps, experience maps, workshop plans) and the research cycle now ship natively in xstack; the Anthropic design/service-design plugins extend those with deeper method libraries where installed.

**How do I share what we've built with another team?**

The `examples/` folder structure in this repo is the pattern: a folder per service, with the discovery kit, the build output, the iteration history, and the production folder. Share the folder. Other departments and governments can fork xstack and adapt it.

**Does xstack work for my government?**

Yes. xstack is written for any government. Out of the box, the agents work to the 14 baseline themes in `references/service-standard-baseline.md`. To make them work to your own standard, design system and platforms:
1. Run `/xstack:profile` – it writes `.xstack/profile.md` in your project
2. Point it at your service standard, and it maps each of your standards to the baseline themes
3. Tell it about your design system, shared platforms, terms and data formats – or leave them out for now and add them later
4. Commit `.xstack/` so the whole team shares it

You don't need to fork the plugin or edit the agents. If your profile could help other teams in the same government, contribute it to `profiles/<country>/` – see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

The rest of the plugin – the seven-verb sprint, the phase model, the agent personas, the iteration loop – is the same everywhere.

---

## 13. Anti-patterns to avoid

xstack is opinionated about these. The agents will push back. If you find yourself wanting to do any of them, pause and ask why.

**Skipping discovery because "we've done this before."** Every service is its own context. Even when you reuse parts of a previous discovery, you still need to listen to *these* citizens about *this* service. User needs.

**Building production code in alpha.** Alpha is for throwaway prototypes. If you can't bear to throw an alpha away, you haven't prototyped enough. Production code is the developer's job in beta.

**Going straight to public beta without a private beta.** The cost of public failure is always higher than the cost of being late. Private beta is non-negotiable.

**Locking in a single vendor without an exit plan.** Right technology; Sustainable and reliable. Document any vendor choice as an ADR with the exit plan explicit.

**Treating live as maintenance mode.** Continuous improvement fails the moment the team gets sent elsewhere and only on-call remains. Live is where most of a service's life is spent and most of the value is delivered.

**Hiding bad news in the weeknote.** Working in the open. The weeknote goes out even when the week was rough. Especially when the week was rough.

**Asking agents to skip their iron laws.** They will refuse. The iron laws are documented and visible. Override only with a written reason that names what you're trading off.

**Treating the standards self-assessment as a tick-box exercise.** The assessment is for the team first, the panel second. Honest `Partly met with a plan` ratings beat dishonest `Met` ratings every time.

**Calling civil-service register "professional tone."** Civil-service register is gatekeeping. Plain language is professional. The two are not the same.

**Using the design system as a guideline, not a system.** Don't fork colours, fonts, or chrome. If a pattern is missing, propose it back to the design-system team. Open platforms and standards.

---

## 14. Getting help

**Inside the plugin:**

- Ask `@delivery-manager` what's blocking. They'll route you.
- Read the file in `agents/` for whichever agent you're working with – the iron laws and the defaults are documented there.
- Read the reference file for the topic – `references/service-standard-baseline.md` (and your profile's service standard, if there is one), `profiles/README.md`, `references/govuk-design-principles.md`, `references/gds-way-phases.md`, `references/house-style.md`.

**Outside the plugin:**

- Your digital team's own channels for service-specific questions
- Your government's service standard and design system – your country profile links to both
- The GDS Service Manual: <https://www.gov.uk/service-manual>
- The GDS Way: <https://gds-way.digital.cabinet-office.gov.uk/>

**Filing issues:**

xstack is open and improving. File issues at the xstack repo when you find:
- An agent giving wrong or stale advice
- A reference file that has drifted from the source of truth
- A workflow that doesn't match how the team actually works
- A pattern that should be added

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for how.

---

## 15. Where to read next

Once you've completed your first day:

| If you want… | Read |
|---|---|
| The full philosophy | [`ETHOS.md`](./ETHOS.md) – the eight beliefs |
| The day-to-day rhythm | [`PLAYBOOK.md`](./PLAYBOOK.md) – week-by-week through each phase |
| The seven-verb sprint in detail | [`WORKFLOW.md`](./WORKFLOW.md) |
| The agent specs | [`AGENTS.md`](./AGENTS.md) plus the individual files in `agents/` |
| The baseline standard themes | [`references/service-standard-baseline.md`](./references/service-standard-baseline.md) |
| Country profiles, and how to write one | [`profiles/README.md`](./profiles/README.md) |
| GOV.UK principles in full | [`references/govuk-design-principles.md`](./references/govuk-design-principles.md) |
| Phase model | [`references/gds-way-phases.md`](./references/gds-way-phases.md) |
| Voice, service patterns and the neutral prototype style | [`references/house-style.md`](./references/house-style.md) |
| How to extend xstack | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| The medical-licence worked example (Barbados profile) | [`examples/`](./examples/) |

---

## 16. Glossary

**Alpha** – the second phase of service delivery. Throwaway prototypes tested with citizens to pick a path into beta.

**Assumption** – a claim a prototype makes that hasn't been validated yet. xstack tags every assumption with how it will be validated (`[VERIFY WITH USERS]`, `[VERIFY WITH DEPARTMENT]`, `[VERIFY WITH PLATFORM]`, `[VERIFY WITH POLICY]`, `[VERIFY WITH DATA]`, or `[KNOWN GAP]`). Older Barbados work uses `[VERIFY WITH MDA]` and `[VERIFY WITH MIST]` for the same thing.

**Baseline themes** – the 14 service standard themes in `references/service-standard-baseline.md` – the common ground of government service standards around the world. Every agent reasons in them. Without a country profile, agents assess and cite against them by name; with one, they cite your own standard.

**Beta** – the third phase. Real production code, used by real citizens for real transactions. Private beta first, then public.

**Brief** – a short description of what the department wants. The starting point for a discovery.

**Country profile** – the file (`.xstack/profile.md` in your project, or a bundled profile in `profiles/`) that holds everything specific to one government: its service standard, design system, shared platforms, terms and data formats. Set one up with `/xstack:profile`. See `profiles/README.md`. xstack bundles a Barbados profile.

**CPD** – Continuing Professional Development. The evidence a doctor (or other professional) supplies to keep their registration current.

**Department** – the government body that owns the service. In Barbados: an MDA (Ministry, Department or Agency).

**Design system** – the government's shared styles, components and patterns, named in the country profile. Prototypes and production pages use it rather than inventing their own. Without one, xstack uses its neutral style. In Barbados: the GOV.BB design system on alpha.gov.bb.

**Discovery** – the first phase. Research to find out whether to build and for whom.

**GDS** – Government Digital Service (UK). The team that pioneered most of the patterns xstack uses.

**Identity platform** – the government's national identity service, used to look up a person's details instead of asking them to type them again. The profile names it and says how to integrate. In Barbados: Trident ID.

**Iron law** – one of an agent's non-negotiable rules. Each agent has 4–5 of them. Iron laws can only be overridden with a written reason.

**Iteration** – a single round of changes to a prototype, based on feedback. xstack stores every iteration so the trail of decisions is auditable.

**Live** – the fourth phase. Continuous improvement of a service in public use.

**Plain language** – language a 9-year-old can follow. Reading age low; active voice; "you" for the citizen, "we" for the government; civil-service register avoided.

**Platform team** – whoever owns the government's shared platforms (identity, payments, hosting and infrastructure choices). The profile names them. In Barbados: MIST, with GovTech Barbados.

**Prototype** – a throwaway HTML representation of a service, used to test a design hypothesis with citizens. xstack defaults to producing 2–3 prototypes per `/xstack:build` run so the team has real signal, not a single guess.

**Service standard** – the standards a government's public-facing digital services are assessed against before launch. Your profile names yours and maps it onto the baseline themes. In Barbados: the 13 Barbados Digital Service Standards.

**Show-and-tell** – the regular session (typically fortnightly) where the team shows real work to real people. Not a status report. Open to the department that owns the service, other departments, civil society.

**Standards assessment** – the structured walk through the service standard (or the baseline themes) with evidence. Each standard is rated `Met`, `Partly met with a plan`, or `Not met`. xstack's `/xstack:assess` command produces it.

**Weeknote** – the short weekly note the team publishes about what they did, what they learned, and what's next. Working in the open. xstack's `/xstack:weeknote` command produces it.

**xstack** – this plugin. It started as "bimstack" at GovTech Barbados ("Bim" is a nickname for Barbados) and was renamed when it was generalised for any government. "Stack" means a curated set of opinionated choices, after Garry Tan's gstack.

---

## A final word

xstack is opinionated because government digital services are too important to be unopinionated about. The plugin won't write your service for you. It will keep your team honest, anchored to the standards, working in the open, and iterating on evidence.

When you ship something with xstack, write us a weeknote about it. We want to learn from your work too.

– The xstack team
