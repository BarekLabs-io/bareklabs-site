import type { VercelRequest, VercelResponse } from '@vercel/node'

/* Fundamentals proxy — market cap, trailing P/E, EPS and share count.
 *
 * The quote feed (api/quotes.ts) carries price and nothing else, which is why
 * every valuation multiple on this site has been a hand-dated snapshot. Those
 * snapshots drift, and when they drift the multiples derived from them are
 * wrong with no way for a reader to tell. This route gives the site a second,
 * independent read on the two figures that matter most.
 *
 * Deliberate choices:
 *
 *  - FMP's batch /quote endpoint takes every symbol in ONE request and returns
 *    marketCap, pe, eps and sharesOutstanding. Per-symbol endpoints (ratios,
 *    key-metrics) would give P/S and P/B too, but at one call per ticker they
 *    would burn a free-tier daily budget in a single page load. One call an
 *    hour is affordable forever; eighty is not.
 *  - Cached hard. Fundamentals move on earnings, not on ticks, so an hour of
 *    edge cache with a day of stale-while-revalidate costs at most a couple of
 *    dozen upstream calls a day.
 *  - No key, no error: the route answers 200 with an empty set, and callers
 *    keep showing the researched snapshot. A missing key must degrade, not
 *    break the page.
 *  - The key is read from the environment and never leaves the server.
 */

type Fundamental = {
  marketCap: number | null
  peTrailing: number | null
  eps: number | null
  shares: number | null
  /** FMP's own price, kept so a caller can sanity-check the cap against it. */
  price: number | null
}

const MAX_SYMBOLS = 100
const UPSTREAM_TIMEOUT_MS = 8000

function finite(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) && v !== 0 ? v : null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.symbols
  const param = Array.isArray(raw) ? raw[0] : raw
  const symbols = (param ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_SYMBOLS)

  if (symbols.length === 0) {
    res.status(400).json({ error: 'symbols query param required, comma-separated' })
    return
  }

  /* Trimmed: pasting a key into a dashboard field very often carries a
   * trailing newline or space, which survives into the environment variable
   * and gets percent-encoded into the request — the provider then rejects a
   * key that looks correct everywhere a human would inspect it. */
  const key = process.env.FMP_API_KEY?.trim()
  if (!key) {
    // Not an error state — the site is designed to work without this.
    res.setHeader('Cache-Control', 'public, s-maxage=60')
    res.status(200).json({ asOf: Date.now(), configured: false, fundamentals: {} })
    return
  }

  const fundamentals: Record<string, Fundamental | null> = {}
  symbols.forEach((s) => {
    fundamentals[s] = null
  })

  /* Endpoint entitlement differs by plan, and FMP answers a route outside your
   * plan with 401 "Invalid API KEY" — the same message as a genuinely bad key.
   * That one misleading string cost a full debugging round here.
   *
   * /profile is "Profile and Reference Data", which the free Basic plan does
   * include, and it carries mktCap and price — everything this route needs.
   * /quote sits behind the paid tiers, so it is tried last and only helps if
   * the account is later upgraded. Order matters: cheapest entitlement first.
   */
  const list = encodeURIComponent(symbols.join(','))
  const ATTEMPTS = [
    { name: 'v3/profile', url: `https://financialmodelingprep.com/api/v3/profile/${list}` },
    { name: 'stable/profile', url: `https://financialmodelingprep.com/stable/profile?symbol=${list}` },
    { name: 'stable/quote', url: `https://financialmodelingprep.com/stable/quote?symbol=${list}` },
    { name: 'v3/quote', url: `https://financialmodelingprep.com/api/v3/quote/${list}` },
  ]

  /** Never let the key reach a response body or a log line. */
  const scrub = (t: string) => t.replace(new RegExp(key, 'g'), '***').slice(0, 240)

  let answered: string | null = null
  let upstreamStatus: number | null = null
  let upstreamNote: string | null = null
  let matched = 0

  for (const attempt of ATTEMPTS) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
    try {
      const joiner = attempt.url.includes('?') ? '&' : '?'
      const upstream = await fetch(`${attempt.url}${joiner}apikey=${encodeURIComponent(key)}`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      })
      upstreamStatus = upstream.status
      const text = await upstream.text()
      if (!upstream.ok) {
        upstreamNote = scrub(text)
        continue
      }
      let json: unknown
      try {
        json = JSON.parse(text)
      } catch {
        upstreamNote = `unparseable body: ${scrub(text)}`
        continue
      }
      if (!Array.isArray(json)) {
        // FMP reports plan and key problems as a JSON object, not an array.
        upstreamNote = scrub(typeof json === 'object' ? JSON.stringify(json) : String(json))
        continue
      }
      for (const row of json as Record<string, unknown>[]) {
        const sym = typeof row?.symbol === 'string' ? row.symbol : null
        if (!sym || !(sym in fundamentals)) continue
        matched++
        // /profile calls it mktCap, /quote calls it marketCap. Same figure.
        fundamentals[sym] = {
          marketCap: finite(row.marketCap) ?? finite(row.mktCap),
          peTrailing: finite(row.pe) ?? finite(row.peRatio),
          eps: finite(row.eps),
          shares: finite(row.sharesOutstanding),
          price: finite(row.price),
        }
      }
      if (matched > 0) {
        answered = attempt.name
        upstreamNote = null
        break
      }
      upstreamNote = `${attempt.name}: array of ${json.length} rows, none matching the requested symbols`
    } catch (e) {
      upstreamNote = `${attempt.name}: ${scrub(e instanceof Error ? e.message : String(e))}`
    } finally {
      clearTimeout(timer)
    }
  }

  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json({
    asOf: Date.now(),
    configured: true,
    // Diagnostics, so a failure says which surface answered and what it said
    // rather than presenting as an empty table. Key-scrubbed.
    source: answered,
    upstreamStatus,
    note: upstreamNote,
    /* Length only, never any part of the key. A key rejected at full expected
     * length is a wrong or inactive key; a short one was truncated on paste.
     * Those need opposite fixes, and nothing else distinguishes them. */
    keyLength: key.length,
    fundamentals,
  })
}
