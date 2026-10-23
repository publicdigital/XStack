# Feedback round 1 – Prototype 3 (Household-first)

- **Date:** 2026-10-23
- **Source:** internal critique (orchestrator click-through, and reviews by the service designer and cyber engineer) plus profile changes. The profile gaps found by the first build have since been fixed in `profiles/kestria/`.
- **Participants:** none. **No user testing.** Kestria is fictional, so no `[VERIFY WITH USERS]` assumption can be resolved this round.

## What worked

- The click-through reaches confirmation with no script errors. Date validation works.
- It asks who should receive the money *before* confirming the payout route – the right order.
- The "you're telling us about household …" strip.
- A survey visit is framed as normal, with rainy-season timings.
- Shared-phone safety in the text wording.

## What didn't work

1. **`PERSONA_EXTRAS` duplicates and contradicts the profile.**
   - It invents members, the registered person and districts.
   - It invents "Brannic Kestel" as Ines's registered person, but in the profile Ines *is* the registered person.
   - The "another adult in the household" case now has its own persona: Tessa Ondrey. Her husband Marek is the registered person.
2. **The outcome logic is invented.** The profile now says:
   - reporting a birth, death, someone joining or leaving, or a move makes the household `needs_survey`
   - a new job is checked without a visit
   - otherwise the household's `hsgAssessment` applies
3. **Rules and wording are invented:**
   - the declaration text
   - the timings
   - how the registered person is told
   - the "reply STATUS" convention
4. **A payout to an adult who isn't the applicant isn't explained** against the payout routes.

## What changed (since last round)

Nothing. This is the first iteration after `/xstack:build`.

## Observed but unresolved

- **Checking the recipient's identity.** If the applicant names *another* adult as recipient, how does that adult confirm it's them, and how is their route found? The profile's payout model says the rail resolves it at payout time. The service sheet doesn't say whether the recipient has to confirm. `[VERIFY WITH POLICY]`
- **The registered person's text.** Do they get the neutral text when the recipient changes? The service sheet says yes, and that it gives no detail. Check that it doesn't make things unsafe at home. `[VERIFY WITH USERS]`

## Constraints surfaced

These are now in the profile.

- **The service sheet:** `profiles/kestria/services/household-support-grant.md`.
  - **Who can apply:** any adult in the household – the household can be found from any adult member's KUIN.
  - **Who is paid:** any adult member can be the recipient. The registered person only gets a neutral text (reg.6(3)).
  - **Intermediaries:** they can't name themselves as recipient.
  - **Changes to report within 30 days,** and which ones trigger a survey.
  - **The four outcomes,** with their wording.
  - **Timings,** the 5th-of-the-month payment date, the fixed declaration wording and the fixed text wording.
- **The data:** `profiles/kestria/dpi.md`.
  - `KESTRIA_PERSONAS`, with structured `household` (members, `registeredPerson`, `lastSurveyed`) and `address` (district)
  - a `phone` claim
- **The payout model:** `profiles/kestria/dpi.md`, Payouts. The three routes, and a change takes effect at least 7 days later.
