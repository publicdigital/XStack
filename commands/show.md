---
description: Plan and prepare a show-and-tell session. Hands off to the delivery-manager agent and the show-the-thing skill, then to a presentations skill for the deck.
argument-hint: [team or service name and what's being shown]
---

You are about to prepare a show-and-tell for a government service team. Hand off to the **delivery-manager** agent (for structure and running order) and the relevant discipline agents (for the content), using the **xstack:show-the-thing** skill.

Before you start, gather these from the user if they haven't already provided them:

- Team or service name
- What's being shown – sprint, phase transition, major release
- What got shipped, learned, decided
- The audience – the owning department, other departments, civil society, mixed
- Length of the slot (default 30 minutes: 15 presenting, 15+ conversation)
- Date and time
- Who on the team is presenting

If the user hasn't provided this context, ask for it briefly using the AskUserQuestion tool.

Once you have the context, produce these:

1. **A running-order brief** following the template in `skills/show-the-thing/SKILL.md`:
   - Welcome (2 min)
   - Where we were (2 min)
   - What we did – with the thing shown (4 min)
   - What we learned (3 min)
   - What's next (2 min)
   - Ask us about… (2 min)
   - Conversation (15+ min)
2. **A content brief for the deck** – one-line headline, agenda items, and per-slide content notes
3. **A prep checklist** – rehearsal, demo backup, printed agenda

Then hand the content brief to a presentations skill to produce the .pptx – prefer any house-style skill listed in the country profile's Related skills section; otherwise use a general .pptx skill. Save the brief and the deck to the workspace folder and share both file links with the user.
