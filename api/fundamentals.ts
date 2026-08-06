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

  const key = process.env.FMP_API_KEY
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

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    const url =
      `https://financialmodelingprep.com/api/v3/quote/${encodeURIComponent(symbols.join(','))}` +
      `?apikey=${encodeURIComponent(key)}`
    const upstream = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
    if (upstream.ok) {
      const json: unknown = await upstream.json()
      // Anything that is not the array we expect is treated as no data at all,
      // rather than half-parsed into plausible-looking nulls.
      if (Array.isArray(json)) {
        for (const row of json as Record<string, unknown>[]) {
          const sym = typeof row?.symbol === 'string' ? row.symbol : null
          if (!sym || !(sym in fundamentals)) continue
          fundamentals[sym] = {
            marketCap: finite(row.marketCap),
            peTrailing: finite(row.pe),
            eps: finite(row.eps),
            shares: finite(row.sharesOutstanding),
            price: finite(row.price),
          }
        }
      }
    }
  } catch {
    // Network, timeout or shape — every one of them means "no fundamentals
    // this round", and the caller falls back to the researched snapshot.
  } finally {
    clearTimeout(timer)
  }

  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).json({ asOf: Date.now(), configured: true, fundamentals })
}
