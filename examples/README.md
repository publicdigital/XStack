# Worked examples

One service, taken from discovery to production: **renewing a medical licence**.

These examples use the **Barbados profile** (`profiles/barbados/`). They were produced when xstack was called "bimstack" and built for GovTech Barbados. They show the Barbados service standards, the GOV.BB design system, Trident ID and Barbadian data formats, because that is what the profile tells the agents to use.

With your own country profile, the same commands produce the same kinds of output, using your standard, design system, platforms and terms. Without a profile, prototypes use the neutral xstack style and assessments use the baseline themes in `references/service-standard-baseline.md`.

| Folder | Phase | Made with |
|---|---|---|
| `discovery-renewing-medical-licence/` | Discovery | `/xstack:discover` |
| `build-renew-medical-licence/` | Alpha: three candidate prototypes, then two rounds of iteration | `/xstack:build`, `/xstack:iterate` |
| `production-renew-medical-licence/` | Moving to beta: production front end and test suite | `/xstack:productionise` |
| `form-to-spec-firearm-licence-barbados/` | Before alpha: a paper form (Firearms Act, Form A) turned into a form spec for the build | `/xstack:form-to-spec` |
| `form-to-spec-tr1-uk/` | Before alpha: HM Land Registry's TR1, with a minimal project-local **UK profile** – no national ID lookup | `/xstack:form-to-spec` |
| `dpi-mock-demo/` | Alpha: sign in, share data, confirm, pay, with every unhappy path. No profile, neutral style | `references/dpi-mock.js` |

Some tags and terms in these examples come from before the rename. `[VERIFY WITH MDA]` is now `[VERIFY WITH DEPARTMENT]`, and `[VERIFY WITH MIST]` is now `[VERIFY WITH PLATFORM]`.
