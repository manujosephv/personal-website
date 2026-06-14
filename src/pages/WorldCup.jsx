import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../worldcup.css';
import { FLAG, M } from '../data/wc2026.js';
import {
  buildMatches, stageBadge, watch, fmtFlag, groupByDay,
  passesFilter, nextMatch, formatCountdown, buildICS,
} from '../worldcup/logic.js';
import {
  getCachedPw, setCachedPw, setLocalPicks, getPendingLocalPicks, clearLocalPicks,
  fetchPicks, savePicks,
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

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Adopt the server's picks, but prefer a pending offline copy (a prior save
  // that failed). When one exists, re-push it and clear it once it lands.
  async function hydrate(password, serverPicks) {
    let ids = serverPicks;
    const pending = getPendingLocalPicks();
    if (pending) {
      ids = pending;
      const res = await savePicks(password, pending);
      if (res.ok) clearLocalPicks();
    }
    setPicks(new Set(ids.filter(id => id >= 0 && id < matches.length)));
  }

  useEffect(() => {
    const cached = getCachedPw();
    if (!cached) return;
    (async () => {
      const r = await fetchPicks(cached);
      if (r.ok) {
        setPw(cached);
        await hydrate(cached, r.picks);
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
      await hydrate(pwInput, r.picks);
      setLocked(false);
    } else if (r.status === 0) {
      setAuthError('Network error — try again.');
    } else if (r.status === 401) {
      setAuthError('Wrong password.');
    } else {
      setAuthError(`Server error (HTTP ${r.status}) — check the planner backend setup.`);
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
          matchups show placeholders until group results are in. Your picks sync across your devices.
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
