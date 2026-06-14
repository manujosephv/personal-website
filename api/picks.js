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
