# Barbados Digital Public Infrastructure

This combines what the Barbados profile already knew with the DPI Map's entries for Barbados. Everything else is marked `[VERIFY WITH PLATFORM]`. Confirm it with MIST and the GovTech Barbados platform team before relying on it, and refresh it with `/xstack:dpi Barbados`. See `references/dpi-baseline.md` for the tiers and the once-only rules.

## Sources

- **DPI Map:** DPI Map (2026-03-31). Institute for Innovation and Public Purpose, UCL. https://dpimap.org/data
- **Checks (2026-09-23):** `centralbank.org.bb/bimpay-about` and the NRD Companies Government Service Bus article resolve. `trident.gov.bb` failed: its TLS certificate had expired. Tell the Trident team.
- **Team:** not yet confirmed

## Platforms

| Pillar | Platform | Family | Owner | Protocol | Tier | Docs and sandbox | Source |
|---|---|---|---|---|---|---|---|
| Identity | Trident ID (the DPI Map lists the "Trident Card", planned or pilot) | `[VERIFY WITH PLATFORM]` | `[VERIFY WITH PLATFORM]` | `[VERIFY WITH PLATFORM]` | 3 | <https://trident.gov.bb/> (certificate expired at last check) | Profile; DPI Map, updated 2025-03-30 |
| Payments – gateway services use | Shared GovTech payment gateway | `[VERIFY WITH PLATFORM]` | GovTech Barbados | `[VERIFY WITH PLATFORM]` | 3 | None public | Profile |
| Payments – national rail | BimPay (planned or pilot; supports person-to-government and business-to-government payments) | `[VERIFY WITH PLATFORM]` | Central Bank of Barbados | `[VERIFY WITH PLATFORM]` | 3 | <https://www.centralbank.org.bb/bimpay-about> | DPI Map, updated 2025-08-21 |
| Data exchange | Government Service Bus (planned or pilot, cross-sectoral) | X-Road | MIST, with NRD Companies | `[VERIFY WITH PLATFORM]` | 3 | None public | DPI Map, updated 2025-12-01 |
| Consent | `[VERIFY WITH PLATFORM]` | | | | 3 | | |

The vehicle lookup and business lookup in the profile are probably reached through the Government Service Bus. `[VERIFY WITH PLATFORM]`

### Identity

- **What it's called on screen:** Trident ID
- **Claims it returns:** full name, National Registration Number, date of birth and address are assumed. `[VERIFY WITH PLATFORM]`
- **Assisted or offline route:** `[VERIFY WITH DEPARTMENT]`

### Payments

- **What it's called on screen:** `[VERIFY WITH PLATFORM]`
- **Currency:** BBD
- **Ways to pay:** debit and credit cards are assumed. Whether the gateway will offer BimPay is `[VERIFY WITH PLATFORM]`
- **How the service learns a payment worked:** `[VERIFY WITH PLATFORM]`

### Data exchange

- **Consent model:** `[VERIFY WITH POLICY]` against the Barbados Data Protection Act

## Data catalogue

| Fact (attribute key) | What it is | Source register | Reached through | How fresh | Lawful basis | Notes |
|---|---|---|---|---|---|---|
| `fullName` | Full name | National Registration | Trident ID | | `[VERIFY WITH POLICY]` | |
| `nationalId` | National Registration Number (`YYMMDD-XXXX`) | National Registration | Trident ID | | `[VERIFY WITH POLICY]` | |
| `dateOfBirth` | Date of birth | National Registration | Trident ID | | `[VERIFY WITH POLICY]` | Can be derived from the NRN |
| `address` | Home address, with parish | `[VERIFY WITH PLATFORM]` | Trident ID | Often out of date. `[VERIFY WITH DATA]` | `[VERIFY WITH POLICY]` | |
| `vehicle` | Vehicle details | Vehicle register | Vehicle lookup, probably via the Government Service Bus | | `[VERIFY WITH POLICY]` | |
| `business` | Business details | Business register | Business lookup, probably via the Government Service Bus | | `[VERIFY WITH POLICY]` | |

## Test personas

Made-up Barbadians. Every value is fake.

| Persona | Scenario | Notes |
|---|---|---|
| Keisha Alleyne, NRN 850312-0147, Christ Church | Everything found and correct | |
| Dwayne Greenidge, NRN 910211-0382, St. Michael | Address out of date | Moved to St. Philip last year |
| Shari Babb, NRN 010630-0419 | No record in the registers | |
| Trevor Cumberbatch, NRN 760119-0255, St. James | Payment declined | |
| – | Can't be verified | |
