# Service sheet – Household Support Grant

**Fictional.** The rules of a Kestrian service, written down so xstack agents build from them rather than inventing them. A real team gets these from the department and from legislation. In Kestria, this file *is* the department.

- **Owner:** Social Protection Agency (SPA), with Kestria Digital Service (KDS)
- **Law:** Social Protection Act 2021, and the Household Support Grant Regulations 2025 ("the Regulations")
- **Paper form today:** SPA/HSG-1
- **Online at:** `gov.kestria.test/hsg`

When building this service, use this sheet with `../dpi.md` (platforms, data catalogue, payout model, personas) and `../world.md` (places, people, statistics). Where this sheet and a brief disagree, the sheet is the policy and the brief is the research. Flag the disagreement – don't silently pick one.

## What it is

- **Amount:** K 1,500 a month to a low-income household
- **Paid:** on the 5th of each month, over KesPay
- **When payments start:** the first payment is in the first payment cycle at least 7 days after the decision
- **Back pay:** none
- **Size:** about 610,000 households get it

## Who can get it

Eligibility belongs to the **household**, not a person (Regulations, reg.4). A household can get it if all of these are true:

1. It's in the **National Social Registry**.
2. Its **welfare band** is **A** or **B**.
3. Its record was **surveyed or confirmed in the last 3 years**.
4. **No member already gets another SPA cash programme.** Today the only other one is the **Older Persons Grant** (K 800 a month). A household with someone on the Older Persons Grant can choose to switch to the Household Support Grant instead. The switch is made at a CSC (reg.5).

### Welfare bands

SPA gives every household in the registry a welfare band, worked out from a proxy means test at the survey:

| Band | Meaning | About |
|---|---|---|
| A | Poorest | 9% of households |
| B | Very poor | 11% |
| C | Poor | 15% |
| D | Getting by | 30% |
| E | Better off | 35% |

**The band is never shown to the citizen or sent to a service.** KesLink returns only an **assessment** for each programme (see `hsgAssessment` in `../dpi.md`). The band and score stay inside SPA. A citizen can ask SPA for their band under the right of access in the Data Protection Act 2022 (s.20). That's a separate request, not part of this service.

### What an application can lead to

| Assessment | When | What the citizen is told |
|---|---|---|
| `likely` | Band A or B, record less than 3 years old, no other SPA cash programme | "Your household can probably get the grant. SPA will check and tell you within about 4 weeks." |
| `needs_survey` | Not in the registry, record more than 3 years old, or the citizen reports a change that could affect the band (see below) | "SPA needs to visit your household. This usually takes 8 to 10 weeks." This is a **normal next step, not a rejection**. |
| `not_likely` | Band C, D or E, record less than 3 years old, no change reported | "From the records we hold, your household probably can't get the grant." Then how to ask for a new survey if things have changed, and other help. |
| `already_supported` | A member already gets the Household Support Grant or the Older Persons Grant | Already getting it: "Your household already gets the grant." Older Persons Grant: explain the choice to switch, and that it's made at a CSC. |

**The decision is SPA's, made after the application.** An online outcome is always "probably", never a final decision.

## Who can apply, and who gets paid

- **Who can apply:**
  - any adult (18 or over) in the household, as it appears on the registry record
  - an adult in a household that isn't in the registry – applying starts a survey request

  The applicant doesn't have to be the **registered person**, who is the member SPA's record lists as the household's contact (reg.6).
- **Who gets paid – the recipient:** any adult member of the household, named by the applicant. If no one is named, it's the applicant. The registered person isn't told separately who the recipient is. They get only a neutral SMS saying SPA has received an update for their household (reg.6(3)). This is how the person who looks after the money can make sure it reaches them.
- **Acting for someone:** a family member or other trusted person can apply for an adult who can't do it themselves, through an **authorised intermediary** record made at a CSC (Regulations, reg.7).
  - The record names the person they act for, and has to be renewed every 12 months.
  - An intermediary can apply and report changes.
  - An intermediary can't name themselves as recipient, or change the payout route.
  - Village digital champions are **not** intermediaries. They help people prepare and refer them to a CSC.

## How people can apply, and the sign-in each step needs

| Step | Online (KestriaID) | At a CSC | No KUIN |
|---|---|---|---|
| Apply and name the recipient | Level 2 | Level 3 (fingerprint), or a CSC officer's check of the KestriaID card | Village committee confirmation, then a survey visit |
| Report a change | Level 1 if they applied before, otherwise level 2 | Level 3 or a card check | Village committee confirmation |
| Change the recipient or payout route after a decision | Not online | Level 3 only | At a CSC, with the village committee letter |
| Check progress | Level 1, or a reference number and phone by `*999#` | Reference number | Reference number |

**The declaration is a plain declaration, not a statutory one,** so it needs no particular assurance level (Electronic Transactions Act 2020, s.6). Wording, which SPA's legal team has approved and which may be reworded only for reading age, with SPA's agreement:

> I confirm that what I have told SPA is true, as far as I know. I understand SPA may check it with my village committee and with government records. If someone gives false information on purpose, the household's payments can stop and we may have to pay back what we got (Social Protection Act 2021, s.41).

## Changes a household must report

Within 30 days (reg.9):
- a birth
- a death
- someone joining or leaving the household
- the household moving district
- someone in the household starting work expected to last more than 3 months

Reporting a birth, a death, someone joining or leaving, or a move makes the household `needs_survey`. A new job is checked against the band without a visit.

## Timings

| What | How long |
|---|---|
| Decision when the assessment is `likely` | Within 20 working days, about 4 weeks |
| Survey visit, then a decision | Visit within 6 weeks, decision within 10 working days of the visit: 8–10 weeks in all |
| Rainy season (March to June) in the Northern Plains and Lake Region | Visits can slip by up to 4 more weeks. Tell people this. |
| First payment | The first payment cycle on the 5th of the month, at least 7 days after the decision |
| Change of recipient or payout route | Takes effect from the next payment cycle at least 7 days after the change (see the payout model in `../dpi.md`) |

## Messages

- **Texts never say:**
  - an amount
  - an outcome
  - the welfare band
  - who the recipient is

  They never contain a link and never ask for a PIN. Every text ends with: "SPA never asks for your PIN."
- **Example:** "SPA: we have your request. Ref HSG-4418213. Dial *999# to check. SPA never asks for your PIN."
- **Reference format:** `HSG-` + 7 digits

## Data this service uses

From the data catalogue in `../dpi.md`. Pull these and nothing else:
- `fullName`
- `phone`
- `address` – show the district and village only
- `household`
- `programmes`
- `hsgAssessment`
- `payoutAccount`

The lawful basis is **public task** (Data Protection Act 2022, s.13; Social Protection Act 2021, s.12). The citizen sees a **notice** about what SPA will look up, not a consent request, and every pull appears in "Who has used my data". **Don't** pull or ask about date of birth, sex, TIN, vehicles, land, health or disability.

## Test personas for this service

Use these people from `../dpi.md`. In the mock: `KESTRIA_PERSONAS.filter(p => ['ines', 'tessa', 'talin', 'sefa', 'desa', 'mirel', 'anais', 'aru'].includes(p.id))`. Kel Varrin has no KUIN, so he's tested on the route without KestriaID, not in the mock.

| Persona | Scenario | Assessment | Payout |
|---|---|---|---|
| Ines Kestel, Reedwater LK | Everything found, can probably get it | `likely` | Lumo Money, linked to her KUIN |
| Tessa Ondrey, Fenmouth LK | Looks after the money, but isn't the registered person (her husband Marek works away in Aranport). Names herself as recipient. | `likely` | Her own Kora Wallet, linked to her KUIN |
| Talin Vorsa, register says Ashgrove HL | Moved to Port Ondra CS, and had a baby since the 2022 survey | `needs_survey` | Kora Wallet |
| Sefa Tormik, Talamir NP | Has a KUIN, but the household isn't in the registry | `needs_survey` (the pull returns `not_found`) | No account at all, so a cash collection voucher |
| Desa Haldry, Belmar CS | Household found, but no account linked to her KUIN (the pull returns `ok` with `payoutAccount` in `missing`) | `likely` | Ask for the phone number her Kora Wallet is on (route 2) |
| Mirel Okand, Aranport Central CR | Probably can't get it (band D) | `not_likely` | – |
| Anaïs Vorlek, Corran Isle EI | Gets the Older Persons Grant. Her granddaughter Mina helps her as an authorised intermediary. | `already_supported` | Postbank Kestria |
| Aru Danvell, Dunmar NP | Can't sign in online (old phone number). Can at a CSC with his fingerprint. | `likely` once signed in at a CSC | No account, so cash at a post office |
| Kel Varrin, Orsk NP | Adult with no KUIN (pastoralist, birth record only) | No-KUIN route, so `needs_survey` | Cash collection voucher |

Not for this service:
- **Jory Benmara (consent refused):** there's no consent to refuse for a public-task pull.
- **Pell Marrow (under 18):** too young to apply.
