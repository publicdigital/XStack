---
description: Choose which government's design system xstack uses, from the Government Design Systems List, and record how prototypes should load it. Hands off to the developer agent.
argument-hint: [country, state, city or organisation]
---

You are about to point xstack at a government design system. Hand off to the **developer** agent, and follow the `xstack:government-design-systems` skill step by step.

- If the user gave a name (for example `/xstack:design-system Canada`), look it up in the Government Design Systems List with the skill's `scripts/lookup.py show`.
- If they didn't, ask which government they build services for, then search the list.
- If they ask what's available, run `scripts/lookup.py list` (filtered by `--level` or `--query` if that helps) and show the entries as a short table: name, level, and whether code is public.

Confirm the entry with the user before researching it. When you're done, `.xstack/design-system.md` should exist, `.xstack/profile.md` should point to it, and a one-page test prototype should show the design system working.

Finish with a short summary: the design system, its tier (link it, approximate it or neutral), anything approximated, any font or brand restrictions, and the next step – usually `/xstack:build`.
