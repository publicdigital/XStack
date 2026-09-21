---
name: service-blueprint
description: Produce a service blueprint – the journey plus everything underneath it – frontstage staff actions, backstage processes, supporting systems, and policies, separated by the lines of interaction, visibility, and internal interaction. Canonical output is Markdown; optionally renders a single-file HTML visual in the country profile's design system (or the xstack neutral style). Use from alpha onwards when the team needs to make the back office visible. Triggers on "service blueprint", "blueprint", "map the back office", "what happens backstage", "who does what behind the scenes", "frontstage backstage".
---

# Service blueprint

This skill produces a service blueprint: a journey map with the machinery underneath made visible. Where the journey map shows what the citizen experiences, the blueprint shows what the organisation does – and fails to do – to produce that experience.

It supports the **User needs**, **Works first time** and **Open platforms and standards** themes, and GOV.UK Principle 7 (understand context) and Principle 8 (build digital services, not websites).

Most service failures citizens experience are backstage failures – the paper file that moves between buildings, the approval that waits for one officer, the system that doesn't talk to the other system. A blueprint is how the team finds them before citizens do.

**Before you start, find the country profile** (see `profiles/README.md`): `.xstack/profile.md` in the project, or a bundled profile named in the project's `CLAUDE.md` (e.g. `xstack profile: barbados`). Use its standard, terms, platforms and design system. If there is no profile, use `references/service-standard-baseline.md` and `references/house-style.md`, and say so once at the top of your output.

---

## When to use this skill

- **Alpha onwards** – once a future-state journey exists and the team needs to know what has to be true operationally to deliver it
- **Current state** – when a discovery has found that the pain is backstage (long waits, lost files, repeat visits) and the team needs to see why
- **Before `xstack:build-for-production`** – the blueprint names the integrations and operational dependencies the production build must handle

Build the blueprint **on top of** a journey map from `xstack:journey-map` – the citizen row of the blueprint should match it. For actors and systems as a network rather than a sequence, defer to `xstack:ecosystem-map`.

---

## The structure

A blueprint is the journey's steps as columns, with swimlane rows separated by three lines:

- **Line of interaction** – between what the citizen does and what frontstage staff/interfaces do
- **Line of visibility** – between what the citizen can see and what happens backstage
- **Line of internal interaction** – between backstage people/processes and the supporting systems and policies

```markdown
# Service blueprint – [service name]

**State:** Current / Future
**Journey map this sits under:** [link]
**Evidence base:** [front-line shadows, department interviews, system documentation, transcripts]
**Date / team:**

| | Step 1: [name] | Step 2: [name] | … |
|---|---|---|---|
| **Citizen actions** | (mirrors the journey map) | | |
| **Frontstage – people & interfaces** | The clerk, the counter, the screen, the letter | | |
| — *line of visibility* — | | | |
| **Backstage actions** | What staff do that the citizen never sees – checks, approvals, re-keying | | |
| **Supporting systems** | Named systems, registers, spreadsheets, the fax machine. Flag what doesn't integrate – Open platforms and standards | | |
| **Policies & rules** | The law, the fee schedule, the "we've always done it this way" | | |
| **Time** | How long this step takes, and how long the citizen waits | | |
| **Failure points** | Where it breaks, with evidence | | |
| **Evidence** | [shadow], [department interview], [system doc], [ASSUMPTION] | | |
```

---

## Rules

1. **Backstage claims need backstage evidence.** A blueprint built only from citizen interviews is a journey map with guesses under it. Shadow the front line, interview the officers, read the system documentation – and mark anything unverified as `[ASSUMPTION]`.
2. **Name the systems.** Not "the database" – the actual register, the actual spreadsheet, who owns it, and whether it can integrate. This is where Open platforms and standards reuse opportunities and blockers surface.
3. **Time is the most honest row.** "Processing" that takes 4 weeks because a file sits in a tray is the finding. Record elapsed time and touch time separately where you can.
4. **Follow the failure demand.** Where do citizens call, revisit, or complain because a backstage step failed silently? Those failure points are the blueprint's most valuable output.
5. **Future-state blueprints name owners.** Every backstage change the future state requires gets a named owner and a "what has to be true" note – otherwise the prototype is writing cheques the back office can't cash.

---

## Optional: single-file HTML visual

For workshops and department walkthroughs, render the blueprint as one self-contained HTML file (`service-blueprint.html`) in the xstack prototype pattern: single file, inline CSS styled with the design system named in the profile (its tokens, fonts and colours – no Tailwind, no invented colours), or, without one, the xstack neutral style in `references/house-style.md` (`--xs-*` tokens, system font stack). Draw the three lines as full-width horizontal rules labelled *line of interaction*, *line of visibility*, *line of internal interaction*, with the swimlanes between them and failure points visually flagged. The Markdown is canonical; regenerate the HTML from it.

---

## What makes a good blueprint

- The department's operational staff recognise it – and correct it, which is the point of showing them
- At least one "we had no idea it did that" moment for the delivery team
- Every failure point traceable to evidence, every future-state change traceable to an owner
- It makes the case for (or against) integration work with named systems, not vibes
