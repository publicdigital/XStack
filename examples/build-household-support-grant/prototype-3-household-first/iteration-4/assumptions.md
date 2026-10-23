# Assumptions – Prototype 3 (Household-first), iteration 4

## Iteration 4 – Kestrian

- `[KNOWN GAP]` **Kestrian (*kestrin*) is an invented language.** Nobody speaks it. It shows layouts and the switcher working, but it never stands in for translation by real speakers. Source: `profiles/kestria/kestrian.md`.
- **Resolved (round 3):** the language switcher now works for Kestrian – every screen, error and title, and the simulated KestriaID, KesLink and GovPay screens. Vell and Sora still show a notice.
- `[KNOWN GAP]` **Some runtime text may be missed.** Text built from data at runtime is translated only where `kestrin/strings.json` has an entry or pattern for it. Journeys and the page sweep found nothing left, but routes not tested may have some. `xstackKestrin.missing()` lists anything still in English.
- `[KNOWN GAP]` **Size:** the strings add about 145 KB to the page, which is over `DESIGN.md`'s 100 KB budget.
- `[VERIFY WITH USERS]` **The switcher:** people can find and use it, and a shared phone left in another language doesn't confuse the next person.

---

The assumptions below are carried over from iteration 3 unchanged. The languages gap in them is now resolved for Kestrian.


Kestria is a fictional country, used for demonstration. This is the assumptions panel from `index.html`, as Markdown.

## The bet

Start from "what has changed in your household?", not "apply". Anyone aged 18 or over in the household can start. The outcome follows SPA's rules: some changes mean a survey visit, a new job is checked without a visit, and otherwise SPA's assessment applies. It is always "probably", never a final decision.

## This round

Styling only. The journey, rules and copy are the same as iteration 2, except the helpline number and the changes listed in `CHANGES.md`. No user testing, so no assumption about users is resolved.

## Question map

- **Name:** known, KestriaID claims. Fallback: ask on the contact page.
- **Phone to contact:** known, KestriaID `phone` claim. Always confirmed (it is often out of date, and may be shared). Fallback: ask.
- **District:** known, `address.district`, National Population Register. Fallback: ask, and a survey follows.
- **Household members, registered person, last survey:** known, `household`, National Social Registry via KesLink. Fallback: how many people live there, then a visit.
- **Is the signed-in person the registered person:** derived. We compare the sign-in name with `household.registeredPerson`. Not asked.
- **Already getting SPA support:** known, `programmes` and `hsgAssessment`. Missing: SPA checks in the back office.
- **Outcome:** derived from what is reported, then the fetched `hsgAssessment`. Never shown as a band or a score.
- **What changed:** ask (add-another).
- **Who receives the money:** ask. Choices come from `household.members` aged 18 or over.
- **Where we pay:** known for the signed-in person, `payoutAccount`, provider and last 4 digits or a masked phone only. For another adult: the rail finds it at payout time. If missing: ask for the phone the wallet is on.
- **Declaration:** ask, SPA's approved wording.
- **Not pulled:** date of birth, sex, KUIN, TIN, vehicle, tax, land, health. Not asked: disability or health.

## Assumptions

### Users

- [VERIFY WITH USERS] Households find "tell us what has changed" easier to start than "apply".
- [VERIFY WITH USERS] The adult who looks after the money will start this, and will find "who should receive the money" a normal question.
- [VERIFY WITH USERS] The registered person's neutral text (SPA has received an update for their household) does not put the person filling this in at risk at home or on a shared phone.
- [VERIFY WITH USERS] People hear "SPA needs to visit your household" as a normal next step, not as a refusal or an accusation. This includes after reporting a birth.
- [VERIFY WITH USERS] People read "probably" as "not decided yet".
- [VERIFY WITH USERS] People will report a death in a short form, without a person beside them. The copy is gentle and asks nothing about health.
- [VERIFY WITH USERS] "About 10 minutes" is right on a slow phone with a data bundle.
- [VERIFY WITH USERS] The household's names and ages shown after sign-in feel safe, not exposing, on a shared phone.
- [VERIFY WITH USERS] A person whose wallet is on their own phone knows which number it is on, and understands "cash at a post office" as the fallback.
- [VERIFY WITH USERS] *New this round.* "Part 2 of 4" helps people know how far they are, on a journey that changes length. The four parts (your household, what changed, payment, contact and declaration) are our own grouping.
- [VERIFY WITH USERS] *New this round.* The arrow, cross, tick and information icons help people with low literacy. The design system says so, but we have not tested it with this service.

### Policy

- [VERIFY WITH POLICY] The adult who is named as the recipient does not have to confirm it is them, or agree. The service sheet is silent. A real service would need a way to check it.
- [VERIFY WITH POLICY] We ask the applicant for the named adult's phone number. It is used for a neutral text, and to find a wallet if no account is linked to that adult's KestriaID. Is holding a third party's number acceptable?
- [VERIFY WITH POLICY] Giving a wallet phone number when no account is linked (route 2, at application) counts as naming, not as a change. The SIM-swap hold in the payout model may or may not apply.
- [VERIFY WITH POLICY] Losing work or income is not on the list of changes to report (reg.9), so it is no longer offered. Households that need more help can ask for a new survey.
- [VERIFY WITH POLICY] A request without KestriaID goes to a survey. The service sheet says "village committee confirmation, then a survey visit". Here, nothing is asked of the village committee yet.

### Department

- [VERIFY WITH DEPARTMENT] A new job only is checked against the band without a visit. The sheet gives no timing. This prototype says about 4 weeks.
- [VERIFY WITH DEPARTMENT] How a household asked for a new survey after "probably can't", and what "other help" is. The sheet does not say. This prototype lets them ask online and points to the GovKestria helpline.
- [VERIFY WITH DEPARTMENT] The exact wording of the neutral text to the registered person. The sheet gives the gist and the rules: no amount, outcome, band or recipient, no link, and it ends "SPA never asks for your PIN."
- [VERIFY WITH DEPARTMENT] What happens when a household that already gets support reports a change. This prototype applies the same rules as for any household.
- [VERIFY WITH DEPARTMENT] A request with no KestriaID and no household number goes to the district office's survey queue.
- [VERIFY WITH DEPARTMENT] *New this round.* The GovKestria helpline (+999 77 100 2000) replaces SPA's free line for every phone mention. The helpline may not have SPA staff who can answer questions about a household. The `*999#` short code stays, because it is a USSD code and not a phone number.

### Platform

- [VERIFY WITH PLATFORM] The Civil Registration Office already tells SPA about births and deaths. We ask anyway because the record may lag, and we do not pull `birthRecord`.
- [VERIFY WITH PLATFORM] In the real service SPA works out the outcome after a change is reported. Here the page applies the service sheet's rules itself, because the mock cannot.

### Known gaps in the prototype and the platforms

- [KNOWN GAP] **Payouts.** The mock has no payout contract, because `dpi.payments.create` takes money in. It is not called. The payout page is an ordinary service page with `fake data` markers.
- [KNOWN GAP] **Consent screen.** `dpi.data.fetch` always shows a yes/no consent screen, but SPA's pull is public task (s.13), so it should be a notice. A notice page comes first. "No" on the mock screen is treated as "carry on with manual answers and a survey".
- [KNOWN GAP] **Assurance level.** The mock always returns level 2 ("substantial"). Level 3 at a CSC is not simulated, so Aru Danvell cannot be signed in with his fingerprint. Changing who is paid after a decision is level 3 only, so it is never done here.
- [KNOWN GAP] **Intermediaries and no-KUIN people.** The mock cannot sign in an intermediary (such as Mina), or Kel Varrin (no KUIN). The rule that an intermediary cannot name themselves is stated on the start page but cannot be exercised. Mock v1.1 can model acting for someone. That is Deferred to the next round.
- [KNOWN GAP] **Languages.** The language switcher shows Kestrian, English, Vell and Sora. Only English works. The profile has no Kestrian, Vell or Sora text. Digital Government Act 2023, s.14 needs Kestrian and English. The profile does not give the names of Vell and Sora in those languages, so the switcher uses the English names.
- [KNOWN GAP] **No Back link on the confirmation page.** Going back would suggest the answers can be unsent. A departure from the build spec.

### Known gaps in the GovKestria design system (new this round)

Each has a stopgap in the third `<style>` block, built from tokens only. Propose each back to `DESIGN.md`.

- [KNOWN GAP] **Language switcher.** It has one link, for one other language. This page lists four, with the current one marked. The design system's link is 40px high, below the 48px minimum. A stopgap sets 48px. Iteration 2's buttons were 44px.
- [KNOWN GAP] **Phase banner.** There is none. The line under the header is the stopgap from `design-system.md`.
- [KNOWN GAP] **Checkbox.** There is none. The declaration stays a checkbox, because the journey and the validation do not change this round. The stopgap reuses the radio, square and with a tick.
- [KNOWN GAP] **Date input.** There is none, and no narrow width classes. Three `kg-input` fields in a fieldset, with widths built from space tokens.
- [KNOWN GAP] **Select.** There is none. The 38 districts, and the list of household members, use a `kg-input` select.
- [KNOWN GAP] **Summary list.** There is none. A `dl` with hairline rules, a "Change" or "Remove" link on each row, and the source in `kg-hint`.
- [KNOWN GAP] **Household strip and notes.** There is no pattern for "You're telling us about household …" or for a plain note (the PIN reminder, the privacy note, the sample text). Both use a `surface-alt` box. The strip has an information icon. The design system's warning notice is not used, because its fill is the accent, which is already used in the header.
- [KNOWN GAP] **Progress.** The tag takes a count, but this journey branches, so a "Question 3 of 6" count would be wrong. The tag shows "Part N of 4" instead.
- [KNOWN GAP] **Lists and link targets.** There are no list styles, and a link on its own line is shorter than 48px. Stopgaps add the list spacing and a 48px target.
- [KNOWN GAP] **Radio hints.** `.kg-radio span::before` matches every `span` inside a radio label. Hints inside a radio use `<small class="kg-hint">`, and the `fake-data` span has its pseudo-elements switched off.
- [KNOWN GAP] **Sentence length.** Many sentences are longer than 15 words. This round did not rewrite the copy. A plain-language review is next.
- [KNOWN GAP] **Page weight.** This file is over 100 KB, because it holds the design system, the DPI mock, all the pages and this panel. The live service would not.

## Resolved (round 1)

Settled by the Kestria profile and the service sheet, not by users. Nothing here has been tested with people. Nothing new is resolved in round 2 (styling only, no testing).

- "Adults know whether the household is registered under them; 'I'm not sure' catches the rest." → No longer needed. Derived by comparing the sign-in name with `household.registeredPerson` (`profiles/kestria/dpi.md`, Value shapes; the Tessa Ondrey persona).
- "Another adult in the household may see the other members' names after signing in at level 2." → Any adult can apply, and the household is found from any adult member's KUIN (`services/household-support-grant.md`, Who can apply; `dpi.md`, `household` row). Ages are still open (see users).
- "Telling SPA about changes as another adult is not acting for someone else; level 2." → Report a change is level 1 if they applied before, otherwise level 2. Acting for someone is only through an intermediary record at a CSC (service sheet, sign-in table; reg.7).
- "An adult can name the payee without the registered person agreeing; only a neutral text goes to the registered person." → Yes (service sheet, reg.6(3)). The exact text wording and whether the recipient must confirm are still open.
- "The declaration is a plain statement, not a statutory declaration." → Confirmed. It is plain and needs no assurance level (service sheet, Electronic Transactions Act 2020, s.6). The statutory-declaration reasoning in round 1 was wrong. The wording is now SPA's approved text.
- "Eligibility is the lowest welfare bands and no other SPA cash programme." → Band A or B, record surveyed or confirmed in the last 3 years, no other SPA cash programme. Only the assessment is shown (service sheet, Who can get it).
- "Decision about 4 weeks; 8 to 10 weeks if there is a visit." → Timings now from the service sheet, including up to 4 more weeks in the rainy season (March to June) in the Northern Plains and Lake Region.
- "A visit follows for any change, 'not sure', no record, or a survey 4 or more years ago." → Replaced by the sheet. A birth, death, someone joining or leaving, or a move means a survey. A new job is checked without a visit. Otherwise `hsgAssessment` applies.
- "SPA can pay an adult who is not the registered person, finding the account from their KUIN, then phone, then post office cash." → Yes (`dpi.md`, Payouts; service sheet, Who gets paid).
- "The KesLink `household` lookup returns the household for any adult member's KUIN." → Yes (`dpi.md`, `household` row).
- "'Check progress' works by *999# and by replying STATUS." → *999# with a reference number and phone. Replying STATUS is not in the profile, so it is dropped (service sheet, sign-in table).
- Gaps closed by the profile: the phone number claim; the shape of `address` and `household`; the full list of 38 districts (`world.md`); a persona who is not the registered person (Tessa Ondrey).

## Security must-nots built in

- No names, household details or amounts before sign-in. The start and KestriaID pages are neutral.
- Never asks for a PIN, a full account number or a KUIN. "SPA never asks for your PIN" is on the payout page and the confirmation page. A typed wallet phone number is shown masked afterwards.
- Never shows a band or a score. No "you qualify" wording anywhere. Texts never say an amount, an outcome, the band or who is paid.
- The payout account is shown as provider and last 4 digits, or a masked phone. It is never edited here. Changing who is paid or the route after a decision is a CSC at level 3.
- Every route works without a KUIN. The KestriaID question comes first.
- "You're telling us about [household]" and who is filling it in are shown on every page after the household step.

## Researcher notes

- **Ines Kestel:** registered person, nothing reported. "Probably" and about 4 weeks. Payout: Lumo Money ending 7782. Report a birth to see the survey.
- **Tessa Ondrey:** another adult (Marek is registered). Name herself, or Marek, or Wena. Her own payout is Kora Wallet ending 2290. For Marek or Wena, see how the rail finds them.
- **Talin Vorsa:** record is old, so a survey. Report that the household moved, or a birth.
- **Sefa Tormik:** no household found. Survey, shown as normal.
- **Desa Haldry:** household found, no account linked. The payout page asks for the phone her wallet is on.
- **Mirel Okand:** probably can't get it. Ask for a new survey, or go back and report a change.
- **Anaïs Vorlek:** already gets the Older Persons Grant. The choice to switch is at a CSC.
- **Aru Danvell:** sign-in fails.
- To see the refused route, sign in as anyone and choose "No, I will type them in" on the simulated screen, or "Answer the questions myself instead".
- To see the no-KestriaID route, choose "No, or I'm not sure" on the KestriaID page.
- All names, numbers and years in this prototype are made up.
