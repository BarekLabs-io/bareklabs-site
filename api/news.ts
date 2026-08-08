import type { VercelRequest, VercelResponse } from '@vercel/node'

/* Financial headlines for the home desk, via Alpha Vantage NEWS_SENTIMENT.
 *
 * The free tier allows 25 requests a day, so the function never fetches per
 * visitor: a warm instance serves from memory for CACHE_MS, and the CDN is
 * told to hold the response for the same window (stale-while-revalidate keeps
 * the panel filled while a refresh happens in the background). Worst case is
 * a cold instance per window — comfortably inside the daily quota.
 *
 * With no key configured the route says so with a 503; the client renders a
 * quiet "wire not connected" line rather than fake headlines. */

const CACHE_MS = 90 * 60_000
const LIMIT = 8

/* The wire is scoped to what the lab actually covers. Asking Alpha Vantage
 * for `topics=financial_markets` returns the whole US tape, which in practice
 * means filing-alert spam about companies nobody here follows. Querying by
 * ticker makes it our wire: a headline earns its place by being about a name
 * on the map. Kept deliberately short — the query is a relevance filter, not
 * the coverage list, and a long one dilutes it back toward noise. */
const WIRE_TICKERS = [
  'NVDA', 'AMD', 'TSM', 'ASML', 'AVGO', 'MU', 'ANET', 'INTC',
  'MSFT', 'GOOGL', 'META', 'AMZN', 'SMCI', 'NBIS', 'CRWV',
  'CEG', 'VST', 'GEV', 'VRT', 'ISRG', 'TMDX', 'RKLB',
].join(',')

/* Aggregators that republish machine-generated filing alerts. Their volume
 * swamps a LATEST sort — five of eight slots on the first live pull — and
 * none of it is reporting. Matched on the source name and on the URL shape
 * that carries the alerts, since the same outlet also files real pieces. */
const SPAM_SOURCES = new Set(['marketbeat', 'zacks commentary'])
const SPAM_URL = /\/instant-alerts\/|\/filing-/i

type Headline = {
  title: string
  source: string
  url: string
  /** Epoch ms of publication. */
  at: number | null
}

let cache: { at: number; items: Headline[] } | null = null

/** Alpha Vantage timestamps look like 20260808T093000. */
function parseAvTime(raw: unknown): number | null {
  if (typeof raw !== 'string') return null
  const m = raw.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/)
  if (!m) return null
  return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] ?? 0))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = (process.env.ALPHAVANTAGE_API_KEY ?? process.env.ALPHA_VANTAGE_API_KEY)?.trim()
  if (!key) {
    res.status(503).json({ ok: false, error: 'not_configured' })
    return
  }

  const now = Date.now()
  if (cache && now - cache.at < CACHE_MS) {
    res.setHeader('Cache-Control', 's-maxage=5400, stale-while-revalidate=86400')
    res.status(200).json({ ok: true, asOf: cache.at, items: cache.items })
    return
  }

  try {
    const url =
      'https://www.alphavantage.co/query?function=NEWS_SENTIMENT' +
      `&tickers=${encodeURIComponent(WIRE_TICKERS)}` +
      '&sort=LATEST&limit=200&apikey=' +
      encodeURIComponent(key)
    const upstream = await fetch(url)
    const body = (await upstream.json()) as { feed?: unknown[] }
    const feed = Array.isArray(body.feed) ? body.feed : []

    const items: Headline[] = []
    const seen = new Set<string>()
    for (const raw of feed) {
      const e = raw as Record<string, unknown>
      const title = typeof e.title === 'string' ? e.title.trim() : ''
      const url = typeof e.url === 'string' ? e.url : ''
      const source = typeof e.source === 'string' ? e.source : ''
      if (!title || !url || seen.has(title)) continue
      if (SPAM_SOURCES.has(source.toLowerCase()) || SPAM_URL.test(url)) continue

      /* A story counts as being about one of our names only if the provider
       * scores it that way. Alpha Vantage attaches a relevance per ticker;
       * below ~0.1 the name is a passing mention in a list, which is how a
       * ticker-scoped query still surfaces sector roundups about nothing. */
      const rel = Array.isArray(e.ticker_sentiment)
        ? (e.ticker_sentiment as { relevance_score?: string }[]).reduce(
            (m, ts) => Math.max(m, Number(ts?.relevance_score) || 0),
            0
          )
        : 1
      if (rel < 0.1) continue

      seen.add(title)
      items.push({ title, source, url, at: parseAvTime(e.time_published) })
      if (items.length >= LIMIT) break
    }

    /* An empty feed with a 200 is how Alpha Vantage reports a burned quota.
     * Serve the stale cache if there is one — old headlines beat none. */
    if (items.length === 0 && cache) {
      res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400')
      res.status(200).json({ ok: true, asOf: cache.at, items: cache.items })
      return
    }

    cache = { at: now, items }
    res.setHeader('Cache-Control', 's-maxage=5400, stale-while-revalidate=86400')
    res.status(200).json({ ok: true, asOf: now, items })
  } catch {
    if (cache) {
      res.status(200).json({ ok: true, asOf: cache.at, items: cache.items })
      return
    }
    res.status(502).json({ ok: false, error: 'upstream_failed' })
  }
}
