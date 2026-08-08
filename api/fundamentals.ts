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

  /* What the free plan actually allows, established by trying every route and
   * reading each answer rather than guessing:
   *
   *   v3/*            403 — legacy, closed to accounts without a pre-Aug-2025 sub
   *   stable/quote    402 — a comma-separated `symbol` is a premium "special endpoint"
   *   stable/profile  200 — works, but the same batch restriction applies, so a
   *                         multi-symbol call comes back as an empty array
   *
   * So: stable/profile, one symbol per request. An empty 200 was the only
   * thing separating a working call from a broken one, which is exactly the
   * failure a silent catch would have hidden forever.
   *
   * Concurrency is capped: a 25-symbol batch means 25 upstream requests inside
   * one invocation, the function has a wall-clock limit, and firing them all
   * at once also reads as abuse to a rate limiter.
   */
  const CONCURRENCY = 6

  /** Never let the key reach a response body or a log line. */
  const scrub = (t: string) => t.replace(new RegExp(key, 'g'), '***').slice(0, 240)

  const attempts: { route: string; status: number | null; note: string | null }[] = []
  let matched = 0

  const note = (route: string, status: number | null, text: string) => {
    // A handful of examples is diagnostic; eighty is noise.
    if (attempts.length < 3) attempts.push({ route, status, note: scrub(text) })
  }

  async function fetchOne(symbol: string): Promise<void> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
    try {
      const url =
        `https://financialmodelingprep.com/stable/profile?symbol=${encodeURIComponent(symbol)}` +
        `&apikey=${encodeURIComponent(key)}`
      const upstream = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
      const text = await upstream.text()
      if (!upstream.ok) {
        note(symbol, upstream.status, text)
        return
      }
      const json: unknown = JSON.parse(text)
      const row = Array.isArray(json) ? (json[0] as Record<string, unknown> | undefined) : undefined
      if (!row) {
        note(symbol, upstream.status, 'empty array — symbol not covered by this provider')
        return
      }
      matched++
      fundamentals[symbol] = {
        marketCap: finite(row.marketCap) ?? finite(row.mktCap),
        peTrailing: finite(row.pe) ?? finite(row.peRatio),
        eps: finite(row.eps),
        shares: finite(row.sharesOutstanding),
        price: finite(row.price),
      }
    } catch (e) {
      note(symbol, null, e instanceof Error ? e.message : String(e))
    } finally {
      clearTimeout(timer)
    }
  }

  const queue = [...symbols]
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      for (let next = queue.shift(); next; next = queue.shift()) await fetchOne(next)
    })
  )

  const answered = matched > 0 ? 'stable/profile' : null

  /* Key length goes to the function log, never to the response body. It is a
   * real diagnostic — a key rejected at its full expected length is wrong or
   * inactive, a short one was truncated on paste, and those need opposite
   * fixes — but it is also a property of a secret, and a public endpoint has
   * no business publishing one. The Vercel logs are the right audience. */
  if (matched === 0) console.warn(`[fundamentals] no symbol matched · key length ${key.length}`)

  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  res.status(200).json({
    asOf: Date.now(),
    configured: true,
    // Which surface answered — cheap to publish and it explains an empty table.
    source: answered,
    /* The per-symbol failure notes are only worth publishing when there is a
     * failure to explain. On a healthy response they are noise, and noise in a
     * public body is surface area nobody asked for. Key-scrubbed either way. */
    ...(matched === 0 ? { attempts } : {}),
    fundamentals,
  })
}
