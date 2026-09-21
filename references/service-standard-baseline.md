# The xstack service standard baseline

Most governments that build digital services have written a service standard. The GOV.UK Service Standard, the Barbados Digital Service Standards and standards from Australia, Canada, New Zealand, India and elsewhere all say much the same thing in different words and a different order. This file is that common ground, written as **14 themes**.

Every xstack agent and skill reasons in these themes. Themes have names, not numbers, because a number means something different in every country.

- **If your team has a country profile**, the profile maps your own standard onto these themes. Agents cite *your* standard, by *your* numbering, in everything they write. See `profiles/README.md`.
- **If your team has no profile**, agents assess against these themes directly and cite them by name, for example "Inclusion: the service must work for people with no internet at home".

---

## The 14 themes

| Theme | In one line | Owns it most |
|---|---|---|
| **User needs** | Research with real users from day one, and keep doing it. | Service designer |
| **Whole problem** | Solve the user's whole problem, joined up across departments and channels, online and offline. | Service designer |
| **Inclusion** | Everyone can use it, whatever their literacy, language, disability, device, connection or income. | Content & interaction designer |
| **Plain language** | Familiar words, short sentences, the user's own language. | Content & interaction designer |
| **Works first time** | Simple enough to complete end to end, first time, without help. | Service designer + developer |
| **Multidisciplinary team** | A team with the skills it needs, working in an agile way, with decision-makers in reach. | Delivery manager |
| **Continuous improvement** | Listen, learn, iterate. Live is not the end. | Service designer + delivery manager |
| **Trust, security and privacy** | Secure by design, collect less, and convincingly government. | Cyber engineer |
| **Measuring performance** | Define what good looks like, measure it and publish it. | Delivery manager + developer |
| **Right technology** | Choose tools the team can sustain, and avoid lock-in. | Developer |
| **Open platforms and standards** | Reuse shared platforms and components before building new ones. | Developer |
| **Working in the open** | Show the thing, publish source code and share what you learn. | Delivery manager |
| **Sustainable and reliable** | Funded, staffed and operated reliably for as long as people need it. | Delivery manager |
| **Findable** | People can find the service from where they already look. | Content & interaction designer |

---

## User needs

**What it means.** Speak with, observe and understand the people who will use the service, before and while building it. Observe them in real conditions, not lab conditions.

**Why it matters.** A service that doesn't meet a real need won't be used, and the money is wasted.

**How an agent checks.**

- Have at least five users been interviewed before any building started?
- Is there a written problem statement that names the user need, not the technology?
- Is there evidence of testing prototypes with potential users?
- Has the team checked which groups can't use the service today, and why?
- Is the service changing based on continuous user feedback?

## Whole problem

**What it means.** Users experience a goal, not an organisation chart. Design around what they are trying to do, across every department involved and every channel they use: online, phone, paper, counter, and help from a friend or intermediary.

**Why it matters.** A perfect online form that hands people to a broken paper process still fails.

**How an agent checks.**

- Does the team know what happens before and after the part of the journey they own?
- Have the other departments or agencies involved been mapped and spoken to?
- Do offline and assisted channels give the same outcome as the online one?
- Does the service avoid asking for information the government already holds?

## Inclusion

**What it means.** Everyone can use the service, whatever their literacy, digital skills, language, geography, age, disability, device or income. It works on low-cost phones and slow connections. There is a route for people who can't or won't go online.

**Why it matters.** Government serves everyone or it serves no one. In many countries, the people who most need a service are the least likely to have a laptop and fast internet.

**How an agent checks.**

- Does it meet WCAG 2.2 AA (or the accessibility level your law requires)?
- Has it been tested with disabled people and people with low digital skills?
- Does it work on a small, low-cost phone over a slow, intermittent connection?
- Is there an assisted-digital or offline route, and is it signposted?
- Is it available in the languages your users actually speak?

## Plain language

**What it means.** Use the words your users use. Short sentences, active voice, "you" for the user and "we" for the government. Write in the language people are most comfortable in, not the language of the civil service.

**Why it matters.** Official register tells some people *this isn't for you*. Plain language is what makes a service usable by people with low literacy, people reading in a second language and people under stress.

**How an agent checks.**

- Is the reading age low enough for the whole population (aim for age 9)?
- Are sentences mostly under 20 words, in active voice?
- Have jargon and legal terms been replaced or explained?
- Has the copy been tested with users, including people reading in a second language?

## Works first time

**What it means.** The service is simple and intuitive enough that people complete it end to end, first time, without calling for help.

**Why it matters.** Every failed attempt costs the user time and the government a phone call, a visit or a paper form.

**How an agent checks.**

- What is the completion rate in testing, and where do people drop out?
- Does each page ask one thing?
- Do error messages say what went wrong and how to fix it?
- Can people check their answers before they send them?
- Does the confirmation tell them what happens next and when?

## Multidisciplinary team

**What it means.** A team with research, design, content, technology, delivery and security skills, plus people from the front line of the service, working in short agile cycles, with senior decision-makers in reach.

**Why it matters.** Single-discipline teams build single-discipline services. Where a discipline can't be hired, xstack's agents stand in for it, but the gap is still named and managed.

**How an agent checks.**

- Is there a named person (or an xstack agent, openly stated) for each discipline?
- Are front-line staff and subject-matter experts from the owning department involved?
- Are senior decision-makers reachable inside the sprint, not just at gate reviews?
- If a supplier is delivering, does the government team check in at least every two weeks?

## Continuous improvement

**What it means.** The service is never finished. The team keeps researching, measuring and releasing small improvements for as long as the service runs.

**Why it matters.** Needs, policy and technology change. A service that stops improving starts decaying.

**How an agent checks.**

- Can the team release a change in days, not months?
- Is user research still happening after launch?
- Is there a budget and a team for the service after it goes live?

## Trust, security and privacy

**What it means.** Secure by design. Collect only the data you need, protect it, and be honest about what you do with it. The service is convincingly government, so people can tell it from a scam.

**Why it matters.** One breach or one convincing fake can destroy trust in every digital service the government runs.

**How an agent checks.**

- Is there a threat model and a data inventory?
- Does the service meet your data protection law, with a privacy notice in plain language?
- Has it been security tested, with findings fixed before launch?
- Is there an incident plan, and has it been rehearsed?
- Is it on an official government domain with the official identity?

## Measuring performance

**What it means.** Decide what success looks like, measure it from day one and publish it.

**Why it matters.** Without data, the team can't tell whether the service is working or where to improve it.

**How an agent checks.**

- Are these tracked: digital take-up, completion rate, cost per transaction and user satisfaction?
- Is performance data published openly?
- Is it reviewed regularly and used to prioritise work?
- Is qualitative feedback (support contacts, complaints, research) used alongside the numbers?

## Right technology

**What it means.** Choose technology the team can build, run and change, at a cost the government can sustain. Avoid lock-in to one supplier.

**Why it matters.** The wrong technology choice outlives the team that made it.

**How an agent checks.**

- Can the team explain why each major technology was chosen?
- Could another supplier or an in-house team take the service over?
- Does the technology work in the conditions users are in (low bandwidth, older devices)?

## Open platforms and standards

**What it means.** Reuse shared government platforms and components (identity, payments, notifications, registers, the design system) before building new ones. Use open standards so services can talk to each other.

**Why it matters.** Every service that builds its own login, payments or design is a service that costs more and works worse.

**How an agent checks.**

- Has the team checked which shared platforms already exist?
- Does the service use the government design system, if there is one?
- Are data and APIs based on open standards?

## Working in the open

**What it means.** Show the thing every sprint. Publish source code unless there is a specific reason not to. Share what the team learns.

**Why it matters.** Openness builds trust, lets other teams reuse work and keeps the team honest.

**How an agent checks.**

- Is the code in a public repository, or is there a recorded reason why not?
- Does the team publish weeknotes or hold open show-and-tells?
- Are decisions recorded where others can find them?

## Sustainable and reliable

**What it means.** The service has a long-term owner, budget and team. It is monitored, backed up and supported, and it stays up when people need it.

**Why it matters.** A service that falls over, or loses its funding after launch, fails the people who came to depend on it.

**How an agent checks.**

- Is there a named service owner and funding beyond the build?
- Is there monitoring, alerting and an on-call or support arrangement?
- Have backups been restored in a test, not just taken?
- Is there a plan for when the service is unavailable?

## Findable

**What it means.** People can find the service from where they already look: search engines, the government website, social media, front-line staff and community organisations. Name it with a verb, for example "Renew your driving licence".

**Why it matters.** A service nobody can find doesn't exist.

**How an agent checks.**

- Is the service named for what users want to do, not the department that runs it?
- Does it show up in search for the words users actually use?
- Is it signposted from the main government website and from offline channels?

---

## How other standards map onto the themes

A country profile holds the full mapping for its own standard. Two worked mappings are shown here.

### GOV.UK Service Standard (14 points)

| GOV.UK point | Theme |
|---|---|
| 1 Understand users and their needs | User needs |
| 2 Solve a whole problem for users | Whole problem |
| 3 Provide a joined-up experience across all channels | Whole problem |
| 4 Make the service simple to use | Works first time |
| 5 Make sure everyone can use the service | Inclusion |
| 6 Have a multidisciplinary team | Multidisciplinary team |
| 7 Use agile ways of working | Multidisciplinary team |
| 8 Iterate and improve frequently | Continuous improvement |
| 9 Create a secure service which protects users' privacy | Trust, security and privacy |
| 10 Define what success looks like and publish performance data | Measuring performance |
| 11 Choose the right tools and technology | Right technology |
| 12 Make new source code open | Working in the open |
| 13 Use and contribute to open standards, common components and patterns | Open platforms and standards |
| 14 Operate a reliable service | Sustainable and reliable |

GOV.UK has no separate point for plain language or findability. They are covered in the GOV.UK Service Manual.

### Barbados Digital Service Standards (13 standards)

See `profiles/barbados/profile.md`.

---

## Using this reference

Before assessing work, an agent works out which standard applies (see `profiles/README.md`). It then cites that standard in its outputs:

- With a profile: "Barbados Standard 4 (Use simple and relatable language)".
- Without a profile: "Plain language (xstack baseline)".

When in doubt, the agent asks: *could someone with limited literacy, on a low-cost phone, on a slow connection, with no help, complete this service?* If the answer is no, at least one theme is failing.
