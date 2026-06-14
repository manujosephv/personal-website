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
  // TEMP diagnostic (remove before merge): reports whether the env vars are
  // present in THIS deployment's environment, without leaking any values.
  if (req.query && req.query.diag) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    return res.status(200).json({
      env: process.env.VERCEL_ENV || null,
      wcPasswordConfigured: Boolean(process.env.WC_PASSWORD),
      wcPasswordLength: (process.env.WC_PASSWORD || '').length,
      redisUrlConfigured: Boolean(url),
      redisTokenConfigured: Boolean(token),
    });
  }

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
