# Barbados Digital Public Infrastructure

This records only what the Barbados profile already knows. Everything else is marked `[VERIFY WITH PLATFORM]`. Confirm it with MIST and the GovTech Barbados platform team before relying on it. See `references/dpi-baseline.md` for the tiers and the once-only rules.

## Platforms

| Pillar | Platform | Owner | Protocol | Tier | Docs and sandbox |
|---|---|---|---|---|---|
| Identity | Trident ID | GovTech Barbados | `[VERIFY WITH PLATFORM]` | 3 | None public |
| Payments | Shared GovTech payment gateway | GovTech Barbados | `[VERIFY WITH PLATFORM]` | 3 | None public |
| Data exchange | Vehicle lookup and business lookup | `[VERIFY WITH PLATFORM]` | `[VERIFY WITH PLATFORM]` | 3 | None public |
| Consent | `[VERIFY WITH PLATFORM]` | | | 3 | |

### Identity

- **What it's called on screen:** Trident ID
- **Claims it returns:** full name, National Registration Number, date of birth and address are assumed. `[VERIFY WITH PLATFORM]`
- **Assisted or offline route:** `[VERIFY WITH DEPARTMENT]`

### Payments

- **What it's called on screen:** `[VERIFY WITH PLATFORM]`
- **Currency:** BBD
- **Ways to pay:** debit and credit cards are assumed. `[VERIFY WITH PLATFORM]`
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
| `vehicle` | Vehicle details | Vehicle register | Vehicle lookup | | `[VERIFY WITH POLICY]` | |
| `business` | Business details | Business register | Business lookup | | `[VERIFY WITH POLICY]` | |

## Test personas

Made-up Barbadians. Every value is fake.

| Persona | Scenario | Notes |
|---|---|---|
| Keisha Alleyne, NRN 850312-0147, Christ Church | Everything found and correct | |
| Dwayne Greenidge, NRN 910211-0382, St. Michael | Address out of date | Moved to St. Philip last year |
| Shari Babb, NRN 010630-0419 | No record in the registers | |
| Trevor Cumberbatch, NRN 760119-0255, St. James | Payment declined | |
| – | Can't be verified | |
