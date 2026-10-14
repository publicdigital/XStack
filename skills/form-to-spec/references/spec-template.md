# form-spec.md template

Copy this structure exactly. The ten sections are always present and always in this order – `brief-to-prototypes` and the coverage check rely on it. Write "None" or "Checked – none found" rather than leaving a section out.

Text in `[brackets]` is for you to fill in. Delete the guidance in `<!-- -->` comments.

---

```markdown
# Form spec: [Form title as printed] ([form number])

> This spec describes what the department asks on the paper form today. It is not a statement of user need. Use it as the brief for `/xstack:build`, alongside what research has found.

<!-- If no profile: "No country profile found, so this spec uses the xstack baseline and assumes no lookups. Run `/xstack:profile` to set one up." -->

## 1. Source

| | |
|---|---|
| Form | [title as printed] |
| Form number | [as printed, or "None on the form"] |
| Legal citation | [as printed, e.g. "Licensing Act 2001, Second Schedule, Form B (section 4)", or "None on the form"] |
| Owning authority | [only if stated on the form or confirmed by a source the form cites – otherwise "Not stated on the form" `[VERIFY WITH DEPARTMENT]`] |
| Language | [language(s) of the form] |
| Pages | [n] |
| File | [file name], [fillable PDF with n fields / flat PDF / scan / photo / Word document], produced by [producer if known] |
| Department page | [URL if given, or "Not provided"] |
| Date of this spec | [YYYY-MM-DD] |

**What the paper form does:** [one or two sentences – who fills it in, to get what, and what happens to it, only as far as the form says]

> **Legal status:** [If there is a legislative citation: "This form is set out in [citation]. Its wording, order and content may be fixed in law. Any rewording, restructuring or removal in this spec needs policy or legal sign-off. `[VERIFY WITH POLICY]`" Otherwise: "The form cites no legislation. Check whether it is prescribed anyway. `[VERIFY WITH POLICY]`"]

## 2. Profile used

- **Profile:** [name and path, or "None – xstack baseline"]
- **Service standard:** [as the profile names it, or "xstack baseline themes"]
- **Design system:** [as the profile names it, or "xstack neutral style"]
- **Lookups the profile makes available:**

| Lookup | Returns | Replaces items |
|---|---|---|
| [name exactly as the profile gives it] | [facts, from the data catalogue] | [item numbers] |

<!-- If none: "None. Items government may hold are listed as lookup opportunities in section 9." -->

## 3. How to read this spec

| Column | Means |
|---|---|
| **Q** | The item's number on the paper form. Labels in brackets (like `[Sig]`) are for unnumbered items |
| **Paper asks** | What the form says, in its own words. `…` marks a cut |
| **Digital treatment** | **Ask** (with component), **Lookup**, **Lookup opportunity**, **Conditional**, **Add-another**, **Government already holds this**, **Drop or challenge**, or **Back office** |
| **Flag** | What needs checking, with whom: `[VERIFY WITH USERS]`, `[VERIFY WITH DEPARTMENT]`, `[VERIFY WITH PLATFORM]`, `[VERIFY WITH POLICY]`, `[VERIFY WITH DATA]`, `[KNOWN GAP]` |

## 4. Items by section

### 4.1 [Section name a citizen would recognise]

| Q | Paper asks | Digital treatment | Flag |
|---|---|---|---|
| 1 | Full Name: (Mr./Mrs./Miss) … | Lookup – [profile lookup] returns full name. Confirm, don't retype | Title: Drop or challenge – honorifics aren't needed to identify someone `[VERIFY WITH POLICY]` |

<!-- One table per section. Every row keeps the form's numbering. -->

## 5. Declaration, signature and witness

| Q | Paper requires | Digital treatment | Flag |
|---|---|---|---|

**Why this matters:** [What the paper requires – e.g. "an oath sworn before a justice of the peace". This is the likely blocker to a fully digital service. Whether a digital declaration, an e-signature or a remote witness would satisfy it is a legal question.] `[VERIFY WITH POLICY]`

## 6. Back office

| Q | Paper has | Who fills it in | Flag |
|---|---|---|---|

[What the back office implies for the service – e.g. an officer's report means a police check sits between submission and decision. Suggest a service blueprint if it's significant.]

## 7. Before you start

What a citizen needs to have ready, drawn only from what the form asks:

- [e.g. details of every firearm you own: calibre, maker, type and serial number]
- [e.g. the names and addresses of 3 referees]

## 8. Questions for the owning department

1. **[Question]** – unblocks [rows, sections].
2. …

## 9. Lookup opportunities not yet in the profile

| Item(s) | What government might already hold | Who probably holds it | Flag |
|---|---|---|---|
| [5(d)] | [passport number and issue date] | [only named if the form or profile names them – otherwise "the department that issues it"] | `[VERIFY WITH PLATFORM]` |

## 10. Coverage check

Every numbered item on the form, and where it went.

| Form item | Spec row | Treatment |
|---|---|---|
| 1 | 4.1 | Lookup |

**Count:** [n] items on the form, [n] mapped. [Say "all mapped" or list what's missing.]

**Ignored as page furniture:** [e.g. "FIRST SCHEDULE – Cont'd" headers on pages 1–4, crown copyright line]

**Checks run:** legal status [fired / none found] · signatures and oaths [fired / none found] · fees [amount on form / unknown] · sensitive questions [items] · ambiguity [items] · language [note]
```
