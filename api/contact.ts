import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHash } from 'node:crypto'

/* Contact intake for the lab.
 *
 * Spam defence, cheapest first, no third-party captcha and no tracking:
 *
 *  1. Honeypot — a field a human never sees and never fills. Bots that parse
 *     the DOM and fill everything trip it.
 *  2. Timing — the client stamps when the form was rendered and signs that
 *     stamp into the proof below. A submission under MIN_FILL_MS was not
 *     typed by a person; one over MAX_AGE_MS is a replay of an old page.
 *  3. Proof of work — the client must find a nonce whose SHA-256 over the
 *     message's own fields starts with DIFFICULTY_BITS zero bits. That is
 *     well under a second of CPU for one message, which nobody notices, and about
 *     a second per message for a bulk sender, which is the whole point. It is
 *     stateless: the server recomputes the same hash and checks it, so there
 *     is nothing to store and nothing to expire.
 *  4. Rate limit — per IP, in the instance's memory. Warm-instance only, so
 *     it is a speed bump on top of the proof rather than the main defence.
 *
 * Delivery is via Resend when RESEND_API_KEY is set. With no key the route
 * answers 503 and says so: a form that silently drops mail while showing a
 * success tick is worse than one that plainly refuses.
 */

const DIFFICULTY_BITS = 16
const MIN_FILL_MS = 3_000
const MAX_AGE_MS = 45 * 60_000
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 15 * 60_000
const MAX_LEN = { name: 120, email: 200, subject: 160, message: 5000 }

const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t > RATE_WINDOW_MS)) hits.delete(k)
  return recent.length > RATE_LIMIT
}

/** Leading zero bits of a hex digest. */
function leadingZeroBits(hex: string): number {
  let bits = 0
  for (const ch of hex) {
    const v = parseInt(ch, 16)
    if (v === 0) {
      bits += 4
      continue
    }
    bits += Math.clz32(v) - 28
    break
  }
  return bits
}

export const proofInput = (email: string, ts: number, nonce: number) => `${email}|${ts}|${nonce}`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) ?? {}
  const { name, email, subject, message, topic, ts, nonce, website } = body as Record<string, unknown>

  // 1. Honeypot. Named to look worth filling; hidden from people in the form.
  if (typeof website === 'string' && website.trim() !== '') {
    // Answer 200 so a bot cannot tell the trap from a delivery.
    res.status(200).json({ ok: true })
    return
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const f = { name: str(name), email: str(email), subject: str(subject), message: str(message), topic: str(topic) }

  if (!f.email || !f.message) {
    res.status(400).json({ ok: false, error: 'missing_fields' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) {
    res.status(400).json({ ok: false, error: 'bad_email' })
    return
  }
  for (const [k, max] of Object.entries(MAX_LEN)) {
    if ((f as Record<string, string>)[k].length > max) {
      res.status(400).json({ ok: false, error: 'too_long', field: k })
      return
    }
  }

  // 2. Timing, carried in the same value the proof commits to.
  const stamp = Number(ts)
  const age = Date.now() - stamp
  if (!Number.isFinite(stamp) || age < MIN_FILL_MS || age > MAX_AGE_MS) {
    res.status(400).json({ ok: false, error: 'timing' })
    return
  }

  // 3. Proof of work.
  const n = Number(nonce)
  if (!Number.isFinite(n)) {
    res.status(400).json({ ok: false, error: 'proof_missing' })
    return
  }
  const digest = createHash('sha256').update(proofInput(f.email, stamp, n)).digest('hex')
  if (leadingZeroBits(digest) < DIFFICULTY_BITS) {
    res.status(400).json({ ok: false, error: 'proof_invalid' })
    return
  }

  // 4. Rate limit.
  const fwd = req.headers['x-forwarded-for']
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' })
    return
  }

  const key = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO?.trim()
  if (!key || !to) {
    res.status(503).json({ ok: false, error: 'not_configured' })
    return
  }

  try {
    const upstream = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM?.trim() || 'BAREK LABS <onboarding@resend.dev>',
        to: [to],
        reply_to: f.email,
        subject: `[${f.topic || 'GENERAL'}] ${f.subject || 'New message from bareklabs.com'}`,
        text: `From: ${f.name || '(no name)'} <${f.email}>\nTopic: ${f.topic || 'GENERAL'}\n\n${f.message}`,
      }),
    })
    if (!upstream.ok) {
      // Never echo the provider's body: it can carry the key back.
      res.status(502).json({ ok: false, error: 'delivery_failed', status: upstream.status })
      return
    }
    res.status(200).json({ ok: true })
  } catch {
    res.status(502).json({ ok: false, error: 'delivery_failed' })
  }
}
