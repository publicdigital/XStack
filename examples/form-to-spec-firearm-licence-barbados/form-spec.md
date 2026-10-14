# Form spec: Application for a licence to have, use or carry a firearm (Form A)

> This spec describes what the department asks on the paper form today. It is not a statement of user need. Use it as the brief for `/xstack:build`, alongside what research has found.

## 1. Source

| | |
|---|---|
| Form | APPLICATION FOR A LICENCE TO HAVE, USE OR CARRY A FIREARM |
| Form number | FORM A |
| Legal citation | "Firearms Act (Act 1998-32) – FIRST SCHEDULE – FORM A – (Section 5(1)) (Regulation 2)", as printed in the header of page 1 |
| Owning authority | Not stated on the form. The team's brief names the Royal Barbados Police Force. The form's only clue is the "REPORT OF S.P.O. IN CHARGE" box. `[VERIFY WITH DEPARTMENT]` (the owning MDA) |
| Language | English |
| Pages | 5 |
| File | bb-firearm-licence-form-a.pdf, flat PDF with a good text layer (no fillable fields), produced by "Skia/PDF m104 Google Docs Renderer". The document title is "APPLICATION FIREARM Licence.doc", so this is a Word document re-exported through Google Docs, not an original gazetted print |
| Department page | Not provided |
| Date of this spec | 2026-10-14 |

**What the paper form does:** an applicant fills it in to apply for a licence to have, use or carry a firearm. They give personal, health, conviction, firearm, ammunition, storage and referee details, pay a prescribed fee, and swear before a Justice of the Peace that the information is true. An officer (the "S.P.O. in charge") then adds a report. The form says nothing about what happens after that.

> **Legal status:** This form is set out in the First Schedule to the Firearms Act (Act 1998-32) as Form A, and refers to section 5(1) and regulation 2. A form in a schedule to an Act is almost certainly prescribed, so its wording, order and content may be fixed in law. Any rewording, restructuring, merging or removal in this spec needs sign-off from the owning MDA's legal adviser. `[VERIFY WITH POLICY]` (the owning MDA's legal adviser)
>
> This copy is a re-typed Word document, not the gazetted text. Check that it matches the Act's current schedule, including any amendments since 1998. `[VERIFY WITH POLICY]`

## 2. Profile used

- **Profile:** Barbados – `profiles/barbados/` (`profile.md`, `dpi.md`)
- **Service standard:** Barbados Digital Service Standards (13 standards)
- **Design system:** GOV.BB design system (`govbb-` classes; alpha.gov.bb page chrome)
- **Lookups the profile makes available:**

| Lookup | Returns | Replaces items |
|---|---|---|
| Trident ID | `fullName`, `nationalId` (NRN), `dateOfBirth`, `address` (with parish – often out of date) | 1, 2, 6 (address only) |
| Business lookup | `business` – business details from the business register | 8 (employer name and address, only where the employer is a registered business) |
| Shared GovTech payment gateway | Payment and a payment reference (a platform, not a data lookup) | 27 (Paid, Serial No. of Receipt) |

The vehicle lookup in the profile isn't relevant to this form. Every lookup in `dpi.md` is itself marked `[VERIFY WITH PLATFORM]` – the claims Trident ID returns are assumed, not confirmed.

## 3. How to read this spec

| Column | Means |
|---|---|
| **Q** | The item's number on the paper form. Labels in brackets (like `[Sig]`) are for unnumbered items |
| **Paper asks** | What the form says, in its own words. `…` marks a cut |
| **Digital treatment** | **Ask** (with component), **Lookup**, **Lookup opportunity**, **Conditional**, **Add-another**, **Government already holds this**, **Drop or challenge**, or **Back office** |
| **Flag** | What needs checking, with whom: `[VERIFY WITH USERS]`, `[VERIFY WITH DEPARTMENT]`, `[VERIFY WITH PLATFORM]`, `[VERIFY WITH POLICY]`, `[VERIFY WITH DATA]`, `[KNOWN GAP]` |

Owners, from the profile's verification owners table: USERS – the service team's user researcher, with GovTech Barbados · DEPARTMENT – the owning MDA · PLATFORM – MIST and the GovTech Barbados platform team · POLICY – the owning MDA's legal adviser · DATA – GovTech Barbados, and the Barbados Statistical Service.

Because the form is in a schedule to an Act, every Drop or challenge, merge, reword or reorder below also carries `[VERIFY WITH POLICY]`.

## 4. Items by section

### 4.1 About you

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 1 | Full Name: (Mr./Mrs./Miss) … | **Lookup** – Trident ID returns full name. Show it with "Is this correct?" and a way to change it. Manual text route for people Trident ID can't find | Title (Mr./Mrs./Miss): **Drop or challenge** – honorifics aren't needed to identify someone, and the list leaves out anyone who isn't Mr, Mrs or Miss `[VERIFY WITH POLICY]` (MDA legal adviser) · Trident ID claims `[VERIFY WITH PLATFORM]` (MIST and GovTech Barbados) |
| 1 (other names) | (If you have at any time used a name other than stated at 1 please give details – in the case of a married woman please state surname or surnames before marriage) Other Names: … | **Ask** – radios ("Have you ever used another name?") then **Add-another** (name) · Conditional on Yes | The married-woman wording is a legacy rule; asking everyone neutrally for "previous names" covers it. Rewording is **Drop or challenge** `[VERIFY WITH POLICY]` (MDA legal adviser) · "give details" – what details (dates? reason?) `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 2 | Date of Birth: … | **Lookup** – Trident ID returns date of birth (also derivable from the NRN). Confirm, don't retype | Does the decision need the date, or only "old enough"? The form states no age limit `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 3 | Place of Birth: … | **Lookup opportunity** – National Registration probably holds it, but the profile's data catalogue doesn't list it. Ask (text) for now | `[VERIFY WITH PLATFORM]` (MIST and GovTech Barbados) |
| 4 | Nationality: … | **Lookup opportunity** – not in the data catalogue. Ask (text or select, allowing more than one nationality) for now | Dual nationals – one answer or several? `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]` (owning MDA) · sensitive (immigration) |
| 5 | If applicant is not a citizen or permanent resident of Barbados, give details:- | **Ask** – radios ("Are you a citizen or permanent resident of Barbados?") – gates 5(a)–(d) | "Permanent resident" is a term of art; a citizen may not know which they are, or both may apply `[VERIFY WITH USERS]` · sensitive (immigration) |
| 5(a) | Date of arrival in Barbados: … | **Conditional** – only if 5 is "not a citizen or permanent resident". Ask (date, DD MM YYYY) · **Lookup opportunity** (immigration records) | First arrival or most recent? `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 5(b) | Purpose: … | **Conditional** – only if 5 is No. Ask (textarea) | Purpose of the stay, not of the firearm – a citizen could read it either way `[VERIFY WITH USERS]` |
| 5(c) | Conditions of stay in Barbados: … | **Conditional** – only if 5 is No. Ask (textarea) · **Lookup opportunity** (immigration status) | Term of art – what counts as a "condition"? `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 5(d) | Passport No. and date of Issue: … | **Conditional** – only if 5 is No. Ask (text + date) · **Lookup opportunity** (passport details) | Issuing country isn't asked but is probably needed to identify a passport `[VERIFY WITH DEPARTMENT]` (owning MDA) |

### 4.2 Where you live and how to contact you

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 6 (address) | Address: … | **Lookup** – Trident ID returns address with parish. Confirm, with a way to change it | The data catalogue marks Trident ID addresses as often out of date `[VERIFY WITH DATA]` (GovTech Barbados) · `[VERIFY WITH PLATFORM]` (MIST and GovTech Barbados) |
| 6 (telephone) | Telephone Number: … | **Ask** – text, accept any format (profile data format) | – |
| 6 (previous address) | (If you have lived elsewhere than at the address given at 6 during the last 5 years Please give details) Previous Address: … | **Ask** – radios ("Have you lived anywhere else in the last 5 years?"), then **Conditional · Add-another** (address, parish, dates) | Paper gives one line for what may be several addresses – a paper limit `[VERIFY WITH DEPARTMENT]` (owning MDA) · "last 5 years" up to when – the date of application? `[VERIFY WITH USERS]` · Addresses outside Barbados need a non-Barbados format `[KNOWN GAP]` |
| 6 (previous telephone) | Telephone Number: … | **Drop or challenge** – a phone number for a previous address is unlikely to reach anyone | `[VERIFY WITH DEPARTMENT]` (owning MDA) `[VERIFY WITH POLICY]` (MDA legal adviser) |

### 4.3 Your work

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 7 | Occupation: … | **Ask** – text | – |
| 8 (employer) | Name and address of place of employment or business: … | **Ask** – text + address. Where the employer is a registered business, the **Business lookup** can return its name and address – search, then confirm | Self-employed, retired, unemployed and student applicants have no answer – needs a route `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]` (owning MDA) · Business lookup `[VERIFY WITH PLATFORM]` (MIST and GovTech Barbados) |
| 8 (telephone) | Telephone number: … | **Drop or challenge** – the department can find a business's number; ask only if the police contact employers as part of the check | `[VERIFY WITH DEPARTMENT]` (owning MDA) `[VERIFY WITH POLICY]` (MDA legal adviser) |
| 8 (length) | Length of time employed there: … | **Ask** – text or number (years and months) – or **Drop or challenge** if nothing uses it | Is length of employment a factor in the decision? `[VERIFY WITH DEPARTMENT]` (owning MDA) |

### 4.4 Your health

All four questions are sensitive. Keep the legal meaning – the Paper asks column holds the original wording.

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 9 | Have you now or ever had any form of mental disorder? Yes / No | **Ask** – radios (Yes / No) | Very wide ("now or ever", "any form") – a past episode of depression or anxiety reads as Yes; is that intended? `[VERIFY WITH DEPARTMENT]` (owning MDA) · Plain-language *suggestion*: "Have you ever had a mental health condition?" `[VERIFY WITH POLICY]` (MDA legal adviser) · Sensitive (mental health) |
| 9 (details) | If "yes" give details … | **Conditional** – only if 9 is Yes. Ask (textarea) | What details – diagnosis, dates, treatment, a doctor's name? `[VERIFY WITH DEPARTMENT]` (owning MDA) · Is medical evidence needed? `[KNOWN GAP]` |
| 10 | Have you ever been certified as being of unsound mind? Yes / No | **Ask** – radios (Yes / No) | Stigmatising, outdated wording ("unsound mind"). To a citizen this looks the same as 9, but "certified" is a legal process – people will answer the two inconsistently `[VERIFY WITH USERS]` · Any rewording (for example "Have you ever been formally certified under mental health law…") is a *suggestion* only `[VERIFY WITH POLICY]` (MDA legal adviser) · Merging 9 and 10 needs policy sign-off `[VERIFY WITH POLICY]` |
| 11 | Do you suffer from habitual intoxication? Yes / No | **Ask** – radios (Yes / No) | Stigmatising wording; "habitual intoxication" is a term of art with no threshold given `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]` (owning MDA) · Does it cover drugs as well as alcohol? `[VERIFY WITH POLICY]` (MDA legal adviser) · Sensitive (addiction) · Self-assessment – few people will answer Yes |
| 12 | Are you an alcoholic? Yes / No | **Ask** – radios (Yes / No) | Stigmatising wording ("alcoholic"). Overlaps with 11 – a citizen can't tell how they differ `[VERIFY WITH USERS]` · Plain-language *suggestion*, or merging with 11, needs `[VERIFY WITH POLICY]` (MDA legal adviser) · Present tense – what about someone in recovery? `[VERIFY WITH DEPARTMENT]` (owning MDA) · Sensitive (addiction) |

### 4.5 Convictions

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 13 | Have you ever been convicted of any offence? Yes / No … (you are required to disclose all information about any offence whether committed in Barbados or elsewhere) | **Ask** – radios (Yes / No), with the disclosure note as hint text · also **Government already holds this** – if the owning MDA is the police force named in the brief, it probably holds conviction records for Barbados; the self-declaration is still what the form requires `[VERIFY WITH DEPARTMENT]` | Very wide ("ever", "any offence", "elsewhere") – includes traffic offences and spent convictions? `[VERIFY WITH DEPARTMENT]` (owning MDA) · Any rule on spent convictions `[VERIFY WITH POLICY]` (MDA legal adviser) · Sensitive (convictions) |
| 13 (details) | If "yes" give details … | **Conditional · Add-another** – only if 13 is Yes. Each: offence, country, date, sentence (fields are our suggestion) | Paper gives two lines; what details are needed isn't said `[VERIFY WITH DEPARTMENT]` (owning MDA) |

### 4.6 The firearm you're applying for

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 14 | Type of firearm this application refers to: … | **Ask** – radios or select if the department has a fixed list; text otherwise | No list of types is on the form – what are the accepted types (for example shotgun, rifle, pistol)? `[KNOWN GAP]` `[VERIFY WITH DEPARTMENT]` (owning MDA) · Can one application cover more than one firearm? `[VERIFY WITH DEPARTMENT]` |
| 15 | Reasons for this application: … | **Ask** – radios for common reasons (if the department has a list) plus textarea | No accepted reasons are on the form – don't invent a list `[KNOWN GAP]` `[VERIFY WITH DEPARTMENT]` (owning MDA) · Overlaps with 19 – a citizen with no firearms yet may repeat the answer `[VERIFY WITH USERS]` |
| 20 | Previous experience with firearms: … | **Ask** – textarea | What counts – training, certificates, sport, service? Is evidence needed? `[VERIFY WITH DEPARTMENT]` (owning MDA) · Possible upload of training certificates `[KNOWN GAP]` |
| 24 | Places at which the firearm is intended to be used: … | **Ask** – textarea (or add-another place) | Specific addresses, ranges, or a general description? `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 25 | Places at which the firearm(s) and the ammunition listed will be kept when not in use and the specific arrangements that have been made for their safe custody? | **Ask** – address (often the same as 6 – offer "same as your home address") + textarea for safe-custody arrangements | Highly sensitive – it tells anyone who reads it where firearms are stored. Drives the threat model · Is there a required standard (for example a safe), and is an inspection part of the process? `[VERIFY WITH DEPARTMENT]` (owning MDA) |

### 4.7 Firearms, licences and ammunition you already have

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 16 | Have you made any previous applications in Barbados? Yes / No | **Government already holds this** – the licensing authority has its own applications. Ask (radios) until a route exists | `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 16 (details) | If "yes" give year and results … | **Conditional · Add-another** – only if 16 is Yes. Each: year (number), result (radios: granted / refused / withdrawn – options are our suggestion) · **Government already holds this** | `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 17 | Types and numbers of firearms now in your possession: Calibre · Maker's Name · Type · Serial Number (rows 1–4) | **Ask** – radios ("Do you have any firearms now?") then **Add-another** (calibre, maker's name, type, serial number) · also **Government already holds this** for firearms the authority has licensed | Paper allows 4 rows – probably a paper limit `[VERIFY WITH DEPARTMENT]` (owning MDA) · Sensitive (serial numbers, holdings) |
| 18 | Particulars of licences held: … | **Government already holds this** – the licensing authority issued them. Ask (radios + add-another: licence number, type, expiry – fields are our suggestion) until a route exists | "Particulars" is vague; do licences from other countries count? `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 19 | Reasons for possession of firearm(s) listed at 17: … | **Conditional** – only if 17 lists at least one firearm. Ask (textarea; one reason per firearm, or one overall) | `[VERIFY WITH DEPARTMENT]` (owning MDA) – one reason per firearm or overall? |
| 21 | Amount of ammunition in your possession at the date of this application: Calibre · Quantity | **Ask** – radios ("Do you have any ammunition now?") then **Add-another** (calibre, quantity – number) | Paper gives one open box, no row limit · Sensitive |
| 22 | The maximum amount of ammunition you wish to have in your possession at any time: Calibre · Quantity | **Add-another** (calibre, quantity – number) | Citizens are unlikely to know what is reasonable; is there a legal maximum? `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 23 | The maximum amount of ammunition to be purchased or required at any time: Calibre · Quantity | **Add-another** (calibre, quantity – number) | Looks the same as 22 to a citizen – "possession" vs "purchased or required" `[VERIFY WITH USERS]` · Does it mean per purchase? `[VERIFY WITH DEPARTMENT]` (owning MDA) |

### 4.8 Referees

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 26 | Referees: 1. Name: … Address: … 2. Name: … Address: … 3. Name: … Address: … | **Add-another** (name, address) – keep 3 as the minimum, because the form gives exactly 3. Contact details (phone, email) would make referee checks faster – *suggestion* | Is 3 a legal requirement, a minimum, or a paper layout? `[VERIFY WITH DEPARTMENT]` (owning MDA) `[VERIFY WITH POLICY]` (MDA legal adviser) · Who can be a referee (relationship, length of acquaintance, not a relative)? Not on the form `[KNOWN GAP]` · Referees' personal data – they need to know `[VERIFY WITH POLICY]` (Barbados Data Protection Act, as named in the profile) |

### 4.9 Paying

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 27 (fee) | Prescribed Fee____ | **Ask** – payment step through the Shared GovTech payment gateway. **Amount not on the form – unknown** | `[VERIFY WITH DEPARTMENT]` (owning MDA) – amount, and whether it differs by firearm type · Payment gateway `[VERIFY WITH PLATFORM]` (MIST and GovTech Barbados) |
| 27 (paid) | Paid____ | **Drop or challenge** – the payment gateway confirms payment; or **Back office** if an officer records it | `[VERIFY WITH DEPARTMENT]` (owning MDA) `[VERIFY WITH POLICY]` (MDA legal adviser) |
| 27 (receipt) | Serial No. of Receipt____ | **Drop or challenge** – the payment gateway gives a reference | `[VERIFY WITH DEPARTMENT]` (owning MDA) `[VERIFY WITH POLICY]` (MDA legal adviser) · Is the fee paid before applying, at a cash office, with the receipt number written in? `[VERIFY WITH DEPARTMENT]` |

## 5. Declaration, signature and witness

| Q | Paper requires | Digital treatment | Flag |
|---|---|---|---|
| [Decl] | "I, ____, do swear that the information contained in the above form is true and correct to the best of my knowledge, information and belief." | Declaration page with the full name from 1 (Trident ID) – but whether a digital declaration satisfies a sworn oath is a legal question | `[VERIFY WITH POLICY]` (MDA legal adviser) · An affirmation option for people who don't swear oaths isn't on the form `[VERIFY WITH POLICY]` |
| [Sig] | Signature of applicant: ____ | Unknown – depends on [Decl] | The profile names no e-signature or electronic transactions law, so this spec doesn't assume one `[VERIFY WITH POLICY]` (MDA legal adviser) |
| [Sig date] | Date: ____ | **Drop or challenge** – the system records the submission date | `[VERIFY WITH POLICY]` (MDA legal adviser) |
| [JP jurat] | "Sworn before me on the ____ day of ____ 20__, at ____" | Unknown – an in-person step with a Justice of the Peace, unless the law allows another route | `[VERIFY WITH POLICY]` (MDA legal adviser) |
| [JP sig] | ____ Justice of the Peace | Unknown – the JP's signature (and likely stamp) | `[VERIFY WITH POLICY]` (MDA legal adviser) · How JPs would take part digitally `[KNOWN GAP]` |

**Why this matters:** the paper requires the applicant to **swear an oath before a Justice of the Peace**, who completes the jurat with the date and place and signs it. This is the likely blocker to a fully digital service. A tick box, an e-signature or a remote JP would only replace it if the law allows – the profile names no e-signature law, and this spec doesn't assume one. Options for `/xstack:build` to test, *subject to the legal answer*: a fully online application with an in-person swearing step (at a police station or with a JP) before the decision, or a printed declaration to sign before a JP and upload. `[VERIFY WITH POLICY]` (MDA legal adviser)

## 6. Back office

| Q | Paper has | Who fills it in | Flag |
|---|---|---|---|
| [Office 1] | REPORT OF S.P.O. IN CHARGE (empty space at the foot of page 5) | An officer – "S.P.O. in charge". The form doesn't expand "S.P.O." | What "S.P.O." is, what the report covers (interview, home visit, storage inspection, referee checks, records check) and who decides after it `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 27 (paid / receipt) | Paid · Serial No. of Receipt | Probably cashier or officer, if not dropped | See 4.9 |

An officer's report means a police check sits between submission and decision, and probably more: referee checks (26), a records check (13), a check of storage (25) and earlier licences (16–18). None of this is described on the form. A service blueprint (`xstack:service-blueprint`) would make the back office visible before anyone designs the citizen side. Applicants will also want to know how long it takes – the form doesn't say. `[KNOWN GAP]`

## 7. Before you start

What a citizen needs to have ready, drawn only from what the form asks:

- your Trident ID (to confirm your name, date of birth and address)
- if you aren't a citizen or permanent resident of Barbados: your passport, its issue date, the date you arrived and the conditions of your stay
- every address you've lived at in the last 5 years
- your employer's or business's name and address, and how long you've worked there
- details of any mental health condition, and of any conviction – in Barbados or elsewhere
- the year and result of any earlier firearm application in Barbados
- details of every firearm you have now: calibre, maker's name, type and serial number
- details of any firearm licences you hold
- how much ammunition you have, by calibre
- where the firearm will be used, and where and how it will be kept safe
- the names and addresses of 3 referees
- a way to pay the fee (amount unknown)
- time to swear the declaration before a Justice of the Peace (unless the law allows another way)

## 8. Questions for the owning department

1. **Is the wording and order of Form A fixed by the First Schedule to the Firearms Act (Act 1998-32), and can the questions be asked in a different order, in plain language, or split into one question per page online? Does this copy match the current schedule?** – unblocks every Drop or challenge, every rewording suggestion and the grouping in sections 4.1–4.9, especially 1 (title, married-woman wording), 6, 8, 9–12 and 27.
2. **Must the declaration be sworn before a Justice of the Peace, or could another route (an affirmation, a declaration sworn at a police station, an electronic declaration) satisfy section 5(1) and regulation 2?** – unblocks section 5 and decides whether the service can be fully online.
3. **What happens after submission: what is the "Report of S.P.O. in charge", what checks does it cover (referees, records, storage, interview), who decides, and how long does it take?** – unblocks section 6, 25, 26, the service blueprint and what the confirmation page can promise.
4. **What is the prescribed fee, does it vary, and when and how is it paid today?** – unblocks 27 and the payment step.
5. **What do the health and conviction questions need to capture: is "any form of mental disorder… now or ever" intended to include past, treated conditions; how do 9 and 10, and 11 and 12, differ in law; do traffic and spent convictions count; and is medical evidence required?** – unblocks 9–13, their wording and the threat model.
6. **Are the 4 firearm rows and the 3 referees legal requirements or paper layout, and is there a fixed list of firearm types and accepted reasons?** – unblocks 14, 15, 17 and 26.

## 9. Lookup opportunities not yet in the profile

| Item(s) | What government might already hold | Who probably holds it | Flag |
|---|---|---|---|
| 3 | Place of birth | National Registration (the source register the profile names for Trident ID), but the data catalogue doesn't list this fact | `[VERIFY WITH PLATFORM]` (MIST and GovTech Barbados) |
| 4 | Nationality | The department that issues citizenship and passports | `[VERIFY WITH PLATFORM]` |
| 5, 5(a), 5(c), 5(d) | Citizenship or permanent residence status, arrival date, conditions of stay, passport number and issue date | The department that issues passports and immigration status | `[VERIFY WITH PLATFORM]` `[VERIFY WITH POLICY]` |
| 13 | Criminal convictions in Barbados | The owning MDA, if it holds conviction records (Government already holds this) – otherwise not named on the form or in the profile | `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 16, 18, 17 | Previous applications, licences held and licensed firearms | The licensing authority that owns this form (Government already holds this) | `[VERIFY WITH DEPARTMENT]` (owning MDA) |
| 8 (length) | Length of employment | National insurance contribution records may show it – not in the profile | `[VERIFY WITH PLATFORM]` `[VERIFY WITH POLICY]` |

## 10. Coverage check

Every numbered item on the form, and where it went.

| Form item | Spec row | Treatment |
|---|---|---|
| 1 Full name (Mr./Mrs./Miss) | 4.1 | Lookup (title: Drop or challenge) |
| 1 Other names | 4.1 | Ask · Conditional · Add-another |
| 2 Date of birth | 4.1 | Lookup |
| 3 Place of birth | 4.1 | Lookup opportunity |
| 4 Nationality | 4.1 | Lookup opportunity |
| 5 Not a citizen or permanent resident | 4.1 | Ask |
| 5(a) Date of arrival | 4.1 | Conditional |
| 5(b) Purpose | 4.1 | Conditional |
| 5(c) Conditions of stay | 4.1 | Conditional |
| 5(d) Passport no. and date of issue | 4.1 | Conditional |
| 6 Address | 4.2 | Lookup |
| 6 Telephone number | 4.2 | Ask |
| 6 Previous address (last 5 years) | 4.2 | Ask · Conditional · Add-another |
| 6 Previous telephone number | 4.2 | Drop or challenge |
| 7 Occupation | 4.3 | Ask |
| 8 Employer name and address | 4.3 | Ask (Business lookup where it applies) |
| 8 Telephone number | 4.3 | Drop or challenge |
| 8 Length of time employed | 4.3 | Ask (or Drop or challenge) |
| 9 Mental disorder | 4.4 | Ask |
| 9 Details | 4.4 | Conditional |
| 10 Certified of unsound mind | 4.4 | Ask |
| 11 Habitual intoxication | 4.4 | Ask |
| 12 Alcoholic | 4.4 | Ask |
| 13 Convicted of any offence | 4.5 | Ask · Government already holds this |
| 13 Details | 4.5 | Conditional · Add-another |
| 14 Type of firearm | 4.6 | Ask |
| 15 Reasons for application | 4.6 | Ask |
| 16 Previous applications | 4.7 | Government already holds this |
| 16 Year and results | 4.7 | Conditional · Add-another |
| 17 Firearms in possession (4 rows) | 4.7 | Add-another · Government already holds this |
| 18 Licences held | 4.7 | Government already holds this |
| 19 Reasons for possession | 4.7 | Conditional |
| 20 Previous experience | 4.6 | Ask |
| 21 Ammunition in possession | 4.7 | Add-another |
| 22 Maximum ammunition to possess | 4.7 | Add-another |
| 23 Maximum ammunition to purchase | 4.7 | Add-another |
| 24 Places of use | 4.6 | Ask |
| 25 Storage and safe custody | 4.6 | Ask |
| 26 Referees 1–3 | 4.8 | Add-another (minimum 3) |
| 27 Prescribed fee | 4.9 | Ask (payment) |
| 27 Paid | 4.9 | Drop or challenge |
| 27 Serial no. of receipt | 4.9 | Drop or challenge |
| [Decl] Oath | 5 | Unknown – legal question |
| [Sig] Signature of applicant | 5 | Unknown – legal question |
| [Sig date] Date | 5 | Drop or challenge |
| [JP jurat] Sworn before me… | 5 | Unknown – legal question |
| [JP sig] Justice of the Peace | 5 | Unknown – legal question |
| [Office 1] Report of S.P.O. in charge | 6 | Back office |

**Count:** 27 numbered items on the form (1–27, with 5(a)–(d) as sub-items), broken into 42 rows including follow-ups, plus 6 unnumbered items (declaration, signature, signature date, jurat, JP signature, S.P.O. report) – 48 rows in all, 48 mapped. All mapped.

**Ignored as page furniture:** "FIRST SCHEDULE – Cont'd" and "FORM A - Cont'd" headers and footers on pages 1–5. The header block on page 1 (Act, schedule, form number, section and regulation) is recorded in section 1, not ignored.

**Checks run:** legal status **fired** – First Schedule, Form A, Firearms Act (Act 1998-32), section 5(1), regulation 2 · signatures and oaths **fired** – oath sworn before a Justice of the Peace, applicant signature · fees **amount unknown** ("Prescribed Fee" left blank) · sensitive questions – 4, 5 (immigration), 9–12 (mental health and addiction, with stigmatising wording in 10–12), 13 (convictions), 17, 21 and 25 (firearm holdings and storage), 26 (third-party data) · ambiguity – 1 (other names), 5 (permanent resident), 5(a), 5(b), 6 (last 5 years), 8 (no employer), 9 vs 10, 11 vs 12, 13 (any offence), 15 vs 19, 18 (particulars), 22 vs 23 · language – English, the team's working language. Bajan is spoken but the form is English only; no other language versions known.
