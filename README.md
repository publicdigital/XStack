# xstack

> "Government should only do what only government can do." – GOV.UK Design Principle 2

xstack brings the key user-centred design roles into government digital delivery teams, as AI team members. Five opinionated specialists – Service Designer, Content & Interaction Designer, Delivery Manager, Developer, and Cybersecurity Engineer – anchored to your government's service standard, the [GOV.UK Design Principles](https://www.gov.uk/guidance/government-design-principles), and the [GDS Way](https://gds-way.digital.cabinet-office.gov.uk/).

It's for any government. It matters most to teams in regions that can't easily hire these roles: where there's no service designer, no content designer or no security specialist on the team, the xstack agents stand in for the missing discipline and bring its craft and standards with them.

It's a process, not a collection of tools. It bakes in a proven way of building government services so that a team can pick it up on day one and ship work that already conforms to the standards.

## Who this is for

- **Government digital teams** anywhere, building services for the public
- **Small or new teams** that can't yet staff service design, content design, delivery management, development or cyber security, and need those disciplines on the team from day one
- **Digital agencies and departments** in regions where user-centred design skills are hard to hire or keep
- **Vendors** delivering on contract for a government, who want their work to pass the service standard on the first try
- **Anyone** wanting an opinionated starting point inspired by the GDS Way

## The sprint

```
Listen → Map → Make → Test → Ship → Show → Iterate
```

Seven verbs. Every sprint, every phase, every service.

- **Listen** – user research, stakeholder interviews, front-line shadowing
- **Map** – journeys, blueprints, ecosystems, problem statements
- **Make** – plain-language copy, prototypes in your design system, production code
- **Test** – usability, accessibility, security, performance
- **Ship** – discovery → alpha → beta → live, one small release at a time
- **Show** – weeknotes, show-and-tells, source in the open
- **Iterate** – continuously, forever, while the citizen still needs the service

## The team

| Specialist | What they do | Themes they own |
|---|---|---|
| **Service designer** | Research, journey maps, blueprints, problem statements, discovery | User needs, Whole problem, Works first time, Continuous improvement |
| **Content & interaction designer** | Plain language, UX copy, prototypes in your design system, accessibility | Inclusion, Plain language, Works first time, Findable |
| **Delivery manager** | Sprints, weeknotes, standards assessment, phase gates, sustainability | Multidisciplinary team, Sustainable and reliable, Working in the open, Measuring performance |
| **Developer** | Opinionated stack, shared platforms and lookups, observability, in-the-open code | Works first time, Right technology, Open platforms and standards, Measuring performance |
| **Cyber engineer** | Threat models, DPIA, secure-by-design, pen tests, incident runbooks | Trust, security and privacy |

The themes are the 14 in the [xstack service standard baseline](./references/service-standard-baseline.md). Each agent reads the same references and the same country profile, cites your standard by your numbering, and hands off cleanly to the next. None of them is the boss. The team owns the work.

## What's in the box

```
xstack/
├── README.md                 you are here
├── MANUAL.md                 single onboarding doc for new colleagues
├── PLAYBOOK.md               how a team uses xstack day to day, phase by phase
├── ETHOS.md                  the eight ways of working
├── AGENTS.md                 detailed roster of the five specialists
├── WORKFLOW.md               the sprint mantra, in detail
├── CONTRIBUTING.md           how to extend xstack
├── CHANGELOG.md
├── LICENSE                   MIT
├── .claude-plugin/
│   └── plugin.json           the installable manifest
├── agents/                   the five specialists
│   ├── service-designer.md
│   ├── content-designer.md
│   ├── delivery-manager.md
│   ├── developer.md
│   └── cyber-engineer.md
├── commands/                 slash commands the team uses every week
│   ├── weeknote.md
│   ├── assess.md
│   ├── discover.md
│   ├── build.md
│   ├── iterate.md
│   ├── productionise.md
│   ├── show.md
│   ├── plain-language.md
│   ├── review.md
│   ├── threat-model.md
│   └── profile.md            /xstack:profile – set up your country profile
├── skills/                   shared skills the agents call into
│   ├── service-standard-assessment/
│   ├── plain-language-check/
│   ├── weeknote/
│   ├── discovery-kit/
│   ├── research-coach/       router + mentor across the research cycle
│   ├── research-planning/    objectives first, then the discussion guide
│   ├── research-plans/       full three-part research plan as one .docx
│   ├── transcript-analysis/  behaviour over opinion, repo cross-referencing
│   ├── synthesize-research/  raw study data → layered findings package
│   ├── research-presenting/  findings the delivery team will act on
│   ├── journey-map/          what citizens do, step by step, evidenced
│   ├── service-blueprint/    the journey plus the machinery underneath
│   ├── service-journey-mapping/ blueprints + journey maps as commentable HTML
│   ├── ecosystem-map/        actors, systems, and flows as a network
│   ├── experience-map/       the whole citizen goal, across services
│   ├── workshop-facilitation/ co-creation sessions that produce artefacts
│   ├── brief-to-prototypes/
│   ├── synthetic-research/   synthetic personas + automated pre-flight
│   ├── prototype-iteration/
│   ├── build-for-production/
│   ├── service-design-review/
│   ├── design-review/
│   ├── component-spec/       design-system work in Figma
│   ├── component-build/
│   ├── page-composition/
│   ├── token-cross-check/
│   └── show-the-thing/
├── references/               the canonical, country-agnostic knowledge base
│   ├── service-standard-baseline.md   the 14 themes
│   ├── govuk-design-principles.md
│   ├── gds-way-phases.md
│   └── house-style.md
└── profiles/                 country profiles
    ├── README.md             what a profile is and how agents find it
    ├── _template/            start your own profile here
    └── barbados/             the first bundled profile
```

## Country profiles

xstack's agents, skills and commands are country-agnostic. Everything specific to one government – its service standard, design system, shared platforms, terms and data formats – lives in a **country profile**.

- **Without a profile**, xstack works to its own baseline: the 14 themes in [`references/service-standard-baseline.md`](./references/service-standard-baseline.md) and the generic conventions in [`references/house-style.md`](./references/house-style.md).
- **With a profile**, agents cite your standard by your numbering, build prototypes in your design system and use your shared platforms by name.

Run `/xstack:profile` to set one up for your project. It writes `.xstack/profile.md`, which the whole team can commit and share. Barbados is the first bundled profile: add `xstack profile: barbados` to your project's `CLAUDE.md` to use it. See [profiles/README.md](./profiles/README.md) for how profiles work and how to contribute one.

## New to xstack?

Read **[MANUAL.md](./MANUAL.md)** – the single onboarding guide for new colleagues, partner departments, and vendor teams. About two hours to read and walk the worked example, after which you'll know which command to run, which agent to ask, and what good looks like at each phase.

## Day-to-day usage

For the full phase-by-phase rhythm – setup, the weekly cadence, what to type at each phase, what comes out – see [PLAYBOOK.md](./PLAYBOOK.md). It walks through an end-to-end build using the medical-licence renewal example.

## Install

xstack is a Claude Code plugin and a public reference repo. You can use either, both, or neither.

### As a plugin – from GitHub

```
/plugin marketplace add publicdigital/XStack
/plugin install xstack@xstack
```

### As a plugin – from a local folder (for testing before you push)

```
/plugin marketplace add /Users/abisola/dev-env/pd/xstack
/plugin install xstack@xstack
```

### Confirm it worked

In any new Claude Code or Cowork session:

- Type `/xstack:` and autocomplete should reveal all eleven commands (Claude Code namespaces plugin commands by plugin name)
- Run `/agents` to confirm the five agents (service-designer, content-designer, delivery-manager, developer, cyber-engineer) are registered
- Skills are loaded and trigger automatically on the right phrases (no manual invocation needed)

The plugin leans on the Anthropic `design`, `service-design`, and `frontend-design` plugins. Install those alongside xstack for the full experience. If your country profile lists house-style skills of its own (its Related skills section), install those too.

### As a reference

You can also just read the files. The `references/` folder is the canonical xstack view of the service standard themes, the Principles, the GDS Way, and the house style. Print them. Pin them to a wall. Fork the repo. Adapt it for your service.

## Which agent should I use?

| Building or doing… | Use the… | Phase notes |
|---|---|---|
| User research, journey map, problem statement, ecosystem map | Service designer | Discovery and alpha mostly |
| Plain-language copy, error messages, page review, prototype in your design system | Content & interaction designer | Alpha onwards |
| Weeknote, show-and-tell, standards assessment, phase gate | Delivery manager | Every phase |
| Tech choice, integration with identity and other shared platforms, production build, ADR | Developer | Alpha onwards (no production code in discovery) |
| Threat model, privacy notice, DPIA, pen test plan, incident runbook | Cyber engineer | Alpha onwards |

If you're not sure, ask the **delivery manager** first – they'll route you.

## Which slash command should I run?

| You want to… | Run | Hands off to |
|---|---|---|
| Set up your country profile | `/xstack:profile` | delivery-manager |
| Turn a brief into testable prototypes | `/xstack:build` | content-designer + developer |
| Roll feedback into the next version | `/xstack:iterate` | content-designer + developer |
| Take an iteration to production-ready | `/xstack:productionise` | developer + cyber-engineer + content-designer |
| Publish what we did this week | `/xstack:weeknote` | delivery-manager |
| Self-assess against your service standard (or the baseline) | `/xstack:assess` | delivery-manager + every other agent |
| Scaffold a discovery phase | `/xstack:discover` | service-designer |
| Plan a show-and-tell | `/xstack:show` | delivery-manager |
| Review a service against the patterns and standards | `/xstack:review` | service-design-review skill |
| Review a piece of copy | `/xstack:plain-language` | content-designer |
| Draft or refresh a threat model | `/xstack:threat-model` | cyber-engineer |

## How xstack relates to other things

- **Your government's service standard** is the contract xstack delivers against. xstack assumes you'll be assessed against it and bakes it into every agent's reasoning, through your country profile. If you don't have one, the xstack baseline stands in. The standard is the source of truth; xstack is one way of meeting it.
- **Your government's design system**, named in the profile, is the visual and interaction layer xstack builds on. Agents use its published components and don't reinvent the chrome. Without one, prototypes use the xstack neutral style in `references/house-style.md`.
- **Your own house-style skills**, if your profile lists any, are what the xstack agents call into when they need pages, slide decks or other artefacts in your house style. xstack agents *use* those skills, they don't replace them.
- **The Anthropic design and service-design plugins** (`design`, `service-design`, `frontend-design`) are the deeper skill libraries. xstack agents reach for them where they're the best tool for the job.
- **gstack** is the Garry Tan repo this format was inspired by. It's for startups; xstack is for governments. They share a structure but not a worldview.

## Working in the open

xstack itself works the way the services it builds work.

- Public repo. Working in the open.
- Weeknotes for changes to the stack.
- Issues open. Contributions welcome. See `CONTRIBUTING.md`.
- MIT licensed. Working in the open.

## Status

**xstack v0.1.** First public cut. Expect changes. File issues. Standards drift, design systems drift, teams learn – xstack drifts with them.

If you ship something with xstack, write us a weeknote about it.

## Origins

xstack is owned by [Public Digital](https://public.digital). It started as "bimstack" at GovTech Barbados, where the team used it to build services on alpha.gov.bb. The Barbados profile and the worked examples in `examples/` come from that work. Thank you to the GovTech Barbados team.

## Licence

MIT. Use it, fork it, ship better government services.
