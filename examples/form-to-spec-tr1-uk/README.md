# Form → spec: TR1 transfer of registered title (UK profile)

A second worked example of `/xstack:form-to-spec`, from a different country with a different setup, to show the skill doesn't depend on any one government's platforms.

| File | What it is |
|---|---|
| `uk-tr1.pdf` | HM Land Registry's form TR1, *Registered title(s): whole transfer* (08/23). A fillable 4-page PDF with 28 form fields. Crown copyright, published on GOV.UK under the Open Government Licence |
| `.xstack/profile.md` | A deliberately minimal, **project-local** UK profile. It is not a complete UK profile – it exists to show the skill working with a setup unlike Barbados |
| `form-spec.md` | The form spec the skill produced with that profile |

## What's different from the Barbados example

- **No national ID lookup.** The UK has no national ID number and the profile lists no register lookup for names, addresses or land. So the parties' names and addresses are asks, and the title number and property are "government already holds this" – the form names HM Land Registry as the holder – rather than lookups.
- **A non-identity lookup.** The profile lists a Companies House lookup, so company registered numbers in panels 4 and 5 use it.
- **Fillable PDF.** The field names are bare numbers ("13", "7a") that don't line up with the panel numbers after panel 6. The spec maps all 28 fields to their panels from the rendered pages.
- **Execution as a deed** (section 5): a witnessed signature by every transferor, and sometimes every transferee. That's the blocker here.
- **Legal status:** the form relies on the Land Registration Rules 2003 throughout but doesn't print which rule prescribes it, so the spec says it *may* be prescribed – and tags every rewording for policy.
- **Public register:** section 66 of the Land Registration Act 2002, quoted on the form, makes the transfer publicly inspectable – including any email address for service. The spec points to a threat model.

## How it was made

The spec is the output of the skill's eval 2 (`skills/form-to-spec/evals/`), reviewed, with one correction: the breakdown of field types in section 1. It hasn't been checked with HM Land Registry or users.
