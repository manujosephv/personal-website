# World Cup 2026 Planner — Design Spec

**Date:** 2026-06-14
**Status:** Approved design, pending implementation plan
**Repo:** `manujosephv/personal-website` (React 18 + Vite + react-router-dom v7, deployed static on Vercel)

---

## Goal

Port the standalone `wc2026-ist-planner.html` (a FIFA World Cup 2026 match planner with IST kickoff times, star-to-save picks, live countdown, and calendar export) into the personal website as a locked, password-gated personal page at `/worldcup`. Add cross-device persistence via a serverless backend, and make the layout work well on both desktop and mobile.

## Background

The source artifact (`~/Downloads/wc2026-ist-planner.html`) is a single self-contained file: a `680px` mobile-first column listing all 104 matches grouped by day, with:
- Star toggles to save matches ("picks"), persisted to `localStorage`.
- A live countdown to the next match (or next *picked* match).
- Search + stage filters (Groups / R32 / R16 / QF / SF / Final) + an All / My-picks tab.
- ICS calendar export of picked matches.
- A stat strip (total / picks / overnight counts).

Today persistence is per-browser `localStorage`. The owner wants the picks to **sync across his devices**, gated behind a **simple password** (sole user, nothing sensitive in it).

## Decisions (locked with owner)

1. **Persistence:** Cross-device sync via a serverless backend (not just localStorage).
2. **Who:** Single user (the owner). No multi-user accounts, no OAuth.
3. **Auth:** A simple shared **password**, validated server-side.
4. **Read access:** **Password to view AND edit** — the whole page is a locked personal space. Visitors without the password see only a lock screen.
5. **Location:** Lives in the `personal-website` repo as a new route; rides the existing Vercel deploy. No new hosting.

## Hard constraints / invariants

- **The repo is public and the site is a static SPA.** Therefore the password and any storage credentials MUST live server-side (Vercel env vars), never in the frontend bundle. All reads/writes of picks go through a serverless function.
- **Accepted caveat:** the 104-match *fixture list* is shipped inside the JS bundle (it is public FIFA data). Only the **picks** are personal, and those are protected server-side. This matches the owner's "nothing secure in it" bar.
- **No regression to existing pages.** `/`, `/builder`, `/storyteller` and their components must be untouched in behavior. The planner's CSS must not bleed into the rest of the site.
- **Graceful degradation:** if the serverless function/network is unreachable, the page must still function using `localStorage` rather than breaking.

---

## Architecture

```
Browser (React /worldcup page)
   │   lock screen → password (cached in localStorage after first success)
   │
   ├── GET  /api/picks      (header: x-wc-password)  ──►  Vercel Function ──► Upstash Redis  ("wc2026:picks" = [matchId,...])
   │        401 if password missing/wrong
   │
   └── POST /api/picks  { password, picks:[...] }    ──►  Vercel Function ──► Upstash Redis
            401 if password !== env.WC_PASSWORD, else 200 and overwrite blob
```

### Components

| Unit | Responsibility | Depends on |
|---|---|---|
| `src/pages/WorldCup.jsx` | The whole planner UI + state (lock screen, list, filters, countdown, picks, ICS export). Standalone immersive page (own sticky header, **no global `<Nav/>`**, small "← back" link). | `src/data/wc2026.js`, `src/worldcup.css`, the `/api/picks` endpoint |
| `src/data/wc2026.js` | The static fixture data: `FLAG` map + `M` match array, exported as constants. Pulled out of the component for readability. | — |
| `src/worldcup.css` | All planner styles, **every selector scoped under a `.wc-planner` root class** so nothing leaks into the global design system. Imports the planner's Google Fonts (Anton, DM Sans, JetBrains Mono). | — |
| `api/picks.js` | Vercel serverless function. `GET` (password header) returns picks; `POST` validates password and writes. Reads `WC_PASSWORD` + Upstash connection vars from env. | `@upstash/redis` client |
| `vercel.json` (edit) | Exclude `/api` from the SPA rewrite so function routes are not swallowed. | — |
| `src/App.jsx` (edit) | Register `<Route path="/worldcup" element={<WorldCup/>} />`. | — |

### Data flow

1. **Page load:** read cached password from `localStorage` (key `wc_pw`). If present, attempt `GET /api/picks` with it.
   - 200 → unlock, render planner with synced picks.
   - 401 or no cached password → show lock screen.
2. **Unlock:** user types password → `GET /api/picks` with it → on 200, cache password in `localStorage`, render; on 401, show "wrong password".
3. **Toggle a pick:** update local state immediately (optimistic), then **debounced (~600ms)** `POST /api/picks { password, picks }`.
   - On network/function failure: write picks to `localStorage` (key `wc2026_picks`) as a fallback and show a small "offline — saved on this device" toast. Next successful load reconciles from the server.
4. **Clear picks / ICS export:** operate on current in-memory picks; clear also POSTs the empty array.

### Backend storage

- **Upstash Redis** (provisioned through the Vercel Marketplace; Vercel KV was retired and migrated to Upstash in Dec 2024). Single key `wc2026:picks` holding a JSON array of integer match IDs.
- IDs are the index into the (date-sorted) match array — stable as long as the fixture array order is stable. (Same ID scheme the current artifact already uses.)

### Auth model

- `WC_PASSWORD` env var holds the plaintext shared password (acceptable per owner's bar; it is only ever compared server-side, never returned).
- Both `GET` and `POST` require the password. `GET` accepts it via an `x-wc-password` header; `POST` via JSON body.
- The password is cached client-side in `localStorage` purely to avoid re-typing on the owner's own devices.

---

## Responsive / layout

- **Mobile (default):** identical to the current artifact — single `680px`-max column.
- **Desktop (≥ ~900px):** container widens to ~`1100px`; under each day header the match cards flow into a **responsive 2–3 column grid** (CSS grid with `auto-fill`/`minmax`). Sticky controls, countdown card, stat strip, and the fixed action bar adapt via the same breakpoints. No separate desktop layout to maintain — pure CSS.
- Day-header grouping is preserved on all widths (each day = a header + its grid of cards).

---

## One-time owner setup (Vercel dashboard)

Click-by-click steps will be provided at implementation time. In summary:
1. Create an **Upstash Redis** database via the Vercel Marketplace (Storage → Marketplace → Upstash → Redis) and connect it to `personal-website`. This auto-injects the connection env vars.
2. Add an env var `WC_PASSWORD` = chosen password (all environments).
3. Redeploy.

The Redis client package will be added to `package.json` (`@upstash/redis`).

---

## Testing / verification

- **Local dev:** `vercel dev` (runs the function + Vite together) with a local `.env` containing `WC_PASSWORD` and the Upstash connection vars; verify lock → unlock → pick → reload-persists → wrong-password-rejected → offline-fallback.
- Manual matrix: mobile width + desktop width; correct password, wrong password, no password; function reachable vs. simulated failure.
- Confirm existing routes (`/`, `/builder`, `/storyteller`) render unchanged and no global CSS regressions (planner styles confined to `.wc-planner`).

## Non-goals

- Multi-user accounts, OAuth, or per-visitor saved spaces.
- Real-time/live match scores or auto-updating knockout bracket names (placeholders like "Winner Group A" stay until manually updated).
- Encrypting picks or hardening the password beyond a simple server-side comparison.
- Changing the global site theme, Nav, or other pages.

## Open questions

- None blocking. (Password value and Upstash provisioning are owner setup steps, captured above.)
