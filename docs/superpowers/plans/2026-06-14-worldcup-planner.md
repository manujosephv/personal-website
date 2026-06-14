# World Cup 2026 Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a password-gated `/worldcup` page to the personal website that ports the standalone WC2026 IST match planner, syncs picks across devices via a Vercel serverless function + Vercel KV, and works on desktop and mobile.

**Architecture:** Pure planner logic and fixture data are extracted into testable ES modules (`src/data/`, `src/worldcup/`). A Vercel serverless function (`api/picks.js`) reads/writes a single picks blob in Vercel KV, gated by a server-side password. The React page (`src/pages/WorldCup.jsx`) renders a lock screen, then the planner, syncing through the function with a `localStorage` fallback.

**Tech Stack:** React 18, Vite 5, react-router-dom v7, Vercel Functions, `@upstash/redis` (Vercel Marketplace), vitest (new), deployed on Vercel.

---

## File Structure

| File | Responsibility | New/Edit |
|---|---|---|
| `package.json` | Add `@upstash/redis` dep, `vitest` devDep, `"type": "module"`, `test` script | Edit |
| `src/data/wc2026.js` | Static fixture data: `FLAG` map + `M` match array | New |
| `src/worldcup/logic.js` | Pure helpers: build/sort matches, stage category/badge, watchability, day grouping, filtering, next match, countdown format, ICS string | New |
| `src/worldcup/logic.test.js` | Unit tests for `logic.js` | New |
| `src/worldcup/sync.js` | Client API wrapper: `fetchPicks(pw)`, `savePicks(pw, picks)`, localStorage helpers | New |
| `api/picks.js` | Serverless function: GET (password header) / POST (password body) against Upstash Redis | New |
| `api/picks.test.js` | Unit tests for the function (mocked `@vercel/kv`) | New |
| `src/worldcup.css` | All planner styles, scoped under `.wc-planner`; desktop grid | New |
| `src/pages/WorldCup.jsx` | The page: lock screen + planner UI + state + sync wiring | New |
| `src/App.jsx` | Register `/worldcup` route | Edit |
| `vercel.json` | Exclude `/api` from the SPA rewrite | Edit |
| `README.md` | Document KV + `WC_PASSWORD` setup | Edit |

---

## Task 1: Tooling — add deps, ESM, test script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add `"type": "module"`, the dependency, devDependency, and test script**

Edit `package.json` so it reads (preserve existing fields, add the marked lines):

```json
{
  "name": "manu-joseph-website",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@upstash/redis": "^1.34.0",
    "lucide-react": "^1.7.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.13.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Install**

Run: `npm install`
Expected: installs `@upstash/redis` and `vitest` with no errors.

- [ ] **Step 3: Verify the existing build still works with ESM mode**

Run: `npm run build`
Expected: Vite build succeeds (the existing site compiles; `"type": "module"` does not break Vite, which is ESM-native).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add vitest + @upstash/redis, enable ESM for serverless functions"
```

---

## Task 2: Fixture data module

**Files:**
- Create: `src/data/wc2026.js`

- [ ] **Step 1: Create the data module from the source artifact**

Copy the `FLAG` object and the `M` array **verbatim** from the source file
`~/Downloads/wc2026-ist-planner.html` (lines 193–310: the `const FLAG = {...}` block and the
`const M = [...]` block) into a new file, changing only the `const` declarations to named exports.
The file must look like this (data rows elided here with `…` — copy the real rows from the source):

```js
// FIFA World Cup 2026 fixtures. Times are IST (UTC+5:30).
// Source of truth: FIFA official Eastern-Time schedule, converted to IST.
export const FLAG = {
  "Mexico": "🇲🇽", "South Africa": "🇿🇦", /* …copy all entries verbatim… */ "Panama": "🇵🇦"
};

// [stage, dateISO(IST), time(IST), teamA, teamB]
export const M = [
  ["Group A", "2026-06-12", "00:30", "Mexico", "South Africa"],
  // …copy all 104 rows verbatim from the source artifact…
  ["Final", "2026-07-20", "00:30", "Winner of SF-1", "Winner of SF-2"]
];
```

- [ ] **Step 2: Verify it imports and has the expected shape**

Run: `node -e "import('./src/data/wc2026.js').then(m=>console.log(m.M.length, Object.keys(m.FLAG).length))"`
Expected: prints `104 48` (104 matches, 48 flags).

- [ ] **Step 3: Commit**

```bash
git add src/data/wc2026.js
git commit -m "feat: add WC2026 fixture data module"
```

---

## Task 3: Pure planner logic (TDD)

**Files:**
- Create: `src/worldcup/logic.js`
- Test: `src/worldcup/logic.test.js`

- [ ] **Step 1: Write the failing tests**

Create `src/worldcup/logic.test.js`:

```js
import { describe, it, expect } from 'vitest';
import {
  buildMatches, stageCat, stageBadge, watch, fmtFlag,
  groupByDay, passesFilter, nextMatch, formatCountdown, buildICS
} from './logic.js';

const SAMPLE = [
  ["Group A", "2026-06-12", "00:30", "Mexico", "South Africa"],
  ["Group A", "2026-06-12", "07:30", "South Korea", "Czechia"],
  ["Final",   "2026-07-20", "00:30", "Winner of SF-1", "Winner of SF-2"],
];
const FLAGS = { "Mexico": "🇲🇽" };

describe('buildMatches', () => {
  it('assigns ids, parses dt, and sorts by kickoff', () => {
    const m = buildMatches(SAMPLE);
    expect(m).toHaveLength(3);
    expect(m[0].a).toBe('Mexico');
    expect(m[0].dt instanceof Date).toBe(true);
    expect(m[0].dt <= m[1].dt).toBe(true);
    expect(typeof m[0].id).toBe('number');
  });
});

describe('stageCat / stageBadge', () => {
  it('categorizes stages', () => {
    expect(stageCat('Group A')).toBe('group');
    expect(stageCat('Round of 32')).toBe('r32');
    expect(stageCat('Final')).toBe('final');
    expect(stageCat('Third-place play-off')).toBe('final');
  });
  it('produces a [class, label] badge', () => {
    expect(stageBadge('Group A')).toEqual(['b-grp', 'Grp A']);
    expect(stageBadge('Final')).toEqual(['b-fin', 'FINAL']);
  });
});

describe('watch', () => {
  it('flags overnight matches red', () => {
    expect(watch('02:30')[0]).toBe('d-red');
  });
  it('flags prime time green', () => {
    expect(watch('21:30')[0]).toBe('d-grn');
  });
});

describe('fmtFlag', () => {
  it('prefixes a known flag with a trailing space', () => {
    expect(fmtFlag('Mexico', FLAGS)).toBe('🇲🇽 ');
  });
  it('returns empty string for unknown teams', () => {
    expect(fmtFlag('Nowhere', FLAGS)).toBe('');
  });
});

describe('groupByDay', () => {
  it('groups sorted matches under date keys with labels', () => {
    const groups = groupByDay(buildMatches(SAMPLE));
    expect(groups[0].date).toBe('2026-06-12');
    expect(groups[0].matches).toHaveLength(2);
    expect(groups[0].label.dow).toBe('FRI');
  });
});

describe('passesFilter', () => {
  const matches = buildMatches(SAMPLE);
  it('filters by mine view using picks set', () => {
    const picks = new Set([matches[0].id]);
    expect(passesFilter(matches[0], { view: 'mine', stage: 'all', q: '', picks })).toBe(true);
    expect(passesFilter(matches[1], { view: 'mine', stage: 'all', q: '', picks })).toBe(false);
  });
  it('filters by stage', () => {
    expect(passesFilter(matches[0], { view: 'all', stage: 'group', q: '', picks: new Set() })).toBe(true);
    expect(passesFilter(matches[0], { view: 'all', stage: 'final', q: '', picks: new Set() })).toBe(false);
  });
  it('filters by search query', () => {
    expect(passesFilter(matches[0], { view: 'all', stage: 'all', q: 'mexico', picks: new Set() })).toBe(true);
    expect(passesFilter(matches[0], { view: 'all', stage: 'all', q: 'brazil', picks: new Set() })).toBe(false);
  });
});

describe('nextMatch', () => {
  const matches = buildMatches(SAMPLE);
  it('returns the soonest match after now from picks when picks exist', () => {
    const now = new Date('2026-06-12T00:00:00+05:30');
    const picks = new Set([matches[2].id]); // the Final
    expect(nextMatch(matches, picks, now).stage).toBe('Final');
  });
  it('falls back to all matches when no picks', () => {
    const now = new Date('2026-06-12T03:00:00+05:30');
    const nm = nextMatch(matches, new Set(), now);
    expect(nm.time).toBe('07:30');
  });
  it('returns null when nothing is upcoming', () => {
    const now = new Date('2027-01-01T00:00:00+05:30');
    expect(nextMatch(matches, new Set(), now)).toBe(null);
  });
});

describe('formatCountdown', () => {
  it('breaks a duration into d/h/m/s', () => {
    const ms = (((1 * 24 + 2) * 60 + 3) * 60 + 4) * 1000;
    expect(formatCountdown(ms)).toEqual({ d: 1, h: 2, mi: 3, s: 4 });
  });
  it('clamps negatives to zero', () => {
    expect(formatCountdown(-5000)).toEqual({ d: 0, h: 0, mi: 0, s: 0 });
  });
});

describe('buildICS', () => {
  it('emits one VEVENT per match with summary and UTC stamps', () => {
    const matches = buildMatches(SAMPLE);
    const ics = buildICS([matches[0]]);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('Mexico vs South Africa');
    expect(ics).toContain('DTSTART:');
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/worldcup/logic.test.js`
Expected: FAIL — `logic.js` does not exist / exports undefined.

- [ ] **Step 3: Write the implementation**

Create `src/worldcup/logic.js`:

```js
const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function buildMatches(M) {
  return M.map(([stage, date, time, a, b], i) => ({
    id: i, stage, date, time, a, b,
    dt: new Date(`${date}T${time}:00+05:30`),
  })).sort((x, y) => x.dt - y.dt);
}

export function stageCat(s) {
  if (s.startsWith("Group")) return "group";
  if (s === "Round of 32") return "r32";
  if (s === "Round of 16") return "r16";
  if (s === "Quarter-final") return "qf";
  if (s === "Semi-final") return "sf";
  if (s === "Final" || s.startsWith("Third")) return "final";
  return "other";
}

export function stageBadge(s) {
  const c = stageCat(s);
  const map = {
    group: ["b-grp", s.replace("Group ", "Grp ")],
    r32: ["b-r32", "R32"], r16: ["b-r16", "R16"],
    qf: ["b-qf", "QF"], sf: ["b-sf", "SF"],
    final: ["b-fin", s.startsWith("Third") ? "3rd" : "FINAL"],
  };
  return map[c] || ["b-grp", s];
}

export function watch(time) {
  const h = +time.split(":")[0];
  if (h >= 0 && h < 6) return ["d-red", "Overnight"];
  if (h >= 6 && h < 11) return ["d-amb", "Early AM"];
  if (h >= 17 && h < 22) return ["d-grn", "Prime time"];
  if (h >= 22) return ["d-amb", "Late night"];
  return ["d-grn", "Daytime"];
}

export function fmtFlag(team, FLAG) {
  return FLAG[team] ? FLAG[team] + " " : "";
}

export function dayLabel(date) {
  const d = new Date(date + "T00:00:00+05:30");
  return { dow: DOW[d.getUTCDay()], dt: d.getUTCDate() + " " + MON[d.getUTCMonth()] };
}

export function groupByDay(matches) {
  const groups = [];
  let cur = null;
  for (const m of matches) {
    if (!cur || cur.date !== m.date) {
      cur = { date: m.date, label: dayLabel(m.date), matches: [] };
      groups.push(cur);
    }
    cur.matches.push(m);
  }
  return groups;
}

export function passesFilter(m, { view, stage, q, picks }) {
  if (view === "mine" && !picks.has(m.id)) return false;
  if (stage !== "all" && stageCat(m.stage) !== stage) return false;
  if (q) {
    const hay = (m.a + " " + m.b + " " + m.stage).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export function nextMatch(matches, picks, now = new Date()) {
  const pool = picks.size ? matches.filter(m => picks.has(m.id)) : matches;
  const up = pool.filter(m => m.dt > now).sort((a, b) => a.dt - b.dt);
  return up[0] || null;
}

export function formatCountdown(diffMs) {
  const diff = Math.max(0, diffMs);
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff % 864e5) / 36e5),
    mi: Math.floor((diff % 36e5) / 6e4),
    s: Math.floor((diff % 6e4) / 1e3),
  };
}

function pad(n) { return String(n).padStart(2, "0"); }
function utcStamp(dt) {
  return dt.getUTCFullYear() + pad(dt.getUTCMonth() + 1) + pad(dt.getUTCDate()) + "T" +
    pad(dt.getUTCHours()) + pad(dt.getUTCMinutes()) + "00Z";
}

export function buildICS(selected, stampNow = new Date()) {
  let ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//WC26 IST Planner//EN\r\nCALSCALE:GREGORIAN\r\n";
  for (const m of selected) {
    const end = new Date(m.dt.getTime() + 115 * 60000);
    ics += "BEGIN:VEVENT\r\n";
    ics += "UID:wc26-" + m.id + "@planner\r\n";
    ics += "DTSTAMP:" + utcStamp(stampNow) + "\r\n";
    ics += "DTSTART:" + utcStamp(m.dt) + "\r\n";
    ics += "DTEND:" + utcStamp(end) + "\r\n";
    ics += "SUMMARY:⚽ " + m.a + " vs " + m.b + " (" + m.stage + ")\r\n";
    ics += "DESCRIPTION:FIFA World Cup 2026 — kickoff " + m.time + " IST\r\n";
    ics += "END:VEVENT\r\n";
  }
  ics += "END:VCALENDAR";
  return ics;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/worldcup/logic.test.js`
Expected: PASS (all describe blocks green).

- [ ] **Step 5: Commit**

```bash
git add src/worldcup/logic.js src/worldcup/logic.test.js
git commit -m "feat: add tested pure planner logic"
```

---

## Task 4: Serverless function (TDD)

**Files:**
- Create: `api/picks.js`
- Test: `api/picks.test.js`

- [ ] **Step 1: Write the failing tests**

Create `api/picks.test.js`:

```js
import { describe, it, expect, vi, beforeEach } from 'vitest';

const store = {};
vi.mock('@upstash/redis', () => ({
  Redis: class {
    async get(k) { return k in store ? store[k] : null; }
    async set(k, v) { store[k] = v; }
  },
}));

import handler from './picks.js';

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(c) { this.statusCode = c; return this; },
    json(b) { this.body = b; return this; },
  };
}

beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  process.env.WC_PASSWORD = 'secret';
});

describe('GET /api/picks', () => {
  it('401s without the password header', async () => {
    const res = mockRes();
    await handler({ method: 'GET', headers: {}, body: {} }, res);
    expect(res.statusCode).toBe(401);
  });
  it('returns picks when the password header is correct', async () => {
    store['wc2026:picks'] = [1, 2, 3];
    const res = mockRes();
    await handler({ method: 'GET', headers: { 'x-wc-password': 'secret' }, body: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ picks: [1, 2, 3] });
  });
  it('returns an empty array when nothing is stored', async () => {
    const res = mockRes();
    await handler({ method: 'GET', headers: { 'x-wc-password': 'secret' }, body: {} }, res);
    expect(res.body).toEqual({ picks: [] });
  });
});

describe('POST /api/picks', () => {
  it('401s on wrong password', async () => {
    const res = mockRes();
    await handler({ method: 'POST', headers: {}, body: { password: 'nope', picks: [1] } }, res);
    expect(res.statusCode).toBe(401);
  });
  it('saves picks on correct password', async () => {
    const res = mockRes();
    await handler({ method: 'POST', headers: {}, body: { password: 'secret', picks: [4, 5] } }, res);
    expect(res.statusCode).toBe(200);
    expect(store['wc2026:picks']).toEqual([4, 5]);
  });
  it('rejects a non-array picks payload', async () => {
    const res = mockRes();
    await handler({ method: 'POST', headers: {}, body: { password: 'secret', picks: 'oops' } }, res);
    expect(res.statusCode).toBe(400);
  });
});

describe('other methods', () => {
  it('405s on PUT', async () => {
    const res = mockRes();
    await handler({ method: 'PUT', headers: {}, body: {} }, res);
    expect(res.statusCode).toBe(405);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- api/picks.test.js`
Expected: FAIL — `picks.js` not found.

- [ ] **Step 3: Write the implementation**

Create `api/picks.js`:

```js
import { Redis } from '@upstash/redis';

const KEY = 'wc2026:picks';

// Vercel's Upstash Marketplace integration injects UPSTASH_REDIS_REST_* ;
// older/native stores expose KV_REST_API_* . Accept either.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

function authed(password) {
  return Boolean(process.env.WC_PASSWORD) && password === process.env.WC_PASSWORD;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!authed(req.headers['x-wc-password'])) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    const picks = (await redis.get(KEY)) ?? [];
    return res.status(200).json({ picks });
  }

  if (req.method === 'POST') {
    const { password, picks } = req.body || {};
    if (!authed(password)) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    if (!Array.isArray(picks)) {
      return res.status(400).json({ error: 'picks must be an array' });
    }
    await redis.set(KEY, picks);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
```

Note: `@upstash/redis` stores the array as JSON automatically; `redis.get` returns it already
parsed (an array), so no `JSON.parse` is needed.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- api/picks.test.js`
Expected: PASS (all blocks green).

- [ ] **Step 5: Commit**

```bash
git add api/picks.js api/picks.test.js
git commit -m "feat: add password-gated picks serverless function (KV-backed)"
```

---

## Task 5: Vercel rewrite — stop the SPA fallback swallowing /api

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Exclude `/api` from the catch-all rewrite**

Replace the contents of `vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 2: Verify it is valid JSON**

Run: `node -e "console.log(JSON.parse(require('fs').readFileSync('vercel.json','utf8')).rewrites[0].source)"`
Expected: prints `/((?!api/).*)`

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "fix: exclude /api from SPA rewrite so functions are reachable"
```

---

## Task 6: Client sync wrapper

**Files:**
- Create: `src/worldcup/sync.js`

- [ ] **Step 1: Create the client API + localStorage helpers**

Create `src/worldcup/sync.js`:

```js
const PW_KEY = 'wc_pw';
const LOCAL_PICKS_KEY = 'wc2026_picks';

export function getCachedPw() {
  try { return localStorage.getItem(PW_KEY) || ''; } catch { return ''; }
}
export function setCachedPw(pw) {
  try { localStorage.setItem(PW_KEY, pw); } catch { /* ignore */ }
}
export function getLocalPicks() {
  try {
    const v = localStorage.getItem(LOCAL_PICKS_KEY);
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}
export function setLocalPicks(arr) {
  try { localStorage.setItem(LOCAL_PICKS_KEY, JSON.stringify(arr)); } catch { /* ignore */ }
}

// Returns { ok: true, picks } on success, { ok: false, status } on auth/other failure.
export async function fetchPicks(pw) {
  try {
    const r = await fetch('/api/picks', { headers: { 'x-wc-password': pw } });
    if (!r.ok) return { ok: false, status: r.status };
    const data = await r.json();
    return { ok: true, picks: Array.isArray(data.picks) ? data.picks : [] };
  } catch {
    return { ok: false, status: 0 }; // network/offline
  }
}

// Returns { ok: true } or { ok: false, status }. On network failure status === 0.
export async function savePicks(pw, picks) {
  try {
    const r = await fetch('/api/picks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, picks }),
    });
    return r.ok ? { ok: true } : { ok: false, status: r.status };
  } catch {
    return { ok: false, status: 0 };
  }
}
```

- [ ] **Step 2: Verify it imports**

Run: `node -e "import('./src/worldcup/sync.js').then(m=>console.log(typeof m.fetchPicks, typeof m.savePicks))"`
Expected: prints `function function`

- [ ] **Step 3: Commit**

```bash
git add src/worldcup/sync.js
git commit -m "feat: add client sync wrapper with localStorage fallback"
```

---

## Task 7: Scoped planner CSS (with desktop grid)

**Files:**
- Create: `src/worldcup.css`

- [ ] **Step 1: Create the stylesheet, scoped under `.wc-planner`**

Create `src/worldcup.css`. Port the `<style>` block from the source artifact
(`~/Downloads/wc2026-ist-planner.html`, lines 11–134), with two structural changes:

1. **Scope every rule** under `.wc-planner` so nothing leaks into the site's global design system.
   The `:root` variables move onto `.wc-planner` itself; `body` rules become `.wc-planner` rules.
2. **Add a desktop block** at the end for the responsive grid.

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@500;700&display=swap');

.wc-planner {
  --bg:#070b08; --bg2:#0c130d; --card:#111a13; --card-hi:#16221a; --line:#1f2e23;
  --ink:#eef5ef; --muted:#8aa093; --lime:#b6ff3c; --lime-dim:#7bb52a;
  --amber:#ffc24b; --red:#ff6b5e; --green:#3ddc84; --shadow:0 8px 30px rgba(0,0,0,.5);

  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(182,255,60,.10), transparent 60%),
    radial-gradient(800px 500px at 100% 100%, rgba(61,220,132,.06), transparent 60%),
    var(--bg);
  color:var(--ink);
  font-family:'DM Sans',system-ui,sans-serif;
  line-height:1.45;
  min-height:100dvh;
  padding-bottom:96px;
}
.wc-planner *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}

/* --- PORT every remaining rule from the artifact here, each prefixed with `.wc-planner ` --- */
/* e.g. `.wrap{...}` becomes `.wc-planner .wrap{...}`, `.card.picked{...}` becomes
   `.wc-planner .card.picked{...}`, `.actionbar{position:fixed...}` stays fixed but prefixed, etc.
   Copy ALL of: .wrap, header/.kicker/h1/.sub, .countdown family, .stats family, .controls/.tabs/.tab/
   .search/.chips/.chip, .dayhdr family, .card family/.time/.info/.teams/.meta/.badge variants/.watch/
   .dot variants/.star, .empty, .actionbar/.btn, .note, .toast. */

/* --- Desktop: widen and flow each day's cards into a responsive grid --- */
@media (min-width: 900px) {
  .wc-planner .wrap { max-width: 1100px; }
  .wc-planner .day-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 9px;
  }
  .wc-planner .card { margin-bottom: 0; }
  .wc-planner .actionbar .inner { max-width: 1100px; }
}
```

Note: the component (Task 8) wraps each day's cards in a `<div class="day-grid">`. On mobile the
grid rule is inactive, so cards stack exactly as before; at ≥900px they flow 2–3 across.

- [ ] **Step 2: Commit**

```bash
git add src/worldcup.css
git commit -m "feat: add scoped planner styles with desktop grid"
```

---

## Task 8: The WorldCup page component

**Files:**
- Create: `src/pages/WorldCup.jsx`

- [ ] **Step 1: Create the component**

Create `src/pages/WorldCup.jsx`:

```jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../worldcup.css';
import { FLAG, M } from '../data/wc2026.js';
import {
  buildMatches, stageBadge, watch, fmtFlag, groupByDay,
  passesFilter, nextMatch, formatCountdown, buildICS,
} from '../worldcup/logic.js';
import {
  getCachedPw, setCachedPw, getLocalPicks, setLocalPicks, fetchPicks, savePicks,
} from '../worldcup/sync.js';

const STAGES = [
  ['all', 'All stages'], ['group', 'Groups'], ['r32', 'Round of 32'],
  ['r16', 'Round of 16'], ['qf', 'Quarters'], ['sf', 'Semis'], ['final', 'Final'],
];

export default function WorldCup() {
  const matches = useMemo(() => buildMatches(M), []);
  const overnightCount = useMemo(
    () => matches.filter(m => { const h = +m.time.split(':')[0]; return h < 6 || h >= 22; }).length,
    [matches]
  );

  const [locked, setLocked] = useState(true);
  const [pwInput, setPwInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [pw, setPw] = useState('');

  const [picks, setPicks] = useState(() => new Set());
  const [view, setView] = useState('all');
  const [stage, setStage] = useState('all');
  const [q, setQ] = useState('');
  const [now, setNow] = useState(() => new Date());
  const [toastMsg, setToastMsg] = useState('');

  const saveTimer = useRef(null);
  const toastTimer = useRef(null);

  // Live countdown tick.
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Try cached password on mount.
  useEffect(() => {
    const cached = getCachedPw();
    if (!cached) return;
    (async () => {
      const r = await fetchPicks(cached);
      if (r.ok) {
        setPw(cached);
        setPicks(new Set(r.picks.filter(id => id >= 0 && id < matches.length)));
        setLocked(false);
      }
    })();
  }, [matches.length]);

  function showToast(msg) {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 2200);
  }

  async function unlock(e) {
    e.preventDefault();
    setAuthError('');
    const r = await fetchPicks(pwInput);
    if (r.ok) {
      setCachedPw(pwInput);
      setPw(pwInput);
      setPicks(new Set(r.picks.filter(id => id >= 0 && id < matches.length)));
      setLocked(false);
    } else if (r.status === 0) {
      setAuthError('Network error — try again.');
    } else {
      setAuthError('Wrong password.');
    }
  }

  function persist(nextArr) {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const r = await savePicks(pw, nextArr);
      if (!r.ok) {
        setLocalPicks(nextArr);
        showToast(r.status === 0 ? 'Offline — saved on this device' : 'Save failed');
      }
    }, 600);
  }

  function toggle(id) {
    setPicks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      persist([...next]);
      return next;
    });
  }

  function clearPicks() {
    if (!picks.size) return;
    setPicks(new Set());
    persist([]);
    showToast('Picks cleared');
  }

  function exportICS() {
    const sel = matches.filter(m => picks.has(m.id));
    if (!sel.length) return;
    const ics = buildICS(sel);
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'my-worldcup-2026.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast(sel.length + ' match' + (sel.length > 1 ? 'es' : '') + ' → calendar file');
  }

  if (locked) {
    return (
      <div className="wc-planner">
        <div className="wrap">
          <header>
            <div className="kicker">FIFA World Cup 2026 · India Time</div>
            <h1>MY <span className="glow">MATCH</span> PLAN</h1>
            <div className="sub">This planner is private. Enter the password to continue.</div>
          </header>
          <form className="countdown" onSubmit={unlock}>
            <div className="cd-label">Password</div>
            <input
              className="search" type="password" autoFocus value={pwInput}
              onChange={e => setPwInput(e.target.value)} placeholder="Enter password…"
              style={{ marginTop: 8 }}
            />
            <button className="btn primary" type="submit" style={{ width: '100%', marginTop: 10 }}>
              Unlock
            </button>
            {authError && (
              <div className="sub" style={{ color: 'var(--red)', marginTop: 8 }}>{authError}</div>
            )}
          </form>
          <div className="note"><Link to="/">← back to manujoseph.dev</Link></div>
        </div>
      </div>
    );
  }

  const visible = matches.filter(m => passesFilter(m, { view, stage, q, picks }));
  const groups = groupByDay(visible);
  const upcoming = nextMatch(matches, picks, now);
  const cd = upcoming ? formatCountdown(upcoming.dt - now) : null;

  return (
    <div className="wc-planner">
      <div className="wrap">
        <header>
          <div className="kicker">FIFA World Cup 2026 · India Time</div>
          <h1>MY <span className="glow">MATCH</span> PLAN</h1>
          <div className="sub">Tap ★ to save the games you'll watch — all times in IST</div>
        </header>

        <div className="countdown">
          <div className="cd-label">{picks.size ? 'Your next pick' : 'Next kickoff'}</div>
          <div className="cd-match">
            {upcoming ? `${fmtFlag(upcoming.a, FLAG)}${upcoming.a} vs ${fmtFlag(upcoming.b, FLAG)}${upcoming.b}`
                      : '🏆 World Cup 2026 complete'}
          </div>
          <div className="cd-clock">
            {cd && [['days', cd.d], ['hrs', cd.h], ['min', cd.mi], ['sec', cd.s]].map(([u, n]) => (
              <div className="cd-box" key={u}>
                <div className="cd-num">{String(n).padStart(2, '0')}</div>
                <div className="cd-unit">{u}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats">
          <div className="stat"><b>{matches.length}</b><span>Matches</span></div>
          <div className="stat pick"><b>{picks.size}</b><span>My picks</span></div>
          <div className="stat night"><b>{overnightCount}</b><span>Overnight</span></div>
        </div>

        <div className="controls">
          <div className="tabs">
            <button className={'tab' + (view === 'all' ? ' active' : '')} onClick={() => setView('all')}>All matches</button>
            <button className={'tab' + (view === 'mine' ? ' active' : '')} onClick={() => setView('mine')}>★ My picks</button>
          </div>
          <input className="search" value={q} onChange={e => setQ(e.target.value.trim().toLowerCase())}
                 placeholder="Search team, e.g. Brazil, Argentina…" />
          <div className="chips">
            {STAGES.map(([key, label]) => (
              <button key={key} className={'chip' + (stage === key ? ' active' : '')} onClick={() => setStage(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div id="list">
          {groups.length === 0 ? (
            <div className="empty">
              {view === 'mine'
                ? <><span className="big">★</span>No matches saved yet.<br />Switch to <b>All matches</b> and tap the star on games you want to watch.</>
                : <><span className="big">🔍</span>No matches found. Try a different team or stage.</>}
            </div>
          ) : groups.map(g => (
            <div key={g.date}>
              <div className="dayhdr">
                <span className="dow">{g.label.dow}</span>
                <span className="dt">{g.label.dt} · IST</span>
                <span className="ln" />
              </div>
              <div className="day-grid">
                {g.matches.map(m => {
                  const [bclass, btxt] = stageBadge(m.stage);
                  const [wc, wt] = watch(m.time);
                  const on = picks.has(m.id);
                  const sameNight = (+m.time.split(':')[0]) < 11;
                  return (
                    <div className={'card' + (on ? ' picked' : '')} key={m.id}>
                      <div className="time">
                        <div className="hr">{m.time}</div>
                        {sameNight && <span className="nx">↳ same night</span>}
                      </div>
                      <div className="info">
                        <div className="teams">
                          {fmtFlag(m.a, FLAG)}{m.a}<span className="v">vs</span>{fmtFlag(m.b, FLAG)}{m.b}
                        </div>
                        <div className="meta">
                          <span className={'badge ' + bclass}>{btxt}</span>
                          <span className="watch"><span className={'dot ' + wc} />{wt}</span>
                        </div>
                      </div>
                      <button className={'star' + (on ? ' on' : '')} aria-label="Save match" onClick={() => toggle(m.id)}>
                        {on ? '★' : '☆'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="note">
          Times converted from FIFA's official Eastern-Time schedule to IST (UTC+5:30). Knockout
          matchups show placeholders until group results are in. Your picks sync to your account.
          {' '}<Link to="/">← back to manujoseph.dev</Link>
        </div>
      </div>

      <div className="actionbar">
        <div className="inner">
          <button className="btn primary" disabled={!picks.size} onClick={exportICS}>📅 Add picks to calendar</button>
          <button className="btn" disabled={!picks.size} onClick={clearPicks}>Clear picks</button>
        </div>
      </div>

      <div className={'toast' + (toastMsg ? ' show' : '')}>{toastMsg}</div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the component builds**

Run: `npm run build`
Expected: Vite build succeeds with no import or JSX errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/WorldCup.jsx
git commit -m "feat: add WorldCup planner page (lock screen + synced picks + desktop grid)"
```

---

## Task 9: Register the route

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add the import and route**

Edit `src/App.jsx` to add the import and the route (keep everything else):

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Storyteller from './pages/Storyteller.jsx'
import WorldCup from './pages/WorldCup.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/storyteller" element={<Storyteller />} />
        <Route path="/worldcup" element={<WorldCup />} />
      </Routes>
      <Footer />
    </Router>
  )
}
```

Note: `<Footer />` renders on every route including `/worldcup`. That is acceptable (it sits below
the planner's fixed action bar). If it visually clashes during verification, gate it:
`{!isWorldCup && <Footer />}` using `useLocation()` — only do this if Task 11 verification shows a problem.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: register /worldcup route"
```

---

## Task 10: Owner setup docs

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Append a setup section**

Add to the end of `README.md`:

```markdown
## /worldcup planner — backend setup

The `/worldcup` page stores match picks in Upstash Redis (via the Vercel Marketplace) behind a password.

**One-time setup (Vercel dashboard):**
1. Project → **Storage** → **Marketplace Database Providers** → **Upstash** → **Redis** →
   create a database and connect it to this project. Vercel auto-injects the connection env vars
   (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, and `KV_REST_API_*` aliases).
2. Project → **Settings → Environment Variables** → add `WC_PASSWORD` = your chosen password
   (all environments).
3. Redeploy.

**Local development:** `vercel dev` (runs the function + Vite together). `vercel env pull .env`
copies `WC_PASSWORD` and the Upstash connection vars into a gitignored `.env`.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document /worldcup KV + WC_PASSWORD setup"
```

---

## Task 11: Full local verification

**Files:** none (verification only)

- [ ] **Step 1: Run the whole test suite**

Run: `npm test`
Expected: all `logic.test.js` and `picks.test.js` tests pass.

- [ ] **Step 2: Provision local env (owner)**

Run: `npx vercel link` then `npx vercel env pull .env` (after the dashboard Upstash + `WC_PASSWORD`
setup from Task 10). Confirm `.env` contains `WC_PASSWORD` and `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.

- [ ] **Step 3: Run the app with functions**

Run: `npx vercel dev`
Open `http://localhost:3000/worldcup`.

- [ ] **Step 4: Manual acceptance matrix**

Verify each:
- Lock screen shows on first load; wrong password → "Wrong password."; correct password → planner renders.
- Tap stars → "My picks" count updates; reload page → picks persist (came back from KV).
- Open the same URL in a second browser/incognito with the password → same picks appear (cross-device sync).
- Search, stage chips, and All/My-picks tabs filter correctly; countdown ticks.
- "Add picks to calendar" downloads a `.ics` that imports into a calendar app.
- Narrow the window (<900px) → single column; widen (≥900px) → cards flow 2–3 across under each day header.
- Visit `/`, `/builder`, `/storyteller` → unchanged; no stray lime styling leaked from the planner.

- [ ] **Step 5: Commit any fixes, then push**

```bash
git add -A
git commit -m "test: verify /worldcup end-to-end"
git push origin main
```

Vercel auto-deploys `main`. Verify the production `/worldcup` URL after deploy.

---

## Self-Review Notes

- **Spec coverage:** route + page (T8/T9), React port (T2/T3/T7/T8), serverless function (T4), KV store (T4/T10), env-var secrets (T4/T10), lock-screen auth for read+write (T4/T8), debounced save + localStorage fallback (T6/T8), `/api` rewrite fix (T5), responsive desktop grid (T7/T8), no-bleed scoped CSS (T7), existing-page regression check (T11). All spec sections map to a task.
- **Non-goals respected:** no multi-user/OAuth, no live scores, no global theme change.
