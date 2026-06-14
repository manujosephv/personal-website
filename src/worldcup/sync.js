const PW_KEY = 'wc_pw';
const LOCAL_PICKS_KEY = 'wc2026_picks';

export function getCachedPw() {
  try { return localStorage.getItem(PW_KEY) || ''; } catch { return ''; }
}
export function setCachedPw(pw) {
  try { localStorage.setItem(PW_KEY, pw); } catch { /* ignore */ }
}
export function setLocalPicks(arr) {
  try { localStorage.setItem(LOCAL_PICKS_KEY, JSON.stringify(arr)); } catch { /* ignore */ }
}
// Returns null when there is no pending offline copy, else the saved array.
export function getPendingLocalPicks() {
  try {
    const v = localStorage.getItem(LOCAL_PICKS_KEY);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}
export function clearLocalPicks() {
  try { localStorage.removeItem(LOCAL_PICKS_KEY); } catch { /* ignore */ }
}

// Returns { ok: true, picks } on success, { ok: false, status } on auth/other failure.
export async function fetchPicks(pw) {
  try {
    const r = await fetch('/api/picks', { headers: { 'x-wc-password': pw } });
    if (!r.ok) return { ok: false, status: r.status };
    const data = await r.json();
    return { ok: true, picks: Array.isArray(data.picks) ? data.picks : [] };
  } catch {
    return { ok: false, status: 0 };
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
