# Form spec: Transfer of whole of registered title(s) (TR1)

> This spec describes what the department asks on the paper form today. It is not a statement of user need. Use it as the brief for `/xstack:build`, alongside what research has found.

## 1. Source

| | |
|---|---|
| Form | Transfer of whole of registered title(s) |
| Form number | TR1 |
| Legal citation | No prescribing provision printed on the form. The form cites: Land Registration Rules 2003 (Schedule 3, Form 7; rule 183; Schedule 9 – forms of execution; rule 136 – Form EX1); Land Registration Act 2002 (section 66 – public inspection; loss of protection); Law of Property Act 1925, section 53(1)(b); Economic Crime (Transparency and Enforcement) Act 2022; Fraud Act 2006, section 1 |
| Owning authority | HM Land Registry (printed in the form header, and the PDF author) |
| Language | English (PDF language metadata en-GB). Guidance mentions a constitution "in English or Welsh" |
| Pages | 4 |
| File | uk-tr1.pdf, fillable PDF with 28 AcroForm fields (20 text fields, 5 of them multiline, and 8 checkboxes on panels 8–10), produced by Microsoft Word for Office 365. Footer ref: LR/HO 08/23 |
| Department page | Not provided |
| Date of this spec | 2026-10-14 |

**What the paper form does:** TR1 is a deed. The transferor(s) transfer the whole of one or more registered titles to the transferee(s), who are entered in the register as the new registered proprietors. It records the price or other consideration, the title guarantee, how joint transferees hold the property, and any extra provisions. It is signed and witnessed as a deed and then dated on completion.

> **Legal status:** TR1 is a deed, not just an application. Its panels carry legal effect (panel 7 is the operative transfer, panel 9 gives a title guarantee, panel 10 is a declaration of trust, panel 12 is execution). The form doesn't print the provision that prescribes it, but it relies on the Land Registration Rules 2003 throughout (Schedule 9 for execution, Schedule 3 for Form 7), so it may be a prescribed form whose wording, panel numbering and order are fixed. Any rewording, restructuring, merging or removal in this spec needs sign-off from HM Land Registry's lawyers. `[VERIFY WITH POLICY] (the owning department's lawyers)`

**Who fills it in.** The form addresses "the transferor" and "the transferee" and doesn't say who completes it. The profile notes that solicitors and conveyancers do most property transactions, so a digital TR1 will probably be completed by an intermediary for most people, and by the parties themselves for some (for example gifts between family members). Both groups need to be in research. `[VERIFY WITH USERS] (the service team's user researcher)` `[VERIFY WITH DATA] (the service team's performance analyst)` – what share of TR1s are lodged by conveyancers?

**How the fields map.** Field names don't match panel numbers after panel 6 (fields 13–26 sit on panels 8–12, and field 7a is panel 4(c)). The full map is in `work/field-map.md`. The field name is given in each row below as "(field n)".

## 2. Profile used

- **Profile:** United Kingdom xstack profile (minimal example) – `examples/form-to-spec-tr1-uk/.xstack/profile.md`. No `dpi.md` found, so the Shared platforms table and data catalogue in `profile.md` are the list of lookups
- **Service standard:** GOV.UK Service Standard (14 points)
- **Design system:** GOV.UK Design System (`govuk-frontend`, `govuk-` prefix)
- **Lookups the profile makes available:**

| Lookup | Returns | Replaces items |
|---|---|---|
| GOV.UK One Login | `fullName`, `dateOfBirth` – only after identity checking, not every sign-in `[VERIFY WITH PLATFORM] (GDS)` | Confirms the name of a signed-in transferor or transferee who is a party (4, 5). It can't supply the names of the other parties, and it doesn't help when a conveyancer is the user |
| Companies House public data API | `companyName`, `registeredOffice`, `companyStatus` for a UK company by registered number. Overseas entities are on the register too `[VERIFY WITH PLATFORM] (GDS)` | Company name in 4 and 5, from the registered number. Registered office may serve as a suggested address for service in 6 |

The profile also lists **GOV.UK Pay** and **GOV.UK Notify**, but the form has no fee and no notifications, so neither replaces an item.

The profile states there is **no national ID number** and **no register lookup for land, title or address**. So title number, property and the current registered proprietors (1, 2, 4) are *not* lookups in this spec, even though HM Land Registry – the department that owns this form – keeps the register. They are marked **Government already holds this** and listed in section 9.

## 3. How to read this spec

| Column | Means |
|---|---|
| **Q** | The item's number on the paper form. Labels in brackets (like `[Sig]`) are for unnumbered items |
| **Paper asks** | What the form says, in its own words. `…` marks a cut |
| **Digital treatment** | **Ask** (with component), **Lookup**, **Lookup opportunity**, **Conditional**, **Add-another**, **Government already holds this**, **Drop or challenge**, or **Back office** |
| **Flag** | What needs checking, with whom: `[VERIFY WITH USERS]`, `[VERIFY WITH DEPARTMENT]`, `[VERIFY WITH PLATFORM]`, `[VERIFY WITH POLICY]`, `[VERIFY WITH DATA]`, `[KNOWN GAP]` |

Owners, from the profile's verification owners table: USERS – the service team's user researcher; DEPARTMENT – HM Land Registry (the body that owns the form); PLATFORM – GDS for GOV.UK One Login, Pay and Notify; POLICY – the owning department's lawyers; DATA – the service team's performance analyst.

## 4. Items by section

### 4.1 The property

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 1 | Title number(s) of the property: … Leave blank if not yet registered. (field 1) | **Government already holds this** – HM Land Registry issues title numbers. Ask: text, add-another (the form allows "title(s)"). Could also be found from the address if the register can be searched (see 9) | `[VERIFY WITH DEPARTMENT]` Can the service read the register by title number? Ambiguity: "Leave blank if not yet registered" on a form titled "registered title(s)" – when does this apply? `[VERIFY WITH USERS]` |
| 2 | Property: Insert address including postcode (if any) or other description of the property, for example 'land adjoining 2 Acacia Avenue'. (field 2) | **Government already holds this** – the register describes the property for each title. Show it from the title number and ask to confirm. Until then, Ask: postcode/address with a free-text "other description" route for land with no address | `[VERIFY WITH DEPARTMENT]` Must the description match the register exactly? Addresses must allow land without a postcode |

### 4.2 Who is transferring the property (transferor)

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 4 | Transferor: Give full name(s) of **all** the persons transferring the property. (field 4) | **Government already holds this** – the register names the registered proprietors of the title(s) in 1. Show them and ask "Are these the people transferring the property?" with a way to change. **Add-another** (full name per transferor). If the signed-in user is a transferor: **Lookup** – GOV.UK One Login `fullName` confirms their own name only | `[VERIFY WITH DEPARTMENT]` Can the transferor differ from the registered proprietor (for example personal representatives, attorneys)? If so, the confirm step needs a "someone else" route. One Login name may differ from the name on the register `[VERIFY WITH USERS]` |
| 4 [Type] | (implied) Complete as appropriate where the transferor is a company. | **Ask** – radios per transferor: a person / a UK company or LLP / an overseas entity. Drives 4 UK, 4(a)–(c) | The form has no explicit question – this is a routing question we're adding `[VERIFY WITH POLICY]` |
| 4 UK | For UK incorporated companies/LLPs – Registered number of company or limited liability partnership including any prefix: (field 5) | **Conditional** – only if 4 [Type] is UK company or LLP. Ask: text (registered number), then **Lookup** – Companies House public data API returns `companyName`, `registeredOffice`, `companyStatus`. Confirm, don't retype the name | Status other than active: what should happen? `[VERIFY WITH DEPARTMENT]` |
| 4(a) | For overseas entities (a) Territory of incorporation or formation: (field 6) | **Conditional** – only if 4 [Type] is overseas entity. Ask: select (country or territory). **Lookup opportunity** – Companies House may hold this for registered overseas entities | Not in the profile's data catalogue `[VERIFY WITH PLATFORM] (GDS)` |
| 4(b) | (b) Overseas entity ID issued by Companies House, including any prefix: … If the ID is not required, you may instead state 'not required'. (field 7) | **Conditional** – only if overseas entity. Ask: text, plus "Not required" option (checkbox or radio). **Lookup opportunity** – check the ID against Companies House | When is the ID "not required"? The form points to practice guide 78 but doesn't say – a citizen can't answer this without help `[VERIFY WITH DEPARTMENT]` `[VERIFY WITH USERS]`. Cited: Economic Crime (Transparency and Enforcement) Act 2022 `[VERIFY WITH POLICY]` |
| 4(c) | (c) Where the entity is a company with a place of business in the United Kingdom, the registered number, if any, issued by Companies House, including any prefix: (field 7a) | **Conditional** – only if overseas entity *and* it has a place of business in the UK (a new yes/no question). Ask: text. Then **Lookup** – Companies House public data API, if it covers these numbers | Whether the API returns overseas companies' UK establishments `[VERIFY WITH PLATFORM] (GDS)`. "if any" – needs a "none" option |

### 4.3 Who is getting the property (transferee)

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 5 | Transferee for entry in the register: Give full name(s) of **all** the persons to be shown as registered proprietors. (field 8) | **Ask** – **add-another** (full name per transferee). If the signed-in user is a transferee: **Lookup** – GOV.UK One Login `fullName` confirms their own name | Names go on a public register (see [Warning] s66) – say so on the page `[VERIFY WITH POLICY]`. The paper sets no limit on the number of transferees – don't invent one `[VERIFY WITH DEPARTMENT]` |
| 5 [Type] | (implied) Complete as appropriate where the transferee is a company. | **Ask** – radios per transferee: person / UK company or LLP / overseas entity | Routing question we're adding `[VERIFY WITH POLICY]` |
| 5 UK | For UK incorporated companies/LLPs – Registered number … including any prefix: (field 9) | **Conditional** – only if 5 [Type] is UK company or LLP. Ask: text, then **Lookup** – Companies House public data API (`companyName`, `registeredOffice`, `companyStatus`) | – |
| 5(a) | For overseas entities (a) Territory of incorporation or formation: (field 10) | **Conditional** – only if overseas entity. Ask: select. **Lookup opportunity** – Companies House | `[VERIFY WITH PLATFORM] (GDS)` |
| 5(b) | (b) Overseas entity ID issued by Companies House, including any prefix: … you may instead state 'not required'. (field 11) | **Conditional** – only if overseas entity. Ask: text, plus "Not required" option. **Lookup opportunity** – Companies House | As 4(b) `[VERIFY WITH DEPARTMENT]` `[VERIFY WITH USERS]` |
| 5(c) | (c) Where the entity is a company with a place of business in the United Kingdom, the registered number, if any … (field 11a) | **Conditional** – only if overseas entity with a UK place of business. Ask: text, with "none". **Lookup** – Companies House public data API, if it covers these | `[VERIFY WITH PLATFORM] (GDS)` |
| 5 [Attach] | (guidance) for an overseas company, unless an arrangement with HM Land Registry exists, lodge either a certificate in Form 7 in Schedule 3 to the Land Registration Rules 2003 or a certified copy of the constitution in English or Welsh, or other evidence permitted by rule 183 … | **Conditional** – only if 5 [Type] is overseas entity and no arrangement exists. Ask: radios (Form 7 certificate / certified copy of constitution / other rule 183 evidence / an arrangement exists), then **upload**. **Government already holds this** for "an arrangement with HM Land Registry" | Can certified copies be uploaded, or must the original be sent? `[VERIFY WITH POLICY]`. How would a citizen know an arrangement exists? `[VERIFY WITH DEPARTMENT]` |
| 6 | Transferee's intended address(es) for service for entry in the register: … Each transferee may give up to three addresses for service, one of which must be a postal address whether or not in the UK (including the postcode, if any). The others can be any combination of a postal address, a UK DX box number or an email address. (field 12) | **Ask** – per transferee, **add-another** (max 3): radios (postal address / UK DX box number / email address), then the matching input. Validate that at least one is postal. Overseas addresses allowed (profile). Offer the transferee's registered office (from Companies House) or the property address (2) as a suggestion | "Address for service" is a term of art – citizens may not know it means where HM Land Registry will write to them `[VERIFY WITH USERS]`. Is 3 a legal limit or a paper one? `[VERIFY WITH DEPARTMENT]` An email address entered "for entry in the register" may become publicly inspectable (s66) – say so `[VERIFY WITH POLICY]` |

### 4.4 The transfer and the price

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 7 | The transferor transfers the property to the transferee | **No input.** Fixed operative wording of the deed. Show it, unchanged, in the deed preview before signing. Not a question | Do not reword `[VERIFY WITH POLICY]` |
| 8 | Consideration – Place 'X' in the appropriate box. (fields 13, 15, 16) | **Ask** – radios: "The transferor has received from the transferee for the property the following sum" / "The transfer is not for money or anything that has a monetary value" / "Insert other receipt as appropriate". Add a fourth route for "none of these apply", which sends the user to 11 | "Consideration" is a term of art `[VERIFY WITH USERS]`. The paper uses checkboxes but says "the appropriate box" – one only? `[VERIFY WITH DEPARTMENT]`. Sensitive: the price (finances) and it becomes publicly inspectable |
| 8 [Sum] | The transferor has received from the transferee for the property the following sum (in words and figures): (field 14) | **Conditional** – only if 8 is "received … sum". Ask: number (£). Generate the words from the figures and show both for confirmation | Is "in words and figures" a legal requirement, or can the service generate the words? `[VERIFY WITH POLICY]` |
| 8 [Currency] | State the currency unit if other than sterling. | **Conditional** – only if 8 is "received … sum". Ask: radios (pound sterling / another currency), then select | – |
| 8 [Other] | Insert other receipt as appropriate: (field 17) | **Conditional** – only if 8 is "other receipt". Ask: textarea | "Other receipt" gives no indication of what to write – citizens will need examples `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]` |
| 8 [None] | If none of the boxes apply, insert an appropriate memorandum in panel 11. | **Conditional** – route to 11 with a prompt. Not a separate field | "Memorandum" is jargon `[VERIFY WITH USERS]` |

### 4.5 Title guarantee

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 9 | The transferor transfers with – full title guarantee / limited title guarantee. Place 'X' in any box that applies. (fields 18, 19) | **Ask** – radios: full title guarantee / limited title guarantee / neither. Explain each in plain language as a hint – suggestion only | "any box that applies" but the two options look like alternatives – can both be ticked, and what does ticking neither mean? `[VERIFY WITH DEPARTMENT]` `[VERIFY WITH POLICY]`. Terms of art a lay party won't understand `[VERIFY WITH USERS]` |
| 9 [Mods] | Add any modifications. (field 20) | **Conditional** – only if 9 is full or limited. Ask: radios (yes/no), then textarea | Legal free text; likely conveyancer-only `[VERIFY WITH USERS]` |

### 4.6 How joint owners will hold the property

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 10 | Declaration of trust. The transferee is more than one person and – Where the transferee is more than one person, place 'X' in the appropriate box. (fields 21, 22, 23) | **Conditional** – only if 5 has more than one transferee. **Ask** – radios: "they are to hold the property on trust for themselves as joint tenants" / "… as tenants in common in equal shares" / "they are to hold the property on trust:" (with details). Keep the paper's option wording; plain-language hints are suggestions | Terms of art with big consequences (what happens on death). The form refers people to "Joint property ownership" and practice guide 24 – a citizen can't safely choose without help `[VERIFY WITH USERS]`. Can the panel be left blank when there are several transferees? `[VERIFY WITH DEPARTMENT]` Completing it triggers execution by every transferee (12) `[VERIFY WITH POLICY]` |
| 10 [Details] | they are to hold the property on trust: Complete as necessary. (field 24) | **Conditional** – only if 10 is the third option. Ask: textarea, with optional **upload** for a trust instrument | Can a trust deed be attached, or must the trust be set out here? `[VERIFY WITH DEPARTMENT]` |
| 10 [JO] | (guidance) … it is clear from completion of a form JO lodged with this application that the transferees are to hold the property on trust for themselves alone as joint tenants. | **Conditional** – only if 10 is blank or the third option. Ask: radios "Are you also sending form JO?", then upload. Or bring form JO's questions into the service | Is form JO an alternative to panel 10 online? `[VERIFY WITH DEPARTMENT]` |

### 4.7 Anything else

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 11 | Additional provisions – Insert here any required or permitted statement, certificate or application and any agreed covenants, declarations and so on. (field 25) | **Ask** – radios (yes/no), then textarea. Possibly **upload** for long provisions | Open-ended legal text – mainly for conveyancers. "required or permitted" – required when? A lay party can't know `[VERIFY WITH USERS]` `[VERIFY WITH DEPARTMENT]`. Covenants or applications by the transferee here mean the transferee must also execute (12) |

### 4.8 Instructions around the form

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| [Ink] | Any parts of the form that are not typed should be completed in black ink and in block capitals. | **Drop or challenge** – paper-only instruction | `[VERIFY WITH DEPARTMENT]` – only if the service prints a paper deed for wet signature does this still matter |
| [CS] | If you need more room than is provided for in a panel … use continuation sheet CS and attach it to this form. | **Drop or challenge** – add-another and unlimited text areas replace continuation sheets | Paper constraint `[VERIFY WITH DEPARTMENT]` |
| [Privacy] | For information on how HM Land Registry processes your personal information, see our Personal Information Charter. | **Ask – none.** Link to the privacy notice at the start of the service | Check the charter covers a digital TR1 `[VERIFY WITH POLICY]` |
| [Warning] | WARNING If you dishonestly enter information … you may commit the offence of fraud under section 1 of the Fraud Act 2006 … Failure to complete this form with proper care may result in a loss of protection under the Land Registration Act 2002 … Under section 66 of the Land Registration Act 2002 most documents (including this form) … are open to public inspection and copying. If you believe a document contains prejudicial information, you may apply … exempt using Form EX1, under rule 136 … | **Ask – none.** Show the fraud and care warnings before the declaration and execution (section 5). Show the public inspection notice early – before names, addresses and price are entered. Offer a route to Form EX1 | Wording is legal – don't reword without sign-off `[VERIFY WITH POLICY]`. Public inspection drives the threat model |

## 5. Declaration, signature and witness

| Q | Paper requires | Digital treatment | Flag |
|---|---|---|---|
| 12 [Transferor] | Execution. The transferor must execute this transfer as a deed using the space opposite. If there is more than one transferor, all must execute. Forms of execution are given in Schedule 9 to the Land Registration Rules 2003. (field 26) | **Ask** – one execution per transferor, each by the person themselves (not the conveyancer). Form of execution differs for individuals, companies and overseas entities (Schedule 9) – route by 4 [Type]. Whether an electronic signature or a digital deed satisfies this is the open question | `[VERIFY WITH POLICY]` – the profile records no e-signature or deed law ("not recorded in this example profile"). **Likely blocker** |
| 12 [Transferee] | If the transfer contains transferee's covenants or declarations or contains an application by the transferee (such as for a restriction), it must also be executed by the transferee. If there is more than one transferee and panel 10 has been completed, each transferee must also execute … section 53(1)(b) of the Law of Property Act 1925 … | **Conditional** – only if 10 is completed with more than one transferee, or 9 [Mods] / 11 contain transferee covenants, declarations or applications. Each transferee executes | The service can detect panel 10, but not whether free text in 11 contains a transferee covenant – needs a direct question `[VERIFY WITH DEPARTMENT]` |
| [Witness] | Execution as a deed usually means that a witness must also sign, and add their name and address. | **Ask** – per signatory: witness full name, address, signature. "usually" – the form doesn't say when it isn't needed | Remote or electronic witnessing: `[VERIFY WITH POLICY]`. Who can be a witness (not a party? not family?) – not on the form `[KNOWN GAP]` |
| 3 | Date: Remember to date this deed with the day of completion, but not before it has been signed and witnessed. (field 3) | **Ask** – date (three inputs), entered only after every execution in 12 is complete, at completion. Could be set by the system at the point of completion – a suggestion | Who dates it, and can the service do it? `[VERIFY WITH POLICY]`. The order matters: the date must not be added before signing and witnessing – the service must enforce this |
| [Warning] | Fraud Act 2006 section 1 warning (see 4.8) | Show immediately before each execution | `[VERIFY WITH POLICY]` |

**Why this matters:** TR1 must be executed as a deed by every transferor, usually in the presence of a witness who signs and adds their name and address, in a form set out in Schedule 9 to the Land Registration Rules 2003. In some cases every transferee must execute it too, to meet section 53(1)(b) of the Law of Property Act 1925. It is then dated on completion. This is the likely blocker to a fully digital service: a tick box or a One Login sign-in is not a deed. Whether HM Land Registry accepts an electronic signature, a remote or electronic witness, or a digital deed for TR1 is a legal question, and the profile doesn't record any e-signature or deeds law to check against. `[VERIFY WITH POLICY] (the owning department's lawyers)`

Until that's answered, a prototype can collect everything in panels 1–11 digitally and treat execution as a separate step – for example generating a completed TR1 for wet signature – and test both.

## 6. Back office

| Q | Paper has | Who fills it in | Flag |
|---|---|---|---|
| – | No "for official use" box on the form | – | Checked – none on the form |
| [Office: Form A] | (guidance, panel 10) The registrar will enter a Form A restriction in the register unless … | The registrar – a decision made from the answers to 10 and form JO | Registrar's action. The service could tell transferees in advance whether a restriction will be entered `[VERIFY WITH DEPARTMENT]` |
| [Office: register] | Transferee … for entry in the register; address(es) for service for entry in the register | The registrar – updates the register from 5 and 6 | – |
| [Office: EX1] | Form EX1, under rule 136 | The registrar decides exemption applications | Separate process `[VERIFY WITH DEPARTMENT]` |

The form doesn't say how a TR1 reaches HM Land Registry, what application goes with it, who lodges it, or what fee is paid. Behind it sits the registrar's examination of the deed and the update of the register. A service blueprint would show where conveyancers, the parties, witnesses and HM Land Registry each act (`xstack:service-blueprint`).

## 7. Before you start

What someone needs to have ready, drawn only from what the form asks:

- the title number(s) of the property, if it's registered, and its address or a description
- the full names of everyone transferring the property, and of everyone it's going to
- for any company: its Companies House registered number; for an overseas entity, its territory of incorporation, overseas entity ID (or knowing it's not required) and any UK registered number
- for an overseas company getting the property: a Form 7 certificate, a certified copy of its constitution in English or Welsh, or other permitted evidence
- up to three addresses for service for each new owner, at least one of them a postal address (other options: a UK DX box number or an email address)
- the price paid and its currency, or details of what else was given
- whether the transfer is with full or limited title guarantee, and any changes to it
- if there's more than one new owner: whether they'll hold it as joint tenants, tenants in common in equal shares, or on other trusts (and the details)
- any additional provisions, covenants or declarations
- everyone who must sign, and a witness for each signature

## 8. Questions for the owning department

1. **Is TR1 a prescribed form, and is its wording, panel numbering and order fixed? Can a digital service collect the same content in a different order and produce a TR1 from it?** – unblocks every reworded label, the routing questions we've added (4 [Type], 5 [Type]), panel 7, and the whole page order in sections 4.1–4.7.
2. **Can a TR1 be executed electronically – by e-signature, with a remote or electronic witness, or as a digital deed – and who may date it?** – unblocks all of section 5 (12, [Witness], 3) and decides whether the service is fully digital or ends in a document for wet signature.
3. **Can the service read the register by title number – registered proprietors and property description – and search for a title by address?** – unblocks 1, 2 and 4, turning "Government already holds this" into confirm steps.
4. **How is a TR1 lodged, by whom, with what accompanying application, and what fee is payable?** – unblocks the missing "Paying" and "Sending" steps, GOV.UK Pay, and section 6. The fee is not on the form.
5. **Is the limit of three addresses for service legal or a paper limit, and are email addresses and the price on a TR1 open to public inspection under section 66?** – unblocks 6, 8 [Sum] and the privacy content shown before people enter data.
6. **When is an overseas entity ID "not required", and can certified copies (Form 7, constitution) be uploaded?** – unblocks 4(b), 5(b) and 5 [Attach].

## 9. Lookup opportunities not yet in the profile

| Item(s) | What government might already hold | Who probably holds it | Flag |
|---|---|---|---|
| 1, 2 | Title number(s) and property description; search by address or postcode | HM Land Registry (the form's owner) | `[VERIFY WITH DEPARTMENT]` |
| 4 | Registered proprietors of the title – the expected transferors | HM Land Registry | `[VERIFY WITH DEPARTMENT]` |
| 4(a), 5(a) | Territory of incorporation or formation of an overseas entity | Companies House (named on the form for overseas entity IDs) | `[VERIFY WITH PLATFORM] (GDS)` – not in the data catalogue |
| 4(b), 5(b) | Overseas entity ID – validity and match to the entity name | Companies House | `[VERIFY WITH PLATFORM] (GDS)` |
| 4(c), 5(c) | UK registered number of an overseas company with a UK place of business | Companies House | Whether the existing API covers these `[VERIFY WITH PLATFORM] (GDS)` |
| 5 [Attach] | Whether "an arrangement with HM Land Registry exists" for an overseas company | HM Land Registry | `[VERIFY WITH DEPARTMENT]` |
| 6 | A current postal address for a transferee who is a person | None in the profile – One Login address return is unconfirmed | `[VERIFY WITH PLATFORM] (GDS)` |

## 10. Coverage check

Every numbered item on the form, and where it went. Field names from the PDF in brackets.

| Form item | Spec row | Treatment |
|---|---|---|
| 1 Title number(s) (field 1) | 4.1 | Government already holds this · Ask |
| 2 Property (field 2) | 4.1 | Government already holds this · Ask |
| 3 Date (field 3) | 5 | Ask (after execution) |
| 4 Transferor names (field 4) | 4.2 | Government already holds this · Add-another · Lookup (own name) |
| 4 UK registered number (field 5) | 4.2 | Conditional · Ask · Lookup (Companies House) |
| 4(a) Territory (field 6) | 4.2 | Conditional · Lookup opportunity |
| 4(b) Overseas entity ID (field 7) | 4.2 | Conditional · Lookup opportunity |
| 4(c) UK registered number of overseas company (field 7a) | 4.2 | Conditional · Ask · Lookup |
| 5 Transferee names (field 8) | 4.3 | Ask · Add-another · Lookup (own name) |
| 5 UK registered number (field 9) | 4.3 | Conditional · Ask · Lookup (Companies House) |
| 5(a) Territory (field 10) | 4.3 | Conditional · Lookup opportunity |
| 5(b) Overseas entity ID (field 11) | 4.3 | Conditional · Lookup opportunity |
| 5(c) UK registered number of overseas company (field 11a) | 4.3 | Conditional · Ask · Lookup |
| 5 [Attach] Form 7 / constitution / rule 183 evidence (no field) | 4.3 | Conditional · Upload |
| 6 Addresses for service (field 12) | 4.3 | Ask · Add-another |
| 7 Operative words (no field) | 4.4 | No input – shown in deed preview |
| 8 Consideration options (fields 13, 15, 16) | 4.4 | Ask (radios) |
| 8 Sum (field 14) | 4.4 | Conditional · Ask |
| 8 Currency (no field) | 4.4 | Conditional · Ask |
| 8 Other receipt (field 17) | 4.4 | Conditional · Ask |
| 8 None apply → panel 11 (no field) | 4.4 | Conditional routing |
| 9 Title guarantee (fields 18, 19) | 4.5 | Ask (radios) |
| 9 Modifications (field 20) | 4.5 | Conditional · Ask |
| 10 Declaration of trust (fields 21, 22, 23) | 4.6 | Conditional · Ask (radios) |
| 10 Trust details (field 24) | 4.6 | Conditional · Ask |
| 10 Form JO (no field) | 4.6 | Conditional · Upload |
| 11 Additional provisions (field 25) | 4.7 | Ask |
| 12 Execution – transferors (field 26) | 5 | Ask – legal question |
| 12 Execution – transferees (field 26) | 5 | Conditional – legal question |
| [Witness] (within field 26) | 5 | Ask – legal question |
| [Ink] | 4.8 | Drop or challenge |
| [CS] Continuation sheet | 4.8 | Drop or challenge |
| [Privacy] Personal Information Charter | 4.8 | Content |
| [Warning] Fraud, proper care, s66, EX1 | 4.8, 5 | Content |
| [Office: Form A], [Office: register], [Office: EX1] | 6 | Back office |

**Count:** 12 numbered panels on the form (1–12), broken into 30 items (including sub-items 4(a)–(c), 5(a)–(c) and the parts of panels 8–10 and 12), plus 4 unnumbered instructions and 3 back-office actions – 37 rows, all mapped. All 28 AcroForm fields are mapped (see `work/field-map.md`); panel 7 has no field.

**Ignored as page furniture:** HM Land Registry header and logo, "TR1" mark, links to practice guides 8, 24 and 78 and "Joint property ownership" (noted as guidance in the rows they affect), "© Crown copyright (ref: LR/HO) 08/23" footer.

**Checks run:** legal status **fired** – cites Land Registration Rules 2003 (Schedules 3 and 9, rules 136 and 183), Land Registration Act 2002 s66, Law of Property Act 1925 s53(1)(b), Economic Crime (Transparency and Enforcement) Act 2022, Fraud Act 2006 s1; it's a deed and may be prescribed, prescribing provision not printed · signatures and oaths **fired** – execution as a deed by all transferors, sometimes all transferees, usually witnessed, dated on completion · fees **unknown** – no fee on the form ("receipt" in panel 8 is the consideration, not a fee) · sensitive questions – price (8), names and addresses including email going on a publicly inspectable register (5, 6, s66), how joint owners hold the property (10) · ambiguity – "consideration", "title guarantee", "address for service", "joint tenants / tenants in common", "memorandum", "other receipt", "not required" overseas entity ID, 9 "any box that applies", 1 "leave blank if not yet registered" · language – English; the profile notes Welsh has equal status in Wales and the form mentions Welsh-language constitutions; whether a Welsh TR1 exists is `[VERIFY WITH DEPARTMENT]`
