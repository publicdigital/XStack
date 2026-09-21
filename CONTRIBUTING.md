# Contributing to xstack

xstack is built in the open, on purpose. Working in the open. We want issues, pull requests, forks, and weeknotes from teams who've shipped with it.

## Ways to contribute

- **File an issue.** Something an agent got wrong? A reference that's drifted? A pattern that's missing? File it.
- **Improve a reference.** The references in `references/` are the xstack view of the service standard themes, the Principles, the GDS Way, and the house style. If something is out of date, send a PR.
- **Improve an agent.** Each agent's prompt is in `agents/*.md`. Sharpen its iron laws. Add a deliverable. Fix a citation. PR it.
- **Add a skill.** If you've built a workflow your team uses every sprint, package it as a skill in `skills/`. PRs welcome.
- **Add a slash command.** If a skill is something a team will trigger directly, add a slash command in `commands/`.
- **Contribute a country profile.** If your government isn't bundled yet, add a profile so other teams can use it. See below.
- **Share a weeknote.** If you've shipped something with xstack, tell us about it. Open an issue with the link.

## The bar

Three things any contribution needs to clear.

1. **It's anchored to the service standard themes or the Principles.** A change should make it easier to meet the themes in `references/service-standard-baseline.md` or apply the GOV.UK Design Principles – or both. If it doesn't, it's harder to argue for.
2. **It's in plain language.** Reading age friendly to a 9-year-old. The word-swap list applies to the xstack itself, not just to the services it builds. See `references/house-style.md`.
3. **It's open.** Public PRs in the public repo. No secret patches.

## Style

- **British English.** Realise, colour, behaviour, organisation, centre.
- **N-dashes, not m-dashes.** *Listen → Map → Make* uses n-dashes.
- **No emojis** in xstack files, unless a user explicitly asks for them in a deliverable produced by an agent.
- **Active voice.** "We rewrote the eligibility page" not "the eligibility page has been rewritten".
- **First person plural** ("we") when the xstack itself is the subject.
- **Cite themes by name.** In core files, cite service standard themes by name, not number – numbers mean something different in every country. *"The Plain language theme."* Cite a GOV.UK Design Principle by its number. Agents cite a country's own standard by its own numbering, which comes from the profile.

## Structure

```
xstack/
├── README.md, ETHOS.md, AGENTS.md, WORKFLOW.md, CONTRIBUTING.md, CHANGELOG.md, LICENSE
├── .claude-plugin/plugin.json
├── agents/        one .md per agent, YAML frontmatter + body
├── commands/      one .md per slash command, frontmatter + body
├── skills/        one folder per skill, with SKILL.md
├── references/    one .md per reference, the canonical, country-agnostic xstack view
└── profiles/      one folder per country profile, plus _template/
```

When you add a new agent, add it to `AGENTS.md` and the README's roster. When you add a new skill, add it to `agents/*.md` where relevant. When you add a new slash command, add it to the README's command table.

## Contributing a country profile

A country profile holds everything specific to one government: its service standard, design system, shared platforms, terms, data formats, law and research context. See `profiles/README.md` for what each section is for.

1. Create `profiles/<country>/`, using a lower-case folder name.
2. Copy `profiles/_template/profile.md` into it and fill in what you know. Leave out sections you don't know yet – agents fall back to the baseline.
3. Map every standard in your service standard to one or more of the themes in `references/service-standard-baseline.md`.
4. Put longer material, such as the full text of your standard or design tokens, in separate files next to `profile.md`, and list them in its "Files in this profile" table. `profiles/barbados/` is a worked example.
5. Add your profile to the "Bundled profiles" table in `profiles/README.md`.

Don't guess facts about a government. Only include what you can point to.

**The rule:** core agents, skills, commands and references must stay country-agnostic. Anything specific to one country – a standard's numbering, a design system, a platform name, a data format, a local term – goes in that country's profile, never in the core files. If a core file needs a country example, label it clearly as one and keep it rare.

## Pull request checklist

- [ ] The change is anchored to a service standard theme or a Principle (named in the PR description)
- [ ] Plain language: word-swap list applied, sentences mostly under 20 words
- [ ] British English, n-dashes
- [ ] References stay consistent across the affected files
- [ ] Core files stay country-agnostic; country specifics are in `profiles/<country>/`
- [ ] If you've added an agent: README roster updated, AGENTS.md updated, plugin manifest updated
- [ ] If you've added a skill: SKILL.md frontmatter present, agents that should call it know about it
- [ ] If you've added a command: README command table updated, frontmatter present
- [ ] CHANGELOG.md updated under the next version

## What we won't accept

- **Vendor lock-in.** Patches that hard-code a specific commercial vendor where a shared platform exists. Open platforms and standards.
- **Closed dependencies.** New dependencies that aren't open source, without a written reason in the PR.
- **Bypassing the assessment skill.** "Don't worry about security and privacy for this one." No.
- **Stripping the service standard anchors out of an agent's prompt.** The agents are opinionated on purpose.
- **Country specifics in core files.** A platform name, a standard number or a design system hard-coded into an agent or skill. Put it in a profile.

## Governance

xstack is owned and maintained by Public Digital. It started as "bimstack" at GovTech Barbados. Decisions on substantive changes (new agents, removed agents, changed iron laws) are taken in the open via GitHub issues and discussed in show-and-tells.

If you're not sure whether a change is substantive, file the issue first. It's almost always faster than guessing.

## Licence

MIT. By contributing, you agree your contribution is MIT-licensed.

---

Thanks for thinking about how to make government digital services better. That's the whole point.
