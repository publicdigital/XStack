# Service sheet – Register a SIM card

**Fictional.** The rules of a Kestrian service, written down so xstack agents build from them rather than inventing them. A real team gets these from the department and from legislation. In Kestria, this file *is* the department.

- **Owner:** Kestria Communications Authority (KCA), with Kestria Digital Service (KDS)
- **Law:** Communications Act 2019, and the Communications (SIM Registration) Regulations 2024 ("the Regulations")
- **Paper form today:** none. Today people register at a network shop, where staff check their fingerprint against KestriaID.
- **Online at:** `gov.kestria.test/sim`

Use this sheet with `../dpi.md` (platforms, data catalogue, personas) and `../world.md` (places, networks, statistics).

**It isn't a licence.** People sometimes call SIM registration "getting a licence for my SIM". Nothing is granted: a registration links a SIM card to the person responsible for it. Services call it "register your SIM card".

## What it is

- **What it does:** links a SIM card's phone number to the KestriaID of the person responsible for it, in the **National SIM Register**. KCA tells the SIM's network the same day.
- **Cost:** free
- **Deadline:** every SIM card in use must be registered by **31 March 2027**. After that, the network switches off unregistered SIM cards: no calls, texts, data or mobile money. A switched-off SIM card can be registered for 6 months before its number is given to someone else (reg.9).
- **Size:** about 2.8m SIM cards in use are still not registered

## Who can register a SIM card

- **Anyone with a KUIN** can register SIM cards in their own name (reg.4).
- **Up to 5 SIM cards per person**, counting every network (reg.5). To register another, they must first remove one, at a network shop or by calling the GovKestria helpline.
- **Children under 16** can't register a SIM card, because they have no KUIN. A parent or guardian registers it in their own name, and is responsible for it (reg.6).
- **Someone else's SIM card:** an adult registers their own. Registering a SIM card in someone else's name without their agreement is an offence (Communications Act 2019, s.52).
- **No KUIN:** people without a KUIN register at a network shop, with a passport, a residence permit, or a birth certificate with a letter from their village committee (reg.7). The online service must tell them this (National Identity Act 2020, s.19).

## How it works online

1. **Sign in with KestriaID.** Level 1, a one-time code to the phone on their KestriaID record, is enough, because step 3 checks they have the SIM card (reg.8).
2. **Check what's registered to them.** The service shows the SIM cards already registered to their KUIN, from the National SIM Register. KCA holds the register under a legal obligation (Data Protection Act 2022, s.13), so this is a **notice, not consent**: say what we'll look up and why, then look it up.
3. **Check they have the SIM card.** They enter its phone number. KCA sends a 6-digit code to that number, and they type it in. This proves the SIM card is in a phone they have with them. The code lasts 10 minutes.
4. **Say who uses the SIM card:** them, or a child under 16 they're responsible for.
5. **Check and declare,** then register.

The network is never asked for: KCA's register knows which network a number is on.

### What the number check can find

| Result | What the citizen sees |
|---|---|
| Not registered | Carry on |
| Already registered to them | "This SIM card is already registered to you." No action needed. |
| Registered to someone else | "This SIM card is registered to someone else." **Never say who.** If it's theirs – a shared phone, a second-hand SIM card, a family member registered it – they go to a network shop with their KestriaID card. The shop can move the registration with the other person's agreement, or after a fingerprint check if the other person can't be reached. |
| They already have 5 | "You already have 5 SIM cards registered." Then how to remove one. |

### Declaration

Wording, which KCA's legal team has approved and which may be reworded only for reading age, with KCA's agreement:

> I confirm this SIM card is mine, or is used by a child under 16 I am responsible for. I understand that giving false information, or registering a SIM card in someone else's name, is an offence (Communications Act 2019, s.52).

## What the citizen gets

- A reference, `SIM-` and 6 letters and numbers, for example `SIM-7K4Q2M`
- An SMS from GovNotify to the registered number: "KCA: this SIM card is now registered to your KestriaID. If you did not do this, call +999 77 100 2000." It never shows the KUIN or the name, because the phone may be shared.

## Assisted routes

- **Network shops** (Lumo Telecom and Kora Mobile): register with a fingerprint check against KestriaID, or with other ID for people with no KUIN. They can also remove a registration, or move one with the other person's agreement.
- **Citizen Service Centres:** an officer can sign someone in with their fingerprint and register their SIM card with them.
- **The GovKestria helpline**, `+999 77 100 2000`: explains, removes a registration after security questions, and refers people on. It can't register a SIM card.

## Personas for this service

From `../dpi.md`:

| Persona | What it tests here |
|---|---|
| Ines Kestel | Has one SIM card registered, and registers a second. The happy path. |
| Mirel Okand | Has 2 registered, on both networks |
| Desa Haldry | Already has 5 registered, so she can't add another |
| Sefa Tormik | Nothing on the register: registers his first SIM card |
| Mina Vorlek | Uses her grandmother Anaïs's phone, so its SIM card is registered to someone else |
| Aru Danvell | Can't sign in online: goes to a network shop or CSC |
| Kel Varrin | No KUIN: goes to a network shop with other ID |

## Known gaps

- **Number checks aren't in the DPI contract.** `dpi.data.fetch()` returns facts about a person. Checking a number's status, and sending the code to it, are KCA calls the service makes itself. Prototypes simulate them, with the fixed test numbers in `../dpi.md`. `[KNOWN GAP]`
- **The mock always shows a consent screen.** Put the notice page before `dpi.data.fetch()`, and tag the consent screen `[KNOWN GAP]`, as for public-task pulls in the Household Support Grant.
