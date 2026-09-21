# Delivery — comments, verification, and publishing

## Inline commenting (always include)

Every generated page ends with the team's comments script tag, immediately before
`</body>`:

```html
<script defer src="blueprint-comments.js"
        data-page="<unique-page-id>"
        data-api="<the team's comments API URL>"></script>
```

- The script lives at `Prototypes/blueprint-comments.js` (same directory as the
  pages), adds a hover 💬 button to every card/stage/panel and a side drawer.
  No account needed; edit/delete is guarded by a per-comment secret in the
  commenter's localStorage.
- Backend: a small API the team hosts (the first one was a serverless function on
  Vercel storing comments in a Postgres table, `blueprint_comments`). Ask the user for
  the API URL, or copy it from an existing page's script tag. If the team has no
  comments backend yet, leave the tag out, say so, and offer to help set one up.
- **The backend's CORS allowlist** usually covers only the live Pages origin and a
  fixed localhost port — commenting won't work from other origins, including the
  ad-hoc verification server. That's expected; don't debug it.

### Page-id registry

`data-page` must be unique per page — a reused id mixes comment threads across
pages. Kebab-case, service-scoped. Before choosing, check existing ids:

```bash
grep -h "data-page" Prototypes/*.html
```

The grep is the registry — trust it over any list you remember. Ids follow the
pattern `<service>-blueprint`, `<service>-blueprint-simplified`,
`<service>-journey-<actor>`, `<service>-current-state`, `<service>-future-state`.

## Verification (before handing over)

1. Serve the **repo root** (relative links to `blueprint-comments.js` and
   `../dist/` assets must resolve):
   ```bash
   python3 -m http.server 8742 --bind 127.0.0.1   # run_in_background
   ```
   `file://` URLs are blocked in the browser pane — always use the HTTP server.
2. Open `http://127.0.0.1:8742/Prototypes/<page>.html` in the browser pane.
3. Check, in order:
   - Full screenshot of the top (header, legend, first lane render correctly;
     💬 Comments button appears bottom-right).
   - `read_console_messages` with onlyErrors — must be empty.
   - DOM verification of completeness — count cards, lanes, panels, and comment
     buttons and compare against what you generated. Example:
     ```js
     ({cards: document.querySelectorAll('.cardx').length,
       lanes: document.querySelectorAll('.lanelabel').length,
       panels: document.querySelectorAll('.panel').length})
     ```
4. **Known glitch:** the browser pane's renderer often returns blank screenshots
   after scrolling. A blank screenshot after scroll is NOT evidence of a broken
   page — verify via DOM geometry / `get_page_text` instead, or re-navigate and
   screenshot fresh.
5. Kill the server when done: `pkill -f "http.server 8742"`.

## Publishing (offer, never auto-push)

The team's prototypes repo is `origin`, and GitHub Pages serves the `main` branch
root. Live URL pattern (check `git remote -v` for the owner and repo):

```
https://<owner>.github.io/<repo>/Prototypes/<file>.html
```

Procedure when the user says push:

1. **Stage only the files you created/edited, by explicit path.** Run
   `git status` first — a working tree can carry unrelated local changes or
   deletions (including live pages). `git add -A` or `git add .` would push those
   and could take live pages down. Always:
   ```bash
   git add "Prototypes/<file1>.html" "Prototypes/<file2>.html"
   ```
2. Commit with a short imperative message describing the artifact.
3. `git push origin main`.
4. Wait for Pages to deploy, then confirm before reporting success:
   ```bash
   until [ "$(curl -s -o /dev/null -w '%{http_code}' <live-url>)" = "200" ]; do sleep 5; done
   ```
   (run in background; for content edits to an existing page, grep the live page
   for a phrase from the edit instead of checking the status code).
5. Report the live link(s). Remind the user that commenting works on the live URL.

Environment note: if the `gh` CLI is not installed, plain `git push` works with
stored credentials. Don't handle tokens yourself — if a push needs authentication,
ask the user to do it.

## Cross-linking

Every page's footer links its companions (blueprint ↔ journey maps ↔ paired
state), and cites the source ("Source: … Miro board + comment threads, July 2026").
When adding a new page to an existing family, update the companions' footers too —
a one-way link is a dead end for readers arriving from the other side.
