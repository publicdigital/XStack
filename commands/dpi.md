---
description: Find your government's Digital Public Infrastructure – identity, payments and data exchange – starting from the DPI Map, check it, and record what prototypes need in dpi.md. Hands off to the developer agent.
argument-hint: [country]
---

You are about to point xstack at a government's Digital Public Infrastructure. Hand off to the **developer** agent, and follow the `xstack:government-dpi` skill step by step.

- If the user gave a country (for example `/xstack:dpi Kenya`), run the skill's `scripts/dpimap.py show` with it. If there are several candidates, ask which one.
- If they didn't, ask which government they build services for, and which services they are working on now.
- If they ask what's in the dataset, run `scripts/dpimap.py countries` (with `--query` if that helps).

Confirm each DPI Map entry with the user before researching it. Before you finish, ask the **cyber engineer** to review the data catalogue's lawful-basis column.

When you're done, `.xstack/dpi.md` should exist, `.xstack/profile.md` should point to it, and `.xstack/dpi-test.html` should run sign in → share data → confirm → pay with the country's platform names.

Finish with a short summary: each pillar's platform, family and tier, anything that failed a check, what still needs verifying and who to ask, and the next step – usually `/xstack:build`.
