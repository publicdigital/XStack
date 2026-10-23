# Kestria xstack profile

**Kestria is a fictional country.** This profile exists for demonstrating, teaching and testing xstack against a government that runs on real open-source Digital Public Infrastructure: MOSIP and eSignet for identity, Mojaloop for payments and X-Road for data exchange. Nothing in it describes a real government. Every artefact built with it must say it is fictional.

To use it, add this line to your project's `CLAUDE.md` or `AGENTS.md`:

```
xstack profile: kestria
```

## Files in this profile

| File | What it holds | Read it when |
|---|---|---|
| `profile.md` | This file: context, terms, standards mapping, platforms, data formats | Always, first |
| `world.md` | The world bible: geography, regions, institutions, population and inclusion statistics, laws, the service backlog. Every fact about Kestria comes from here. | Research, synthetic personas, discovery, or any time you need a fact about Kestria |
| `service-standards.md` | The Kestria Digital Service Standard, with how an agent checks each point | Assessing or citing standards |
| `dpi.md` | KestriaID, KesPay, GovPay Kestria and KesLink: protocols, the payout model, the data catalogue with value shapes, and test personas | Building anything that signs people in, pulls data or takes or makes payments |
| `design-system.md` and `design-system/` | The GovKestria design system: `DESIGN.md` (rules, tokens, components, patterns), `tokens.css` and `tokens.json`, `kestria.css` (`kg-` components) and `example.html`. `design-system.md` says how xstack prototypes use it. | Building any Kestria page, prototype or service |
| `services/*.md` | Service sheets – the rules of a particular service (eligibility, who can apply and be paid, sign-in levels, timings, declaration wording, which personas fit). So far: `household-support-grant.md` | Building or researching that service. Its rules win over a brief's guesses. |

## Government and context

- **Country:** Republic of Kestria (fictional). 12.3 million people in six regions. Lower-middle income. See `world.md`.
- **Digital team:** Kestria Digital Service (KDS), part of the Ministry of Digital Economy and Innovation (MoDEI). xstack teams sit in KDS or are embedded in a ministry or agency with KDS support.
- **Languages people use:**
  - Kestrian, the lingua franca and the default for every service
  - English (official, but only 34% of adults read it comfortably)
  - Vell, in the Northern Plains, more spoken than written
  - Sora, on the south-east coast and the Eastern Islands

  National services must work in Kestrian and English (Digital Government Act 2023, s.14).
- **Connectivity and devices:**
  - 52% of adults own a smartphone and 81% own any phone
  - prepaid data in small daily bundles
  - good 4G in the Capital Region, 2G or 3G across much of the rest
  - 23% share a phone with someone else in their household (41% in the Northern Plains)
  - USSD and SMS reach everyone, apps don't

  Design for a low-cost Android phone on a slow connection, with a USSD or assisted route alongside.
- **Offline and assisted channels:**
  - 120 Citizen Service Centres (CSCs), which can enrol people, sign them in with a fingerprint and complete services for them
  - 38 district offices
  - post offices
  - mobile money agents, for paying
  - about 400 village "digital champions"
  - family members, who often act for older people

## Terms

| Generic term xstack uses | What it's called here |
|---|---|
| Department (the part of government that owns a service) | **Ministry or agency**, for example the Social Protection Agency (SPA) |
| Platform team (owns shared platforms such as identity and payments) | **KDS** (Kestria Digital Service) for GovKestria, KesLink, GovPay Kestria and GovNotify. The **NIA** (National Identity Authority) owns KestriaID. The **CBK** (Central Bank of Kestria) owns KesPay. |
| Service owner | The owning ministry or agency |
| National identity platform | **KestriaID** |
| National ID number | **KUIN** (KestriaID Unique Identification Number) |
| Government website | **GovKestria** (`gov.kestria.test`) |
| Regions | **Regions** (6), divided into **districts** (38) |
| Counter service | **Citizen Service Centre** (CSC) |

## Verification owners

| Tag | Who owns it here |
|---|---|
| `[VERIFY WITH USERS]` | The service team's user researcher, with the KDS research community |
| `[VERIFY WITH DEPARTMENT]` | The owning ministry or agency |
| `[VERIFY WITH PLATFORM]` | KDS. For identity, the NIA. For the KesPay rail, the CBK. |
| `[VERIFY WITH POLICY]` | The owning agency's legal adviser, and the Data Protection Commission for data sharing |
| `[VERIFY WITH DATA]` | The KDS performance team, and the National Bureau of Statistics for population data |

In a demo, nobody answers these. Keep the tags anyway – showing where real verification would happen is part of the point.

## Service standard

- **Name:** Kestria Digital Service Standard (12 points), mandatory for new services since 2026 under the Digital Government Act 2023, s.18
- **Link:** `gov.kestria.test/standard` (fictional)
- **Full text:** `service-standards.md`

Cite points as "Point 5 (Don't ask for what government already knows)".

| Point | Title | xstack baseline theme(s) |
|---|---|---|
| 1 | Start with the people who use the service | User needs |
| 2 | Solve the whole problem, across every channel | Whole problem |
| 3 | Make it work for everyone, in their language | Inclusion |
| 4 | Keep it simple and in plain words | Plain language, Works first time |
| 5 | Don't ask for what government already knows | Open platforms and standards, Whole problem, Works first time |
| 6 | Protect people's data and earn their trust | Trust, security and privacy |
| 7 | Build on the national platforms | Right technology, Open platforms and standards |
| 8 | Build it with a multidisciplinary team | Multidisciplinary team |
| 9 | Work in the open | Working in the open |
| 10 | Measure what matters and publish it | Measuring performance |
| 11 | Keep it running, on any network | Sustainable and reliable |
| 12 | Keep improving it for as long as it runs | Continuous improvement |

**Not in our standard:** Findable. Apply it anyway. Many Kestrians find services through CSC staff, community radio and WhatsApp, not search, so "findable" includes those routes.

## Design system

- **Name and link:** the **GovKestria design system** (fictional), in `design-system/`. `design-system/DESIGN.md` is the source of truth: rules, tokens, component markup, page patterns, writing and accessibility rules, and a checklist.
- **Details:** `design-system.md` – how xstack prototypes use it, the chrome, and which component to use for each pattern, including the gaps
- **How to use it in a prototype:**
  - A single-file prototype inlines `design-system/tokens.css`, then `design-system/kestria.css`, exactly as they are. It doesn't approximate them.
  - A multi-file service links them in that order.
  - Start new pages from `design-system/example.html`.
  - Never hard-code a colour or size that has a token. Add new tokens to `tokens.json` and `tokens.css` first.
- **Page chrome every service must have:** the `ServiceHeader` and footer from `DESIGN.md`:
  - the fictional-country banner, repeated in the footer
  - the GovKestria wordmark (plain type, no crest)
  - the service name
  - a language switcher
  - a footer with privacy and accessibility links
  - prototypes also need an alpha or beta phase line (see `design-system.md`)
- **Colours and fonts:** Lake Kerrow blue (`--brand`) with a dry-season-sun accent (`--accent`, once per screen), and Noto Sans. Don't invent a crest or flag.

## Shared platforms

- **Details:** `dpi.md` – platforms, protocols, the data catalogue and test personas

| Need | Platform | How to integrate |
|---|---|---|
| Identity and sign-in | **KestriaID** (MOSIP, with eSignet sign-in) | OpenID Connect via eSignet. Never ask for name, date of birth or KUIN when sign-in can supply them. |
| Personal details lookup | National Population Register, via KestriaID claims or KesLink | Claims at sign-in. Anything beyond that through KesLink, with consent. |
| Payments – taking fees | **GovPay Kestria** (KDS) | Hosted payment page. Card, mobile money, or a Government Payment Reference to pay later in cash. |
| Payments – national rail and payouts | **KesPay** (CBK, Mojaloop) | Services don't connect to KesPay directly. Fees go through GovPay. Payouts go through the Treasury's disbursement service. The service names the **recipient**, and KesPay finds where to pay: the account linked to their KUIN, then their phone number, then a cash voucher that needs no KUIN. See Payouts in `dpi.md`. |
| Data exchange between registers | **KesLink** (KDS, X-Road) | A data-sharing agreement for each register, then a call to that register's X-Road service, with a consent record |
| Consent | **MyData Kestria** consent registry (KDS, pilot) | Record every consent-based pull. Citizens see who used their data in their GovKestria account. |
| Notifications (email, SMS) | **GovNotify Kestria** (KDS) | SMS first, in the citizen's language. Email where they've given one. |
| Registers and lookups | Through KesLink | See the data catalogue in `dpi.md` |

## Data formats

| Field | Format |
|---|---|
| KUIN (national ID number) | 10 digits, displayed in groups of 4, 3 and 3: `9900 214 705`. The last digit is a Verhoeff check digit, so validate it and say "Check your KUIN – one of the numbers may be wrong" if it fails. The number carries no meaning: don't derive date of birth or region from it. Accept it with or without spaces. Test range is `9900 000 000`–`9900 999 999`. |
| Virtual ID (VID) | 16 digits, displayed in groups of 4. A revocable alias a citizen can use instead of their KUIN to sign in or share. Accept either wherever a KUIN is asked for. |
| Tax identification number (TIN) | `T` + 8 digits, for example `T04417296` |
| Social registry household number | `HH-` + region code + 7 digits, for example `HH-NP-0042917` |
| Vehicle registration | Region code + 3 digits + letter, for example `HL 482 B` |
| Business registration | Business names `BN-` + year + 6 digits (for example `BN-2024-004417`). Companies `C-` + 6 digits. |
| Address and regions | Region (6), district (38), town or village, then street and house number *if there is one*, then a landmark (optional, but common and useful). Most rural addresses have no street name. Never make street required. |
| Postcode | Region code + 3 digits, for example `HL 204`. It identifies a district area, not a building. Most people don't know theirs, so derive it from the district rather than asking. |
| Digital address (KesAddress) | Postcode + 4 digits, for example `HL-204-7731`, for a specific building or plot. 64% coverage in towns, 15% in rural areas. Optional – never required. |
| Phone number | Country code `+999`. Mobile numbers are 9 digits starting with 7, for example `+999 71 234 5678`. Accept any format – don't enforce a pattern. |
| Date | DD MM YYYY in three separate inputs. Some older people's dates of birth are estimated and recorded as `01 01` with a year – don't treat that as an error. |
| Currency | Kestrian kesta, written `K 1,250` (or `K 1,250.00` on receipts). In code and in `dpi-mock.js`, use the ISO 4217 test code `XTS`. |
| Names | Given name(s) and family name, in separate fields. Accept a single name. Don't assume which order people say them in. |

## Law and policy

All fictional. Full list in `world.md`.

- **Data protection law and regulator:** Data Protection Act 2022, regulated by the Data Protection Commission (DPC)
  - lawful bases: consent (s.12), legal obligation and public task (s.13)
  - biometrics and health are sensitive data (s.15)
  - breaches must be reported to the DPC within 72 hours (s.31)
- **Once-only and data sharing:**
  - Digital Government Act 2023, s.9 (once-only) and ss.10–13 (KesLink data sharing)
  - s.21: shared platforms are mandatory where they exist
- **Accessibility law or standard:** Persons with Disabilities Act 2018 and the Accessibility Regulations 2024 – WCAG 2.2 AA
- **Open source, open data or cloud policy:** MoDEI cloud-first and open-source policy (2023). Code is open by default. Personal data is hosted in-country.
- **Electronic signatures, declarations and oaths:** Electronic Transactions Act 2020
  - electronic signatures and declarations are valid (s.6)
  - statutory declarations can be signed electronically after signing in at KestriaID assurance level 2 or above (s.8)
  - deeds and wills still need paper
- **No KUIN, no service is not allowed:** National Identity Act 2020, s.19. A service may not refuse someone without a KUIN where an alternative route is reasonable, so every DPI journey needs a route without it.
- **Where legislation is published:** `laws.kestria.test` (fictional)

## Research context

- **Population data sources:** `world.md`
  - the regional table
  - the inclusion table: literacy, devices, ID enrolment, accounts and disability, by region
  - names and languages

  These are fictional NBS figures (Census 2022, Digital Inclusion Survey 2024) blended from the shapes of real lower-middle-income countries. `synthetic-research` should draw personas from them, and say they are synthetic and the country is fictional.
- **Recruitment channels (in the story):**
  - CSC queues
  - district offices
  - village digital champions
  - women's savings groups
  - pastoralist associations in the Northern Plains
  - fishing cooperatives in the Lake Region
  - church and mosque groups
  - mobile money agents
- **Research languages and interpreters:** Kestrian by default. Interpreters for Vell and Sora. Plan for audio and pictures with low-literacy participants.
- **Personas and names:** use the invented names and districts in `world.md`. Spread personas across regions, languages, phone ownership (own, shared, none), ID status and account type (bank, wallet, none).

## Related skills

None. Kestria is fictional and has no house-style skills.
