# Test plan – Household Support Grant prototypes

> **Fictional country.** Kestria doesn't exist, so nobody can actually run this plan. It's written as a real team would write it, so the demo shows what `/xstack:build` hands to a researcher. Recruitment channels and figures come from `profiles/kestria/world.md`.

## What we want to learn

1. **Once-only (Prototype 1):**
   - Do people trust facts pulled from the registry?
   - Do they notice and correct an out-of-date household or address?
   - Does seeing the outcome before applying help, or does it worry people?
2. **Assisted (Prototype 2):**
   - Does fingerprint sign-in at a CSC feel safe and understood?
   - Can the officer read the notices and the declaration aloud so people understand them, in the citizen's language?
   - Does "prepare and refer" by a village champion save a wasted trip?
3. **Household-first (Prototype 3):**
   - Do people think of this as "telling SPA what's changed" rather than "applying"?
   - Will the person who looks after the money name themselves as the person to pay, on a shared phone?
4. **Across all three:**
   - Does "We will never ask for your PIN" register?
   - What do people expect to happen next, and when?
   - Does anyone get stuck with no route forward?

## Who to recruit

Five participants per prototype is the minimum, so 15 in total. Spread them across:

| Group | How many | Where to find them |
|---|---|---|
| In the registry, own a smartphone, working KestriaID phone | 4 | Women's savings groups, CSC queues (Capital Region, Highlands) |
| Shared phone, or basic phone only | 4 | Village digital champions, mobile money agents (Lake Region) |
| No KestriaID, or phone on record no longer works | 3 | District offices, pastoralist associations (Northern Plains) |
| Household changed since the last survey (new baby, death, someone moved) | 2 | Health facilities, church and mosque groups |
| Low literacy, or Vell or Sora as first language | 2 or more (overlapping the groups above) | Pastoralist associations, fishing cooperatives, with interpreters |

Also run sessions with **3 CSC officers and 2 village digital champions** for Prototype 2. They're users too.

## How

- **Sessions:** 45 minutes, in person, where people already are: a CSC, a district office, a savings group meeting. Use the participant's own phone where they're willing, otherwise a low-cost Android phone on a throttled 3G connection.
- **Language:** Kestrian by default. Interpreters for Vell and Sora. The prototypes are English only (`[KNOWN GAP]`), so the interpreter reads screens aloud. Note where that breaks.
- **Incentive:** K 300 of airtime, in line with the profile's research context. `[VERIFY WITH DEPARTMENT]`
- **Recording:** notes and screen recording only, with consent. No audio of children or of other household members.

## Scenarios

On the simulated KestriaID screen, the researcher picks the test person.

| Scenario | Test person | Prototypes | What good looks like |
|---|---|---|---|
| Everything found and correct | Mirel Okand | 1, 2, 3 | Reads the household and confirms it, rather than tapping straight past |
| Address or household out of date | Talin Vorsa | 1, 2, 3 | Notices the wrong district and corrects it without getting stuck |
| No record in the registry | Sefa Tormik | 1, 2, 3 | Understands a survey visit is the normal next step, not a rejection |
| Mobile money only, payout to the wallet | Ines Kestel | 1, 3 | Recognises the wallet (provider and last 4 digits). Knows changing it means a CSC visit. |
| Older person helped by family | Anaïs Vorlek | 2, 3 | Whoever is helping is clearly "acting for" her and can't change where the money goes |
| Can't sign in (old phone number) | Aru Danvell | 1, 3 | Finds the route without KestriaID or the CSC route and knows what to bring |
| Says no to sharing data | Anyone – choose "No" on the KesLink screen | 1, 3 | Can carry on, and understands SPA may still need to visit |
| No KestriaID at all | Choose "No" on "Do you have a KestriaID?" | 1, 2, 3 | Is never told they can't apply |

## Signal to watch for

- **Good:** people finish without help, and can say in their own words what happens next and when.
- **Bad:** hesitation or a wrong guess about what happens next, any wording read as "you've been approved", or worry about who will see their answers on a shared phone.
- **Stop and fix before the next session:** anyone who thinks they've been rejected when they've been routed to a survey visit.

## Afterwards

Write the findings up with `xstack:transcript-analysis`, then run `/xstack:iterate` on each prototype with the feedback.
