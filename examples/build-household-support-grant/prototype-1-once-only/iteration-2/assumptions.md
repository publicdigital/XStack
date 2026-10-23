# Assumptions – Prototype 1 (Once-only, phone-first), iteration 2

The content of the prototype's assumptions panel. Kestria is fictional. There has been no user testing, so no `[VERIFY WITH USERS]` item is resolved.

## Question map

- **Name:** known, KestriaID claims. Fallback: ask.
- **Phone to contact you:** known, KestriaID `phone` claim. Confirmed, with a safe-number fallback.
- **District and village:** known, `address` (structured). Fallback: ask, and mark the household for a survey if they have moved.
- **Household members:** known, `household` (structured), National Social Registry via KesLink. Fallback: survey request.
- **Already getting SPA support:** known, `programmes`. Used on the "already supported" page. Unavailable: do not block.
- **Outcome:** derived, `hsgAssessment` (`likely`, `not_likely`, `needs_survey`, `already_supported`). The welfare band is never returned or shown. A reported change can turn the outcome into `needs_survey`.
- **Changes since the last survey:** ask (birth, death, someone joined or left, moved district, new job).
- **Who receives the money:** ask, before the payout route. Default: the applicant. Another adult comes from `household.members` aged 18 or over.
- **Where we pay:** known for the applicant, `payoutAccount` (provider and last 4, masked phone, or cash). Missing: ask for the phone the wallet is on (route 2) or offer cash (route 3). For someone else: the payment system finds their account at payout time.
- **Declaration:** ask. Wording from the service sheet.
- **Not pulled:** date of birth, sex, KUIN, TIN, vehicle, tax, land, health. Disability and health are not asked.

## Resolved (round 1)

Settled by the profile and service sheet. This is department and profile evidence, not user evidence.

- **Eligibility rules** (was "a demo assumption"): household in the National Social Registry, welfare band A or B, record surveyed or confirmed in the last 3 years, no member on another SPA cash programme. The band is never shown. Source: `profiles/kestria/services/household-support-grant.md`, "Who can get it".
- **Showing only the outcome is allowed.** The sheet defines the four outcomes and their messages, and says an online outcome is always "probably". Source: service sheet, "What an application can lead to". Whether "probably" creates a legal expectation stays open below.
- **The grant is K 1,500 a month, paid on the 5th.** The first payment is in the first cycle at least 7 days after the decision. No back pay. Source: service sheet, "What it is".
- **Timings:** about 4 weeks if likely (20 working days). With a survey visit, 8 to 10 weeks (visit within 6 weeks, decision within 10 working days of the visit). The rainy season (March to June) can add up to 4 weeks in the Northern Plains and Lake Region. Source: service sheet, "Timings".
- **Which changes make a visit necessary** (was "any reported change"): a birth, a death, someone joining or leaving, or a move. A new job is checked without a visit. "Lost income" is not a reportable change, so it is removed. Source: service sheet, "Changes a household must report".
- **Another SPA cash programme stops the application,** and a household on the Older Persons Grant can choose to switch at a CSC. Source: service sheet, rule 4 and the `already_supported` row.
- **Who can apply and who can be paid:** any adult in the household can apply. Any adult member can be named as recipient, defaulting to the applicant. The registered person gets only a neutral text. An intermediary cannot name themselves. Source: service sheet, "Who can apply, and who gets paid".
- **Sign-in level for applying online is 2.** Changing the recipient or route after a decision is level 3 at a CSC only. Source: service sheet, sign-in table.
- **The declaration is a plain declaration** and needs no particular assurance level (Electronic Transactions Act 2020, s.6). The wording is SPA's approved text. Source: service sheet.
- **Checking progress** is level 1 online, or reference and phone by `*999#`. The invented "reply to our text" route is removed. Source: service sheet, sign-in table.
- **Text-message wording and reference format.** Every text ends "SPA never asks for your PIN." The reference is `HSG-` plus 7 digits. Source: service sheet, "Messages".
- **No account, no KUIN: the fallback order** is the account linked to the KUIN, then the phone number, then a cash voucher that needs no KUIN (National Identity Act 2020, s.19). Source: `dpi.md`, Payouts.
- **A wrong payout account is fixed by relinking at the provider,** not by government editing it. Before a decision the applicant picks another route in the application. After a decision it is a CSC at level 3. This replaces "carry on and change it at a CSC before the first payment". Source: `dpi.md`, Payouts.
- **`payoutAccount` comes from the Treasury disbursement service,** not from KesLink. Source: `dpi.md` data catalogue. The mock still treats it as one pull (see Known gaps).
- **The data shapes.** Phone is a claim. Address, household, programmes and payout account are structured, and the mock returns them. The page no longer invents phone numbers or members, or splits an address on commas. Source: `dpi.md`, Value shapes and Mock configuration.
- **A partial-result persona exists:** Desa (household found, no payout account). Source: `dpi.md` personas and service sheet.

## Assumptions

- `[VERIFY WITH USERS]` People with a smartphone, a working KestriaID phone number and the wallet app can sign in at level 2 and finish in about 10 minutes.
- `[VERIFY WITH USERS]` The start page works as the landing page for a neutral SPA text message, and people trust it.
- `[VERIFY WITH USERS]` Asking "Do you have a KestriaID?" first does not make people without one feel like second-class applicants.
- `[VERIFY WITH USERS]` "I'm not sure" is a common answer. The no-KestriaID page helps those people decide.
- `[VERIFY WITH DEPARTMENT]` "About 10 minutes" is realistic. The happy path is 11 pages, not the "about 6" in the brief. Testing should show which pages could merge.
- `[VERIFY WITH POLICY]` Showing "probably" does not create a legal expectation, even with the line "This is not a final decision."
- `[VERIFY WITH POLICY]` SPA's pull is public task (Data Protection Act 2022, s.13), so it needs a notice, not a consent request. Every pull appears in "Who has used my data".
- `[VERIFY WITH USERS]` People read the data-use notice and understand the plain-language version of the legal basis.
- `[VERIFY WITH PLATFORM]` SPA is an X-Road subsystem that can call its own National Social Registry for `household`, `programmes` and `hsgAssessment`, and a MyData record is written for each pull.
- `[VERIFY WITH DATA]` About 17% of phone numbers on record no longer work. The service always asks the person to confirm the number, and offers another.
- `[VERIFY WITH POLICY]` It is lawful to show the names of other household members, including children, to the signed-in applicant. The prototype shows names and "adult" or "child" only, never ages or dates of birth.
- `[VERIFY WITH USERS]` People can tell if the household list is right. "Someone is missing" leads to a survey visit.
- `[VERIFY WITH DEPARTMENT]` Saying the household list or the district is wrong makes the household `needs_survey`. The sheet lists moves and joiners but not "the list is wrong" in general.
- `[VERIFY WITH USERS]` People will report changes honestly, and understand the five change options without a definition.
- `[VERIFY WITH DEPARTMENT]` An unavailable `programmes` lookup never blocks an application. SPA checks in the back office. The sheet does not say.
- `[VERIFY WITH DEPARTMENT]` A missing `hsgAssessment` is treated like `not_found`: the framing is "SPA needs to visit". The sheet only covers `not_found` for the whole pull.
- `[VERIFY WITH USERS]` "Your household probably can't get the grant" is read as "from the records we hold", not as a final no. It does not stop someone whose situation has changed from asking for a survey.
- `[VERIFY WITH POLICY]` A household assessed `not_likely` can only ask for a new survey visit. It cannot send an application without one. The sheet says how to ask for a new survey but not whether an application is also allowed.
- `[VERIFY WITH DEPARTMENT]` "Other help" for a `not_likely` household is the free line, `*999#` and a CSC. The profile has no list of other programmes.
- `[VERIFY WITH USERS]` "Me" being already selected on "Who should receive the money?" does not push a person to name themselves when someone else looks after the money.
- `[VERIFY WITH PLATFORM]` `[VERIFY WITH POLICY]` When someone else is the recipient, the applicant sees only how the account will be found, never the account. Should that person confirm it themselves, and is asking the applicant for their phone number allowed? Open question from round 1.
- `[VERIFY WITH POLICY]` Before a decision, an applicant at level 2 can choose route 2 (a wallet phone number) or route 3 (cash) instead of the account found. The sheet says changes after a decision need level 3.
- `[VERIFY WITH PLATFORM]` A wallet can be found from a phone number alone at payout time (KesPay account lookup, party type `MSISDN`). The masked number is enough for the applicant to recognise it.
- `[VERIFY WITH DEPARTMENT]` The neutral text to the registered person (when the recipient or applicant is someone else) says only that SPA has an update for the household. The exact wording is not in the sheet. The prototype describes it and does not quote it.
- `[VERIFY WITH PLATFORM]` A cash voucher number and code are sent by text or printed at a CSC. For a shared phone, the CSC slip is the safer choice, and the page says so.
- `[VERIFY WITH DEPARTMENT]` The rainy-season note is shown to every Northern Plains and Lake Region household that needs a visit, not only when the visit falls between March and June.
- `[VERIFY WITH POLICY]` The declaration is shown word for word. Rewording for reading age needs SPA's agreement, so none was done.
- `[VERIFY WITH POLICY]` "Anyone aged 18 or over can apply" is told to the person on the start page. Date of birth is not used to check it, because the sheet says not to pull it.
- `[VERIFY WITH USERS]` The person who looks after the money is often not the phone owner. This variant texts the applicant's phone, so that person may still not see the message.
- `[VERIFY WITH DATA]` The page works at 320px and on 2G or 3G. Not yet tested on a real phone. Only inline code: no fonts, images or frameworks.
- `[VERIFY WITH USERS]` The Back link is left off the confirmation page on purpose, so nobody sends the application twice.
- `[VERIFY WITH DEPARTMENT]` The nearest Citizen Service Centre can be worked out from the district. The profile has no list of CSCs, so the prototype only links to a stub page.

## Known gaps

- `[KNOWN GAP]` Payouts: the mock has no payout contract, because `dpi.payments.create` takes money in. The payout pages are ordinary service pages with fake data. The payments mock is never called.
- `[KNOWN GAP]` Consent screen: `dpi.data.fetch` always shows a consent screen, but SPA's pull is a notice. A notice page comes first. "No" is treated as "carry on with manual answers and a survey". Pressing Escape on the mock screen returns to the notice.
- `[KNOWN GAP]` Assurance level: the mock always returns `substantial` (level 2). Level 3 (CSC fingerprint) is only described. Aru cannot be signed in at a CSC, so his journey stops at "We could not sign you in".
- `[KNOWN GAP]` Languages: only English works. Kestrian, Vell and Sora show a notice. The profile has no text in those languages. The law requires Kestrian and English (Digital Government Act 2023, s.14).
- `[KNOWN GAP]` No Kestria design system. This uses the xstack neutral style.
- `[KNOWN GAP]` `payoutAccount` is pulled in the same mock call as the other facts, though it really comes from the Treasury disbursement service.
- `[KNOWN GAP]` Authorised intermediaries (Anaïs and her granddaughter Mina) are not modelled. Nothing stops an intermediary naming themselves as recipient, because there is no intermediary record. Anaïs's journey ends at "already supported".
- `[KNOWN GAP]` Changing the recipient or route after a decision (CSC, level 3, effective 7 days later, texts to old and new numbers) is described in text only.
- `[KNOWN GAP]` Some stub pages (privacy, accessibility, find a CSC) are not built.

## Security must-nots for this variant

- Never ask for a PIN, a full account number, or a KUIN that sign-in already gave us. Never show a raw score or band.
- Before sign-in the page shows no names, household details or amounts. The start page says "a monthly payment" and gives no amount.
- No "you qualify" wording on any page that could reach a shared phone. Texts never say an amount, an outcome, the band or who the recipient is. They have no link and end "SPA never asks for your PIN."
- Nothing about an account is edited inline. After a decision, a change of recipient or route is a CSC at level 3. We text the old and the new number.
- "SPA never asks for your PIN" is on the start page, the payout pages and the confirmation page.
- Every route works without a KUIN. The start page asks "Do you have a KestriaID?".

## Researcher notes

- Pick a test person on the simulated KestriaID screen:
  - Ines: `likely`, her own Lumo Money account.
  - Tessa: `likely`, not the registered person. Try naming Marek or Wena as recipient.
  - Talin: `needs_survey`.
  - Sefa: no record (`not_found`), then a cash voucher.
  - Desa: `likely`, no payout account, so the wallet phone is asked.
  - Mirel: `not_likely`.
  - Anaïs: `already_supported` (Older Persons Grant).
  - Aru: sign-in fails.
- To see the refused route, choose "No, I will type them in" on the simulated screen.
- Kel Varrin (no KUIN) is tested by answering "No" on the start page.
- Researcher controls (tick before "Continue" on the data-use notice): pretend the address, the support lookup, the grant check or the payout account is missing.
