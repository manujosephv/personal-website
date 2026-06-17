import { Redis } from '@upstash/redis';

// Vercel's Upstash Marketplace integration injects UPSTASH_REDIS_REST_* ;
// older/native stores expose KV_REST_API_* . Accept either.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

function authed(password) {
  return Boolean(process.env.WC_PASSWORD) && password === process.env.WC_PASSWORD;
}

// A ?u=<name> bucket gives each person a separate pick list under one shared
// password. Empty/absent => the original owner's bucket (unchanged key).
function keyForUser(who) {
  const slug = String(who || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 32);
  return slug ? `wc2026:picks:${slug}` : 'wc2026:picks';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!authed(req.headers['x-wc-password'])) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    const picks = (await redis.get(keyForUser(req.headers['x-wc-user']))) ?? [];
    return res.status(200).json({ picks });
  }

  if (req.method === 'POST') {
    const { password, who, picks } = req.body || {};
    if (!authed(password)) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    if (!Array.isArray(picks)) {
      return res.status(400).json({ error: 'picks must be an array' });
    }
    await redis.set(keyForUser(who), picks);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
