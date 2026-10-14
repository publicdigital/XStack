# Testland xstack profile (eval fixture)

A made-up country, used only by the form-to-spec evals. Every name here is fictional. If a spec run against this profile mentions a real country's platform, agency or standard, the run has filled gaps from memory.

## Government and context

- **Country:** Testland
- **Languages people use:** English and Lumen
- **Offline and assisted channels:** district service counters

## Terms

| Generic term xstack uses | What it's called here |
|---|---|
| Department | Bureau |
| Platform team | Office of Digital Services (ODS) |
| National identity platform | CitizenPass |
| Government website | services.testland.example |
| Regions | Districts |

## Verification owners

| Tag | Who owns it here |
|---|---|
| `[VERIFY WITH USERS]` | The service team's researcher |
| `[VERIFY WITH DEPARTMENT]` | The owning bureau |
| `[VERIFY WITH PLATFORM]` | ODS |
| `[VERIFY WITH POLICY]` | The Testland Legal Drafting Office |
| `[VERIFY WITH DATA]` | The Testland Statistics Bureau |

## Service standard

- **Name:** Testland Service Promise (7 promises)

| Promise | Title | xstack baseline theme(s) |
|---|---|---|
| 1 | Know the people you serve | User needs |
| 2 | Everyone can use it | Inclusion |
| 3 | Say it simply | Plain language |
| 4 | Right first time | Works first time, Whole problem |
| 5 | Reuse what exists | Open platforms and standards, Right technology |
| 6 | Keep people safe | Trust, security and privacy |
| 7 | Keep improving | Continuous improvement, Measuring performance |

## Design system

- **Name:** Testland Design Kit (no public code – use the xstack neutral style)

## Shared platforms

| Need | Platform | How to integrate |
|---|---|---|
| Identity and sign-in | CitizenPass | Returns full name and date of birth only. It does **not** return address, nationality or place of birth |
| Payments | TestPay | Hosted payment page |

### Data catalogue

| Fact (attribute key) | What it is | Source register | Reached through |
|---|---|---|---|
| `fullName` | Full name | Civil Register | CitizenPass |
| `dateOfBirth` | Date of birth | Civil Register | CitizenPass |

## Data formats

| Field | Format |
|---|---|
| National ID number | CitizenPass number, `TL-` + 8 digits |
| Date | Day, month, year in three inputs |
| Currency | Testland mark (TLM) |

## Law and policy

- **Data protection law:** Testland Personal Data Act
- **Electronic signatures, declarations and oaths:** Testland Electronic Records Act – whether it covers sworn statements is unknown
