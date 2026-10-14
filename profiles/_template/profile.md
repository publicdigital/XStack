# [Country] xstack profile

<!--
Copy this file to `.xstack/profile.md` in your project, or run /xstack:profile to fill it in interactively.
Leave out any section you don't know yet. Agents fall back to the xstack baseline for anything missing.
Delete these comments when you're done.
-->

## Government and context

- **Country:**
- **Digital team:** <!-- e.g. the national digital agency, and who the xstack team reports to -->
- **Languages people use:** <!-- every language a significant part of the population is most comfortable in -->
- **Connectivity and devices:** <!-- e.g. mostly mobile data, prepaid, low-cost Android phones, patchy rural coverage -->
- **Offline and assisted channels:** <!-- e.g. counters, community centres, post offices, phone lines, intermediaries -->

## Terms

| Generic term xstack uses | What it's called here |
|---|---|
| Department (the part of government that owns a service) | |
| Platform team (owns shared platforms such as identity and payments) | |
| Service owner | |
| National identity platform | |
| Government website | |

## Verification owners

Who to ask when an assumption carries each xstack tag. Agents add the owner after the tag, for example `[VERIFY WITH PLATFORM] (national digital agency)`. Leave a row blank if you don't know – agents then use the tag alone.

| Tag | Who owns it here |
|---|---|
| `[VERIFY WITH USERS]` | <!-- e.g. the team's user researcher --> |
| `[VERIFY WITH DEPARTMENT]` | <!-- e.g. the department that owns the service --> |
| `[VERIFY WITH PLATFORM]` | <!-- e.g. the team that runs identity, payments and data exchange --> |
| `[VERIFY WITH POLICY]` | <!-- e.g. the department's legal adviser, the drafting office --> |
| `[VERIFY WITH DATA]` | <!-- e.g. the performance analyst, the statistics office --> |

## Service standard

- **Name:**
- **Link:**
- **Full text:** <!-- optional: put the full standard in service-standards.md next to this file -->

| Your standard | Its title | xstack baseline theme(s) |
|---|---|---|
| 1 | | |

<!-- Map every one of your standards to one or more themes from references/service-standard-baseline.md.
If a baseline theme has no match in your standard, list it under "Not in our standard" so agents still apply it. -->

**Not in our standard:**

## Design system

<!-- Easiest: run /xstack:design-system. It picks your design system from the Government Design Systems List,
works out how prototypes should load it and writes design-system.md next to this file. Then this section only needs
the name and "Details: design-system.md". -->

- **Name and link:**
- **Details:** <!-- design-system.md, if /xstack:design-system has been run -->
- **How to use it in a prototype:** <!-- e.g. CDN stylesheet URL, npm package, CSS class prefix -->
- **Page chrome every service must have:** <!-- e.g. official banner, header, phase banner, footer -->
- **Colours and fonts:** <!-- only if there is no stylesheet to link to -->
- **Token and component files:** <!-- optional: design-tokens.yaml, design-guide.md next to this file -->
- **Service patterns:** <!-- optional: service-patterns.md next to this file -->

## Shared platforms

<!-- Identity, payments and data exchange are your Digital Public Infrastructure (DPI). Record them in
dpi.md next to this file (template: profiles/_template/dpi.md), including the data catalogue of which
register holds which fact. Then this table only needs the names and "Details: dpi.md". -->

- **Details:** <!-- dpi.md -->

| Need | Platform | How to integrate |
|---|---|---|
| Identity and sign-in | | |
| Personal details lookup | | |
| Payments | | |
| Data exchange between registers | | |
| Notifications (email, SMS) | | |
| Registers and lookups (businesses, vehicles, addresses) | | |

## Data formats

| Field | Format |
|---|---|
| National ID number | |
| Address and regions | |
| Postcode | |
| Phone number | Accept any format – don't enforce a pattern |
| Date | Day, month and year in three separate inputs |
| Currency | |

## Law and policy

- **Data protection law and regulator:**
- **Accessibility law or standard:**
- **Open source, open data or cloud policy:**
- **Records and retention rules:**
- **Electronic signatures, declarations and oaths:** <!-- e.g. an electronic transactions act, and whether it covers oaths, witnesses and deeds -->
- **Where legislation is published:** <!-- e.g. the official legislation website, so agents can check a form's legal citation -->

## Research context

- **Population data sources:** <!-- e.g. national statistics office, census, digital inclusion surveys -->
- **Recruitment channels:** <!-- e.g. community groups, front-line offices, faith groups, WhatsApp groups -->
- **Research languages and interpreters:**
- **Incentives policy:**

## Related skills

<!-- Other Claude skills your organisation uses for its house style, forms, slides or documents. -->
