# Assumptions – Household Support Grant prototypes

> **Fictional country.** Every `[VERIFY WITH …]` tag below would go to an owner named in `profiles/kestria/profile.md`. In a demo there's no one to ask, so the tags show where a real team would check. Each prototype's own assumptions panel has the full list for that variant: 41 in P1, 36 in P2 and 31 in P3.

No form spec (SPA/HSG-1 hasn't been made yet), so there's no form coverage table.

## Question map

| Question | Map | Source | Fallback when it's missing or refused | Tag |
|---|---|---|---|---|
| Name | known | KestriaID claims | Ask (the route without KestriaID) | |
| Phone to contact you | known | KestriaID claims | Ask for a safe contact number. P2 and P3 always ask, because the mock has no phone claim. | `[KNOWN GAP]` |
| District | known | `address`, National Population Register | Ask for the district. Flag the record for a survey. | `[VERIFY WITH DATA]` |
| Household members | known | `household`, National Social Registry, via KesLink (s.13) | No record: a survey request and a visit | `[VERIFY WITH PLATFORM]` |
| Already getting SPA support | known | `programmes`, National Social Registry | Don't block. SPA checks in the back office. | `[VERIFY WITH DEPARTMENT]` |
| Eligibility | derived | Band and programmes. Never shown. | The outcome page | `[VERIFY WITH POLICY]` |
| Nearest CSC, postcode | derived | District | – | |
| Changes since the last survey | ask | – | – | `[VERIFY WITH USERS]` |
| Who should receive the money | ask | – | The person applying | `[VERIFY WITH POLICY]` |
| Where we pay | known | `payoutAccount`, KesPay account lookup (provider and last 4 digits only) | Phone number, then cash at a post office. Changes only at a CSC at level 3. | `[VERIFY WITH PLATFORM]` |
| Declaration | ask | – | – | `[VERIFY WITH POLICY]` |

## Assumptions all three share

| Assumption | Tag | Severity | How to check |
|---|---|---|---|
| Eligibility is the household being in the lowest welfare bands and not already getting another SPA cash programme | `[VERIFY WITH POLICY]` | High | SPA policy team |
| A decision takes about 4 weeks, or 8–10 weeks if a visit is needed | `[VERIFY WITH DEPARTMENT]` | Medium | SPA operations |
| SPA reads registry data under public task (s.13), with a notice, not consent | `[VERIFY WITH POLICY]` | High | DPC and SPA legal |
| The mock shows a consent screen for that pull. A real s.13 pull would show a notice. | `[KNOWN GAP]` | Medium | Change the mock |
| The mock can't make payouts. Payout confirmation is an ordinary page. | `[KNOWN GAP]` | High | Add payouts to the mock |
| The mock always signs in at level `substantial` | `[KNOWN GAP]` | Medium | Add assurance levels to the mock |
| A payout account can only be changed at a CSC at level 3, with a text to the old number | `[VERIFY WITH PLATFORM]` | High | CBK and Treasury |
| A household member who isn't the applicant can be paid | `[VERIFY WITH POLICY]` | High | SPA and Treasury. There's no model for this in `dpi.md`. |
| Texts never mention money or the result, never contain a link and never ask for a PIN | `[VERIFY WITH USERS]` | High | Test with people who share phones |
| A survey visit reads as a normal next step, not a rejection | `[VERIFY WITH USERS]` | High | Test with Sefa Tormik's scenario |
| Only English works. Kestrian, Vell and Sora are placeholders. | `[KNOWN GAP]` | High | Translations by people, tested with speakers |
| No Back link on the confirmation page, so it can't be sent twice | `[KNOWN GAP]` | Low | Agree it with the design system when there is one |

## Where the variants differ

| | P1 Once-only | P2 Assisted at a CSC | P3 Household-first |
|---|---|---|---|
| Who uses the screens | The citizen, on their own phone | A CSC officer, with the citizen beside them | Any adult in the household |
| Sign-in | KestriaID, level 2 | Fingerprint at the CSC, level 3, after a separate consent step | KestriaID, or household number and district |
| Default outcome | "You can probably get the grant" | The same, plus a printed slip | Reassessment or a visit |
| Payout account | Confirm only. Change at a CSC. | Can be changed here, at level 3 | Confirm only. Change at a CSC. |
| Order of payee and account | Account, then who receives | Account, then who receives | Who receives, then account – **the right order** |
| Riskiest assumption | People trust pulled data and correct it | Fingerprint consent is real consent when an officer asks | People will name the money-keeper on a shared phone |

P1 and P2 ask for the payout account before asking who receives the money. That's a flaw the build spec introduced, and the first thing to fix in `/xstack:iterate`.
