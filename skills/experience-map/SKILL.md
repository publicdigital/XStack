---
name: experience-map
description: Map an experience broader than any one service – the citizen's whole goal ("start a business", "have a baby", "lose a parent") across every service, agency, and channel it touches. Shows where individual services sit inside the larger goal and where the seams hurt. Canonical output is Markdown; optionally renders a single-file HTML visual in the country profile's design system (or the xstack neutral style). Triggers on "experience map", "whole journey across services", "end-to-end experience", "life event map", "everything someone has to do to", "whole service".
---

# Experience map

This skill maps an experience that is bigger than one service: the citizen's actual goal, which government has usually split across several departments, each of which sees only its own slice. "Renew my medical licence" is a service. "Keep practising medicine" is an experience – it also involves insurance, CME credits, the hospital's credentialing, and the bank.

It supports the **User needs**, **Whole problem** (this map is the whole problem, drawn) and **Findable** (citizens search for the goal, not the department) themes, and GOV.UK Principle 1 (start with user needs) and Principle 7 (understand context).

**Before you start, find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, or a bundled profile named in the project's `CLAUDE.md` (e.g. `xstack profile: barbados`). Use its standard, terms, platforms and design system. If there is no profile, use `references/service-standard-baseline.md` and `references/house-style.md`, and say so once at the top of your output.

---

## When to use this skill

- **Pre-discovery or early discovery** – when scoping, to see which slice of the whole goal a discovery should take on, and to keep the problem statement honestly scoped
- When research keeps surfacing pain that belongs to a neighbouring service ("the form was fine, but I'd already been to three other offices that week")
- When multiple departments each own a piece of one citizen goal and nobody owns the seams

For one service's step-by-step sequence, defer to `xstack:journey-map`. For the actors and systems as a network, `xstack:ecosystem-map`. The experience map sits above both: it's the map of maps.

---

## The template

```markdown
# Experience map – [the citizen's whole goal, in their words]

**Trigger:** [the life event or moment that starts this – often not a government moment]
**Resolution:** [when the citizen would say "done" – their definition, not government's]
**Evidence base:** [research across the experience, not just our service]
**Date / team:**

## The stages

| | Stage 1: [name] | Stage 2: [name] | … |
|---|---|---|---|
| **Citizen's goal at this stage** | In their words | | |
| **Services & organisations touched** | Government and non-government | | |
| **What they must know / prove / carry** | Documents, numbers, prior approvals – the burden of coordination | | |
| **Time & repeat contact** | Elapsed time; how many separate contacts | | |
| **Feeling** | Quoted or paraphrased, with participant ID | | |
| **Seams** | Where one organisation hands off to another and the citizen carries the join | | |
| **Evidence** | [P3], [shadow], [analytics], [ASSUMPTION] | | |

## Where our service sits

[Which stage(s) the service in question occupies, and what arrives at its front door already broken from earlier stages.]

## The coordination burden

[Everything the citizen personally does to hold the experience together – re-entering data, ferrying paper between agencies, translating one agency's language for another. This is work the service side should be doing.]

## Scope recommendation

[Given the whole map: which slice should the team actually take on, what's out of scope, and which seams need at minimum a warm handoff even if they stay out of scope.]
```

Keep to 4–7 stages. Stages are the citizen's chapters, not organisational phases.

---

## Rules

1. **Name the map after the citizen's goal, verb-led, in their language.** If the title contains a department's name or a programme name, start again.
2. **Include the non-government actors.** Banks, employers, insurers, churches, family. Citizens don't experience a "government journey" – they experience their life, in which government is one (often slow) participant.
3. **The seams are the findings.** Within one service things are usually survivable; between services is where citizens repeat themselves, re-prove things government already knows, and give up. Evidence the seams hardest.
4. **Use it to scope honestly.** The experience map's job in xstack is to keep a discovery from pretending its slice is the whole goal – and to record which seams the team is knowingly leaving unfixed. That goes in the problem statement's out-of-scope section (`xstack:discovery-kit`).
5. **Evidence or `[ASSUMPTION]`.** Research from neighbouring services counts – cite it.

---

## Optional: single-file HTML visual

Render as one self-contained HTML file (`experience-map.html`) in the xstack prototype pattern: single file, inline CSS styled with the design system named in the profile (its tokens, fonts and colours – no Tailwind, no invented colours), or, without one, the xstack neutral style in `references/house-style.md` (`--xs-*` tokens, system font stack). Stages as broad horizontal chapters, the services touched shown as blocks within each stage, seams drawn explicitly as marked gaps between blocks, and a highlighted band showing where our service sits. The Markdown is canonical; regenerate the HTML from it.

---

## What makes a good experience map

- The citizen's definition of "done" frames the whole thing
- Seams between organisations are drawn as first-class objects, not white space
- It changes the scope of a discovery – widening it, narrowing it, or adding a warm handoff the team hadn't planned
- A department reading it sees, maybe for the first time, the coordination work its citizens are doing for free
