# Register a SIM card – Kestria

> **Kestria is a fictional country.** This example uses `profiles/kestria/`. Every person, number and institution in it is made up.

A short, free service. A Kestrian signs in with KestriaID, sees the SIM cards already registered to them, proves they have the new SIM card with a code sent to it, and registers it to their KestriaID. The rules are in `profiles/kestria/services/sim-registration.md`.

- **Status:** one prototype, version 1. Clicked through in a browser, not tested with users.
- **Owner (fictional):** Kestria Communications Authority, with the Kestria Digital Service

## Two versions of the same page

| File | Sign-in | How to open it |
|---|---|---|
| `index.html` | The simulated KestriaID in `references/dpi-mock.js`. A researcher picks a test person. | Open the file in a browser |
| `sandbox/index.html` | Real eSignet screens, through `references/dpi-sandbox.js` | Start the sandbox (`sandbox/README.md`), then open <http://localhost:4400/examples/sim-registration/sandbox/> |

They're the same page with a different DPI script, made with `node sandbox/use-sandbox.mjs examples/sim-registration/index.html examples/sim-registration/sandbox`.

## The journey

1. **Start:** what it is, the 31 March 2027 deadline, "Do you have a KestriaID?" No → register at a network shop with other ID.
2. **Sign in with KestriaID.** Cancelled or failed → try again, or go to a network shop or CSC.
3. **Notice:** we'll check the National SIM Register. It's a legal obligation, not consent.
4. **Your SIM cards:** what's registered, and how many more they can add. Already 5 → how to remove one.
5. **The number:** already theirs, someone else's (never says whose), or free.
6. **Who uses it:** them, or a child under 16 they look after. Someone else aged 16 or over → they register it themselves.
7. **The code** sent to the SIM card, which proves they have it.
8. **Check and declare,** with KCA's fixed wording.
9. **Registered:** a reference, and what happens next.

The network is never asked for: KCA's register knows it.

## Test people

| Person | KUIN (sandbox) | What happens |
|---|---|---|
| Ines Kestel | `9900817347` | Has 1 SIM card. Register a new number, like `+999 74 555 0192`. Her own `+999 73 118 4402` shows "already registered to you". |
| Mirel Okand | `9900214705` | Has 2, on both networks, one used by a child |
| Desa Haldry | `9900529036` | Has 5, so she can't add another |
| Sefa Tormik | `9900451261` | Nothing on the register |
| Mina Vorlek | `9900274665` | Her grandmother's phone, `+999 76 409 0021`, is registered to someone else |
| Aru Danvell | `9900644181` | Can't sign in |

In the sandbox, the one-time code for eSignet is `111111`. The code "sent to the SIM card" is shown on the page, because nothing is really sent.

## Known gaps

- **Number checks aren't in the DPI contract.** Checking whose a number is, and sending a code to it, would be KCA calls. The page simulates them: `+999 79 000 0001`, `+999 79 000 0002` and `+999 76 409 0021` are someone else's, and the network is made up from the last digit.
- **The register check should be a notice,** but the simulated KesLink screen still asks for consent. Saying no leads to a page that explains the check is needed.
- **English only.** The Kestrian link is a stub.
- **Sign-in level:** level 1 plus the SIM code. The service sheet allows it, but it's a policy assumption for KCA to confirm.
