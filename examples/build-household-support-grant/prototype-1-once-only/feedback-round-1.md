# Feedback round 1 – Prototype 1 (Once-only, phone-first)

- **Date:** 2026-10-23
- **Source:** internal critique (orchestrator click-through, and reviews by the service designer and cyber engineer) plus profile changes. The profile gaps found by the first build have since been fixed in `profiles/kestria/`.
- **Participants:** none. **No user testing.** Kestria is fictional, so nothing here is evidence about users, and no `[VERIFY WITH USERS]` assumption can be resolved this round.

## What worked

- The click-through reaches confirmation with no script errors. Validation, the error summary and inline errors all work.
- Shared-phone safety:
  - no personal details before sign-in
  - "Using a phone you share?" warning on the start page
  - texts never mention money or outcome
  - "We will never ask for your PIN"
- Check your answers marks each answer "From government records (source)" or "You told us".

## What didn't work

1. **The payout account is confirmed *before* the citizen says who should receive the money.** If someone else is named, the account they just confirmed is the wrong one. The build spec caused this.
2. **Mirel Okand is told she "can probably get the grant".** She's a better-off car owner in the capital. The outcome is hard-coded, not driven by data.
3. **`PERSONA_EXTRAS` duplicates and contradicts the profile.** It invents phone numbers, members and bands, and splits the district out of a free-text address by commas.
4. **There's only one positive outcome page,** plus "already getting support". The profile now defines four assessments.
5. **Rules and wording are invented:**
   - the declaration text
   - the timings
   - the payment date
   - the text-message wording
   - who can apply
   - who can be paid

## What changed (since last round)

Nothing. This is the first iteration after `/xstack:build`.

## Observed but unresolved

- **When the recipient isn't the applicant,** the service can't pull the recipient's payout account. The pull is for the signed-in person only. The payout model says the rail resolves it at payout time, by their KUIN, then their phone, then a cash voucher. What should the applicant see, and should the recipient confirm it themselves? `[VERIFY WITH PLATFORM]` `[VERIFY WITH POLICY]`
- **The mock still shows a consent screen** for a public-task pull. Keep the notice page and the `[KNOWN GAP]`.

## Constraints surfaced

These are now in the profile.

- **The service sheet:** `profiles/kestria/services/household-support-grant.md`.
  - **Outcomes:** the four `hsgAssessment` outcomes and the exact message for each. The band is never shown.
  - **Who can apply:** any adult in the household. Who can be paid: any adult member, defaulting to the applicant. The registered person only gets a neutral text.
  - **Intermediaries:** they can't name themselves as recipient.
  - **Sign-in levels:** applying online needs level 2. Changing the recipient or payout route after a decision needs a CSC, at level 3.
  - **Timings:** about 4 weeks if `likely`, 8–10 weeks with a survey visit. The rainy season can add up to 4 weeks in the Northern Plains and Lake Region. Payments are made on the 5th of the month, starting from the first cycle at least 7 days after the decision.
  - **Declaration:** fixed wording, which can be reworded only for reading age.
  - **Texts:** fixed wording, and every one ends "SPA never asks for your PIN."
  - **Data:** pull only `fullName`, `phone`, `address` (district and village), `household`, `programmes`, `hsgAssessment` and `payoutAccount`.
- **The data:** `profiles/kestria/dpi.md`.
  - `KESTRIA_PERSONAS` with structured value shapes, and a `phone` claim
  - the persona filter for this service
  - Desa returns `payoutAccount` in `missing`
- **The payout model:** `profiles/kestria/dpi.md`, Payouts.
  - Three routes: KUIN, phone, cash voucher.
  - A service changes the recipient or route, never the account itself.
  - A change takes effect at least 7 days later, with a text to both the old and new numbers.
