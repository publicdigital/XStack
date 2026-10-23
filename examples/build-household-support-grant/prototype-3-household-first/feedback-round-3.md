# Feedback round 3 – Prototype 3 (Household-first)

- **Date:** 2026-10-23
- **Source:** a constraint from the profile. Kestria now has a described national language, **Kestrian** (*kestrin*), in `profiles/kestria/kestrian.md`. It's invented and has no speakers.
- **Participants:** none. **No user testing.** No `[VERIFY WITH USERS]` assumption can be resolved.

## What worked

Iteration 3's GovKestria styling, journey, data and rules. Keep them.

## What didn't work

1. **The language switcher only shows a notice.** Every national service must work in Kestrian and English (Digital Government Act 2023, s.14, in `world.md`), but the switcher can't switch to Kestrian.

## Observed but unresolved

- **Vell and Sora are still undescribed,** so their links keep the notice.
- **Kestrian is invented.** It can show layouts and switching working, but it's no evidence about real people reading in their own language.

## Constraints surfaced

- **The switcher names the other language in that language:** "Kestrin" on an English page (`DESIGN.md`, ServiceHeader).
- **Translate only what the citizen or officer sees.** The xstack banner, the assumptions panel and fake data stay in English.
- **Use one shared string list,** so the same English is always the same Kestrian in all three prototypes.
