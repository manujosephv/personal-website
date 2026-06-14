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
