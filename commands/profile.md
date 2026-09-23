---
description: Set up or update the country profile for this project, so xstack uses your government's service standard, design system, shared platforms and terms. Hands off to the delivery-manager agent.
argument-hint: [country, or the name of a bundled profile]
---

You are about to set up the country profile for this project. Hand off to the **delivery-manager** agent. Read `profiles/README.md` first: it explains what a profile is and how agents find it.

## 1. Check what already exists

- If `.xstack/profile.md` exists in the project, you are updating it. Read it and ask what has changed.
- If the user names a bundled profile (see the table in `profiles/README.md`), add `xstack profile: <name>` to the project's `CLAUDE.md` (create the file if needed), confirm which files the profile includes and stop.

## 2. Gather the essentials

Ask briefly, using the AskUserQuestion tool where the answers are choices. Don't ask for everything at once. The first four matter most; the rest can be filled in later.

1. **Country and languages** – which country, and which languages people are most comfortable in
2. **Service standard** – does the government have one? If yes, get the link or the text
3. **Design system** – follow the `xstack:government-design-systems` skill (the same flow as `/xstack:design-system`): find the government in the Government Design Systems List, confirm the entry with the user, and write `.xstack/design-system.md`. If the government isn't in the list, ask for the link
4. **Terms** – what departments are called, and who owns shared platforms such as identity and payments
5. **Shared platforms** – identity, payments, data exchange, notifications, registers and lookups. Write identity, payments and data exchange to `.xstack/dpi.md` from `profiles/_template/dpi.md`, with a tier for each and a data catalogue of which register holds which fact. Record only what the user or a published source confirms
6. **Data formats** – national ID, addresses and regions, postcodes, currency
7. **Law** – data protection and accessibility law
8. **Research context** – population data sources and recruitment channels

If the user shares a link to their service standard, read it with WebFetch and draft the mapping to the baseline themes yourself. Don't make the user do it.

Never guess a fact about a government. If you don't know and the user doesn't either, leave the field out. Agents fall back to the baseline for anything missing.

## 3. Write the profile

Start from `profiles/_template/profile.md`. Write `.xstack/profile.md` in the project.

- Map **every** standard in their service standard to one or more themes in `references/service-standard-baseline.md`. List any baseline theme with no match under "Not in our standard".
- If they gave you the full text of their standard, save it as `.xstack/service-standards.md` in the same format as `profiles/barbados/service-standards.md`, with "How an agent checks" questions for each standard.
- Delete the template's comments and any section you have nothing for.

## 4. Confirm

Show the user a short summary: which standard is mapped, which design system prototypes will use, and what is still missing. Suggest they commit `.xstack/` so the whole team shares it. If the profile could help other teams in the same government, suggest contributing it to `profiles/<country>/` in the xstack repository.
