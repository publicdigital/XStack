# Assumptions – Prototype 3 (Household-first), iteration 2

The assumptions panel from `index.html`, as Markdown. Fictional Kestria. No user testing has happened, so no `[VERIFY WITH USERS]` item is resolved.

## The bet

Start from "what has changed in your household?", not "apply". Anyone aged 18 or over in the household can start. The outcome follows SPA's rules: some changes mean a survey visit, a new job is checked without a visit, and otherwise SPA's assessment applies. It is always "probably", never a final decision.

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

### Verify with users

- Households find "tell us what has changed" easier to start than "apply".
- The adult who looks after the money will start this, and will find "who should receive the money" a normal question.
- The registered person's neutral text (SPA has received an update for their household) does not put the person filling this in at risk at home or on a shared phone.
- People hear "SPA needs to visit your household" as a normal next step, not as a refusal or an accusation. This includes after reporting a birth.
- People read "probably" as "not decided yet". *(new, round 1)*
- People will report a death in a short form, without a person beside them. The copy is gentle and asks nothing about health.
- "About 10 minutes" is right on a slow phone with a data bundle.
- The household's names and ages shown after sign-in feel safe, not exposing, on a shared phone.
- A person whose wallet is on their own phone knows which number it is on, and understands "cash at a post office" as the fallback. *(new, round 1)*

### Verify with policy

- The adult who is named as the recipient does not have to confirm it is them, or agree. The service sheet is silent. A real service would need a way to check it. *(new, round 1; feedback O1)*
- We ask the applicant for the named adult's phone number. It is used for a neutral text, and to find a wallet if no account is linked to that adult's KestriaID. Is holding a third party's number acceptable? *(new, round 1)*
- Giving a wallet phone number when no account is linked (route 2, at application) counts as naming, not as a change. The SIM-swap hold in the payout model may or may not apply. *(new, round 1)*
- Losing work or income is not on the list of changes to report (reg.9), so it is no longer offered. Households that need more help can ask for a new survey. *(new, round 1)*
- A request without KestriaID goes to a survey. The service sheet says "village committee confirmation, then a survey visit". Here, nothing is asked of the village committee yet. *(sharpened, round 1)*

### Verify with department

- A new job only is checked against the band without a visit. The sheet gives no timing. This prototype says about 4 weeks. *(new, round 1)*
- How a household asks for a new survey after "probably can't", and what "other help" is. The sheet does not say. This prototype lets them ask online and points to the free line. *(new, round 1)*
- The exact wording of the neutral text to the registered person. The sheet gives the gist and the rules: no amount, outcome, band or recipient, no link, and it ends "SPA never asks for your PIN." *(new, round 1; feedback O2)*
- What happens when a household that already gets support reports a change. This prototype applies the same rules as for any household. *(sharpened, round 1)*
- A request with no KestriaID and no household number goes to the district office's survey queue.

### Verify with platform

- The Civil Registration Office already tells SPA about births and deaths. We ask anyway because the record may lag, and we do not pull `birthRecord`.
- In the real service SPA works out the outcome after a change is reported. Here the page applies the service sheet's rules itself, because the mock cannot. *(new, round 1)*

### Known gaps

- **Payouts.** The mock has no payout contract, because `dpi.payments.create` takes money in. It is not called. The payout page is an ordinary service page with fake-data markers.
- **Consent screen.** `dpi.data.fetch` always shows a yes/no consent screen, but SPA's pull is public task (s.13), so it should be a notice. A notice page comes first. "No" on the mock screen is treated as "carry on with manual answers and a survey".
- **Assurance level.** The mock always returns level 2 ("substantial"). Level 3 at a CSC is not simulated, so Aru Danvell cannot be signed in with his fingerprint. Changing who is paid after a decision is level 3 only, so it is never done here.
- **Intermediaries and no-KUIN people.** The mock cannot sign in an intermediary (such as Mina), or Kel Varrin (no KUIN). The rule that an intermediary cannot name themselves is stated on the start page but cannot be exercised. *(new, round 1)*
- **Languages.** The language switcher shows Kestrian, English, Vell and Sora. Only English works. The profile has no Kestrian, Vell or Sora text. Digital Government Act 2023, s.14 needs Kestrian and English.
- **No Back link on the confirmation page.** Going back would suggest the answers can be unsent. A departure from the build spec.

## Resolved (round 1)

Settled by the Kestria profile and the service sheet, not by users. Nothing here has been tested with people.

- "Adults know whether the household is registered under them; 'I'm not sure' catches the rest." → No longer needed. Derived by comparing the sign-in name with `household.registeredPerson` (`profiles/kestria/dpi.md`, Value shapes; the Tessa Ondrey persona).
- "Another adult in the household may see the other members' names after signing in at level 2." → Any adult can apply, and the household is found from any adult member's KUIN (`profiles/kestria/services/household-support-grant.md`, Who can apply; `dpi.md`, `household` row). Ages are still open (see users).
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
