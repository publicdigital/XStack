---
name: help
description: Show someone new to xstack how to use it – open the staircase, the interactive map of every step from first conversation to a live service, then find out where they are and tell them the one thing to run next. Use when someone has just installed xstack, asks what it does, or doesn't know which skill or command to use. Triggers on "/xstack:help", "help with xstack", "how do I use xstack", "what can xstack do", "where do I start", "I'm new to xstack", "what should I run", "show me the staircase", "which skill do I use".
---

# Help

This skill gets someone new to xstack to their first useful step. It does three things, in this order:

1. Shows the staircase
2. Finds out where they are
3. Tells them the one thing to run next

Keep it short. A new person wants to start, not to read a manual. Don't list every skill in chat – the staircase does that.

---

## 1. Show the staircase

The staircase is one interactive page: `assets/staircase.html`, in this skill's folder. It shows the five steps a team climbs – Setup, Discovery, Alpha, Beta, Live – with the main thing to run on each step and the skills that support it. Tapping any skill shows what comes before it and what it leads to.

Show the page as it is. Don't rewrite it, restyle it or redraw it as a diagram.

- **If you can publish or preview a page** (an artifact, a preview pane or a browser), show it there.
- **If you can only write files**, copy it to the project folder as `xstack-staircase.html` and give the person the link. In a terminal, offer to open it for them.
- **If you can't show a page at all**, use the short version below.

Then say, in two or three sentences, how to read it: start at the bottom left and climb. The dark button on each step is the thing you run to move up. Everything around it helps you do that well.

### The short version

Use this only when you can't show the page.

| Step | What you do | Run |
|---|---|---|
| 0 Setup | Tell xstack which government you work for. You do this once | `/xstack:profile` |
| 1 Discovery | Talk to people. Understand how things work today | `/xstack:discover` |
| 2 Alpha | Try several ideas, test them with people, improve them | `/xstack:build`, then `/xstack:iterate` |
| 3 Beta | Build the real thing and keep people's information safe | `/xstack:productionise`, `/xstack:threat-model` |
| 4 Live | Keep listening, and go round again | back to `/xstack:discover` |

Every week, at every step: `/xstack:weeknote`, `/xstack:show`, `/xstack:plain-language`. Before every step up: `/xstack:assess`.

---

## 2. Find out where they are

First, look for yourself:

- Is there a country profile – `.xstack/profile.md` in the project, or a line like `xstack profile: <name>` in the project's `CLAUDE.md`?
- Are there prototypes, a form spec, a discovery report or research notes in the project?

Then ask one question, using the AskUserQuestion tool if you have it. Leave out any answer you have already ruled out.

**Where are you with your service?**

- We're just starting
- We have a paper or PDF form
- We have a brief or a discovery report
- We have a prototype and feedback from testing
- We're ready to build the real thing
- I'm just looking around

If they have already told you what they want to do, don't ask. Go to step 3.

---

## 3. Tell them the one thing to run next

Give one next step, not a menu. Say what to type, what to give it, and what comes out.

| Where they are | Next step | What comes out |
|---|---|---|
| No profile yet | `/xstack:profile` | A country profile, so xstack uses their government's standard, design system and shared platforms. They can skip this – xstack falls back to its baseline and says so |
| Just starting | `/xstack:discover` | A problem statement, stakeholder map, research plan and interview guide |
| Has a paper or PDF form | `/xstack:form-to-spec` | A form spec that keeps every item, ready to use as the brief for `/xstack:build` |
| Has a brief or discovery report | `/xstack:build` | Several clickable prototypes to test, with their assumptions listed |
| Has a prototype and feedback | `/xstack:iterate` | The next version, with a note of what changed and why |
| Ready to build the real thing | `/xstack:productionise` | A production-ready front end with tests |
| Just looking around | Nothing yet | Point them to the staircase and to `GETTING-STARTED.md` |

If there is no profile and they want to start work, mention the profile once and let them choose. Don't block them.

If they are stuck on research, send them to the `xstack:research-coach` skill. It works out where they are in the research cycle. If they don't know which specialist to ask, send them to the delivery manager, who routes.

### Use the name that works where they are

The staircase shows command names such as `/xstack:build`. These work in Claude Code. In the Claude app and Cowork, the `/` menu runs skills, so give the skill name instead, or tell them to ask in plain words.

| Command (Claude Code) | Skill (Claude app and Cowork) |
|---|---|
| `/xstack:discover` | `/discovery-kit` |
| `/xstack:form-to-spec` | `/form-to-spec` |
| `/xstack:build` | `/brief-to-prototypes` |
| `/xstack:iterate` | `/prototype-iteration` |
| `/xstack:productionise` | `/build-for-production` |
| `/xstack:review` | `/service-design-review` |
| `/xstack:assess` | `/service-standard-assessment` |
| `/xstack:plain-language` | `/plain-language-check` |
| `/xstack:show` | `/show-the-thing` |
| `/xstack:weeknote` | `/weeknote` |
| `/xstack:design-system` | `/government-design-systems` |
| `/xstack:dpi` | `/government-dpi` |
| `/xstack:profile` | No skill – ask "Using xstack, set up our country profile" |
| `/xstack:threat-model` | No skill – ask the cyber engineer for a threat model |

If a `/` name fails with "Unknown command", tell them to ask in plain words instead, starting with "Using xstack, …". Claude picks the right skill.

---

## Where to read more

Offer these only if the person asks for more:

- `GETTING-STARTED.md` – the quick start, about five minutes
- `MANUAL.md` – the full onboarding guide, with a worked example
- `PLAYBOOK.md` – what a team does week by week, phase by phase
- `AGENTS.md` – the five specialists and when to ask each one

---

## What good looks like

- The person has seen the staircase, or the short version
- They know which step they are on
- They have one thing to type next, in a name that works where they are
- The whole reply fits on one screen

---

## Keeping the staircase true

The staircase is only useful if it matches what xstack has. When you add, rename or remove a skill or command, update `assets/staircase.html` in the same change:

- `N` holds one entry per skill, command and file, with its plain-language description
- `E` holds the links – what comes before and after each one
- `STEPS` places each entry on a step

The page is a single file with no build step. It follows the reader's light or dark setting.
