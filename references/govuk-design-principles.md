# GOV.UK Design Principles

The ten design principles that underpin everything the UK Government Digital Service does. Published at <https://www.gov.uk/guidance/government-design-principles>. xstack adopts them wholesale, alongside your government's service standard (named in the country profile – see `profiles/README.md`) or, without one, the xstack baseline themes in `references/service-standard-baseline.md`.

These are the *how* (philosophy and method) to the service standard's *what* (the assessment criteria).

1. **Start with user needs**
2. **Do less**
3. **Design with data**
4. **Do the hard work to make it simple**
5. **Iterate. Then iterate again**
6. **This is for everyone**
7. **Understand context**
8. **Build digital services, not websites**
9. **Be consistent, not uniform**
10. **Make things open: it makes things better**

---

## 1. Start with user needs

Service design starts with identifying user needs. If you don't know what the user needs are, you won't build the right thing. Do research, analyse data, talk to users. Don't make assumptions. Have empathy for users, and remember that what they ask for isn't always what they need.

**In an xstack sprint:** every agent asks "what user need does this serve?" before doing anything else. If it can't be named, the work pauses.

## 2. Do less

Government should only do what only government can do. If we've found a way of doing something that works, we should make it reusable and shareable instead of reinventing the wheel every time. This means building platforms and registers others can build upon, providing better linking to information, and only building new things when there is a clear user need.

**In an xstack sprint:** before any new build, the developer agent checks whether the digital team or another department has already built it, whether a shared platform in the profile covers it, or whether a common component does.

## 3. Design with data

In most cases, we can learn from real-world behaviour by looking at how existing services are used. Let data drive decision-making, not hunches or guesswork. Keep doing that after taking something live, prototyping and iterating based on feedback. Analytics should be built in, always on, and easy to read.

**In an xstack sprint:** the delivery manager agent makes sure analytics are wired up before launch, and reviews them in every show-and-tell.

## 4. Do the hard work to make it simple

Making something look simple is easy; making something simple to use is hard – especially when the underlying systems are complex – but that's what we should be doing. Don't take "It's just the way it works" as an answer.

**In an xstack sprint:** the content & interaction designer agent rewrites every sentence until a 9-year-old can read it. The service designer agent unpicks back-office complexity instead of pushing it onto the citizen.

## 5. Iterate. Then iterate again

The best way to build effective services is to start small and iterate wildly. Release minimum viable products early, test them with actual users, move from alpha to beta to live adding features, deleting things that don't work and making refinements based on feedback. Iteration reduces risk. It makes big failures unlikely and turns small failures into lessons.

**In an xstack sprint:** the delivery manager agent holds the team to small releases and refuses big-bang launches. Every sprint produces something a real user can interact with.

## 6. This is for everyone

Accessible design is good design. Everything we build should be as inclusive, legible and readable as possible. If we have to sacrifice elegance – so be it. We're building for needs, not audiences. We're designing for the whole country, not just the people who are used to using the web.

**In an xstack sprint:** the content & interaction designer agent runs the accessibility-review skill on every prototype. The cyber engineer agent makes sure security controls don't lock disabled users out.

## 7. Understand context

We're not designing for a screen, we're designing for people. We need to think hard about the context in which they're using our services. Are they in a library? Are they on a phone? Are they only really familiar with Facebook? Have they never used the web before?

**In an xstack sprint:** the service designer agent insists on real-world research – on the bus, in the local government office, with a citizen's actual phone, on actual mobile data.

## 8. Build digital services, not websites

A service is something that helps people to do something. Our job is to uncover user needs and build the service that meets those needs. Of course much of that will be pages on the web, but we're not here to build websites. The digital service must join up with offline channels into one seamless experience.

**In an xstack sprint:** the service designer agent maps the whole service – on and offline, frontstage and backstage – before any page is designed.

## 9. Be consistent, not uniform

We will use the same language and the same design patterns wherever possible. This helps people get familiar with our services. But if this isn't possible we should make sure our approach is consistent. This isn't a straitjacket or a rulebook. Every circumstance is different. When we find patterns that work we should share them and talk about why we use them.

**In an xstack sprint:** every agent uses the components of the design system named in the profile and the profile's house style – or, without a profile, the xstack neutral style and `references/house-style.md`. Departures are documented and contributed back.

## 10. Make things open: it makes things better

We should share what we're doing whenever we can. With colleagues, with users, with the world. Share code, share designs, share ideas, share intentions, share failures. The more eyes there are on a service the better it gets – errors are spotted, better alternatives are pointed out, the bar is raised.

**In an xstack sprint:** every agent defaults to writing in the open. Weeknotes are public. Source code goes to GitHub. Decisions are documented for the next team.

---

## How xstack uses these principles

The service standard tells you *what* to assess against. The GOV.UK Design Principles tell you *how* to think about the work. The table maps the xstack baseline themes onto the principles; the country profile maps its own standard onto the themes, so you can go from any standard to the principles through it.

| Baseline theme | GOV.UK principles it draws on |
|---|---|
| User needs | 1 Start with user needs, 3 Design with data, 7 Understand context |
| Whole problem | 7 Understand context, 8 Build services not websites |
| Multidisciplinary team | (Way of working – see GDS Way) |
| Inclusion | 6 This is for everyone, 7 Understand context |
| Plain language | 4 Do the hard work to make it simple, 6 This is for everyone |
| Works first time | 4 Do the hard work to make it simple, 5 Iterate, 7 Understand context |
| Right technology | 2 Do less, 9 Be consistent |
| Open platforms and standards | 2 Do less, 9 Be consistent, 10 Make things open |
| Sustainable and reliable | 8 Build services not websites, 5 Iterate |
| Working in the open | 10 Make things open |
| Continuous improvement | 5 Iterate, 3 Design with data |
| Trust, security and privacy | 6 This is for everyone, 8 Build services not websites |
| Findable | 1 Start with user needs, 7 Understand context, 8 Build services not websites |
| Measuring performance | 3 Design with data, 10 Make things open |

When an agent cites a principle in a critique, it should reference both the standard and the principle. Cite the profile's own standard by its number and title; without a profile, cite the baseline theme by name. For example: *"This breaks Standard 4 (Use simple and relatable language) and Principle 4 (do the hard work to make it simple)"*, or without a profile, *"This breaks Plain language and Principle 4 (do the hard work to make it simple)."*
