# Barbados xstack profile

The first complete xstack profile. GovTech Barbados built it while using xstack (then called "bimstack") to build services on alpha.gov.bb. The worked examples in `examples/` use this profile.

To use it, add this line to your project's `CLAUDE.md` or `AGENTS.md`:

```
xstack profile: barbados
```

## Files in this profile

| File | What it holds | Read it when |
|---|---|---|
| `profile.md` | This file: context, terms, standards mapping, platforms, data formats | Always, first |
| `service-standards.md` | The full Barbados Digital Service Standards, with how an agent checks each one | Assessing or citing standards |
| `house-style.md` | GovTech Barbados visual identity, voice, chrome and data formats | Building prototypes, slides, documents |
| `service-patterns.md` | The nine standard alpha.gov.bb pages, reusable field blocks and Barbados field standards | Designing or reviewing a form or service |
| `design-tokens.yaml` | The GOV.BB Pattern Library's exact token values, component inventory and scope guard | Design-system work in Figma or code |
| `design-guide.md` | How the GOV.BB design system is organised and the rules for working in it safely | Design-system work in Figma or code |
| `assets/logo_*.png` | GovTech Barbados logos: colour on light, white on dark | Building slides or documents |

## Government and context

- **Country:** Barbados
- **Digital team:** GovTech Barbados, delivering services on alpha.gov.bb
- **Languages people use:** English, and Bajan (Barbadian Creole) in everyday speech. Bajan turns of phrase are welcome in copy where they make things clearer.
- **Connectivity and devices:** mostly mobile, with good coverage. Many people use prepaid data on low-cost phones.
- **Offline and assisted channels:** MDA counters, post offices, phone lines, and help from family and community members

## Terms

| Generic term xstack uses | What it's called here |
|---|---|
| Department | **MDA** (Ministry, Department or Agency) |
| Platform team | **MIST** (Ministry of Innovation, Industry, Science and Technology), which owns Trident ID, payments and infrastructure choices, with GovTech Barbados |
| Service owner | The owning MDA |
| National identity platform | **Trident ID** |
| Government website | **alpha.gov.bb** |
| Regions | **Parishes** |

In assumption tags, `[VERIFY WITH DEPARTMENT]` means the MDA and `[VERIFY WITH PLATFORM]` means MIST. Older Barbados work, including the examples, uses `[VERIFY WITH MDA]` and `[VERIFY WITH MIST]`.

## Service standard

- **Name:** Barbados Digital Service Standards (13 standards)
- **Link:** <https://github.com/govtech-bb/Barbados-Digital-Service-Standards>
- **Full text:** `service-standards.md`

Cite them as "Standard 4 (Use simple and relatable language)".

| Standard | Title | xstack baseline theme(s) |
|---|---|---|
| 1 | Make sure your service meets your users' needs | User needs |
| 2 | Discover, design, build and deliver with a multidisciplinary team | Multidisciplinary team |
| 3 | Ensure that everyone can use the service | Inclusion |
| 4 | Use simple and relatable language | Plain language |
| 5 | Make sure the service works the first time it's used | Works first time |
| 6 | Choose the right tools and technology | Right technology |
| 7 | Use open, common, interoperable platforms | Open platforms and standards |
| 8 | Make the service scalable and sustainable | Sustainable and reliable |
| 9 | Be open and transparent | Working in the open |
| 10 | Make sure the service can be continuously improved | Continuous improvement |
| 11 | Design for trust, safety, and confidentiality | Trust, security and privacy |
| 12 | Make it easy for users to find | Findable |
| 13 | Monitor, manage, and measure performance | Measuring performance |

**Not in our standard:** Whole problem. Apply it anyway; it is partly covered by Standards 1 and 5.

## Design system

- **Name and link:** GOV.BB design system, <https://github.com/govtech-bb/design-system>. Templates and component reference for LLMs: <https://govtech-bb.github.io/design-system/llm/llms.txt>
- **How to use it in a prototype:** link the published `@govtech-bb/styles` package when it is reachable. Otherwise use the inline approximation of the GovBB tokens in `house-style.md`. CSS class prefix is `govbb-`.
- **Page chrome every service must have:** official government banner ("This is the official government service of Barbados"), yellow GovBB header with logo, alpha or beta phase banner, navy footer with the Barbados crest
- **Colours and fonts:** Navy `#00267F`, Gold `#FFC726`, Off-white `#F7F3F3`, Charcoal `#2C2C2C`. Figtree for all text. Full palette in `house-style.md`.
- **Token and component files:** `design-tokens.yaml` (values) and `design-guide.md` (reasoning). Figma is the source of truth: the GOV.BB Pattern Library file.
- **Service patterns:** `service-patterns.md`

## Shared platforms

| Need | Platform | How to integrate |
|---|---|---|
| Identity and personal details | Trident ID | Use the Trident ID lookup instead of asking for name, date of birth and address |
| Payments | Shared GovTech payment gateway | Don't build a custom one |
| Vehicles | Vehicle lookup | The source of truth for vehicle details |
| Businesses | Business lookup | The source of truth for business details |
| Hosting | Whatever MIST approves for the service tier | Record it in an ADR |

## Data formats

| Field | Format |
|---|---|
| National Registration Number (NRN) | `YYMMDD-XXXX` |
| National Insurance Number | 6 digits |
| Parish | Christ Church, St. Andrew, St. George, St. James, St. John, St. Joseph, St. Lucy, St. Michael, St. Peter, St. Philip, St. Thomas |
| Postcode | `BB` + 5 digits, for example `BB11000` |
| Phone number | Accept any format – don't enforce a pattern |
| Date | DD MM YYYY in three text inputs |
| Currency | Barbados dollar (BBD, BDS$) |

## Law and policy

- **Data protection law:** Barbados Data Protection Act
- **Hosting and security guidance:** ask MIST, and record any non-standard security control in an ADR

## Research context

- **Population data sources:** Barbados Statistical Service (census), digital-inclusion statistics, MDA contact-centre themes
- **Recruitment channels:** parish community groups, MDA contact lists, assisted-digital channels, professional bodies for professional services
- **Personas and names:** use realistic Barbadian names, and spread personas across parishes, occupations and digital confidence

## Related skills

GovTech Barbados has its own Claude skills for its house style. If they are installed, prefer them for Barbados work:

- `anthropic-skills:govtech-barbados-services` – content pages and services on alpha.gov.bb
- `anthropic-skills:govtech-barbados-forms` – multi-page form prototypes on the GovBB framework
- `anthropic-skills:govtech-barbados-presentations` – slides in the GovTech Barbados style
- `anthropic-skills:govtech-barbados-qr-codes` – branded QR codes
