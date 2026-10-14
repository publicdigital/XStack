# United Kingdom xstack profile (minimal, for this example)

A deliberately small, project-local profile, written to show `/xstack:form-to-spec` working with a different country's setup from the Barbados profile. It is **not** a complete UK profile. The important difference: the UK has **no national ID number and no national identity register lookup**, so a form spec built with this profile can't replace name, date of birth or address with a lookup the way the Barbados one can.

Facts about platforms are as published by their owners at the time of writing, and anything not checked is tagged.

## Government and context

- **Country:** United Kingdom. This example is about land in England and Wales.
- **Languages people use:** English. Welsh has equal status in Wales, and many government forms for Wales exist in both languages.
- **Connectivity and devices:** mostly good, but plan for people with no smartphone, no data or low digital confidence.
- **Offline and assisted channels:** phone lines, paper forms by post, intermediaries (solicitors and conveyancers do most property transactions).

## Terms

| Generic term xstack uses | What it's called here |
|---|---|
| Department | Department, or arm's-length body |
| Platform team | The Government Digital Service (GDS), for cross-government platforms |
| Service owner | Service owner |
| National identity platform | GOV.UK One Login |
| Government website | GOV.UK |

## Verification owners

| Tag | Who owns it here |
|---|---|
| `[VERIFY WITH USERS]` | The service team's user researcher |
| `[VERIFY WITH DEPARTMENT]` | The department or body that owns the form |
| `[VERIFY WITH PLATFORM]` | The team that runs the platform – GDS for GOV.UK One Login, GOV.UK Pay and GOV.UK Notify |
| `[VERIFY WITH POLICY]` | The owning department's lawyers |
| `[VERIFY WITH DATA]` | The service team's performance analyst |

## Service standard

- **Name:** GOV.UK Service Standard (14 points)
- **Link:** <https://www.gov.uk/service-manual/service-standard>
- **Mapping:** use the GOV.UK table in `references/service-standard-baseline.md`.

Cite as "Point 4 (Make the service simple to use)".

## Design system

- **Name and link:** GOV.UK Design System, <https://design-system.service.gov.uk/>
- **How to use it in a prototype:** link the published `govuk-frontend` stylesheet. Class prefix `govuk-`.
- **Page chrome every service must have:** GOV.UK header, phase banner, footer.
- **Restrictions:** the GOV.UK crown and the GDS Transport font are only for services on GOV.UK.

## Shared platforms

| Need | Platform | How to integrate |
|---|---|---|
| Sign-in and identity | GOV.UK One Login | OpenID Connect. Identity checking can return a verified name and date of birth. Whether it returns an address for this service is `[VERIFY WITH PLATFORM]` |
| Company details | Companies House public data API | Look up a UK company by its registered number: name, registered office, status |
| Payments | GOV.UK Pay | Hosted payment pages |
| Notifications | GOV.UK Notify | Email, text and letters |

There is **no national ID number** and **no register lookup for land, title or address** in this profile.

### Data catalogue

| Fact (attribute key) | What it is | Source register | Reached through | Notes |
|---|---|---|---|---|
| `fullName` | Verified full name | Identity checking | GOV.UK One Login | Only after identity checking, not for every sign-in `[VERIFY WITH PLATFORM]` |
| `dateOfBirth` | Date of birth | Identity checking | GOV.UK One Login | As above |
| `companyName`, `registeredOffice`, `companyStatus` | UK company details | Companies House register | Companies House public data API | Overseas entities are on the register too `[VERIFY WITH PLATFORM]` |

## Data formats

| Field | Format |
|---|---|
| National ID number | None – the UK has no national ID number |
| Address and postcode | UK postcode, for example `SW1A 2AA`. Overseas addresses must be allowed |
| Phone number | Accept any format |
| Date | Day, month and year in three separate inputs |
| Currency | Pound sterling (GBP, £) |

## Law and policy

- **Data protection law and regulator:** UK GDPR and the Data Protection Act 2018. The Information Commissioner's Office
- **Accessibility law or standard:** Public Sector Bodies Accessibility Regulations 2018, WCAG 2.2 AA
- **Electronic signatures, declarations and oaths:** not recorded in this example profile `[VERIFY WITH POLICY]`
- **Where legislation is published:** <https://www.legislation.gov.uk>
