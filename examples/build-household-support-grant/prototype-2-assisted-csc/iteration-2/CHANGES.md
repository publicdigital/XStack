# Iteration 2 – Prototype 2 (Assisted at a Citizen Service Centre)

**Profile:** Kestria (`profiles/kestria/`). Standards are cited from the Kestria Digital Service Standard by point number and title.

**Round of feedback:** `feedback-round-1.md`, Path B (structured feedback). Internal critique plus profile changes, 2026-10-23.

**Evidence:** none from users. There was no user testing. Every resolution below rests on the **service sheet** (`profiles/kestria/services/household-support-grant.md`) or **`dpi.md`**. That is profile evidence, not user evidence. No `[VERIFY WITH USERS]` item was resolved, and none was added or removed.

Feedback items are numbered as in `feedback-round-1.md`: "What didn't work" 1 to 6, and "Observed but unresolved" O1 and O2.

## Critical changes applied

1. **`PERSONA_EXTRAS` deleted. Every page reads structured values from `dpi.data.fetch()`.**
   - Feedback: 5.
   - `KESTRIA_PERSONAS` is pasted verbatim from `dpi.md`. The mock is built with the service sheet's persona filter and `dpi.md`'s `attributes` block (district and village, household, programmes, `hsgAssessment`, `payoutAccount`). I added `latencyMs: 600` as in iteration 1, and wrapped the config in a `makeDpi()` function, so I can build the mock twice (change 2).
   - District, members, last survey, programmes, assessment and payout account all come from the fetched values. The invented members, bands and districts are gone.
   - Each attribute in `missing` has its own handling:
     - `address`: ask for the district.
     - `household`: book a survey visit.
     - `programmes`: carry on.
     - `hsgAssessment`: "We cannot say yet", and carry on.
     - `payoutAccount`: ask for a phone number or offer a cash voucher.
   - Point 5 (Don't ask for what government already knows), Point 7 (Build on the national platforms).

2. **Aru Danvell is rescued by the CSC fingerprint route.**
   - Feedback: 4.
   - After the simulated fingerprint match, the sign-in uses a second mock built from a copy of the personas with `signIn: 'failed'` removed. The copy is derived in code from `KESTRIA_PERSONAS`. The pasted array is not edited.
   - Card check, "try again", and every other route use the unchanged personas, so an online-failed person still fails there. If Aru is checked by card and fails, the failed page offers to ask about a fingerprint check again.
   - `[KNOWN GAP]`: the mock has no level 3.
   - Point 3 (Make it work for everyone, in their language), Point 1 (Start with the people who use the service).

3. **The officer can no longer edit a payout account. A CSC changes the recipient and the route only.**
   - Feedback: 2.
   - The old "change where we pay" screen (mobile money number, cash) is replaced by a route page.
   - With a fingerprint check and the person at the desk applying for themselves, the officer can choose the route in the order from `dpi.md`: keep the account linked to their KestriaID, a phone number, or a cash collection voucher.
   - Pages say that an account is changed at the citizen's own bank or wallet provider.
   - A change starts from the next payment cycle at least 7 days away. The texts go to the number on record and the new number, using the sheet's exact wording. A recent SIM swap holds the change; this is officer guidance.
   - Point 6 (Protect people's data and earn their trust).

4. **Who receives the money now comes before how it is paid.**
   - Feedback: 1.
   - Any adult member can be named. Children are not offered.
   - The route page works from the chosen recipient. For another recipient it does not pretend to know their account: it says it is found from their KestriaID, or offers a phone number or voucher if they have no KestriaID.
   - If the applicant is not the registered person (Tessa Ondrey), the page says the registered person gets a neutral text.
   - Point 4 (Keep it simple and in plain words), Point 6.

5. **An authorised intermediary can apply but cannot be the recipient or change the route. This is enforced in the flow.**
   - Feedback: 6 (what an intermediary may do).
   - The person acting for the household (for example Mina for Anaïs) is left out of the recipient list. If their name still gets through, a check refuses it. On the survey route, the optional recipient box refuses their name.
   - The route page is read-only for them.
   - The "acting for" check now asks for the authorised record, less than 12 months old.
   - Point 6, Point 3.

6. **The invented rules and wording are replaced with the sheet's.**
   - Feedback: 6.
   - The declaration is the sheet's approved wording, word for word, with the penalty. It is not reworded. The "I am acting for this household" prefix is removed, because it was not in the sheet.
   - Timings are the sheet's: about 4 weeks (20 working days), 8 to 10 weeks with a survey, up to 4 more weeks in the rainy season in the Northern Plains and Lake Region, and the first payment on the 5th, at least 7 days after the decision.
   - The text wording is the sheet's, ending "SPA never asks for your PIN." Our made-up "reply STATUS" is gone.
   - The reference format is `HSG-` plus 7 digits.
   - The made-up "level 2" for a card check is removed. The sheet gives that check no number.
   - The list of changes to report is the sheet's reg.9 list.
   - Point 4, Point 6.

7. **The CSC in the strip follows the citizen.**
   - Feedback: 3.
   - Before sign-in the strip says "Citizen Service Centre". After the lookup it names a CSC in the citizen's `address.district`, for example "Aranport Central Citizen Service Centre" for Mirel. The same name goes on the slip and in the audit log.
   - Point 1.

## Important changes applied

8. **The outcome is driven by the fetched `hsgAssessment`, with the sheet's messages.**
   - Feedback: 6.
   - `likely`, `needs_survey`, `not_likely` and `already_supported` each have the sheet's wording.
   - A reported birth, death, someone joining or leaving, or a move turns the outcome into `needs_survey`. New work does not; it is checked without a visit.
   - `not_likely` offers a new survey or "nothing more today". Nobody is told a reason, and the band is never shown.
   - Point 4, Point 2 (Solve the whole problem, across every channel).

9. **`already_supported` for Anaïs (Older Persons Grant) offers the switch, which the CSC can make.**
   - Feedback: 6.
   - The officer reads the choice aloud, with both amounts. When someone is acting, the officer must confirm that Anaïs herself said yes.
   - If the household says no, the page says nothing has changed.
   - If the household says yes, the application continues from the recipient question.
   - Point 2, Point 3.

10. **The route without a KestriaID follows the sheet.**
    - Feedback: 6.
    - The steps are village committee confirmation, then a survey visit, then a cash voucher.
    - The committee page records who, and in which of three ways the household is confirmed.
    - The confirmation page explains the voucher and the documents accepted at a post office: a KestriaID card, a birth certificate, a voter card, or a letter from the village committee.
    - The rainy-season warning shows on the start of the route.
    - Point 2, Point 3.

11. **The card check is shown as the alternative to a fingerprint, with its limits.**
    - Feedback: O1.
    - A card check can apply and name the recipient. It cannot change the route.
    - Point 3, Point 6.

12. **The printed slip no longer says who is paid or how, and gives the same timing to everyone.**
    - Feedback: 6. This follows the sheet's rule that texts never say the recipient or the outcome. It applies the same thinking to paper that can be shared.
    - Iteration 1 gave different timings on the slip for a survey and a normal application, which hinted at the result.
    - The slip stays, and prints on its own.
    - Point 6.

13. **Reference data and form details tightened.**
    - Feedback: 5, 6.
    - Districts come from the 38 in `world.md`, and a typed district must be one of them.
    - The district box asks for district and village only.
    - The contact page now shows the number on record, masked, and asks whether to use it.
    - Phone numbers shown anywhere show only the last 3 digits.
    - Point 5, Point 6.

14. **The notice and the "missing" page now match what is fetched.**
    - Feedback: 5.
    - The notice lists the five things looked up, including SPA's own check and the provider and last 4 digits only.
    - Point 6.

## Worth testing next round (no user evidence yet)

15. **A card check works for applying and naming the recipient, but not for a route change.**
    - Feedback: O1. `[VERIFY WITH POLICY]`
    - Hypothesis: officers will find the line between "name the recipient" and "change the route" clear.

16. **Choosing a route at application needs a fingerprint check.**
    - The sheet states the level 3 rule for changes after a decision. We applied it to application too. `[VERIFY WITH POLICY]`

17. **The officer confirms the Older Persons Grant holder wants to switch, when someone else is acting.**
    - The sheet is silent on whether an intermediary can choose the switch. `[VERIFY WITH POLICY]`

18. **The form of village committee confirmation** (here, or letter, or later). `[VERIFY WITH POLICY]`

19. **Officers reading the declaration word for word in Kestrian, Vell or Sora.**
    - There is no approved translation, so they translate live. `[VERIFY WITH DEPARTMENT]`

## Deferred

20. **A separate journey to change the recipient or route after a decision.**
    - This round covers choosing them at application. The sheet's after-decision rule (level 3 at a CSC, or with the village committee letter) needs its own start.
21. **Check progress at a CSC by reference number.**
    - The sheet lists it. The slip and text give `*999#` and the free line only.
22. **A real level 3 sign-in, a SIM-swap check and a payout call in the mock.**
    - `dpi-mock.js` has none. They stay as `[KNOWN GAP]` items.
23. **A test person for a counter-side card check, and for Kel Varrin.**
    - Kel is tested by choosing "No, or not sure" at the start, not in the mock.
24. **What to do when `hsgAssessment` comes back missing.**
    - The handling exists, but no test person triggers it.

## Rejected

25. **Editing the pasted `KESTRIA_PERSONAS` array to patch Aru.**
    - It would have hidden the mock's real gap. The copy is derived in code instead.
26. **Showing the officer a reason, band or score for `not_likely`.**
    - The sheet says the band never leaves SPA.
27. **Letting the officer type an account number to change an account.**
    - Not allowed under the payout model. Account changes happen at the citizen's provider.
28. **Rewording the declaration for reading age.**
    - The sheet allows it only with SPA's agreement.
29. **Letting a village digital champion act for someone.**
    - The sheet says champions are not intermediaries.

## Resolved assumptions

Resolved from the profile (cited in the panel, "Resolved (round 1)"):

- What an intermediary may do: `services/household-support-grant.md`, "Who can apply, and who gets paid".
- Outcomes, amount and timings, the rainy season, the reference format and the declaration wording: the same file, plus `world.md`.
- How a payout change is made at a CSC, and how another recipient's money is found: `dpi.md`, Payouts.
- District, members and band invented in `PERSONA_EXTRAS`, and the phone number on record: `dpi.md`, Value shapes and Mock configuration.
- That the village committee still confirms, that a card check is allowed, and that progress is checked by `*999#`: the sheet's sign-in table and "Messages".

Still open from iteration 1 (the sheet only partly settles these): the level number for a card check, and what form committee confirmation takes.

## New assumptions

- Aru's workaround, with the mock's missing level 3 (`[KNOWN GAP]`).
- A route choice at application needs a fingerprint (`[VERIFY WITH POLICY]`).
- Switching from the Older Persons Grant: who may choose it, the timing, and what happens to payments meanwhile (`[VERIFY WITH POLICY]`).
- "The people are wrong" leads to a survey (`[VERIFY WITH POLICY]`).
- The registered-person text wording is ours (`[VERIFY WITH POLICY]`).
- Other help for `not_likely` is only the free line (`[VERIFY WITH DEPARTMENT]`).
- The CSC name follows `address.district`, which is wrong for Talin, whose record is out of date (`[KNOWN GAP]`).
- The mock cannot show another recipient's account, and cannot check SIM swaps or send texts (`[KNOWN GAP]`).
- The made-up number kept for route 2 is only shown masked (`[VERIFY WITH PLATFORM]`).
- No approved translation of the declaration (`[VERIFY WITH DEPARTMENT]`).

## Kestria profile gaps hit this round

- The service sheet gives a card check no assurance level.
- The sheet does not say who may choose an Older Persons Grant switch, or how long it takes.
- The sheet gives no exact words for the registered person's text.
- There is no list of the 120 CSCs.
- No approved translations exist for any fixed wording.
