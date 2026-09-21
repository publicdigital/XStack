# Worked examples

One service, taken from discovery to production: **renewing a medical licence**.

These examples use the **Barbados profile** (`profiles/barbados/`). They were produced when xstack was called "bimstack" and built for GovTech Barbados. They show the Barbados service standards, the GOV.BB design system, Trident ID and Barbadian data formats, because that is what the profile tells the agents to use.

With your own country profile, the same commands produce the same kinds of output, using your standard, design system, platforms and terms. Without a profile, prototypes use the neutral xstack style and assessments use the baseline themes in `references/service-standard-baseline.md`.

| Folder | Phase | Made with |
|---|---|---|
| `discovery-renewing-medical-licence/` | Discovery | `/xstack:discover` |
| `build-renew-medical-licence/` | Alpha: three candidate prototypes, then two rounds of iteration | `/xstack:build`, `/xstack:iterate` |
| `production-renew-medical-licence/` | Moving to beta: production front end and test suite | `/xstack:productionise` |

Some tags and terms in these examples come from before the rename. `[VERIFY WITH MDA]` is now `[VERIFY WITH DEPARTMENT]`, and `[VERIFY WITH MIST]` is now `[VERIFY WITH PLATFORM]`.
