# Kestria: world bible

**Kestria is a fictional country.** It exists so xstack can be demonstrated, taught and tested end to end – discovery to live – against a government that runs on real, open Digital Public Infrastructure (MOSIP, eSignet, Mojaloop, X-Road) without touching any real government's systems or people.

This file is the single source of truth for facts about Kestria. `profile.md`, `dpi.md` and `service-standards.md` must agree with it. If you need a fact that isn't here, add it here first, then use it.

## Rules for using Kestria

1. **Say it's fictional, every time.** Every prototype, slide and document built on this profile carries "Kestria is a fictional country, used for demonstration" somewhere a viewer will see it.
2. **No real flags, crests, bank or telco brands.** Every institution, company and product in this file is invented. Don't borrow a real one's name or logo.
3. **No real people.** Names are invented. Don't name a real public figure, and don't make a persona a recognisable caricature of any real community.
4. **Reserved codes only.** Kestria uses codes that are set aside so they never collide with a real country (see [Codes](#codes)).
5. **Plausible, not copied.** Statistics are blended from the shapes of real lower-middle-income countries, so research and synthetic personas behave realistically. They are not any one country's numbers.
6. **The DPI is real software.** The platforms are invented, but each is built on a real open-source DPI product. Where this file says Kestria uses MOSIP or Mojaloop, the protocols, claims and message flows are the real ones, and the public docs apply.

## At a glance

| | |
|---|---|
| Official name | Republic of Kestria |
| Short name | Kestria. People are Kestrians. The adjective is Kestrian. |
| Capital | Aranport (on the west coast) |
| Population | 12.3 million (2025 national estimate) |
| Area | about 182,000 km² |
| Government | Presidential republic. A single-chamber National Assembly. Six regions, each with an elected regional council. |
| Official languages | Kestrian and English |
| Other major languages | Vell (the north) and Sora (the south-east coast and islands) |
| Currency | Kestrian kesta (K), divided into 100 cents |
| Income level | Lower-middle income |
| Time zone | UTC+2, no daylight saving |
| Drives on | the right |

## Geography

A western coastline with the capital and the main port. Behind it the land rises to the **Highlands**, which are cool and fertile, and are where most of the coffee and tea is grown. North of the Highlands are the dry **Northern Plains**, which are pastoral, sparsely populated and partly nomadic. In the south-east, around **Lake Kerrow**, there's farming and fishing. Off the south-east coast lie the **Eastern Islands**, a chain of 14 inhabited islands linked by ferry.

The rainy season runs from March to June. Roads in the Northern Plains and parts of the Lake Region are often cut off between April and May. That matters for any service with an in-person step.

## Regions and districts

Six regions and 38 districts. The two-letter region code is used in postcodes and digital addresses.

| Region | Code | Regional capital | Population | Urban | Main languages | Character |
|---|---|---|---|---|---|---|
| Capital Region | `CR` | Aranport | 3.1m | 88% | Kestrian, English | The capital, ministries, most jobs in the formal sector, good 4G |
| Coastal South | `CS` | Belmar | 2.4m | 51% | Kestrian, Sora | Port towns, fishing, tourism, informal trade |
| Highlands | `HL` | Tor Vessa | 2.3m | 34% | Kestrian | Smallholder coffee and tea farms, cooperatives, steep terrain |
| Lake Region | `LK` | Kerrow | 1.8m | 29% | Kestrian, Sora | Farming and fishing, seasonal flooding |
| Northern Plains | `NP` | Dunmar | 2.0m | 18% | Vell, Kestrian | Pastoralists, long distances, the weakest coverage, the lowest ID enrolment |
| Eastern Islands | `EI` | Saltholm | 0.7m | 22% | Sora, Kestrian | Ferry-dependent, remittances from abroad, older population |

All 38 districts and their postcodes. A postcode identifies a district area, not a building (see `profile.md`, Data formats). Use this list for district dropdowns.

| Region | Districts (postcode) |
|---|---|
| Capital Region (7) | Aranport Central (`CR 101`), Harbourside (`CR 102`), Millbrook (`CR 103`), Westgate (`CR 104`), Kessel Hill (`CR 105`), Northgate (`CR 106`), Calder Park (`CR 107`) |
| Coastal South (7) | Belmar (`CS 302`), Port Ondra (`CS 303`), Calloway (`CS 304`), Sandmere (`CS 305`), Wren Bay (`CS 306`), Ostrel (`CS 307`), Marlow Point (`CS 308`) |
| Highlands (7) | Tor Vessa (`HL 204`), Ashgrove (`HL 214`), Hollin (`HL 224`), Upper Brae (`HL 234`), Kelt (`HL 244`), Brannoch (`HL 254`), Mossfell (`HL 264`) |
| Lake Region (6) | Kerrow (`LK 107`), Reedwater (`LK 117`), Fenmouth (`LK 127`), Sallow (`LK 137`), Ennor (`LK 147`), Pike Ford (`LK 157`) |
| Northern Plains (6) | Dunmar (`NP 501`), Orsk (`NP 502`), Talamir (`NP 503`), Greywell (`NP 504`), Karnet (`NP 505`), Sarrow Wells (`NP 506`) |
| Eastern Islands (5) | Saltholm (`EI 401`), Little Mar (`EI 405`), Corran Isle (`EI 409`), Skerra (`EI 413`), Holm Vey (`EI 417`) |

## Codes

| What | Kestria's code | Why it's safe |
|---|---|---|
| Country code | `XQ` | ISO 3166-1 sets aside `XA`–`XZ` for user-assigned codes. Don't use `XK`, which is widely used for Kosovo. |
| Currency code | `XTS` | ISO 4217 reserves `XTS` for testing. On screen, write the kesta as `K`. |
| Web domains | `kestria.test` | `.test` is reserved (RFC 6761) and never resolves on the public internet. |
| Email | `@kestria.test` | Same |
| Phone calling code | `+999` | Reserved by the ITU for future use, so it doesn't route anywhere. |
| National ID test range | `9900 000 000`–`9900 999 999` | The National Identity Authority never issues IDs in this range. Every persona's ID is in it. |

## Government

- **Head of state and government:** the President, elected for five years
- **Legislature:** the National Assembly, 210 members
- **Regional government:** six regional councils deliver health, primary schools, local roads and some licensing
- **Front-line offices:** 38 district offices, one for each district, plus 120 **Citizen Service Centres** (CSCs). CSCs are one-stop counters in towns and large villages. Staff can enrol people for KestriaID, sign them in with their fingerprint and complete online services for them.

### Ministries and agencies that matter to xstack

| Body | Short name | What it does here |
|---|---|---|
| Ministry of Digital Economy and Innovation | MoDEI | Digital policy. It owns the Digital Government Act and funds the shared platforms. |
| Kestria Digital Service | KDS | The government's digital team, part of MoDEI. It runs GovKestria, KesLink, GovPay Kestria, GovNotify and the consent registry. xstack teams sit here or are embedded in ministries with KDS support. |
| National Identity Authority | NIA | Runs KestriaID (MOSIP and eSignet) and the National Population Register |
| Central Bank of Kestria | CBK | Runs KesPay, the national instant payment switch (Mojaloop), and sets its scheme rules |
| Ministry of Finance – Treasury | Treasury | Holds the Treasury Single Account, which is a KesPay participant |
| Civil Registration Office | CRO | Registers births, deaths and marriages (OpenCRVS), in every district office |
| Social Protection Agency | SPA | Runs the National Social Registry and the cash transfer programmes (OpenG2P) |
| Kestria Revenue Service | KRS | Collects tax. Runs the taxpayer register. |
| Vehicle Licensing Authority | VLA | Handles vehicle registration, licensing and driving licences |
| Business Registration Office | BRO | Registers companies, partnerships and sole traders |
| Lands Registry | – | Holds land parcels and title, with partial digitisation |
| National Health Insurance Fund | NHIF | Health insurance membership and contributions |
| Kestria Examinations Council | KEC | National exam results and certificates |
| Data Protection Commission | DPC | The regulator under the Data Protection Act 2022 |
| Kestria Communications Authority | KCA | Licenses mobile networks and runs the **National SIM Register** under the Communications Act 2019 |
| National Bureau of Statistics | NBS | Census, household surveys and the digital inclusion survey |

## Economy and money

- **GDP per person:** about US$3,100. About 60% of jobs are informal.
- **Kesta:** about K 18 to US$1. A typical rural monthly household income is K 4,000–9,000. A fee of K 500 is significant for many people.
- **Typical government fees:**
  - replacement KestriaID card: K 300
  - birth certificate copy: K 150
  - business name registration: K 1,200
  - annual vehicle licence for a car: K 2,400
  - driving licence renewal: K 900
- **SPA cash programmes:** a household can get only one. Full rules are in `services/household-support-grant.md`.
  - **Household Support Grant:** K 1,500 a month to about 610,000 households
  - **Older Persons Grant:** K 800 a month to people aged 70 and over in the lowest welfare bands
- **How people pay:**
  - mobile money is the default
  - cards are mostly used in Aranport
  - cash at agents is everywhere
  - many government fees can also be paid with a **Government Payment Reference** at any bank, mobile money agent or post office

### Financial services

All invented. Each is a KesPay participant.

| Provider | Type | Notes |
|---|---|---|
| Aranport Commercial Bank (ACB) | Bank | The largest bank, mostly urban, salaried customers |
| Highland Cooperative Bank (HCB) | Cooperative bank | Strong in the Highlands with farmers and cooperatives |
| Postbank Kestria | State savings bank | Branches in post offices, older customers, pensions |
| Lumo Money | Mobile money (Lumo Telecom) | The largest wallet, with 6.1m users. Agents in almost every village. |
| Kora Wallet | Mobile money (Kora Mobile) | The second wallet, with 2.4m users. Popular in the Coastal South and Eastern Islands. |
| Treasury Single Account | Government | Receives all government fees and pays all government disbursements |

## People and inclusion

Figures for adults aged 18 and over unless stated. Sources (fictional): NBS Census 2022, NBS Digital Inclusion Survey 2024 and NIA enrolment reports. `synthetic-research` uses this table.

| Measure | National | Capital Region | Northern Plains | Eastern Islands |
|---|---|---|---|---|
| Median age (whole population) | 21 | 26 | 17 | 31 |
| Adults who can read a simple sentence in any language | 74% | 93% | 49% | 81% |
| Can read English comfortably | 34% | 61% | 9% | 28% |
| Own a mobile phone | 81% | 95% | 62% | 84% |
| Own a smartphone | 52% | 79% | 24% | 47% |
| Used the internet in the last 3 months | 49% | 78% | 21% | 44% |
| Phone is shared with someone else in the household | 23% | 9% | 41% | 26% |
| Enrolled in KestriaID | 78% | 91% | 52% | 74% |
| Enrolled, and the phone number on record still works (needed for OTP sign-in) | 61% | 74% | 38% | 55% |
| Bank account | 38% | 64% | 11% | 33% |
| Mobile money account | 64% | 79% | 41% | 70% |
| No account of any kind | 29% | 12% | 54% | 25% |
| Living with a disability (Washington Group short set) | 12% | 10% | 14% | 17% |

Where the gaps are:
- **Women:**
  - 8 points less likely than men to own a phone
  - 11 points less likely to have a mobile money account
  - more likely to share a phone
- **Over-60s:**
  - 24% own a smartphone
  - most use services through a family member or a CSC
- **Pastoralists in the Northern Plains:**
  - move with the seasons
  - often far from a CSC
  - many have a birth record but no KestriaID
- **Under-18s:** can't enrol for a KestriaID card until 16, but their birth is in the civil register.

## Languages

- **Kestrian:** the lingua franca. 88% of people speak it and 52% speak it as their first language. Written in the Latin alphabet with a few diacritics (`ä`, `ö`, `š`). It's the default language of every service. Its sounds, grammar and a glossary of service words are in `kestrian.md`.
- **English:** official, and used in law, higher education and business. Don't assume people read it well outside the Capital Region.
- **Vell:** the first language of about 18% of people, mostly in the Northern Plains. Spoken more than written. Audio, pictures and community radio reach people better than text.
- **Sora:** the first language of about 13% of people, in the Coastal South, Lake Region and Eastern Islands.

Every national service must work in Kestrian and English. Services aimed at the north or the coast should also offer Vell or Sora, or at least a phone line in those languages (Digital Government Act 2023, s.14).

### Names

Kestrians usually have one or two given names and a family name. Family name first is common in Vell-speaking areas, and the National Population Register stores names as given name(s) and family name in separate fields. Many older people in the north have only an approximate date of birth: the register records `01 01` with a year, flagged as estimated.

Examples of invented names: Mirel Okand, Talin Vorsa, Desa Haldry, Sefa Tormik, Aru Danvell, Jory Benmara, Ines Kestel, Anaïs Vorlek, Pell Marrow, Tomas Ondrey.

## Connectivity and channels

- **Mobile networks:** two, both invented. Numbers have been portable between them since 2022, so a number's first digits don't tell you its network.

  | Network | SIM cards in use | Notes |
  |---|---|---|
  | Lumo Telecom | about 9.6m | The largest. Runs Lumo Money. Shops in every district capital, and agents in almost every village. |
  | Kora Mobile | about 4.5m | Strongest in the Coastal South and Eastern Islands. Runs Kora Wallet. |

  There are more SIM cards than adults: many people have one for each network, and some for a family member's phone.

- **4G:** covers 96% of the Capital Region and 41% of the Northern Plains. Elsewhere, 2G or 3G is common, and most people buy data in small daily bundles.
- **USSD:** works on any phone, and it's how most people use mobile money. `*999#` is the government USSD short code.
- **SMS:** the most reliable way to reach anyone. GovNotify sends SMS in all four languages.
- **GovKestria helpline:** `+999 77 100 2000`. This is the official phone line for every service on GovKestria.
  - It's run by KDS.
  - It answers in Kestrian, English, Vell and Sora.
  - It can take people through a service, or refer them to a CSC.

  Use it in help panels, confirmation pages and texts. Services don't have their own numbers.
- **WhatsApp:** widely used where people have smartphones. Community and church groups use it heavily.
- **Community radio:** the main media in the Northern Plains and Lake Region.
- **Assisted channels:**
  - 120 CSCs
  - 38 district offices
  - post offices
  - mobile money agents (for paying, not for services)
  - "digital champions" – trained volunteers in about 400 villages

## Digital government timeline

| Year | What happened |
|---|---|
| 2019 | Kestria Digital Service set up inside the new Ministry of Digital Economy and Innovation |
| 2021 | KestriaID launched on MOSIP. Mass enrolment campaign starts. |
| 2022 | Data Protection Act passed. Data Protection Commission set up. |
| 2023 | Digital Government Act passed, including the once-only principle. KesPay goes live on Mojaloop with four participants. GovKestria portal launched. |
| 2024 | KesLink (X-Road) goes live with 9 registers. Civil registration moves to OpenCRVS and links births to the National Population Register. eSignet sign-in added to GovKestria. The SIM Registration Regulations require every SIM card to be registered to a named person, and network shops start registering them with a fingerprint check against KestriaID. |
| 2025 | Household Support Grant moves to OpenG2P with payouts over KesPay. Kora Wallet and the Treasury join KesPay. Consent registry pilot starts. |
| 2026 | The Kestria Digital Service Standard becomes mandatory for new services. About 40 services on GovKestria, around a third of them fully online. KCA and KDS start online SIM registration on GovKestria. About 2.8m SIM cards in use are still not registered. |

## Laws and policy

All fictional. Cite them by these names.

- **Data Protection Act 2022:**
  - consent (s.12)
  - legal obligation and public task (s.13)
  - sensitive data, including biometrics and health (s.15)
  - rights to see and correct your data (ss.20–23)
  - breach notification to the DPC within 72 hours (s.31)
- **Digital Government Act 2023:**
  - the once-only principle: agencies must reuse data government already holds instead of asking again (s.9)
  - the KesLink data-sharing framework (ss.10–13)
  - service languages (s.14)
  - the service standard (s.18)
  - shared platforms are mandatory where they exist (s.21)
- **Electronic Transactions Act 2020:**
  - electronic signatures and declarations are valid (s.6)
  - statutory declarations can be signed electronically after signing in with KestriaID at assurance level 2 or above (s.8)
  - deeds and wills still need paper
- **National Identity Act 2020:**
  - the KestriaID Unique Identification Number (KUIN)
  - enrolment from age 16
  - the NIA must offer authentication to approved services (s.17)
  - a service may not refuse someone who has no KUIN where an alternative route is reasonable (s.19)
- **Social Protection Act 2021:**
  - sets up SPA and the National Social Registry (s.12 gives SPA a public task to hold and use registry data)
  - makes false information on purpose an offence that can stop payments and lead to repayment (s.41)
  - the **Household Support Grant Regulations 2025** set the grant's rules – see `services/household-support-grant.md`
- **Communications Act 2019:**
  - sets up the Kestria Communications Authority, which licenses mobile networks (s.4)
  - giving false information to register a SIM card, or registering one in someone else's name without their agreement, is an offence (s.52)
  - the **Communications (SIM Registration) Regulations 2024** set the rules for registering SIM cards – see `services/sim-registration.md`
- **Persons with Disabilities Act 2018:** public services must be accessible. Government websites follow WCAG 2.2 AA (Accessibility Regulations 2024).
- **Cloud-first and open-source policy (MoDEI, 2023):**
  - open source by default
  - personal data hosted in-country
- **Where legislation is published:** `laws.kestria.test`

## The services people use most

The backlog the demo team can draw from. "Hero" services are the ones to build first, because between them they use every pillar of the DPI.

| Service | Owner | DPI it uses | Notes |
|---|---|---|---|
| **Apply for the Household Support Grant** *(hero)* | SPA | Identity, social registry (public task), KesPay payout to any wallet | The whole DPI story: sign in, pull household data, assess eligibility, pay to the wallet of whoever looks after the money. **Service sheet:** `services/household-support-grant.md` |
| **Register a birth** *(hero)* | CRO | Identity (parents), CRVS, notifications | Starts at a health facility. Creates the child's record and links it to the parents. |
| **Renew a vehicle licence** *(hero)* | VLA | Identity, vehicle register, KRS tax check, GovPay | The fee-paying journey: card, mobile money or a Government Payment Reference |
| **Register a SIM card** | KCA | Identity, National SIM Register, an SMS check that you have the SIM | A short, free service with a deadline. Unregistered SIM cards are switched off after 31 March 2027. **Service sheet:** `services/sim-registration.md` |
| Register a business name | BRO | Identity, business register, GovPay | |
| Get a tax compliance certificate | KRS | Identity, taxpayer register | Needed for government contracts and some licences |
| Replace a lost KestriaID card | NIA | Identity (biometric at a CSC), GovPay | Partly in person by design |
| Apply for a driving licence | VLA | Identity, KEC (eyesight test record), GovPay | |
| Join health insurance (NHIF) | NHIF | Identity, social registry (exemption), KesPay | People in the poorest households are exempt from contributions |
| Report a death | CRO | Identity, CRVS, social registry (stops payments) | A tell-us-once candidate |

## Paper forms to digitise

For `/xstack:form-to-spec` demos. The forms themselves still need making, as fictional PDFs in the style of a government that has had paper for decades. Give each one the usual problems: questions government already knows, a witness box, "office use only" sections and legal small print.

- **SPA/HSG-1:** Household Support Grant application (6 pages)
- **VLA-14:** Vehicle licence renewal
- **CRO-B2:** Notice of birth
- **BRO-N1:** Business name registration
- **NIA-R3:** Replacement identity card request
