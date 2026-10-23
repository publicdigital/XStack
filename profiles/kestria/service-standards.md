# Kestria Digital Service Standard

**Fictional.** The 12 points every new public-facing digital service in the Republic of Kestria must meet. They have been mandatory since 2026 under the Digital Government Act 2023, s.18. Kestria Digital Service (KDS) assesses services against them at the end of alpha, beta and before going live.

Part of the Kestria profile. When a project uses this profile, xstack agents use these points as the canonical checklist and cite them by number, for example "Point 5 (Don't ask for what government already knows)". Each point maps to themes in `references/service-standard-baseline.md` (see `profile.md`).

The standard is written to differ from the GOV.UK and Barbados standards in useful ways:
- a whole point on once-only (Point 5)
- a point on working over any network (Point 11)
- no point on being findable – the baseline fills that gap

That makes it a good demonstration of how xstack maps any standard onto its baseline.

| # | Point | One line | Owns it most |
|---|---|---|---|
| 1 | Start with the people who use the service | Research with the people who will use it, in their language and their place, from day one. | Service designer |
| 2 | Solve the whole problem, across every channel | Online, USSD, CSC counter and phone are one service, not four. | Service designer |
| 3 | Make it work for everyone, in their language | Language, literacy, disability, shared phones, no ID, no account. | Content & interaction designer |
| 4 | Keep it simple and in plain words | Plain Kestrian and plain English. One thing per page. Works the first time. | Content & interaction designer |
| 5 | Don't ask for what government already knows | Use KestriaID and KesLink. Show it, ask people to confirm it, let them correct it. | Service designer + developer |
| 6 | Protect people's data and earn their trust | Collect less, explain why, secure it, and show people who used it. | Cyber engineer |
| 7 | Build on the national platforms | KestriaID, GovPay, KesPay, KesLink and GovNotify before anything bespoke. Open source by default. | Developer |
| 8 | Build it with a multidisciplinary team | Every discipline, front-line staff, and a senior decision-maker who turns up. | Delivery manager |
| 9 | Work in the open | Show the thing, publish the code, write it down. | Delivery manager |
| 10 | Measure what matters and publish it | Completion, cost, satisfaction and inclusion, published on the GovKestria performance pages. | Delivery manager + developer |
| 11 | Keep it running, on any network | Light pages, slow-network-first, offline and assisted fallbacks, a plan for when a platform is down. | Developer |
| 12 | Keep improving it for as long as it runs | Funded, staffed and changing after go-live. | Service designer + delivery manager |

---

## 1. Start with the people who use the service

**What it means.** Understand who will use the service and what they're trying to do before deciding what to build. Do research where people actually are – CSC queues, villages, markets, fishing cooperatives – and in the language they're most comfortable in.

**How an agent checks.**

- Have at least five users been researched before any building started, including people outside the Capital Region?
- Is there a problem statement that names the user need, not the technology?
- Has research been done in Kestrian, and in Vell or Sora where the service's users speak them?
- Have prototypes been tested with real users, not only with staff?

---

## 2. Solve the whole problem, across every channel

**What it means.** A citizen's problem rarely stops at one agency or one channel. Map the whole journey, including the paper, counter and phone steps, and the other agencies involved. Online, USSD, CSC and phone must give the same answer and share the same record.

**How an agent checks.**

- Is there a journey map covering every channel, including the assisted route through a CSC?
- Does a CSC officer see the same application status the citizen sees online?
- Have the other agencies in the journey been identified and talked to?
- Can a citizen start in one channel and finish in another?

---

## 3. Make it work for everyone, in their language

**What it means.** The service works for people:
- with low literacy
- who don't read English
- with disabilities
- who share a phone or have none
- with no KestriaID
- with no bank account

It meets WCAG 2.2 AA (Accessibility Regulations 2024) and the language requirements of the Digital Government Act 2023, s.14.

**How an agent checks.**

- Does the service work in Kestrian and English? Does it offer Vell or Sora where its users need them?
- Has it been tested with disabled people and with people with low literacy?
- Is there a route for people with no KUIN (National Identity Act 2020, s.19)?
- Can someone get paid without a bank account, for example to a mobile money wallet or as cash at an agent?
- Can someone use a shared phone without exposing their data to whoever else uses it?
- Has it had an accessibility audit against WCAG 2.2 AA?

---

## 4. Keep it simple and in plain words

**What it means.** Write the way people speak. One thing per page. Most people should be able to finish without help, the first time.

**How an agent checks.**

- Has the content been through a plain-language review in each language, not only in English?
- Are translations done by people, and tested with speakers, rather than machine translated and left?
- Does each page ask one thing?
- Does every error message say what went wrong and what to do?
- What share of people complete the service without help or a CSC visit? Is that measured?

---

## 5. Don't ask for what government already knows

**What it means.** The once-only principle, from the Digital Government Act 2023, s.9:
- sign people in with KestriaID
- get facts from the register that holds them through KesLink, with consent where consent is the lawful basis
- show people what came back, with where it came from
- ask them to confirm it
- let them correct it without getting stuck

Ask only what only the citizen knows.

**How an agent checks.**

- Is there a question map sorting every question into known, derived and ask (see `references/dpi-baseline.md`)?
- Is every "known" fact pulled rather than asked, and shown for confirmation rather than prefilled silently?
- Is there a data-sharing agreement, or a plan for one, with each register the service pulls from?
- Can the citizen correct a wrong fact and carry on? Does the register find out?
- Has the service tested the unhappy paths: out-of-date data, no record, a partial result, and – for pulls that rely on consent – consent refused?

---

## 6. Protect people's data and earn their trust

**What it means.** Collect the least data you need. Explain plainly why you need it and where it goes. Secure it. Record every consent in MyData Kestria, so people can see who used their data. Follow the Data Protection Act 2022.

**How an agent checks.**

- Is there a threat model and a data inventory?
- Is there a DPIA for any sensitive data (s.15), and for any new KesLink pull?
- Is the privacy notice in plain language, in every language the service offers?
- Is every consent-based pull recorded in the consent registry?
- Is there an incident runbook that meets the 72-hour breach notification rule (s.31)?
- Do the security controls work for disabled users and people on shared phones?

---

## 7. Build on the national platforms

**What it means.** Use the shared platforms where they exist (Digital Government Act 2023, s.21):
- KestriaID for sign-in
- GovPay Kestria for fees
- the Treasury disbursement service on KesPay for payouts
- KesLink for data
- GovNotify for messages

Choose open-source tools and open standards. Host personal data in Kestria.

**How an agent checks.**

- Does the service use KestriaID rather than its own accounts and passwords?
- Does it take fees through GovPay Kestria, and make payouts through KesPay, rather than integrating directly with a bank or wallet?
- Does it use KesLink rather than bilateral database connections?
- Is there an architecture decision record for every bespoke component, saying why the shared platform wasn't enough?
- Is personal data hosted in-country?

---

## 8. Build it with a multidisciplinary team

**What it means.** A team with every discipline the service needs:
- product
- research
- service, content and interaction design
- development
- delivery
- security
- people who work on the front line, such as CSC officers or district staff

It also needs a senior decision-maker from the owning agency who comes to show-and-tells.

**How an agent checks.**

- Are the roles filled, or openly covered by someone (or an xstack agent) with a plan to build the skill in the team?
- Is a front-line representative part of the team?
- Does a senior decision-maker attend show-and-tells, not only assessments?

---

## 9. Work in the open

**What it means.** Show the work regularly, publish the code, and write down decisions.

**How an agent checks.**

- Is there a show-and-tell every sprint and a weeknote every week?
- Is the source code in a public repository, unless there's a recorded reason not to publish it?
- Are architecture decisions written down?

---

## 10. Measure what matters and publish it

**What it means.** Decide what success looks like before going live. Measure at least:
- completion rate
- cost per transaction
- user satisfaction
- digital take-up

Also measure **inclusion**: who is completing the service, by region, language and channel. Publish these on the GovKestria performance pages.

**How an agent checks.**

- Are the measures defined, with a baseline from the current service?
- Can the service report completion by region, language and channel?
- Is there a plan to publish performance data?

---

## 11. Keep it running, on any network

**What it means.** Build for a low-cost phone on a 2G or 3G connection and prepaid data. Keep pages light. Make the service work, or fail gracefully, when KestriaID, KesLink or GovPay is slow or down, and when the citizen's connection drops halfway through. Have assisted and offline fallbacks. Fund and staff it for the long term.

**How an agent checks.**

- What's the page weight? Has the service been tested on a throttled connection?
- Can someone pick up where they left off after losing their connection?
- What does the citizen see when a shared platform is down? Is there an agreed fallback?
- Is there a USSD, SMS or assisted route for the core task?
- Is the service funded and staffed after go-live? Are restores tested?

---

## 12. Keep improving it for as long as it runs

**What it means.** Live is not maintenance mode. Keep researching, keep measuring and keep changing the service. Listen to CSC officers – they see every failure the online service creates.

**How an agent checks.**

- Is there a plan for user research after go-live?
- Is there a regular route for feedback from CSC officers and front-line staff into the backlog?
- Has the service changed since it went live, because of what the team learned?
