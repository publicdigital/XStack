# Feedback round 1 – Prototype 2 (Assisted at a Citizen Service Centre)

- **Date:** 2026-10-23
- **Source:** internal critique (orchestrator click-through, and reviews by the service designer and cyber engineer) plus profile changes. The profile gaps found by the first build have since been fixed in `profiles/kestria/`.
- **Participants:** none. **No user testing.** Kestria is fictional, so no `[VERIFY WITH USERS]` assumption can be resolved this round.

## What worked

- The click-through reaches confirmation with no script errors.
- The officer strip, the separate fingerprint consent step (with a refusal route), the read-aloud notice and declaration, and the printed slip all came through.
- The "prepare and refer" route for village digital champions, including mobile CSC days in the rainy season.

## What didn't work

1. **The payout account is confirmed *before* who should receive the money.** If someone else is named, the account just confirmed is the wrong one.
2. **The prototype lets the officer change the payout *account*.** Under the profile's payout model, nobody in government can edit a bank or wallet account. A CSC can change the **recipient** and the **route** (KUIN-linked account, phone number, or cash voucher), at level 3. Account changes happen at the citizen's own provider.
3. **Mirel Okand, a Capital Region resident, is signed in at Dunmar CSC** in the Northern Plains, and told she can probably get the grant.
4. **Aru Danvell, the person this prototype exists to help, can't get through.** The mock fails his sign-in, even after the fingerprint check.
5. **`PERSONA_EXTRAS` duplicates and contradicts the profile.** It invents members, bands and districts.
6. **Rules and wording are invented:**
   - the declaration text and penalty
   - the timings
   - what an intermediary may do
   - the identity level for checking someone's card
   - the switch from the Older Persons Grant

## What changed (since last round)

Nothing. This is the first iteration after `/xstack:build`.

## Observed but unresolved

- **There's no persona for a counter-side card check.** The service sheet now allows a CSC officer to check a KestriaID card as well as a fingerprint. Show it as the alternative to fingerprint. `[VERIFY WITH POLICY]`
- **The mock can't sign anyone in at level 3.** Keep the simulated fingerprint page, and tag the gap.

## Constraints surfaced

These are now in the profile.

- **The service sheet:** `profiles/kestria/services/household-support-grant.md`.
  - **Outcomes:** the four `hsgAssessment` outcomes and the exact message for each.
  - **Who can apply, and who is paid:** any adult can apply, and any adult member can be the recipient.
  - **Authorised intermediaries:**
    - they can apply and report changes
    - they can't be the recipient or change the route
    - the record is made at a CSC and renewed every 12 months
    - village champions are not intermediaries
  - **Older Persons Grant:** at a CSC, a household that gets it can choose to switch.
  - **No KUIN:** the route goes through the village committee's confirmation, then a survey visit, with payment by cash voucher.
  - **Timings and the rainy season,** the 5th-of-the-month payment date, the fixed declaration wording, and the fixed text wording.
- **The data:** `profiles/kestria/dpi.md`. `KESTRIA_PERSONAS`, with structured values and home districts. Aru now has full data for when he's signed in at a CSC.
- **The payout model:** `profiles/kestria/dpi.md`, Payouts. A change takes effect at least 7 days later, with texts to the old and new numbers. Recent SIM swaps are held.
