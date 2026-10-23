# Feedback round 2 – Prototype 3 (Household-first)

- **Date:** 2026-10-23
- **Source:** a constraint from the department. KDS has published the **GovKestria design system** (`profiles/kestria/design-system/DESIGN.md`), and the Kestria profile now names it instead of the xstack neutral style.
- **Participants:** none. **No user testing.** Nothing about users changes this round, and no `[VERIFY WITH USERS]` assumption can be resolved.

## What worked

Iteration 2's journey, data and rules. Keep them as they are.

## What didn't work

1. **It uses the xstack neutral style,** not the government's design system. Kestria's profile now says every Kestria page uses GovKestria (`profiles/kestria/profile.md`, Design system).
2. **It gives SPA's free line, `0800 400 400`.** The design system allows only `+999` phone numbers (`DESIGN.md`, rule 3). The profile's official line is now the GovKestria helpline, `+999 77 100 2000` (`world.md`, Connectivity and channels).

## What changed (since last round)

Iteration 2 rebuilt the prototype on the fixed profile: `KESTRIA_PERSONAS`, the service sheet's rules, and the recipient before the payout route.

## Observed but unresolved

- **The design system has no checkboxes, date input, select, Check your answers list, phase banner, or switcher for more than one other language.** `profiles/kestria/design-system.md` gives a stopgap for each.
- **`dpi-mock.js` v1.1 can now model acting for someone** (publicdigital/XStack#8), and Kestria has Mina Vorlek (#9). That's a behaviour change, not a styling one, so it's not in this round.

## Constraints surfaced

- **Use GovKestria for everything the citizen or officer sees:** inline `tokens.css` then `kestria.css` exactly, use the `kg-` components and the chrome from `DESIGN.md`, and follow `profiles/kestria/design-system.md` for the phase line and the gaps.
- **Follow `DESIGN.md`'s rules:**
  - one primary button per page
  - a help panel with the assisted route on the start page and every question page
  - an icon on every primary action and status
  - the fictional notice in the banner and the footer
  - every target at least 48px
  - no horizontal scroll at 320px
- **Use the GovKestria helpline, `+999 77 100 2000`,** wherever a phone line is given.
