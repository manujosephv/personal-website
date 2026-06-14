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

// "HH:MM" (24h IST) -> { hm: "7:30", ampm: "AM" } for 12-hour display.
export function formatTime12(time) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h < 12 ? "AM" : "PM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return { hm: `${hh}:${String(m).padStart(2, "0")}`, ampm };
}

export function dayLabel(date) {
  const d = new Date(date + "T00:00:00Z");
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
