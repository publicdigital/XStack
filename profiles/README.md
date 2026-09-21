# Country profiles

xstack works for any government. The agents, skills and commands are country-agnostic. Everything specific to one government lives in a **country profile**: its service standard, its design system, its shared platforms, what it calls things and how its data is formatted.

A profile is what turns "use the government's identity platform" into "use Trident ID", and "Plain language (xstack baseline)" into "Standard 4 (Use simple and relatable language)".

You don't need a profile to start. Without one, xstack uses its own baseline: the 14 themes in `references/service-standard-baseline.md` and the generic conventions in `references/house-style.md`. A profile makes the advice sharper and the prototypes look like your government's services.

---

## How agents find the profile

Every agent and skill resolves the profile **once, at the start of a task**, in this order:

1. **The team's own profile.** A file at `.xstack/profile.md` in the project the team is working in. Other profile files (standards, design tokens, service patterns) sit next to it in `.xstack/`.
2. **A bundled profile named by the team.** A line in the project's `CLAUDE.md` or `AGENTS.md` such as `xstack profile: barbados`, which points to `profiles/barbados/` in this plugin.
3. **A profile named in the conversation.** For example "we're working to the Barbados standards".
4. **No profile.** Use the baseline, and say so once at the top of the output: "No country profile found, so this uses the xstack baseline. Run `/xstack:profile` to set one up."

When a profile is found, the agent reads `profile.md` first. It then reads the other files it lists only when the task needs them. For example, a standards assessment reads the service standard, and a prototype build reads the design system section.

Where the profile says nothing about something, agents fall back to the baseline. A profile never has to be complete to be useful.

---

## What a profile contains

`profile.md` is the only required file. It has these sections. Leave out any you don't know yet.

| Section | What goes in it | Who uses it most |
|---|---|---|
| **Government and context** | Country, languages people use, connectivity and device realities, who the digital team is | All agents |
| **Terms** | What departments are called (for example "ministry", "MDA", "agency"), who owns shared platforms, local names for common things | All agents |
| **Service standard** | The name of your standard, a link to it and a table mapping each of your standards to the xstack baseline themes | Delivery manager, assessment skills |
| **Design system** | Where your design system lives, its CSS or package name, the page chrome every service must have, and pointers to any token or pattern files | Content designer, developer, prototype skills |
| **Shared platforms** | Identity, payments, notifications, registers and lookups, with what each is called and how to integrate | Developer, cyber engineer |
| **Data formats** | National ID numbers, addresses and regions, postcodes, phone numbers, currency and dates | Content designer, developer |
| **Law and policy** | Data protection law, accessibility law, open-source or cloud policy | Cyber engineer, delivery manager |
| **Research context** | Where population data comes from, recruitment channels, community groups, languages for research | Service designer, synthetic research |
| **Related skills** | Any other Claude skills your organisation has for its own house style | All agents |

Start from `profiles/_template/profile.md`.

---

## Creating a profile

Run `/xstack:profile`. The command asks the team about their government, standard, design system and platforms, then writes `.xstack/profile.md` in the project.

To share a profile with other teams in the same government, contribute it to this repository under `profiles/<country>/`. See `CONTRIBUTING.md`.

---

## Bundled profiles

| Profile | Folder | Notes |
|---|---|---|
| Barbados | `profiles/barbados/` | The first complete profile. It was built by GovTech Barbados, where xstack started as "bimstack". It includes the Barbados Digital Service Standards, the GOV.BB design system tokens and guide, and the alpha.gov.bb service patterns. The worked examples in `examples/` use it. |
