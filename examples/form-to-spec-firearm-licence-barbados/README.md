# Form → spec: firearm licence application (Barbados profile)

A worked example of `/xstack:form-to-spec`, the first step in **form → spec → build**.

| File | What it is |
|---|---|
| `bb-firearm-licence-form-a.pdf` | The paper form: Firearms Act (Act 1998-32), First Schedule, Form A – *Application for a licence to have, use or carry a firearm*. A flat 5-page PDF with no fillable fields |
| `form-spec.md` | The form spec the skill produced, using the bundled Barbados profile (`xstack profile: barbados`) |

## What to look at

- **Legal status** (section 1): the form sits in a schedule to an Act, so its wording may be fixed in law. Every rewording and drop is tagged for policy sign-off.
- **The oath** (section 5): the applicant swears before a Justice of the Peace. That's the likely blocker to a fully online service, and the spec doesn't pretend otherwise.
- **Lookups come from the profile.** Trident ID replaces name, date of birth and address, because the Barbados `dpi.md` lists it. Place of birth, nationality and passport details aren't in the data catalogue, so they're lookup opportunities (section 9), not lookups.
- **Nothing invented.** The form leaves "Prescribed Fee" blank, so the fee is unknown. There's no minimum age, firearm type list or processing time on the form, so the spec doesn't give one.
- **Sensitive questions** (4.4): the mental health and alcohol questions keep their legal wording. Plain-language versions are suggestions, and 9/10 and 11/12 are flagged as looking the same to a citizen.
- **Coverage** (section 10): items 1–27 and 5(a)–(d), split into 42 rows, plus 6 unnumbered items (oath, signatures, the officer's report) – 48 rows, all mapped.

## How it was made

The spec is the output of the skill's first eval run (`skills/form-to-spec/evals/`, eval 1), reviewed but not edited. It hasn't been checked with the Royal Barbados Police Force, users or the platform team – every assumption is tagged for whoever needs to confirm it.

To compare: `skills/form-to-spec/evals/profiles/testland/` runs the same form against a made-up country's profile. Trident ID disappears, and the identity platform there returns only name and date of birth – so address becomes an ask.

## Next step

```
/xstack:build examples/form-to-spec-firearm-licence-barbados/form-spec.md
```

Every prototype built from it carries a coverage table showing how each of the form's items is asked, looked up or deferred.
