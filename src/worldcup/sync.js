const PW_KEY = 'wc_pw';

// The offline-fallback localStorage key is namespaced per bucket so two people
// sharing one browser (?u=sara vs default) don't clobber each other's cache.
function localKey(who) {
  return who ? `wc2026_picks:${who}` : 'wc2026_picks';
}

export function getCachedPw() {
  try { return localStorage.getItem(PW_KEY) || ''; } catch { return ''; }
}
export function setCachedPw(pw) {
  try { localStorage.setItem(PW_KEY, pw); } catch { /* ignore */ }
}
export function setLocalPicks(who, arr) {
  try { localStorage.setItem(localKey(who), JSON.stringify(arr)); } catch { /* ignore */ }
}
// Returns null when there is no pending offline copy, else the saved array.
export function getPendingLocalPicks(who) {
  try {
    const v = localStorage.getItem(localKey(who));
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}
export function clearLocalPicks(who) {
  try { localStorage.removeItem(localKey(who)); } catch { /* ignore */ }
}

// Returns { ok: true, picks } on success, { ok: false, status } on auth/other failure.
export async function fetchPicks(pw, who) {
  try {
    const r = await fetch('/api/picks', { headers: { 'x-wc-password': pw, 'x-wc-user': who || '' } });
    if (!r.ok) return { ok: false, status: r.status };
    const data = await r.json();
    return { ok: true, picks: Array.isArray(data.picks) ? data.picks : [] };
  } catch {
    return { ok: false, status: 0 };
  }
}

// Returns { ok: true } or { ok: false, status }. On network failure status === 0.
export async function savePicks(pw, who, picks) {
  try {
    const r = await fetch('/api/picks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, who: who || '', picks }),
    });
    return r.ok ? { ok: true } : { ok: false, status: r.status };
  } catch {
    return { ok: false, status: 0 };
  }
}
