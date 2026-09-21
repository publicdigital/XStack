---
name: government-design-systems
description: Point xstack at a government's design system, chosen from the community-maintained Government Design Systems List, and work out how prototypes should use it. Looks the entry up live, researches how to load it in a single-file prototype (stylesheet, components, page chrome, fonts), and records the result in the project's country profile. Use when a team wants prototypes to look like their government's services, is setting up a profile, or asks which design systems exist. Triggers on "/xstack:design-system", "use our design system", "which design system", "use the GOV.UK design system", "use USWDS", "use the [country] design system", "government design systems list", "change the design system".
---

# Government design systems

xstack prototypes should look and behave like the team's own government services. This skill points xstack at the right design system and works out, concretely, how a single-file HTML prototype should use it.

It supports the **Open platforms and standards** theme (reuse the government's design system rather than inventing one), **Inclusion** (a mature design system carries years of accessibility work) and **Works first time** (familiar patterns are easier to complete).

---

## Where the list comes from

The [Government Design Systems List](https://github.com/ctrimm/Government-Design-Systems-List) is a community-maintained list of federal, state and municipal government design systems around the world. It records each system's homepage, source code, underlying technology, component library, accessibility and design files.

xstack **reads the list live** and doesn't bundle a copy. The list changes often, and it has no licence that would let us redistribute it. Only the entry a team chooses is recorded in their project, with a link back and the date it was checked.

`scripts/lookup.py` fetches and parses the list. It uses only the Python standard library.

```bash
python3 scripts/lookup.py list                         # every entry
python3 scripts/lookup.py list --level country         # country, regional or local
python3 scripts/lookup.py list --query canada          # search by name
python3 scripts/lookup.py show "United Kingdom"        # full details for one entry
python3 scripts/lookup.py show kenya --source ./README.md   # use a local copy (offline)
```

`show` prints JSON: `name`, `level`, `homepage`, `source_code` (with `url` if code is public), `technology`, `components`, `accessibility`, `design_files` and `has_public_code`. If the name is ambiguous, it prints the candidates and exits with code 1. If the list can't be read, it exits with code 2 – say so, and ask the team for their design system's link instead.

---

## 1. Choose the entry

- If the team named a country or organisation, run `show` with it. If there are several candidates, ask which one using AskUserQuestion.
- If they didn't, ask which government they work for, then run `list --query` with it.
- **Pick the most specific level that applies.** A state team uses its state's system if there is one. A UK Department for Education team uses the DfE system, which extends GOV.UK. Say when an entry is built on top of another one, because the team may need both.
- **If the government isn't in the list**, ask the team for their design system's link and continue from step 2 with that. Suggest they contribute it to the list upstream. Don't open an issue or pull request for them.
- **If the government has no design system**, use the xstack neutral style (`references/house-style.md`) and say so. Offer to record the colours and fonts the government officially publishes, if it does, as a light approximation.

Show the team what the list says about the entry, in plain words: what it is, whether code is public, what it's built with, and its accessibility status.

## 2. Decide how prototypes can use it

xstack prototypes are **single, self-contained HTML files** that anyone can open without a build step. How well a design system fits depends on what it publishes. Put it in one of three tiers:

| Tier | What the design system publishes | How prototypes use it |
|---|---|---|
| **1. Link it** | Compiled CSS (and optional JS) on a public package registry, for example GOV.UK Frontend or USWDS | Link the stylesheet and script from a CDN, pinned to a version, and use the design system's own class names and page template |
| **2. Approximate it** | Only framework components (React, Vue, Angular), or tokens without compiled CSS | Inline an approximation: its published tokens (colours, type, spacing), with markup that follows its component anatomy. Tag it `[KNOWN GAP]` in the assumptions panel. Web components that load from a CDN count as tier 1 |
| **3. Neutral** | No public code: guidelines, a PDF, or just a government website | Use the xstack neutral style. Record any officially published colours and fonts as a light touch, and nothing more |

The list's `technology` and `source_code` fields tell you which tier is likely. Confirm it in step 3.

## 3. Research the specifics

Read the design system's own documentation and source repository (WebFetch, or `gh api` for GitHub repos). Find:

- **Package and version** – the package name and the latest stable version
- **Stylesheet and script URLs** – a CDN URL for the compiled CSS and JS (jsDelivr or unpkg for npm packages), pinned to that version. Include any JS initialisation call
- **Page template and chrome** – the markup for the official banner, header, phase banner, footer and skip link, and the body classes the template needs
- **Form components** – class names and markup for: text input, textarea, radios, checkboxes, date input, select, button, back link, error summary, error message, fieldset and legend, hint text, and summary list (for Check your answers)
- **Fonts** – which font the system uses and **any restrictions on using it**. Some government fonts may only be used on the government's own domains. If there is a restriction, use the system's documented fallback in prototypes and say why
- **Brand assets** – whether crests, logos or coats of arms have usage rules. Prototypes should use a placeholder unless the team confirms they are allowed to use the real one
- **Languages and direction** – supported languages, and right-to-left support if the team needs it
- **Accessibility** – the level the system claims and when it was last audited
- **Design files** – a link to the Figma (or other) library, if there is one

**Rules:**

- **Never invent a URL, package name or class name.** Check each stylesheet and script URL actually resolves (for example `curl -sI <url>` returns 200) before you record it. If you can't confirm something, record it as unknown.
- **Pin versions.** `@latest` breaks prototypes when the design system ships a breaking change.
- **Prefer the design system's own words** for component names, so the team can look them up.

## 4. Record it in the profile

Write `.xstack/design-system.md` in the project, from `profiles/_template/design-system.md`. It has the tier, the list entry and date checked, the package and URLs, the page template, the component map and any restrictions.

Then make sure the profile points to it:

- If `.xstack/profile.md` exists, update its **Design system** section to name the design system and say "Details: `design-system.md`".
- If it doesn't, create a minimal `.xstack/profile.md` with only the **Design system** section filled in. Everything else falls back to the xstack baseline until the team runs `/xstack:profile`.
- If the team uses a bundled profile (`xstack profile: <name>` in `CLAUDE.md`), tell them that a project profile in `.xstack/` takes precedence over the bundled one. Ask before creating one.

## 5. Prove it works

Build a one-page test prototype – a single question page with an error summary, an inline error, a phase banner and the design system's chrome – in `.xstack/design-system-test.html`. Open it or describe what the team should see. If something doesn't render, fix the recorded details before anyone builds on them.

Tell the team: which design system and tier, what works, what's approximated, and any font or brand restrictions. Remind them to run `/xstack:design-system` again when the design system releases a new major version.

---

## Changing or refreshing

Run the skill again. Read the existing `.xstack/design-system.md` first, check the list entry and the design system's latest version, and update only what has changed. Record the new date checked.
