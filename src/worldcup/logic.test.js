import { describe, it, expect } from 'vitest';
import {
  buildMatches, stageCat, stageBadge, watch, fmtFlag, formatTime12, istDateString,
  sanitizeUser, groupByDay, passesFilter, nextMatch, formatCountdown, buildICS
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

describe('formatTime12', () => {
  it('converts midnight and morning to AM', () => {
    expect(formatTime12('00:30')).toEqual({ hm: '12:30', ampm: 'AM' });
    expect(formatTime12('07:30')).toEqual({ hm: '7:30', ampm: 'AM' });
    expect(formatTime12('00:00')).toEqual({ hm: '12:00', ampm: 'AM' });
  });
  it('converts noon and evening to PM', () => {
    expect(formatTime12('12:00')).toEqual({ hm: '12:00', ampm: 'PM' });
    expect(formatTime12('12:30')).toEqual({ hm: '12:30', ampm: 'PM' });
    expect(formatTime12('22:30')).toEqual({ hm: '10:30', ampm: 'PM' });
  });
});

describe('istDateString', () => {
  it('returns the IST calendar date for an instant', () => {
    expect(istDateString(new Date('2026-06-20T10:00:00Z'))).toBe('2026-06-20');
  });
  it('rolls to the next day when IST crosses midnight', () => {
    // 18:35 UTC + 5:30 = 00:05 IST next day
    expect(istDateString(new Date('2026-06-20T18:35:00Z'))).toBe('2026-06-21');
  });
});

describe('sanitizeUser', () => {
  it('lowercases and strips non-alphanumerics', () => {
    expect(sanitizeUser('Sara')).toBe('sara');
    expect(sanitizeUser('  sa ra! ')).toBe('sara');
  });
  it('returns empty string for nullish input (default bucket)', () => {
    expect(sanitizeUser(null)).toBe('');
    expect(sanitizeUser(undefined)).toBe('');
  });
  it('caps length at 32', () => {
    expect(sanitizeUser('a'.repeat(50)).length).toBe(32);
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
    const picks = new Set([matches[2].id]);
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
