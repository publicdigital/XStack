# xstack — quick start

xstack is a team of five specialists and a set of commands for building government digital services in any country. The specialists act as the user-centred design roles your team may not have yet. They're anchored to your government's service standard, the GOV.UK Design Principles, and the GDS Way. This is the short version. For the full detail, see `MANUAL.md` and `PLAYBOOK.md`.

## Install

Upload `xstack.zip` via **Customize → Plugins → upload a custom plugin file**, or install it from your marketplace. Once installed, type `/` in chat or Cowork to see the xstack skills.

> **Important — which name to type.** In the Claude app and Cowork, the `/` menu runs **skills**. Invoke the skill names below (e.g. `/discovery-kit`), not the verb-style command names like `/discover` — those only work in the Claude Code terminal and will return "Unknown command" in the app.

> **If `/` invocations fail with "Unknown command" (even for valid skills):** there's a known Cowork bug where the slash-command resolver breaks — skills appear in the `/` menu but won't run, and even the built-in `/feedback` fails. When that happens, **trigger skills by natural language instead.** Don't type the slash name; just describe what you want and Claude picks the right skill from its description. For example, instead of `/discovery-kit`, write: *"Using xstack, scope a discovery for … — give me the problem statement, stakeholder map, research plan, and interview guide."* Fully quitting and reopening the app or starting a fresh conversation sometimes clears it.

## Set up your country profile

Do this once per project, before your first real piece of work. A country profile tells xstack about your government: its service standard, design system, shared platforms, terms and data formats.

- **Run `/xstack:profile`** (Claude Code) or ask *"Using xstack, set up our country profile"* (app and Cowork). It asks a few questions and writes `.xstack/profile.md`. Commit it so the whole team shares it.
- **Want prototypes in your government's design system?** Run `/xstack:design-system [country]`. It picks from the Government Design Systems List and works out how prototypes load it. `/xstack:profile` does this too, as one of its questions.
- **Want prototypes that sign people in, take payments and use what government already knows?** Run `/xstack:dpi [country]`. It starts from the DPI Map and records your platforms in `.xstack/dpi.md`.
- **Or use a bundled profile.** Barbados is bundled: add the line `xstack profile: barbados` to your project's `CLAUDE.md`.
- **Or skip it for now.** xstack works without a profile. It uses its own baseline – 14 service standard themes and a neutral house style – and says so at the top of what it produces. You can add a profile later.

See `profiles/README.md` for what goes in a profile.

## The core loop

Most work follows one path, from a vague idea to a service you can ship:

1. **`/discovery-kit`** — scope a discovery. Produces a problem statement, stakeholder map, research plan, interview guide, and a discovery report template. Use this when a department asks for a new service and you need to find out whether (and what) to build.
2. **`/brief-to-prototypes`** — turn a brief or problem statement into several clickable HTML prototypes, each in your design system (or the xstack neutral style) with its assumptions surfaced inline. This is the build engine: feel three approaches in hours, not weeks.
2½. **`/synthetic-research`** *(optional but recommended)* — before recruiting real participants, generate synthetic personas and run them against the prototype to surface comprehension, logic, and edge-case failures. Fixes the obvious before real testing begins. Complements real research – never replaces it.
3. **`/prototype-iteration`** — fold in what you heard. Give it a prototype plus either structured feedback or raw research transcripts, and it produces the next version with a changelog of what changed and why. Run it after every test round.
4. **`/build-for-production`** — take the iteration you've chosen to carry forward and produce a production-ready front-end: per-page HTML, your design system's published stylesheet linked, the prototype chrome stripped, plus a test suite (regression, accessibility, security, load).

## Supporting skills

Use these alongside the loop, at any phase:

- **`/service-standard-assessment`** — honest self-assessment against your service standard, or the xstack baseline themes if you have no profile. Run it before any phase gate (discovery→alpha, alpha→beta, beta→live), at annual review, or after a major change.
- **`/plain-language-check`** — review copy for plain language, civil-service register, and the house word-swap list. Returns specific rewrites, not vague advice. Use it on form copy, error messages, privacy notices, and comms.
- **`/show-the-thing`** — plan a show-and-tell: agenda, running order, demo, and supporting slides.
- **`/weeknote`** — draft a short, honest, public weeknote in the GDS style. Best run every Friday.
- Threat modelling has no standalone skill — in Cowork, ask the **cyber-engineer** specialist directly to draft or refresh a threat model.

## The five specialists

You don't have to call these directly, but you can invoke any by name in Cowork when you want that lens: the **service designer** (discovery, research, journey maps), the **content & interaction designer** (copy, patterns, accessibility, prototypes), the **developer** (stack choices, integrations, build), the **cybersecurity engineer** (threat modelling, privacy, hardening), and the **delivery manager** (sprints, weeknotes, show-and-tells, standards, phase gates).

## Where it runs

The eight skills work everywhere you invoke them with `/` — web chat, the Desktop Chat tab, and Cowork. The five specialists are **sub-agents, which run only in Cowork** and appear greyed out in plain chat; in plain chat the skills still run, just inline rather than handed to a specialist. The verb-style slash commands (`/build`, `/discover`, …) only work in the **Claude Code terminal**, not the app — use the skill names instead, as noted above. There are no connectors to set up.

## A typical first session

> `/discovery-kit renewing a medical licence`

…then once you have a brief:

> `/brief-to-prototypes` with the discovery report, review the prototypes with users, `/prototype-iteration` on the transcripts, and `/service-standard-assessment` before you call it alpha.
