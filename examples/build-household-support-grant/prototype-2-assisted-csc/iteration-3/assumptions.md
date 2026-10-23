# Assumptions panel – Prototype 2, iteration 3 (Assisted at a Citizen Service Centre)

This is the right-hand panel of `index.html` as Markdown. Kestria is fictional. No user has tested this prototype, so no `[VERIFY WITH USERS]` item is resolved. Iteration 3 is a styling change, so items 1 to 33 are carried over from iteration 2 (items 18, 26 and 30 have new wording). Items 34 to 44 are new.

## Question map

- **Name:** known (KestriaID claims). No KestriaID: ask.
- **District and village:** known (`address`, National Population Register), shown as district and village only. Missing or wrong: ask, then flag for a survey.
- **Household members, last survey, support already got:** known (`household`, `programmes`, National Social Registry via KesLink). No record: book a survey visit.
- **Outcome:** derived by SPA. We get `hsgAssessment` only. The welfare band is never shown.
- **Who receives the money:** ask. Any adult member. Never an authorised intermediary.
- **How the money is paid:** known (`payoutAccount`, provider and last 4 digits). A CSC can change the recipient and the route at level 3. It never edits an account.
- **Changes, safe contact number, declaration:** ask.
- **Not pulled or asked:** date of birth, sex, KUIN, TIN, vehicle, tax, land, health, disability.

## Researcher notes

- On the simulated KestriaID screen, the test people are from the service sheet:
  - Mirel Okand: `not_likely`.
  - Ines Kestel: `likely`.
  - Tessa Ondrey: `likely`, not the registered person, names herself.
  - Talin Vorsa: `needs_survey`. Report that the household moved.
  - Sefa Tormik: not found.
  - Desa Haldry: no payout account linked.
  - Anaïs Vorlek: `already_supported`. Try "Someone acting for them" as her granddaughter Mina.
  - Aru Danvell: choose the fingerprint route to sign him in. The card route fails.
- Kel Varrin has no KestriaID and is not in the mock. On the start page choose "No, or not sure".
- Try Ines by fingerprint, naming Daro Kestel as the recipient, then a phone number as the route. Then try her by card check: the route is locked.
- To refuse the lookup, choose "No, I will type them in" on the simulated KesLink screen, or use the link on the notice page.
- Everything after sign-in uses made-up people. Don't type real names or numbers.

## Assumptions (open)

1. `[VERIFY WITH USERS]` Citizens agree to a fingerprint check at the counter, and believe that saying no costs them nothing.
2. `[VERIFY WITH POLICY]` A fingerprint is sensitive data (Data Protection Act 2022, s.15). We assume consent (s.12) read aloud is enough, and that the print is not kept. Check both.
3. `[KNOWN GAP]` The mock has no level 3. It always reports "substantial". The fingerprint page is our own simulated screen, and page code records level 3. The mock's sign-in is not tied to it.
4. `[KNOWN GAP]` Aru Danvell: the mock fails his sign-in because his persona has `signIn: 'failed'`. After a simulated fingerprint match we give the mock a copy of the personas without that flag, built in code, so the CSC route signs him in. The card route and any other route use the unchanged personas and still fail him.
5. `[KNOWN GAP]` The mock signs in one person. For "acting for someone", the researcher picks the household holder's persona. A real flow has two people: the one at the desk (level 3) and the household.
6. `[VERIFY WITH POLICY]` A card check is allowed for applying, naming the recipient and reporting a change. The service sheet gives it no assurance level number, so the prototype shows none. We assume it never allows a change of route.
7. `[VERIFY WITH POLICY]` The sheet says changing the recipient or route *after a decision* needs level 3. We apply the same rule when choosing a route at application, and let a card check name the recipient. Check this.
8. `[KNOWN GAP]` Data use is a notice (s.13 public task), but the mock's data screen always asks "Can we get your details?". We show a notice page first and still call the mock. "No" on either becomes manual answers and a survey visit.
9. `[VERIFY WITH POLICY]` A citizen can object to an s.13 lookup at the counter. We assume "no" means a survey visit, not a refusal of service.
10. `[KNOWN GAP]` Payouts: the mock has no payout call (`payments.create` takes money in), so it is not used. The route page is an ordinary service page, using `payoutAccount` from the lookup.
11. `[VERIFY WITH PLATFORM]` The Treasury disbursement service has no published spec (Tier 3). We code to the shape in `dpi.md`.
12. `[KNOWN GAP]` The mock only holds the signed-in person's payout account. For another recipient we cannot show their account. The page says it is found from their KestriaID.
13. `[KNOWN GAP]` There is no SIM-swap check in the mock, and no SMS is sent. The 30-day SIM-swap hold is officer guidance only. The texts to the old and new numbers are shown, not sent. Aru's persona has no phone number, so no "old number" shows for him.
14. `[VERIFY WITH PLATFORM]` A phone number typed for route 2 goes to the payout rail. We show only its last 3 digits afterwards. How it is held and for how long is not defined.
15. `[VERIFY WITH POLICY]` The sheet says the registered person gets "a neutral SMS saying SPA has received an update for their household". It gives no exact words. Ours are invented.
16. `[VERIFY WITH POLICY]` Switching from the Older Persons Grant: the sheet says it is made at a CSC. It does not say whether an intermediary can choose it, how long SPA takes to decide, or what happens to Older Persons Grant payments meanwhile. We ask the officer to confirm the person themselves wants to switch, and give no timing.
17. `[VERIFY WITH POLICY]` "The people in the household are wrong" leads to a survey. The sheet lists a birth, a death, someone joining or leaving, and a move. It does not list a wrong member list.
18. `[VERIFY WITH DEPARTMENT]` **Changed.** For `not_likely` the sheet says to tell people how to ask for a new survey "and other help". It does not say what other help. We only give the GovKestria helpline.
19. `[KNOWN GAP]` If `hsgAssessment` comes back in `missing`, the page says "We cannot say yet" and carries on. No test person does this. The wording is invented.
20. `[VERIFY WITH POLICY]` No KestriaID: the sheet says village committee confirmation, then a survey visit. It does not say what the confirmation looks like. We record a name and one of three ways it is given.
21. `[KNOWN GAP]` Looking up a household by household number (without a KUIN) is not in the profile. The prototype records the number and goes to a survey. It looks nothing up.
22. `[VERIFY WITH DEPARTMENT]` Digital champions use this same tool to prepare and refer only. They see no records. Collecting a first name, village and safe phone number needs a lawful basis and a retention rule.
23. `[KNOWN GAP]` Mobile CSC days, booking slots and booking references (BK- plus 6 digits) do not exist in the profile. All dates and references for booking are made up.
24. `[KNOWN GAP]` The CSC name is built from the signed-in person's `address.district`, once looked up. It is a test convenience. The profile has 120 CSCs but no list, and no staff names. The officer's name is invented. For Talin Vorsa the record still says Ashgrove, so the strip shows the Ashgrove CSC, though she now lives in Port Ondra.
25. `[VERIFY WITH USERS]` People are happy for household names to be read aloud and shown at a counter where others can see or hear. Officer screen angle and queue privacy need testing.
26. `[VERIFY WITH USERS]` **Changed.** Officers will read the "Read aloud" boxes in full. We think they will shorten them in a busy CSC.
27. `[VERIFY WITH DEPARTMENT]` Officers can interpret in Vell and Sora, or an interpreter is available. The profile only mentions interpreters for research.
28. `[VERIFY WITH DEPARTMENT]` The sheet fixes the declaration wording and allows rewording only for reading age, with SPA's agreement. There is no approved Kestrian, Vell or Sora version. An officer reading it in another language is translating it live.
29. `[KNOWN GAP]` The language switcher shows a notice for Kestrian, Vell and Sora. The profile has no text in those languages. "Language wanted" is a separate question, for the citizen.
30. `[VERIFY WITH PLATFORM]` **Changed.** GovNotify sends the text in the chosen language. The profile gives `*999#` and the GovKestria helpline for checking progress.
31. `[VERIFY WITH DEPARTMENT]` The slip says nothing about the result, and nothing about who is paid or how. The same words go on every slip, because paper is shared as well as phones. The sheet does not describe a slip.
32. `[VERIFY WITH POLICY]` The audit log shows what is recorded (officer, CSC, acting for, ID method, lookup consent ID, route changes). The real fields and retention are not defined.
33. `[KNOWN GAP]` The confirmation page has no Back link on purpose. It stops a second submit. Every other page except Start has one.
34. `[VERIFY WITH DEPARTMENT]` **New.** The official line is now the GovKestria helpline, +999 77 100 2000, in place of SPA's free line. The profile does not say whether the helpline is free, so "the call is free" is gone. Whether SPA keeps its own line is open.
35. `[KNOWN GAP]` **New. Design system:** no checkbox. We use a square copy of the radio, built from tokens, for 8 questions (including "choose all that apply" on household changes). Radios cannot replace the multiple choice.
36. `[KNOWN GAP]` **New. Design system:** no select or date input. "How are they related?" is a `kg-input` select with 6 options (the system prefers radios for 6 or fewer). Districts (38) are a `kg-input` with a list. No date input is used.
37. `[KNOWN GAP]` **New. Design system:** no summary list. "Check these details" and "Check the answers" use a stopgap list with hairline rules, "Change" links and the source in hint text. Propose it back as a component.
38. `[KNOWN GAP]` **New. Design system:** no phase banner. We use the line from `design-system.md`.
39. `[KNOWN GAP]` **New. Design system:** no switcher for several languages, and the language link is 40px high (`kestria.css`), under the 48px target. We list four languages in one group and raise each link to 48px in page CSS.
40. `[KNOWN GAP]` **New. Design system:** no officer strip, read-aloud box, officer note, simulated-screen box, printed slip or audit disclosure. All are built from tokens only (surface-alt, brand border, hairline and border rules, radius tokens).
41. `[KNOWN GAP]` **New. Design system:** the warning notice is filled with the accent colour, but the rules say accent once per screen and the header bar counts. Every page with a warning uses it twice. We show at most one warning per page.
42. `[KNOWN GAP]` **New. Design system:** the error notice shows one link. With several errors we list them in the notice. The title is "Error:" and no longer "There is a problem". A radio option has no pattern for a line of help under it; we use small hint text.
43. `[KNOWN GAP]` **New. Design system:** standalone links, the Back link and the footer links are 24px high as plain links. We make them 48px in page CSS.
44. `[KNOWN GAP]` **New.** Copy is carried over from iteration 2. Many sentences are over the design system's 15-word limit. A plain-language pass is deferred, because the sheet fixes some of the words.
45. `[BUILT IN]` Never ask for a PIN, a full account number or a KUIN that sign-in already gave us. Pages and texts say "SPA never asks for your PIN."
46. `[BUILT IN]` No raw score or band is shown. The slip and the text messages say nothing about the result or the recipient, and never say "you qualify".
47. `[BUILT IN]` Fingerprint consent is a separate step. A no goes to a card check, and the citizen keeps the service. Changing the route needs a fingerprint check and the person at the desk applying for themselves.
48. `[BUILT IN]` Every route works without a KUIN. The officer's name and CSC are on every page. "Acting for" is logged. Someone acting for a household cannot be the recipient and cannot change the route.

## Resolved (round 1)

Settled by the Kestria profile and the service sheet. This is **profile evidence, not user evidence.** No user has tested this prototype.

- **What an intermediary can do.** They can apply and report changes. They cannot name themselves recipient or change the route. The record is made at a CSC and renewed every 12 months. Champions are not intermediaries. Source: `profiles/kestria/services/household-support-grant.md`, "Who can apply, and who gets paid" (reg.7).
- **Outcomes and messages.** Four `hsgAssessment` outcomes, each with its exact message, replace our own demo eligibility. Source: `profiles/kestria/services/household-support-grant.md`, "What an application can lead to".
- **Amount and timings.** K 1,500 a month on the 5th; about 4 weeks; 8 to 10 weeks with a survey; up to 4 more weeks in the rainy season (March to June) in the Northern Plains and Lake Region; first payment at least 7 days after the decision. Source: `profiles/kestria/services/household-support-grant.md`, "What it is" and "Timings"; `profiles/kestria/world.md`.
- **Declaration wording and penalty.** Fixed wording, a plain declaration needing no particular assurance level (Electronic Transactions Act 2020, s.6). Source: `profiles/kestria/services/household-support-grant.md`, "How people can apply".
- **Reference format.** `HSG-` plus 7 digits. Source: `profiles/kestria/services/household-support-grant.md`, "Messages". The booking reference (`BK-`) is still invented.
- **How a payout change is made at a CSC.** A CSC changes the recipient and the route, never an account. Account changes happen at the citizen's own provider. Source: `profiles/kestria/dpi.md`, Payouts.
- **How another recipient's money is found.** In order: account linked to their KUIN, their phone number, a cash voucher. Source: `profiles/kestria/dpi.md`, Payouts.
- **Districts, members and bands in `PERSONA_EXTRAS`.** Deleted. The structured values come from the personas. Source: `profiles/kestria/dpi.md`, Value shapes and Mock configuration.
- **Phone number on record.** It is in the personas' claims (not Aru's). Source: `profiles/kestria/dpi.md`, Mock configuration.
- **Village committee still confirms households.** Confirmation, then a survey visit, then a cash voucher. Source: `profiles/kestria/services/household-support-grant.md`, sign-in table, "No KUIN". What the confirmation looks like is still open (item 20).
- **A card check is an allowed alternative to a fingerprint** for applying and reporting a change. Source: `profiles/kestria/services/household-support-grant.md`, sign-in table. The level number is still open (item 6).
- **Progress check.** `*999#` or the helpline. Our made-up "reply STATUS" is gone. Source: `profiles/kestria/services/household-support-grant.md`, "Messages".

## Resolved (round 2)

Nothing. Round 2 was a design-system constraint, not user testing.
