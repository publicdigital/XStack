# Kestria Digital Public Infrastructure

**Fictional country, real software.** Kestria's platforms are invented. Each is built on a real open-source DPI product, so the protocols, claims and message flows below are the real ones, and the linked public docs apply. Facts about how Kestria *runs* each platform – names, owners, policies, identifiers – come from `world.md`. See `references/dpi-baseline.md` for the tiers and the once-only rules.

## Sources

- **DPI Map:** not applicable. Kestria is fictional and isn't in the DPI Map.
- **Checks (2026-10-23):** the public docs below all resolve. KestriaID runs as a local sandbox: real eSignet 2.0.0 with MOSIP's mock identity system, from the separate `kestria-sandbox` repo, at `http://localhost:8080`, or `esignet.kestria.test` if you map that name to your computer. Prototypes sign in through it with this repo's `sandbox/` (see `sandbox/README.md`). The other `*.kestria.test` hosts don't exist yet – they're reserved for a demo sandbox.
  - <https://docs.mosip.io>
  - <https://docs.esignet.io>
  - <https://docs.mojaloop.io>
  - <https://docs.x-road.global>
  - <https://documentation.opencrvs.org>
  - <https://docs.openg2p.org>
- **Team:** defined by the xstack maintainers in `world.md`. There's no platform team to confirm with. Keep `[VERIFY WITH PLATFORM]` tags anyway in demos, because they show where a real team would check.

## Platforms

| Pillar | Platform | Family | Owner | Protocol | Tier | Docs and sandbox | Source |
|---|---|---|---|---|---|---|---|
| Identity | **KestriaID** | MOSIP 1.2 LTS, with eSignet for sign-in | National Identity Authority (NIA) | OpenID Connect (authorization code + PKCE, `private_key_jwt`) | 1 locally | <https://docs.esignet.io>. Local sandbox: the `kestria-sandbox` repo (eSignet 2.0.0 and the mock identity system), at `localhost:8080` or `esignet.kestria.test`. Prototypes connect through `sandbox/`. | `world.md` |
| Payments – gateway services use | **GovPay Kestria** | Kestria-specific gateway, settling over KesPay and card schemes | Kestria Digital Service (KDS) | Hosted payment page, a status API and a signed webhook | 3 | No spec yet. Mock the generic contract. | `world.md` |
| Payments – national rail | **KesPay** | Mojaloop | Central Bank of Kestria (CBK) | Mojaloop FSPIOP API v1.1 | 2 | <https://docs.mojaloop.io>. Sandbox to be at `hub.kespay.kestria.test`. | `world.md` |
| Payments – payouts | **Treasury disbursement service** | Built on OpenG2P's payment components, paying out over KesPay | Ministry of Finance – Treasury | Bulk transfers over KesPay | 3 | <https://docs.openg2p.org> | `world.md` |
| Data exchange | **KesLink** | X-Road | KDS | X-Road message protocol for REST | 2 | <https://docs.x-road.global> | `world.md` |
| Consent | **MyData Kestria** consent registry (pilot) | Kestria-specific | KDS | REST. A consent ID travels with every KesLink request. | 3 | No spec yet | `world.md` |

**Tiers:** identity is **Tier 1 locally**. The `kestria-sandbox` repo runs real eSignet with its mock identity system on your own computer, seeded with the test personas below. This repo's `sandbox/` adapter and `references/dpi-sandbox.js` let a prototype sign in through it (the `sandbox` mode in `references/dpi-baseline.md`). There's still no hosted Kestria sandbox, so outside your own computer identity is Tier 2. The payment rail and data exchange are Tier 2: the real specs are published, but there's no Kestria sandbox yet. They become Tier 1 when the Mojaloop Testing Toolkit and mock registers behind a gateway run. Until then the local sandbox answers `data.fetch` from mock registers built from the personas, and payments stay on the mock. GovPay, Treasury disbursement and MyData are Kestria inventions with no spec, so they are Tier 3 and prototypes use the generic contract.

### Identity

- **What it's called on screen:** "Sign in with KestriaID"
- **Discovery document:** `http://localhost:8080/.well-known/openid-configuration` in the local sandbox, or `http://esignet.kestria.test:8080/…` with the hostname mapped (see the `kestria-sandbox` README). A hosted `https://esignet.kestria.test` doesn't exist yet.
- **Claims it returns:**
  - standard OIDC claims:
    - `name`
    - `given_name`
    - `family_name`
    - `birthdate`
    - `gender`
    - `phone_number`
    - `email` (if given)
    - `address`
    - `picture`
    - `locale`
  - The service asks only for the ones it needs. The citizen sees the list and agrees to share it on the eSignet consent screen.
  - eSignet returns the userinfo response as a signed JWT.
  - **In the local sandbox (eSignet 2.0.0):** eSignet releases `name`, `birthdate`, `gender`, `phone_number`, `email`, `address` and `picture`, but not `given_name` or `family_name`. The adapter asks for `name` and `birthdate`, and offers `phone_number` as voluntary.
- **`sub` is not the KUIN.** eSignet gives each service a different pairwise identifier for the same person. A service that needs the KUIN itself, to match records in another register, must be approved for the Kestria-specific `kuin` claim by the NIA (National Identity Act 2020, s.17). Most services don't need it: KesLink can match on the identifier the NIA gives it.
- **Assurance levels:** the eSignet `acr` values below are from the eSignet docs. Check them against the version you deploy. **eSignet 2.0.0, in the local sandbox, offers `generated-code`, `password`, `knowledge` and `biometrics`, but not `linked-wallet`**, so sandbox sign-in is level 1 and level 2 can't be reached there yet.

  | Level | How the citizen proves it's them | eSignet `acr` | Use it for |
  |---|---|---|---|
  | 1 – low | One-time code sent to the phone or email on record | `mosip:idp:acr:generated-code` | Checking an application's status, low-risk applications |
  | 2 – substantial | A wallet app linked to their KestriaID | `mosip:idp:acr:linked-wallet` | Applying for benefits, paying fees, electronic statutory declarations (Electronic Transactions Act 2020, s.8) |
  | 3 – high | Fingerprint or face, on a certified device at a CSC or district office | `mosip:idp:acr:biometrics` | Changing payout details, replacing an ID card, acting for someone else |
- **Who can't use it:**
  - people under 16 (not enrolled)
  - the 22% of adults not enrolled (48% in the Northern Plains)
  - people whose phone number on record no longer works – about 17% of adults, who can't get a one-time code
  - non-citizen residents who haven't enrolled
- **Assisted or offline route:**
  - a CSC officer signs the person in at level 3 with their fingerprint, and completes the service with them
  - a family member can act for someone through an authorised intermediary record made at a CSC. The NIA holds these records, and KestriaID offers them at sign-in: the intermediary signs in as themselves, then chooses "act for" the person. Prototypes use `signIn({ actingFor: true })` and the persona's `actsFor` list (see `references/dpi-baseline.md`, Acting for someone else). Each service sheet says what an intermediary may do in that service. For SPA services, see `services/household-support-grant.md`.
  - every service also needs a manual route for people with no KUIN (National Identity Act 2020, s.19)

### Payments

- **What it's called on screen:** "Pay with GovPay" for fees. People call the rail itself "KesPay" – it's the name on their banking and wallet apps.
- **Currency:** Kestrian kesta, written `K 1,250`. In code, use `XTS`, the ISO 4217 test code. KesPay uses `XTS` in Mojaloop messages too.
- **Ways to pay a fee:**
  - **Mobile money or bank via KesPay:** the citizen enters their phone number. GovPay sends a request to pay through KesPay, and the citizen approves it on their phone with a USSD prompt or an app notification.
  - **Card:** debit or credit, mostly used in the Capital Region
  - **Government Payment Reference (GPR):** GovPay issues a 12-digit reference such as `GPR 4401 2273 9915`. It's valid for 7 days, and the citizen can pay it in cash at any bank, mobile money agent or post office. The service needs a "you've got a reference, pay it and we'll let you know" path. That path is the most common one outside the Capital Region.
- **How the service learns a payment worked:**
  - the citizen is redirected back to the service with a payment ID
  - GovPay sends a signed webhook when the payment settles
  - the service can check the status API
  - for a GPR, only the webhook tells you: it can arrive days later
- **Refunds:** to the original payer over KesPay, approved by the owning agency, within 5 working days
- **Payouts:** see [Payouts](#payouts) below.
- **Scheme facts:**
  - the CBK's KesPay Scheme Rules 2023
  - participants: Aranport Commercial Bank (`acb`), Highland Cooperative Bank (`hcb`), Postbank Kestria (`postbank`), Lumo Money (`lumomoney`), Kora Wallet (`korawallet`) and the Treasury Single Account (`treasury`)
  - person-to-person limit of K 150,000 per transfer
  - deferred net settlement in three windows a day

### Payouts

How government pays money **to** people: benefits, grants, and refunds to someone other than the payer. The Treasury disbursement service makes every payout over KesPay. Services never connect to a bank or wallet themselves, and never collect account numbers or PINs.

**The recipient is a person, not an account.** A service decides *who* is paid (the **recipient**). The payout rail works out *where*. The recipient doesn't have to be the person who applied – a service's own rules say who can be named. For the Household Support Grant, it's any adult in the household (`services/household-support-grant.md`).

**How the money finds the recipient,** in this order:

| Order | Route | How it resolves | What the citizen sees |
|---|---|---|---|
| 1 | **Account linked to their KUIN** | KesPay's account lookup service (ALS), Mojaloop party type `PERSONAL_ID` with the Kestria sub-type `KUIN`. Citizens link their KUIN to one account at their bank or wallet provider, in its app, at an agent or at a branch. | "We'll pay into your Lumo Money account ending 4417." |
| 2 | **Their phone number** | ALS, party type `MSISDN`. Used when no account is linked to the KUIN, or the recipient has no KUIN but has a wallet registered to their own phone. | "We'll pay into the Kora Wallet registered to +999 71 ··· ·678." |
| 3 | **Cash collection voucher** | Treasury issues a voucher number and a one-time code each month. They're sent by SMS, or printed on a slip at a CSC. The recipient collects the cash at a post office, showing the voucher and **any one** of: a KestriaID card, a birth certificate, a voter card, or a letter from their village committee. **No KUIN is needed** (National Identity Act 2020, s.19). | "You'll collect the money in cash at a post office. We'll send you a voucher each month." |

**Which route, and who can change it:**
- **The account behind route 1 belongs to the citizen and their provider, not to government.** To change it, the citizen relinks their KUIN to another account at their provider. A government service – a CSC included – can't edit a bank or wallet account.
- **What a service *can* change is the recipient, and the route:**
  - who the recipient is
  - whether to use route 1, route 2 for a named phone number, or route 3

  After a decision has been made, changing either needs **level 3** at a CSC. When applying, naming the recipient needs whatever level the service's application needs.
- **Show the citizen only enough to recognise the account:** the provider and the last 4 digits of the account, or a masked phone number. Never the full number, never the account holder's name.

**Fraud controls:** these apply to any change of recipient or route, and to a KUIN being relinked at a provider.
- **A change takes effect from the next payment cycle at least 7 days away.** Until then, the old route is paid.
- **SMS goes to both the old and the new recipient's numbers:** "SPA: the way your payment is made has changed. If you didn't ask for this, call the GovKestria helpline on +999 77 100 2000 or go to a CSC. SPA never asks for your PIN." It never says the amount or the new account.
- **Recent SIM swaps are held.** If the phone network reports a SIM swap on the recipient's number in the last 30 days, a route-2 change, or a KUIN relink to a wallet on that number, is held until someone checks it at a CSC.
- **An authorised intermediary can never name themselves as recipient,** or change the route.
- **Treasury pauses payouts to an account that has failed twice in a row,** and texts the recipient to come to a CSC.

**When payouts fail:** a transfer that's rejected – the account is closed, or over its limit – is retried once the next day, then moved to route 3 for that month. The recipient gets an SMS with the voucher.

**Prototypes:** `dpi-mock.js` has no payout call yet (`payments.create` takes money in). Until it does, show the payout route as an ordinary page in the service, using `payoutAccount` from `dpi.data.fetch()`, and tag it `[KNOWN GAP]`.

### Data exchange

- **How a service gets access:**
  1. The owning agency signs a data-sharing agreement with each register owner, approved by the KesLink governance board (Digital Government Act 2023, ss.10–13).
  2. The Data Protection Commission is notified for sensitive data.
  3. The service becomes an X-Road subsystem, for example `KESTRIA/GOV/SPA/hsg-applications`, and calls the register's service, for example `KESTRIA/GOV/SPA/social-registry`.
- **Consent model:** both, depending on the register.
  - **Consent:** most citizen-facing pulls in a service use consent (Data Protection Act 2022, s.12). The service shows the consent screen, records the consent in MyData Kestria and sends the consent ID with the request in an `X-Kestria-Consent-Id` header (a Kestria convention).
  - **Public task (legal gateway):** some pulls don't use consent (s.13). For example:
    - SPA reading the National Social Registry for its own programmes
    - the CRO telling the SPA about a death
    - KRS checks for licensing

    There's no consent screen, so there's nothing to refuse. Instead the service shows a **notice** before the pull, saying what it will look up and why. The pull is still recorded and shown to the citizen. `dpi-mock.js` always shows a consent screen, so until it has a notice mode, put the notice page before `dpi.data.fetch()` and tag the mock's consent screen `[KNOWN GAP]`.
  - **Which applies:** the "Lawful basis" column in the data catalogue says which basis each fact is pulled on. Where it depends on the service, the service sheet in `services/` decides.
- **Where citizens can see who used their data:** "Who has used my data" in their GovKestria account, from the MyData Kestria registry. Every KesLink pull appears there, with the agency, the facts and the purpose.

## Data catalogue

Every fact a Kestrian service might pull. The attribute key is what prototypes pass to `dpi.data.fetch()`. Lawful bases are under the Data Protection Act 2022 (DPA) and the Digital Government Act 2023 (DGA). Facts with a structure have it set out in [Value shapes](#value-shapes) below.

| Fact (attribute key) | What it is | Source register | Reached through | How fresh | Lawful basis | Notes |
|---|---|---|---|---|---|---|
| `fullName` | Full name. Also given name(s) and family name separately. | National Population Register (NIA) | KestriaID claims (`name`, `given_name`, `family_name`) | Set at enrolment. Updated on marriage or deed poll. | DPA s.12 (consent at sign-in) | |
| `dateOfBirth` | Date of birth | National Population Register | KestriaID claims | Fixed | DPA s.12 | Some are estimated (`01 01` + year). Don't treat that as an error. |
| `sex` | Sex as registered | National Population Register | KestriaID claims (`gender`) | Fixed | DPA s.12 | Only ask for it if the decision needs it |
| `nationalId` | KUIN | National Population Register | KestriaID `kuin` claim, NIA approval per service | Fixed | National Identity Act s.17 | Most services don't need it – see Identity |
| `phone` | Mobile number on record | National Population Register | KestriaID claims (`phone_number`) | Often out of date: 17% of all adults (22% of enrolled adults) have a number on record that no longer works | DPA s.12 | Always confirm it. The person may share the phone. Use it for GovNotify. |
| `address` | Address recorded at enrolment (structured – see below) | National Population Register | KestriaID claims or KesLink | **Often out of date.** Recorded at enrolment and rarely updated. | DPA s.12 | The classic "has moved" scenario. Most services need only `district`. |
| `digitalAddress` | KesAddress code, for example `HL-204-7731` | National Address Register (KDS and the Postal Service) | KesLink | Updated when people register a building | DGA s.9 | 64% coverage in towns, 15% rural. Treat as optional. |
| `birthRecord` | Birth registration: date, place, parents' KUINs | Civil register (CRO, OpenCRVS) | KesLink | Live since 2024. Older records are digitised from paper. | DPA s.12, or s.13 for agencies | Children have a birth record but no KUIN until 16 |
| `maritalStatus` | Marriages registered | Civil register | KesLink | Civil marriages only. Customary marriages are often unregistered. | DPA s.12 | Don't infer a household from this |
| `household` | The household (structured – see below): its number, registered person, members, district and village, and when it was last surveyed | National Social Registry (SPA, OpenG2P) | KesLink | Re-surveyed every 3–4 years. Households can report changes since 2025, and a change makes the record due for a survey. | DPA s.13 (public task) for SPA. s.12 for others. | Found from the KUIN of **any** adult member, not only the registered person. Members' KUINs and the welfare band are never returned. |
| `programmes` | SPA programmes anyone in the household gets (structured – see below) | National Social Registry | KesLink | Live | DPA s.13 | An empty list means none |
| `hsgAssessment` | SPA's assessment for the Household Support Grant: `likely`, `not_likely`, `needs_survey` or `already_supported` | National Social Registry (worked out by SPA from the band, survey date and programmes) | KesLink | Live | DPA s.13 | Returned instead of the welfare band, so the band never leaves SPA. Rules: `services/household-support-grant.md`. |
| `payoutAccount` | Where a payout to this person would go (structured – see below) | KesPay account lookup service (CBK) | Treasury disbursement service | Live | DPA s.13 | Provider and last 4 digits, or a masked phone, only. See [Payouts](#payouts). |
| `tin` | Tax identification number | Taxpayer register (KRS) | KesLink | Live | DPA s.12 | About 31% of adults have a TIN |
| `taxCompliance` | Whether the person or business is tax compliant | Taxpayer register | KesLink | Daily | DPA s.13 for licensing. s.12 otherwise. | Return yes or no, never the amounts |
| `vehicle` | Vehicles registered to the person: registration, make, model, year, licence expiry | Vehicle register (VLA) | KesLink | Live | DPA s.12 | |
| `drivingLicence` | Licence number, classes, expiry | Vehicle register | KesLink | Live | DPA s.12 | |
| `business` | Businesses the person owns or directs: name, number, status | Business register (BRO) | KesLink | Live | DPA s.12 | |
| `landParcel` | Land parcels registered to the person | Lands Registry | KesLink | **Partial**: 40% of parcels digitised, mostly urban | DPA s.12 | `not_found` is common and doesn't mean they have no land |
| `healthCover` | NHIF membership and status | NHIF | KesLink | Monthly | DPA s.15 (sensitive) | Needs a DPIA |
| `qualifications` | National exam results | KEC | KesLink | Records from 1995 | DPA s.12 | |
| `simRegistrations` | SIM cards registered to the person (structured – see below) | National SIM Register (KCA) | KesLink | Live | DPA s.13 (legal obligation) for KCA. s.12 for others. | Up to 5 per person. An empty list or `not_found` means none. Checking a **number** – whose is it? – isn't a fact about a person, so it's a KCA call, not `data.fetch()`: see `services/sim-registration.md`. |

### Value shapes

What `dpi.data.fetch()` returns as each fact's `value` for the structured facts, and what the mock personas below return. Fields that can be empty are `null` – show nothing rather than "null".

```js
// claims, from dpi.identity.signIn()
{ fullName: 'Ines Kestel', givenName: 'Ines', familyName: 'Kestel',
  dateOfBirth: '1996-03-12', nationalId: '9900 817 347', phone: '+999 73 118 4402' }

// address
{ region: 'Lake Region', regionCode: 'LK', district: 'Reedwater', village: 'Fenside',
  street: null,                       // most rural addresses have none
  landmark: 'Behind the fish market', postcode: 'LK 117', recordedOn: '2021-09-14' }

// household
{ number: 'HH-LK-0118302', district: 'Reedwater', village: 'Fenside', lastSurveyed: '2025-02',
  registeredPerson: 'Ines Kestel',
  members: [                          // relationship is to the registered person
    { name: 'Ines Kestel', relationship: 'self',    age: 30, hasKuin: true },
    { name: 'Daro Kestel', relationship: 'partner', age: 33, hasKuin: true },
    { name: 'Mika Kestel', relationship: 'child',   age: 9,  hasKuin: false } ] }

// programmes – an empty array means none
[ { programme: 'Older Persons Grant', member: 'Anaïs Vorlek', status: 'active', since: '2021-07' } ]

// hsgAssessment
'likely'                              // or 'not_likely', 'needs_survey', 'already_supported'

// simRegistrations – an empty array or not_found means none
[ { number: '+999 73 118 4402', network: 'Lumo Telecom', registeredOn: '2024-06-11', usedBy: 'self' },
  { number: '+999 79 004 2286', network: 'Kora Mobile',  registeredOn: '2025-01-20', usedBy: 'child' } ]   // a child under 16's SIM card

// payoutAccount
{ route: 'kuin', provider: 'Lumo Money', providerId: 'lumomoney', last4: '7782', maskedPhone: null }
{ route: 'msisdn', provider: 'Kora Wallet', providerId: 'korawallet', last4: null, maskedPhone: '+999 71 ··· ·678' }
{ route: 'cash', provider: null, providerId: null, last4: null, maskedPhone: null }   // cash collection voucher
```

## Test personas

Made-up Kestrians. Every value is fake. Every KUIN is in the never-issued test range `9900 000 000`–`9900 999 999` and has a valid Verhoeff check digit. To test validation, use `9900 214 706`, which has a wrong check digit.

These are the **general** personas, one for each DPI scenario. Each service sheet in `services/` says which of them fit its service and what each one tests there. Pick personas from the service sheet, not from this list alone. Someone who's "everything found" for vehicle licensing is the wrong person for a poverty grant.

| Persona | KUIN | Home district | DPI scenario | Notes |
|---|---|---|---|---|
| Mirel Okand, 38 | `9900 214 705` | Aranport Central, CR | Everything found and correct | Smartphone. Lumo Money and an ACB account. Owns a car (`CR 118 K`). Band D, so `not_likely` for the Household Support Grant. |
| Ines Kestel, 30 | `9900 817 347` | Reedwater, LK | Everything found – means-tested services | Registered person for her household of 5. Lumo Money only, linked to her KUIN. `likely` for the Household Support Grant. |
| Tessa Ondrey, 29 | `9900 135 887` | Fenmouth, LK | Not the registered person | Looks after the household's money. Her husband Marek is the registered person and works away in Aranport. Her own Kora Wallet is linked to her KUIN. |
| Talin Vorsa, 34 | `9900 318 526` | Register says Ashgrove, HL. Lives in Port Ondra, CS. | Address and household out of date | Moved for work in 2024 and never told the NIA. Had a baby in 2026. The household was last surveyed in 2022. |
| Sefa Tormik, about 47 | `9900 451 261` | Talamir, NP | No record in the registers | Has a KestriaID, but no address on record, no household in the social registry and no account (pastoralist, moves with the seasons). Date of birth estimated: 01 01 1979. Speaks Vell. |
| Desa Haldry, 43 | `9900 529 036` | Belmar, CS | Partial result. Payment declined. | Her household is found, but no account is linked to her KUIN, so `payoutAccount` comes back in `missing`. Has a Kora Wallet on her phone. For fee-paying services, her wallet balance is too low. |
| Aru Danvell, 61 | `9900 644 181` | Dunmar, NP | Can't sign in online | The phone number on record is an old one, so no one-time code arrives. A CSC can sign him in with his fingerprint (level 3). The mock can't do that yet: see `dpi-mock.js` gaps. Gets paid in cash. |
| Jory Benmara, 25 | `9900 773 655` | Saltholm, EI | Says no to a consent-based pull | For services that pull on consent (DPA s.12), such as qualifications for a job application. The researcher chooses "No" on the consent screen. **Not for public-task pulls (s.13)**, where there's no consent to refuse. |
| Anaïs Vorlek, about 78 | `9900 962 518` | Corran Isle, EI | Acting through someone else | Her granddaughter Mina, 19, helps her as an authorised intermediary. They share a basic phone. Gets the Older Persons Grant. Date of birth estimated: 01 01 1948. Speaks Sora. |
| Mina Vorlek, 19 | `9900 274 665` | Corran Isle, EI | Acts for someone else | Anaïs's granddaughter and authorised intermediary (reference `AI-EI-2026-00418`, until 31 03 2027, can apply and report changes). Signs in as herself, then chooses to act for Anaïs. Only offered when the service calls `signIn({ actingFor: true })`. |
| Kel Varrin, about 34 | none | Orsk, NP | Adult with no KUIN | Pastoralist. Has a birth record but no KestriaID. Shares a phone with his brother. His household isn't in the registry. Any service he needs must work without KestriaID. |
| Pell Marrow, 15 | none | Kessel Hill, CR | Child with no KUIN | Too young to enrol. Has a birth record. |

Kel Varrin and Pell Marrow never reach the mock: the prototype needs an "I don't have a KestriaID" route before sign-in.

**Test phone numbers for the National SIM Register.** Every persona's `simRegistrations` numbers are registered to them. `+999 79 000 0001` and `+999 79 000 0002` are registered to people who aren't personas. Any other `+999 7…` number isn't registered. These numbers don't route anywhere: `+999` is reserved.

**In the local sandbox,** `kestria-sandbox`'s `seed-identities.mjs` creates every persona with a KUIN in its claims as an identity in eSignet's mock identity system. Sign in by typing the KUIN without spaces, for example `9900817347` for Ines Kestel, and the one-time code `111111`. Aru Danvell has no KUIN in his claims, so he isn't seeded and can't sign in, which is his scenario. The seed script reads `KESTRIA_PERSONAS` from this file, so change a persona here and run `./esignet.sh seed` in `kestria-sandbox`. The mock identity system needs a sex and an email for everyone, which the personas don't have: the seed uses "Not recorded" and `<id>@example.test`.

### Mock configuration

All the mock-ready personas, in the structured value shapes above. Paste `KESTRIA_PERSONAS` into a prototype once. Filter it to the personas the service sheet lists, and give the mock only the attributes the service needs. The mock returns `value` exactly as given, so structured values work with today's `dpi-mock.js`.

```js
const KESTRIA_PERSONAS = [
  { id: 'mirel', label: 'Everything found – better off', claims: { fullName: 'Mirel Okand', givenName: 'Mirel', familyName: 'Okand', dateOfBirth: '1988-08-14', nationalId: '9900 214 705', phone: '+999 72 555 0101' },
    data: {
      simRegistrations: [ { number: '+999 72 555 0101', network: 'Lumo Telecom', registeredOn: '2024-05-02', usedBy: 'self' }, { number: '+999 79 004 1150', network: 'Kora Mobile', registeredOn: '2024-09-17', usedBy: 'child' } ],
      address: { region: 'Capital Region', regionCode: 'CR', district: 'Aranport Central', village: 'Aranport', street: '[Fictional] 12 Quay Road', landmark: null, postcode: 'CR 101', recordedOn: '2021-05-02' },
      household: { number: 'HH-CR-0204411', district: 'Aranport Central', village: 'Aranport', lastSurveyed: '2024-05', registeredPerson: 'Mirel Okand',
        members: [ { name: 'Mirel Okand', relationship: 'self', age: 38, hasKuin: true }, { name: 'Joss Okand', relationship: 'partner', age: 41, hasKuin: true },
                   { name: 'Lia Okand', relationship: 'child', age: 12, hasKuin: false }, { name: 'Eno Okand', relationship: 'child', age: 7, hasKuin: false } ] },
      programmes: [], hsgAssessment: 'not_likely',
      payoutAccount: { route: 'kuin', provider: 'Lumo Money', providerId: 'lumomoney', last4: '4417', maskedPhone: null },
      vehicle: '[Fictional] CR 118 K – Toyota Corolla, 2017, licence expires 30 11 2026', taxCompliance: 'Compliant' } },
  { id: 'ines', label: 'Everything found – can probably get support', claims: { fullName: 'Ines Kestel', givenName: 'Ines', familyName: 'Kestel', dateOfBirth: '1996-03-12', nationalId: '9900 817 347', phone: '+999 73 118 4402' },
    data: {
      simRegistrations: [ { number: '+999 73 118 4402', network: 'Lumo Telecom', registeredOn: '2024-06-11', usedBy: 'self' } ],
      address: { region: 'Lake Region', regionCode: 'LK', district: 'Reedwater', village: 'Fenside', street: null, landmark: 'Behind the fish market', postcode: 'LK 117', recordedOn: '2021-09-14' },
      household: { number: 'HH-LK-0118302', district: 'Reedwater', village: 'Fenside', lastSurveyed: '2025-02', registeredPerson: 'Ines Kestel',
        members: [ { name: 'Ines Kestel', relationship: 'self', age: 30, hasKuin: true }, { name: 'Daro Kestel', relationship: 'partner', age: 33, hasKuin: true },
                   { name: 'Mika Kestel', relationship: 'child', age: 9, hasKuin: false }, { name: 'Sana Kestel', relationship: 'child', age: 6, hasKuin: false },
                   { name: 'Tobi Kestel', relationship: 'child', age: 1, hasKuin: false } ] },
      programmes: [], hsgAssessment: 'likely',
      payoutAccount: { route: 'kuin', provider: 'Lumo Money', providerId: 'lumomoney', last4: '7782', maskedPhone: null } } },
  { id: 'tessa', label: 'Not the registered person – looks after the money', claims: { fullName: 'Tessa Ondrey', givenName: 'Tessa', familyName: 'Ondrey', dateOfBirth: '1997-04-09', nationalId: '9900 135 887', phone: '+999 74 310 2286' },
    data: {
      simRegistrations: [ { number: '+999 74 310 2286', network: 'Kora Mobile', registeredOn: '2024-08-29', usedBy: 'self' } ],
      address: { region: 'Lake Region', regionCode: 'LK', district: 'Fenmouth', village: 'Gull Reach', street: null, landmark: 'Next to the boatyard', postcode: 'LK 127', recordedOn: '2022-01-20' },
      household: { number: 'HH-LK-0230945', district: 'Fenmouth', village: 'Gull Reach', lastSurveyed: '2024-11', registeredPerson: 'Marek Ondrey',
        members: [ { name: 'Marek Ondrey', relationship: 'self', age: 34, hasKuin: true }, { name: 'Tessa Ondrey', relationship: 'partner', age: 29, hasKuin: true },
                   { name: 'Wena Ondrey', relationship: 'parent', age: 63, hasKuin: true }, { name: 'Nilo Ondrey', relationship: 'child', age: 8, hasKuin: false },
                   { name: 'Ada Ondrey', relationship: 'child', age: 4, hasKuin: false } ] },
      programmes: [], hsgAssessment: 'likely',
      payoutAccount: { route: 'kuin', provider: 'Kora Wallet', providerId: 'korawallet', last4: '2290', maskedPhone: null } },
    note: 'Her husband is the registered person and works away.' },
  { id: 'talin', label: 'Address and household out of date', claims: { fullName: 'Talin Vorsa', givenName: 'Talin', familyName: 'Vorsa', dateOfBirth: '1991-11-02', nationalId: '9900 318 526', phone: '+999 75 220 3197' },
    data: {
      simRegistrations: [ { number: '+999 75 220 3197', network: 'Kora Mobile', registeredOn: '2024-11-03', usedBy: 'self' } ],
      address: { region: 'Highlands', regionCode: 'HL', district: 'Ashgrove', village: 'Ashgrove', street: null, landmark: 'Near the coffee cooperative', postcode: 'HL 214', recordedOn: '2021-03-30' },
      household: { number: 'HH-HL-0377120', district: 'Ashgrove', village: 'Ashgrove', lastSurveyed: '2022-03', registeredPerson: 'Talin Vorsa',
        members: [ { name: 'Talin Vorsa', relationship: 'self', age: 34, hasKuin: true }, { name: 'Bren Vorsa', relationship: 'partner', age: 36, hasKuin: true },
                   { name: 'Iko Vorsa', relationship: 'child', age: 5, hasKuin: false } ] },
      programmes: [], hsgAssessment: 'needs_survey',
      payoutAccount: { route: 'kuin', provider: 'Kora Wallet', providerId: 'korawallet', last4: '9021', maskedPhone: null } },
    note: 'Now lives in Port Ondra, Coastal South, and had a baby this year.' },
  { id: 'sefa', label: 'No record in the registers', claims: { fullName: 'Sefa Tormik', givenName: 'Sefa', familyName: 'Tormik', dateOfBirth: '1979-01-01', nationalId: '9900 451 261', phone: '+999 77 840 1153' },
    data: {}, note: 'Pastoralist. Estimated date of birth. Speaks Vell.' },
  { id: 'desa', label: 'Partial result – no payout account linked', claims: { fullName: 'Desa Haldry', givenName: 'Desa', familyName: 'Haldry', dateOfBirth: '1983-05-23', nationalId: '9900 529 036', phone: '+999 71 234 5678' },
    data: {
      simRegistrations: [ { number: '+999 71 234 5678', network: 'Kora Mobile', registeredOn: '2024-04-15', usedBy: 'self' }, { number: '+999 72 880 1934', network: 'Lumo Telecom', registeredOn: '2024-04-15', usedBy: 'self' },
                          { number: '+999 79 004 3317', network: 'Kora Mobile', registeredOn: '2024-07-08', usedBy: 'child' }, { number: '+999 79 004 3318', network: 'Lumo Telecom', registeredOn: '2025-02-21', usedBy: 'self' },
                          { number: '+999 72 880 4471', network: 'Lumo Telecom', registeredOn: '2025-10-30', usedBy: 'self' } ],
      address: { region: 'Coastal South', regionCode: 'CS', district: 'Belmar', village: 'Belmar', street: '[Fictional] 4 Market Lane', landmark: null, postcode: 'CS 302', recordedOn: '2022-06-11' },
      household: { number: 'HH-CS-0412076', district: 'Belmar', village: 'Belmar', lastSurveyed: '2024-09', registeredPerson: 'Desa Haldry',
        members: [ { name: 'Desa Haldry', relationship: 'self', age: 43, hasKuin: true }, { name: 'Ruta Haldry', relationship: 'parent', age: 68, hasKuin: true },
                   { name: 'Arlo Haldry', relationship: 'child', age: 17, hasKuin: true }, { name: 'Fen Haldry', relationship: 'child', age: 14, hasKuin: false } ] },
      programmes: [], hsgAssessment: 'likely' },
    payment: 'declined', note: 'No account linked to her KUIN. For fee services: wallet balance too low.' },
  { id: 'jory', label: 'Says no to a consent-based pull', claims: { fullName: 'Jory Benmara', givenName: 'Jory', familyName: 'Benmara', dateOfBirth: '2001-06-30', nationalId: '9900 773 655', phone: '+999 78 605 4410' },
    data: {
      simRegistrations: [ { number: '+999 78 605 4410', network: 'Lumo Telecom', registeredOn: '2024-10-12', usedBy: 'self' } ],
      address: { region: 'Eastern Islands', regionCode: 'EI', district: 'Saltholm', village: 'Saltholm', street: '[Fictional] 9 Ferry Street', landmark: null, postcode: 'EI 401', recordedOn: '2019-08-02' },
      qualifications: '[Fictional] Kestria Secondary Certificate, 2019' },
    note: 'Choose "No" on the consent screen. Not for public-task pulls.' },
  { id: 'anais', label: 'Older person, helped by an intermediary', claims: { fullName: 'Anaïs Vorlek', givenName: 'Anaïs', familyName: 'Vorlek', dateOfBirth: '1948-01-01', nationalId: '9900 962 518', phone: '+999 76 409 0021' },
    data: {
      simRegistrations: [ { number: '+999 76 409 0021', network: 'Kora Mobile', registeredOn: '2024-12-02', usedBy: 'self' } ],
      address: { region: 'Eastern Islands', regionCode: 'EI', district: 'Corran Isle', village: 'Corran', street: '[Fictional] Harbour Row', landmark: 'Blue house by the jetty', postcode: 'EI 409', recordedOn: '2021-11-05' },
      household: { number: 'HH-EI-0051736', district: 'Corran Isle', village: 'Corran', lastSurveyed: '2024-02', registeredPerson: 'Anaïs Vorlek',
        members: [ { name: 'Anaïs Vorlek', relationship: 'self', age: 78, hasKuin: true }, { name: 'Mina Vorlek', relationship: 'grandchild', age: 19, hasKuin: true } ] },
      programmes: [ { programme: 'Older Persons Grant', member: 'Anaïs Vorlek', status: 'active', since: '2021-07' } ], hsgAssessment: 'already_supported',
      payoutAccount: { route: 'kuin', provider: 'Postbank Kestria', providerId: 'postbank', last4: '0154', maskedPhone: null } },
    note: 'Shares a basic phone with her granddaughter Mina, her authorised intermediary. Speaks Sora.' },
  { id: 'mina', label: 'Acts for her grandmother (authorised intermediary)', claims: { fullName: 'Mina Vorlek', givenName: 'Mina', familyName: 'Vorlek', dateOfBirth: '2007-05-21', nationalId: '9900 274 665', phone: '+999 76 409 0021' },
    data: {
      address: { region: 'Eastern Islands', regionCode: 'EI', district: 'Corran Isle', village: 'Corran', street: '[Fictional] Harbour Row', landmark: 'Blue house by the jetty', postcode: 'EI 409', recordedOn: '2023-06-02' },
      household: { number: 'HH-EI-0051736', district: 'Corran Isle', village: 'Corran', lastSurveyed: '2024-02', registeredPerson: 'Anaïs Vorlek',
        members: [ { name: 'Anaïs Vorlek', relationship: 'self', age: 78, hasKuin: true }, { name: 'Mina Vorlek', relationship: 'grandchild', age: 19, hasKuin: true } ] },
      programmes: [ { programme: 'Older Persons Grant', member: 'Anaïs Vorlek', status: 'active', since: '2021-07' } ], hsgAssessment: 'already_supported',
      payoutAccount: { route: 'msisdn', provider: 'Kora Wallet', providerId: 'korawallet', last4: null, maskedPhone: '+999 76 ··· ·021' } },
    actsFor: [ { persona: 'anais', relationship: 'grandmother',
      authority: { type: 'Authorised intermediary', reference: 'AI-EI-2026-00418', validUntil: '2027-03-31', canDo: ['apply', 'report changes'] } } ],
    note: 'Signs in as herself, then chooses to act for Anaïs. Needs signIn({ actingFor: true }).' },
  { id: 'aru', label: 'Can\'t sign in online (old phone number on record)', claims: { fullName: 'Aru Danvell' }, signIn: 'failed',
    data: {   // used once the mock can sign him in at a CSC (level 3)
      simRegistrations: [ { number: '+999 77 312 0864', network: 'Lumo Telecom', registeredOn: '2024-09-25', usedBy: 'self' } ],
      address: { region: 'Northern Plains', regionCode: 'NP', district: 'Dunmar', village: 'East Wells', street: null, landmark: 'Near the water point', postcode: 'NP 501', recordedOn: '2022-04-18' },
      household: { number: 'HH-NP-0042917', district: 'Dunmar', village: 'East Wells', lastSurveyed: '2024-01', registeredPerson: 'Aru Danvell',
        members: [ { name: 'Aru Danvell', relationship: 'self', age: 61, hasKuin: true }, { name: 'Selin Danvell', relationship: 'partner', age: 58, hasKuin: true },
                   { name: 'Teo Danvell', relationship: 'grandchild', age: 11, hasKuin: false } ] },
      programmes: [], hsgAssessment: 'likely',
      payoutAccount: { route: 'cash', provider: null, providerId: null, last4: null, maskedPhone: null } } }
];

const dpi = xstackDpi.create({
  serviceName: 'Apply for the Household Support Grant',
  locale: 'en-GB',                       // no real locale for Kestria; amounts show as "XTS 1,500.00"
  platforms: {
    identity: { name: 'KestriaID' },
    exchange: { name: 'KesLink' },
    payments: { name: 'GovPay Kestria', currency: 'XTS' }
  },
  attributes: {                          // only what this service needs – from its service sheet
    address:       { label: 'Your district and village',       source: 'National Population Register' },
    household:     { label: 'Your household',                  source: 'National Social Registry' },
    programmes:    { label: 'Support your household gets',     source: 'National Social Registry' },
    hsgAssessment: { label: 'Whether you can probably get it', source: 'National Social Registry' },
    payoutAccount: { label: 'Where we would pay',              source: 'KesPay' }
  },
  personas: KESTRIA_PERSONAS.filter(p => ['ines', 'tessa', 'talin', 'sefa', 'desa', 'mirel', 'anais', 'mina', 'aru'].includes(p.id))
});

// Then, in a service that lets an intermediary act (the Household Support Grant does):
// const who = await dpi.identity.signIn({ purpose: 'apply for the Household Support Grant', actingFor: true });
// who.actor is null, or { subject, claims, relationship, authority: { type, reference, validUntil, canDo } }
// for Mina acting for Anaïs. Enforce authority.canDo – she can't name herself as recipient or change the route.
```
