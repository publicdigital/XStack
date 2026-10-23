# Where the Kestria profile fell short

This build was a test of `profiles/kestria/`. Five xstack agents worked from the profile:
- the service designer, reviewing the hypotheses
- the cyber engineer, flagging security assumptions
- three developers, each building one prototype and owning its copy

Each one reported what it had to guess. This file pulls their reports together, removes duplicates and ranks them. "Invented by" means the fact had to be made up during the build because the profile didn't have it.

## Status (updated 2026-10-23)

The prototypes in this folder were built **before** these fixes. They still carry their own `PERSONA_EXTRAS` workarounds, and P1 and P2 still ask for the payout account before the recipient.

| Finding | Status | Where it's fixed |
|---|---|---|
| 1.1 Grant rules | **Fixed** | New service sheet `profiles/kestria/services/household-support-grant.md`: bands, exclusions, assessments, who can apply, recipient, timings, declaration wording |
| 1.2 Payouts | **Fixed** | New Payouts section in `dpi.md`: a named recipient, three routes (KUIN, phone, a cash voucher that needs no KUIN), who can change what, fraud controls, failed payouts. Recipient rules are in the service sheet. |
| 1.3 Household shape | **Fixed** | `dpi.md` value shapes: members, registered person, last survey date. The household can be found from any adult member's KUIN. A new `hsgAssessment` replaces exposing the band. |
| 1.4 Phone | **Fixed** | Every mock persona has a `phone` claim, as well as `givenName` and `familyName` |
| 1.5 Address | **Fixed** | Structured `address` with `district`. All 38 districts and postcodes are in `world.md`. |
| 1.6 Consent vs public task | **Fixed in the profile** | `dpi.md` says what public task means (a notice, not consent) and how to work round the mock. Jory is now for consent-based pulls only. The mock's notice mode still waits on `dpi-mock.js`. |
| 2.1 Persona fit | **Fixed** | Personas are general-purpose. Each service sheet picks its own and says what each tests. Mirel is now the `not_likely` case. Ines is the `likely` case. Tessa (the money-keeper) is new. |
| 2.2 No adult without a KUIN | **Fixed** | New persona Kel Varrin |
| 2.3 Aru can't be rescued | **Data ready, mock pending** | Aru has full data for a CSC sign-in. The mock can't sign in at level 3 yet (`dpi-mock.js`, deferred). |
| 2.4 Partial result | **Fixed** | Desa returns `ok` with `payoutAccount` in `missing` |
| 2.5 Mock fields | **Fixed** | Value shapes and `KESTRIA_PERSONAS` in `dpi.md` (checked: they run, KUINs are valid, postcodes match districts, ages match dates of birth) |

The service sheet also settles, for this service only:
- 3.1 sign-in levels
- 3.2 intermediaries
- 3.5 fraud controls (in `dpi.md`)
- 3.8 declaration wording

The SPA free line `0800 400 400`, first made up in the build spec, is now used by the payout model. The rest of sections 3–5, and all of section 6, are still open.

## Round 2 – gaps found while iterating

Iteration 2 used the fixed profile. The builders had far less to invent, but these questions came up. They're open, and all of them belong in `profiles/kestria/services/household-support-grant.md` unless noted.

| # | Gap | Hit by |
|---|---|---|
| R2.1 | **A `not_likely` household.** Can it still send an application? How does it ask for a new survey? What is "other help"? | P1, P3 |
| R2.2 | **The registered person's text.** There's no exact wording for the neutral text, or for when it's sent – on application, or on a change of recipient. | P1, P2, P3 |
| R2.3 | **Another adult as recipient.** Do they have to confirm, and how? | P3 |
| R2.4 | **Choosing a route before a decision.** Which sign-in level does an applicant need to choose the phone or cash route? Is level 2 enough? | P1 |
| R2.5 | **Sign-in level for a CSC card check.** The sheet allows a card check but gives it no level. | P2 |
| R2.6 | **Switching from the Older Persons Grant.** Who can choose it – the person getting it, or any adult? When does it take effect? Is there a gap in payments? | P2 |
| R2.7 | **How long a new-job check takes.** | P3 |
| R2.8 | **Changes in a household already on the grant.** What happens when it reports one? | P3 |
| R2.9 | **A list of the 120 CSCs.** In `world.md`. This was already section 4. | P1, P2 |
| R2.10 | **Approved translations of the fixed wording** (declaration, texts) into Kestrian, Vell and Sora. This was already section 4. | P2 |

## What the profile did well

These came through without anyone having to ask:
- **Fictional-country markers:** the banner and "[Fictional]" labels on mock data
- **Data formats:** KUIN, `K 1,500`, `+999`, household numbers
- **Kestria's own terms:**
  - the Citizen Service Centre (CSC) network
  - the KestriaID, KesLink and KesPay names
  - the rainy-season constraint
  - the no-KUIN rule (s.19)
  - shared-phone statistics
  - anti-scam wording
  - the four languages
- **Lawful bases:** public task (s.13) and consent (s.12)

All three prototypes feel recognisably Kestrian, and every one has a route for people without a KUIN. The "Who has used my data" idea was picked up everywhere.

## 1. Gaps that block the hero journey – fix first

| # | Gap | Where | Invented by |
|---|---|---|---|
| 1.1 | **No rules for the Household Support Grant itself.** Missing: eligibility, band names and thresholds, which programmes exclude a household, who counts as the applicant, and how long decisions take. `world.md` lists it as a hero service in one line. | `world.md` | Service designer, all three builders. The build spec set "lowest bands, about 4 weeks, 8–10 with a visit". |
| 1.2 | **Payouts can only go to the applicant.** Missing: paying a household member who isn't the applicant (brief finding 3), how a CSC changes a payout account (`dpi.md` says accounts are linked at the provider), and a cash fallback that doesn't need a KUIN. The current fallback needs one, which contradicts s.19. | `dpi.md`, Payments | All three builders. P1 and P2 confirm the payout account *before* asking who receives the money, so the confirmed account can be the wrong one. |
| 1.3 | **`household` is one string** ("HH-CR-0204411 – 4 people"). It has no members, ages, registered person or last-survey date, and doesn't say whether any member's KUIN finds the household. | `dpi.md`, data catalogue and personas | All three builders put members in a `PERSONA_EXTRAS` object |
| 1.4 | **Phone is "known" but no persona has one.** The catalogue says phone comes from KestriaID claims. Neither the personas nor the mock return it, so "we'll text your old number" can't show a number. | `dpi.md` personas, and `dpi-mock.js` | P1 invented numbers. P2 and P3 ask for a contact number instead. |
| 1.5 | **Address is one free-text string,** but services need the district on its own. `world.md` names only 23 of the 38 districts. | `dpi.md` personas, `world.md` | P1 splits the district out by commas. P3 has a "not on this list" option. |
| 1.6 | **Jory's "consent refused" persona can't happen for this service.** SPA pulls registry data as a public task (s.13), so there's no consent to refuse. The mock always shows a consent screen. | `dpi.md` personas, and `dpi-mock.js` | All three show a notice before the mock's consent screen, tagged `[KNOWN GAP]` |

## 2. Personas don't fit the services they're meant to test

| # | Gap | Where |
|---|---|---|
| 2.1 | **The "everything found" persona is the wrong person for a poverty grant.** Mirel Okand is a car owner in the capital with a bank account, and P1 tells her she can "probably get the grant". The personas are general-purpose. Hero services need their own. | `dpi.md` personas |
| 2.2 | **No adult without a KUIN.** The only one is Pell, who is 15 and can't apply. `world.md` describes pastoralists who have a birth record but no KUIN, but no persona is one. | `dpi.md` personas |
| 2.3 | **Aru Danvell can't be rescued.** He fails sign-in, but in the profile a CSC fingerprint check is exactly what helps him, and the mock can't sign him in another way. | `dpi.md` personas, and `dpi-mock.js` |
| 2.4 | **Desa Haldry's "payment declined" doesn't apply to a payout.** No persona returns a partial result (`ok` with something `missing`) on purpose. | `dpi.md` personas |
| 2.5 | **Mock personas lack fields the profile describes.** `given_name` and `family_name` (the profile says the name is split), phone, structured address. | `dpi.md` mock configuration |

## 3. Policy and platform facts nobody could find

| # | Missing | Where it should go |
|---|---|---|
| 3.1 | **Which assurance level each action needs:** applying, nominating who gets paid, an officer's visual card check, a household member reporting changes, USSD and SMS | `dpi.md`, Identity |
| 3.2 | **Intermediaries:** who can act for someone, how they're vetted, whether village champions count, and how "acting for" is recorded | `dpi.md`, `profile.md` law and policy |
| 3.3 | **Biometrics at a CSC:** the consent rule, officer audit, and how templates are stored | `profile.md` law and policy |
| 3.4 | **Retention:** for applications, SMS logs, consent records and biometrics. Also how a citizen withdraws consent, and whether citizens are told about a breach. | `world.md` laws, `dpi.md` Consent |
| 3.5 | **Fraud controls when a payout account changes:** a cooling-off period, SIM-swap checks, and a text to the old number | `dpi.md` Payments |
| 3.6 | **Writing back to registers:** no correction service, survey request or appointment booking on KesLink. "Self-updates since 2025" isn't explained. | `dpi.md` Data exchange, data catalogue |
| 3.7 | **Whether disability counts as sensitive data under s.15.** Only `healthCover` is marked as needing a DPIA. | `world.md` laws |
| 3.8 | **Declaration wording and penalties.** Also: the s.8 electronic declaration needs level 2, which a no-KUIN route can't reach. | `world.md` laws |

## 4. Channel details builders had to make up

- **Places and people:**
  - a list of CSCs, with names and districts
  - officer and champion names
  - mobile CSC days and booking slots
  - a booking reference format (P2 invented `BK-`)
- **Messaging:**
  - the SMS sender ID
  - a USSD menu under `*999#`
  - the "reply STATUS" convention
  - the SPA free phone line (`0800 400 400` was made up in the build spec)
- **Translations:** there's no Kestrian, Vell or Sora text at all. Every language switcher is a placeholder. Either add a small glossary of service phrases in each language, or decide demos run in English and say so.

## 5. Small fixes

- **Label the dead-phone figures.** "17% of adults" and "22% of enrolled adults" are the same people, but neither says so, and two agents read them as a contradiction.
- **Give Point 11 a budget.** It has no page-weight or timing target. Each prototype is 25–30 KB gzipped, about 4 KB of it the inlined DPI mock.
- **Give personas a home district.** P2 signs Mirel in at a CSC in Dunmar, in the Northern Plains, though she lives in the Capital Region.

## 6. Gaps in xstack itself, not the profile

These showed up because Kestria pushed harder on the DPI than Barbados does.

- **`dpi-mock.js` and the contract in `dpi-baseline.md` have no payouts.** `payments.create` only takes money in. Every social protection service needs `payments.disburse` or similar.
- **The mock always returns assurance level `substantial`.** Personas can't carry a level, and there's no way to say what level an action needs.
- **The mock always shows a consent screen.** There's no "notice" mode for public-task (s.13) pulls.
- **Data values are flat strings.** Structured values, such as an address with a district or a household with members, would remove the `PERSONA_EXTRAS` workarounds.
- ~~**The mock signs in one person.** It can't model acting for someone else.~~ **Fixed in `dpi-mock.js` v1.1:**
  - `signIn({ actingFor: true })` lets a persona with an `actsFor` list choose whose behalf they're acting on
  - the result carries the subject's `claims`, plus an `actor` with the relationship and authority (`type`, `reference`, `validUntil`, `canDo`)
  - ended authorities are shown but can't be chosen
  - data and consent are about the subject, payment is by the actor
  - the contract is in `references/dpi-baseline.md`, and Kestria has a new persona, Mina Vorlek, who acts for Anaïs

  The prototypes in this folder still inline v1, so they act for someone with their own pages.
- **The `xstack:developer` agent has no shell.** It can't run `node --check`, so all three builders shipped unchecked JavaScript. The orchestrator checked it afterwards and it was clean.

## Suggested next steps for the profile

1. **Add a service sheet for each hero service.** Start with `profiles/kestria/services/household-support-grant.md`: eligibility, bands, exclusions, payee rules, timings, declaration wording and the service's own personas. This fixes 1.1 and 2.1.
2. **Restructure `dpi.md` data.** Structured `household` (with members and the registered person) and `address` (with district), and a phone for every persona. Add an adult with no KUIN, and replace Jory with a consent-based pull. Fixes 1.3–1.6 and 2.2–2.5.
3. **Write the payout model in `dpi.md`.** A nominated payee, changing the account at a CSC, a no-KUIN cash route and fraud controls. Fixes 1.2 and 3.5.
4. **Add a channels section to `world.md`.** The CSC list, the SMS sender ID, the USSD menu and the free lines. Fixes section 4.
5. **Extend `dpi-mock.js`** with payouts, assurance levels, a notice mode and structured values, in xstack itself. Fixes section 6.
