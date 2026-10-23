# Iteration 2 – Prototype 1 (Once-only, phone-first)

**Round of feedback:** internal critique, 2026-10-23 (`../feedback-round-1.md`). **No user testing.** Kestria is fictional, so nothing here is evidence about users. No `[VERIFY WITH USERS]` assumption was resolved.

**Profile:** Kestria (`profiles/kestria/`). Rules and fixed wording come from `services/household-support-grant.md` (the service sheet). Data, personas and the payout model come from `dpi.md`. Standards are cited as points of the Kestria Digital Service Standard.

**Feedback references:** "W1" to "W5" are the numbered items under *What didn't work*. "O1" and "O2" are the bullets under *Observed but unresolved*. "C" is *Constraints surfaced*. "WW" is *What worked*.

Iteration 1 is untouched. It stays in `../index.html`.

## Critical changes applied

1. **Who receives the money now comes before the payout route.**
   - Feedback: W1. The account was confirmed before the person said who gets paid, so a named recipient meant the confirmed account was the wrong one.
   - Now: outcome, then "Who should receive the money?", then the route page. "Me" is the default. Another adult comes from `household.members` aged 18 or over, excluding the applicant. The applicant is found by name, not by `relationship: 'self'`, because `self` means the registered person (Tessa is not).
   - Without a household list (no KestriaID, no record, refused) the person types a name.
   - Changing the recipient from Check your answers sends the person to the matching route page, so a stale route is never kept.
   - Standard: Point 4 (Keep it simple and in plain words), Point 5 (Don't ask for what government already knows).

2. **The outcome is driven by the fetched `hsgAssessment`, not hard-coded.**
   - Feedback: W2 and W4. Mirel was told she "can probably get the grant". There was one positive page.
   - Now: `likely`, `not_likely`, `needs_survey` and `already_supported` each have a page, with the service sheet's messages. `not_found` (Sefa) and a missing assessment are framed as `needs_survey`, which the page says is "a normal next step, not a rejection". Mirel now gets `not_likely`. The band is never returned, so it cannot be shown.
   - A reported change (birth, death, someone joining or leaving, a move) or a wrong household list turns the outcome into `needs_survey`. A new job is checked without a visit. The manual routes are always `needs_survey`.
   - `not_likely` offers a new survey visit, other help (free line, `*999#`, CSC) and Finish. It does not offer a plain "apply anyway" (see assumptions).
   - `already_supported` splits in two: already on the grant, or on the Older Persons Grant with the choice to switch at a CSC (Anaïs).
   - Standard: Point 1 (Start with the people who use the service), Point 4 (Keep it simple and in plain words), Point 6 (Protect people's data and earn their trust).

3. **`PERSONA_EXTRAS` is deleted. All page data comes from the mock.**
   - Feedback: W3 and C (the data). `PERSONA_EXTRAS` invented phone numbers, members and bands, and split a free-text address on commas.
   - Now: `KESTRIA_PERSONAS` is pasted verbatim from `dpi.md`. The mock is created with the service sheet's persona filter and the attributes block from `dpi.md`. District, village, members, the assessment and the payout route are read from the `dpi.data.fetch()` values. The phone comes from the sign-in `phone` claim. `references/dpi-mock.js` is inlined unmodified.
   - `missing` is handled per attribute, with a page that says what happens instead:
     - `address` is missing: ask for the district.
     - `programmes` is missing: carry on, SPA checks.
     - `hsgAssessment` is missing: `needs_survey` framing.
     - `payoutAccount` is missing (Desa): ask for the phone her wallet is on (route 2), or offer cash (route 3).
   - Standard: Point 5 (Don't ask for what government already knows), Point 7 (Build on the national platforms).

4. **Invented rules and wording replaced by the service sheet's.**
   - Feedback: W5.
   - Declaration: SPA's approved wording, word for word. Not reworded for reading age, because that needs SPA's agreement.
   - Text message: "SPA: we have your request. Ref HSG-… Dial *999# to check. SPA never asks for your PIN." The reference stays `HSG-` plus 7 digits.
   - Timings: about 4 weeks if `likely`. If a visit is needed, a visit within 6 weeks and a decision within 10 working days, so 8 to 10 weeks in all. The rainy-season note (March to June, up to 4 more weeks) shows for Northern Plains and Lake Region households.
   - Payment: K 1,500 on the 5th of each month. The first payment is the first cycle at least 7 days after the decision. No back pay.
   - Who can apply: any adult. The start page now says so.
   - Check progress: `*999#` with reference and phone, or sign in. The invented "reply to our text" is removed.
   - "SPA never asks for your PIN" appears on the start, payout and confirmation pages.
   - Standard: Point 4 (Keep it simple and in plain words), Point 6 (Protect people's data and earn their trust).

## Important changes applied

5. **The payout route page now depends on who is paid.**
   - Feedback: O1, C (payout model).
   - Applicant, account found: shows the route from `payoutAccount`. `kuin` shows provider and last 4. `msisdn` shows the masked phone. `cash` shows a post-office voucher.
   - Applicant, "No, that is not right": the page says the account belongs to the person and their provider, so government cannot edit it, and that relinking the KUIN is done at the provider. For this application the person picks route 2 or 3. Nothing is edited inline. The old CSC-only page is gone.
   - Someone else: the applicant sees no account. The page explains the order the rail uses at payout time (account linked to their KUIN, then their phone, then a cash voucher). It asks for their phone for the short text. Both open questions carry `[VERIFY WITH PLATFORM]` and `[VERIFY WITH POLICY]`.
   - After a decision, changing recipient or route is a CSC at level 3. It starts from the first payment day at least 7 days later, with texts to the old and new numbers. This is stated on the pages, not built (see Known gaps).
   - Standard: Point 5 (Don't ask for what government already knows), Point 6 (Protect people's data and earn their trust), Point 2 (Solve the whole problem, across every channel).

6. **The registered person is not named in the recipient's text.**
   - Feedback: C (the service sheet, reg.6(3)).
   - The payee page and confirmation say the registered person gets only a short text that SPA has an update for the household. This shows when the applicant is not the registered person (Tessa) or names someone else.
   - Standard: Point 6 (Protect people's data and earn their trust).

7. **The changes page uses the reportable changes in the regulations.**
   - Feedback: C (reg.9).
   - "Someone lost work or income" is replaced with the five listed changes. A new job is the only one that does not need a visit.
   - Standard: Point 4 (Keep it simple and in plain words).

8. **Date of birth is not used to check age.**
   - Feedback: C (data).
   - The start page says "Anyone aged 18 or over". The recipient list uses `household.members` ages without showing them.
   - Standard: Point 5 (Don't ask for what government already knows), Point 6 (Protect people's data and earn their trust).

9. **The notice page lists exactly what is pulled.**
   - Feedback: C (data), O2.
   - It now lists the district and village, the household, support already received, whether the household can probably get the grant, and the payout account (provider and last 4 only). The `[KNOWN GAP]` about the mock's consent screen stays.
   - Standard: Point 6 (Protect people's data and earn their trust).

## Worth testing in the next round

10. **"Me" is already selected on "Who should receive the money?"** Matches the sheet's default and saves a step. It might push people to name themselves when someone else looks after the money. `[VERIFY WITH USERS]`.
11. **The `not_likely` page.** The h1 is the sheet's full sentence. It might be read as a final no, and discourage a household whose situation has changed. `[VERIFY WITH USERS]`.
12. **The outcome sentence is split.** The sheet's messages are split across the h1 and the first paragraph, for example "Your household can probably get the grant" and "SPA will check and tell you within about 4 weeks." Read together they match the sheet. Whether the h1-first form reads better than one long sentence is untested.
13. **Choosing a different route during the application.** The applicant can pick a wallet phone or cash at level 2 before a decision. `[VERIFY WITH POLICY]`.

## Deferred

14. **Authorised intermediaries** (Anaïs with Mina). Needs a CSC-made record and a new journey. The rule that an intermediary cannot name themselves as recipient is therefore not enforced. Revisit with prototype 2 (assisted at a CSC).
15. **Level 3 changes after a decision** (CSC, fingerprint). The mock cannot sign someone in at level 3. Aru still ends at "We could not sign you in". Revisit when the mock has a level 3 path.
16. **Real payout mock.** Stays a `[KNOWN GAP]` until `dpi-mock.js` has a payout call.
17. **Kestrian, Vell and Sora text.** The profile has none.

## Rejected

18. **Show a vague hint of the band to `not_likely` households ("close to the line").** Rejected. The band never leaves SPA. A person can ask SPA for it under the Data Protection Act 2022, s.20, as a separate request.
19. **Let a `not_likely` household "apply anyway" in the same flow.** Not built. The sheet describes only a new survey request for them, and says nothing about a direct application. Raised as an assumption for the department.
20. **Use `relationship: 'self'` to find the applicant.** Rejected. It means the registered person, not the signed-in person.

## Resolved assumptions

Resolved by the profile and service sheet, so this is department and profile evidence, not user evidence. Each is listed under "Resolved (round 1)" in the panel with its source.

- Eligibility rules, the grant amount and payment day, the timings, the outcome messages, the declaration and text wording, who can apply and be paid, sign-in levels, how to check progress.
- The fallback order when there is no account (KUIN, phone, cash), and that a wrong account is fixed at the provider.
- The data shapes, `payoutAccount` coming from the Treasury service, and a partial-result persona (Desa).

No `[VERIFY WITH USERS]` item was resolved. None could be.

## New assumptions

Added to the panel this round. All are untested. Tags are in the panel.

- `[VERIFY WITH PLATFORM]` `[VERIFY WITH POLICY]`: what the applicant sees when someone else is paid, whether that person should confirm, and whether asking for their phone is allowed.
- `[VERIFY WITH POLICY]`: choosing route 2 or 3 during the application is allowed at level 2.
- `[VERIFY WITH POLICY]`: a `not_likely` household can only ask for a survey.
- `[VERIFY WITH DEPARTMENT]`: a missing `hsgAssessment` is treated as `needs_survey`. A wrong household list or district makes `needs_survey`. The registered-person text wording is not in the sheet.
- `[VERIFY WITH DEPARTMENT]`: the rainy-season note shows for every Northern Plains and Lake Region household that needs a visit.
- `[VERIFY WITH PLATFORM]`: a wallet can be found from a phone number alone. A cash voucher by text is safe for a shared phone.

## Standards touched

- Point 1 (Start with the people who use the service): outcomes in the sheet's own words, not a single hopeful page.
- Point 2 (Solve the whole problem, across every channel): CSC after a decision, village committee, the free line and `*999#`.
- Point 4 (Keep it simple and in plain words): one question per page, the sheet's messages, short sentences.
- Point 5 (Don't ask for what government already knows): everything on the pages comes from sign-in claims and the fetch.
- Point 6 (Protect people's data and earn their trust): no band, neutral texts, no account shown for another person, no inline account edits.
- Point 7 (Build on the national platforms): mock set up from the profile's configuration and personas.
- Accessibility is unchanged: the error pattern, the Back links, the 320px layout and the focus handling are all kept. The `<ol>` list is styled like the `<ul>` ones.
- Not checked: Point 3 (Make it work for everyone, in their language) and Point 11 (Keep it running, on any network). No translation exists, and the page has not been run on a real phone.
