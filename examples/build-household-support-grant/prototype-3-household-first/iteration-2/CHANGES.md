# Iteration 2 – Prototype 3 (Household-first)

**Profile:** Kestria (`profiles/kestria/`). Standard cited: Kestria Digital Service Standard, by point number and title.
**Round of feedback:** internal critique (orchestrator click-through, service designer and cyber engineer reviews) plus profile changes, 2026-10-23. File: `feedback-round-1.md`.
**No user testing.** Kestria is fictional, so no `[VERIFY WITH USERS]` assumption is resolved this round. Items moved to "Resolved" below are settled by the profile and the service sheet. That is profile evidence, not user evidence.

Feedback item numbers: **F1–F4** are "What didn't work" 1–4. **O1, O2** are "Observed but unresolved". **C** is "Constraints surfaced".

Sources for the rules and wording: `profiles/kestria/services/household-support-grant.md` (the sheet), `profiles/kestria/dpi.md`, `profiles/kestria/world.md`.

## Critical changes applied

1. **`PERSONA_EXTRAS` deleted. All page data now comes from `dpi.data.fetch()`.**
   - Feedback: F1. Round 1 invented members, a registered person ("Brannic Kestel") and districts, and contradicted the profile.
   - Now: `KESTRIA_PERSONAS` is pasted verbatim from `dpi.md`. The mock is filtered to the sheet's eight personas, with `dpi.md`'s attributes block. The page reads `household.registeredPerson`, `household.members` (name, age, `hasKuin`), `household.lastSurveyed`, `address.district`, `programmes`, `hsgAssessment` and `payoutAccount` as structured values.
   - Whether the signed-in person is the registered person is derived: `claims.fullName === household.registeredPerson`. Tessa Ondrey is the "another adult" case (Marek is registered).
   - Standards: Point 5 (Don't ask for what government already knows), Point 7 (Build on the national platforms).

2. **Outcome logic replaced with the sheet's rules.**
   - Feedback: F2.
   - A reported birth, death, someone joining or leaving, or a move of district means a survey. A new job only is checked against the household record without a visit. Nothing reported means the fetched `hsgAssessment` applies, with the sheet's messages. `not_found` is a survey, framed as normal. The band is never shown.
   - Round 1's invented rules are gone: "I'm not sure about changes means a visit", "a survey 4 or more years old means a visit".
   - Standards: Point 4 (Keep it simple and in plain words), Point 6 (Protect people's data and earn their trust).

3. **Fixed wording, timings and conventions from the sheet.**
   - Feedback: F3.
   - Declaration: SPA's approved wording, word for word, as the checkbox label. It is not reworded for reading age, because the sheet allows that only with SPA's agreement.
   - Texts: the sheet's example ("SPA: we have your request. Ref HSG-… Dial *999# to check. SPA never asks for your PIN."). The invented "reply STATUS" is dropped. Progress is *999# with a reference and phone number.
   - Reference: `HSG-` plus 7 digits.
   - Timings: about 4 weeks (20 working days) for `likely`. Survey: visit within 6 weeks, decision within 10 working days, 8–10 weeks in all. Rainy season (March to June) in the Northern Plains and Lake Region: up to 4 more weeks, shown on the confirmation page. The region comes from the household's district, or the new district if the household moved.
   - Payment: K 1,500 a month, on the 5th, first payment at least 7 days after the decision, no back pay.
   - District dropdown: all 38 districts from `world.md`, grouped by region. The "my district is not on this list" option is removed.
   - Standards: Point 4, Point 6.

4. **Payout route explained for the recipient, whoever they are.**
   - Feedback: F4, and the recipient rules in C.
   - The recipient can be any adult (18 or over) in `household.members`. Intermediaries cannot name themselves (stated on the start page).
   - If the recipient is the signed-in person, the payout page shows their `payoutAccount` route: KUIN-linked account (provider and last 4 digits), a wallet on a masked phone number, or a cash voucher (with the ID documents that work). If `payoutAccount` is in `missing` (Desa Haldry), the page asks for the phone number her wallet is on, with "I do not have a wallet" leading to cash.
   - If the recipient is another adult, the page explains the payment system finds their account at payout time (KUIN, then phone, then cash voucher) and asks for their phone number, optionally. The KUIN step is dropped when `hasKuin` is false. Tagged `[VERIFY WITH POLICY]`.
   - The registered person gets only the neutral text, when they are not the person filling this in.
   - "If it is not right" no longer says a CSC can change an account. The account belongs to the citizen and their provider (relink the KUIN there). After a decision, changing the recipient or route is level 3 at a CSC and takes effect from the next payment cycle at least 7 days away. Round 1 also said only the old number is texted. The sheet says both old and new.
   - Standards: Point 5, Point 6 (Protect people's data and earn their trust), Point 7.

## Important changes applied

5. **The "are you the registered person?" question is removed. It becomes a confirmation.** *(Decision, requested in the brief.)*
   - Feedback: F1.
   - Reason: signing in gives the answer, so asking breaks Point 5. People may not know how SPA registers a household, and "I'm not sure" was a symptom of that.
   - Now: the household page says "The household is registered under X. You are filling this in as another adult in the household. That is fine." The same line shows on every later page in the "You're telling us about…" strip.
   - Without sign-in there is no record, so there is no registered person to compare. Those routes say "an adult in the household".
   - Cost: the person can no longer say "that's wrong". They can answer "No, this is not my household" on the same page, which routes to the manual route.
   - Standards: Point 5, Point 4.

6. **The phone number is confirmed, not asked.**
   - Feedback: C (the `phone` claim now exists).
   - The contact page shows the number from the KestriaID `phone` claim, warns it may be out of date or shared, and offers "a different number" or no texts.
   - Standards: Point 5, Point 6.

7. **"Probably can't" has a page.**
   - Feedback: F2 (the `not_likely` outcome).
   - Uses the sheet's wording. Offers a new survey (online here) and a way back to report a change. "Other help" points to the free line, tagged `[VERIFY WITH DEPARTMENT]`, because the sheet does not say what other help exists.
   - The household is not asked who receives the money, because there is nothing to pay.
   - Standards: Point 1 (Start with the people who use the service), Point 4.

8. **"Already gets support" is split.**
   - Feedback: F2 (the `already_supported` outcome).
   - A household on the Household Support Grant: "Your household already gets the grant." A household on the Older Persons Grant: explains the choice to switch, and that it is made at a CSC. Both can still report a change. Those households skip the recipient and payout pages.
   - Standards: Point 2 (Solve the whole problem, across every channel), Point 4.

9. **The list of changes follows regulation 9.**
   - Feedback: F2, F3.
   - "Someone has lost work or income" is replaced with "Someone has started a new job" (work expected to last more than 3 months). The "I'm not sure" answer on "has anything changed?" is removed. The question hints at the 30-day duty to report.
   - Cost: a household that has lost income has no way to say so in this flow, other than asking for a new survey. Recorded as an assumption for policy.
   - Standards: Point 4, Point 1.

10. **The CSC page no longer promises a CSC can change a payout account.**
    - Feedback: F4, C (payout model).
    - Standards: Point 6, Point 3 (Make it work for everyone, in their language).

## Worth testing in round 2

11. **Asking the applicant for another adult's phone number.** Hypothesis: it lets the payment system find a wallet when that adult has no KestriaID, and it gives somewhere for the neutral text to go. Risk: holding a third party's number. Tag: `[VERIFY WITH POLICY]`.
12. **The wallet question for Desa Haldry.** Hypothesis: people know which number their wallet is on, and "cash at a post office" reads as a real choice. Tag: `[VERIFY WITH USERS]`.
13. **The registered person's neutral text** (O2). The sheet says what it must not contain. The wording here is a draft ("SPA has received an update for their household"). Tag: `[VERIFY WITH USERS]`, and `[VERIFY WITH DEPARTMENT]` for the exact text.
14. **"Probably" and "SPA needs to visit your household" after reporting a birth.** Hypothesis: people read the second as a normal next step. Tag: `[VERIFY WITH USERS]`.

## Deferred

15. **Does the named recipient have to confirm?** (O1) The sheet is silent. The prototype names them and says so on the payout page. Waiting for a policy answer. Tag: `[VERIFY WITH POLICY]`.
16. **Signing in as an intermediary, or as Kel Varrin (no KUIN), or as Aru Danvell at a CSC.** The mock cannot do them. The rules are stated in copy, and logged as known gaps.
17. **Village committee confirmation on the no-KestriaID route.** The sheet's table says "village committee confirmation, then a survey visit". This prototype asks nothing of the committee yet.
18. **Calculating the first payment date.** The copy states the rule only.
19. **Kestrian, Vell and Sora text.** Still English only. Known gap.

## Rejected

20. **Showing "likely", "not likely" or any score as a band or percentage.** The sheet says the band never leaves SPA.
21. **Keeping the role question "to double-check".** It would ask the citizen for something government already holds (Point 5), and the mismatch notice from round 1 was a symptom.
22. **Keeping "Neela Vorlek" and the other invented members.** Anaïs's household is Mina (19), from the profile. Anaïs does not name a recipient in this flow, because her household already gets support.
23. **Reworking the declaration for reading age.** Not without SPA's agreement.
24. **Resolving any `[VERIFY WITH USERS]` item.** There were no users this round.

## Resolved assumptions (round 1) – profile evidence, not user evidence

See `assumptions.md` for the full list with file references. In short: the role question (derived), another adult seeing the household (any adult can apply), level 2 for reporting (sheet), naming a payee without the registered person agreeing (reg.6(3)), the declaration (plain, ETA 2020 s.6), eligibility rules, timings, the visit rules, KUIN-then-phone-then-cash payouts, `household` found from any adult's KUIN, *999# for progress, and four profile gaps.

## New assumptions

- Recipient does not have to confirm (`[VERIFY WITH POLICY]`).
- Holding a third party's phone number (`[VERIFY WITH POLICY]`).
- A wallet phone given at application is "naming", not a "change", so the SIM-swap hold may not apply (`[VERIFY WITH POLICY]`).
- Loss of work or income is not a reportable change (`[VERIFY WITH POLICY]`).
- A new job's check takes about 4 weeks (`[VERIFY WITH DEPARTMENT]`).
- How to ask for a new survey, and what "other help" is (`[VERIFY WITH DEPARTMENT]`).
- The exact neutral text to the registered person (`[VERIFY WITH DEPARTMENT]`).
- What happens when a household that already gets support reports a change (`[VERIFY WITH DEPARTMENT]`).
- In the real service SPA works out the outcome; the page applies the sheet's rules (`[VERIFY WITH PLATFORM]`).
- People read "probably" as "not decided yet" (`[VERIFY WITH USERS]`).
- People know which number their wallet is on (`[VERIFY WITH USERS]`).

## Unchanged

Chrome, neutral style and class names (`.xstack-banner`, `.xstack-assumptions`, `.verify-tag`, `.fake-data`). The Back links, the error pattern (error summary plus inline errors, `aria-invalid`, `aria-describedby`, `novalidate`), the 320px layout, and the unmodified `references/dpi-mock.js`. The known mock gaps (payouts, consent screen, assurance level, languages, confirmation page Back link) are kept.

## Profile gaps found

- The sheet does not say whether the named recipient confirms (O1).
- The sheet does not say what "other help" is, or how a household asks for a new survey.
- The exact text of the registered person's neutral SMS is not given.
- No timing for a new-job check.
- The sheet does not say what happens when a household already on the grant reports a change.
- `dpi-mock.js` still has no payout call, no notice mode, and no level-3 sign-in.
