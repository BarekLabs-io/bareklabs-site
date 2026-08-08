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

/* The wire is scoped to what the lab actually covers — but the scoping is
 * done here, not by the provider. Alpha Vantage's `tickers` parameter is an
 * AND: `tickers=NVDA,AMD` asks for articles mentioning both at once, so a
 * 22-name list matches nothing and returns an empty feed. The query therefore
 * stays broad and this list is applied to each article's own ticker_sentiment
 * scores, which gives the OR semantics the wire actually wants. */
const WIRE_TICKERS = new Set([
  'NVDA', 'AMD', 'TSM', 'ASML', 'AVGO', 'MU', 'ANET', 'INTC', 'AMAT', 'LRCX', 'KLAC',
  'MSFT', 'GOOGL', 'META', 'AMZN', 'SMCI', 'NBIS', 'CRWV', 'ORCL', 'PLTR', 'DELL',
  'CEG', 'VST', 'GEV', 'VRT', 'ETN', 'PWR', 'STRL', 'CCJ', 'OKLO', 'SMR', 'BE',
  'ISRG', 'TMDX', 'RXRX', 'RKLB', 'ASTS', 'MRVL', 'CRDO', 'ALAB', 'AMKR', 'WDC',
])

/** Highest relevance the provider assigns this article to a name we cover. */
function coverageRelevance(entry: Record<string, unknown>): number {
  const ts = entry.ticker_sentiment
  if (!Array.isArray(ts)) return 0
  return (ts as { ticker?: string; relevance_score?: string }[]).reduce((best, row) => {
    if (!row?.ticker || !WIRE_TICKERS.has(row.ticker.toUpperCase())) return best
    return Math.max(best, Number(row.relevance_score) || 0)
  }, 0)
}

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
      '&topics=technology&sort=LATEST&limit=200&apikey=' +
      encodeURIComponent(key)
    const upstream = await fetch(url)
    const body = (await upstream.json()) as { feed?: unknown[] }
    const feed = Array.isArray(body.feed) ? body.feed : []

    /* Two buckets. `ours` is anything the provider scores as materially about
     * a name we cover; `rest` is the remaining tech news. The wire fills from
     * ours first and only tops up from rest — so it prefers our universe but
     * never goes blank on a quiet morning, which would read as a broken feed
     * rather than as a quiet one. */
    const ours: Headline[] = []
    const rest: Headline[] = []
    const seen = new Set<string>()
    for (const raw of feed) {
      const e = raw as Record<string, unknown>
      const title = typeof e.title === 'string' ? e.title.trim() : ''
      const url = typeof e.url === 'string' ? e.url : ''
      const source = typeof e.source === 'string' ? e.source : ''
      if (!title || !url || seen.has(title)) continue
      if (SPAM_SOURCES.has(source.toLowerCase()) || SPAM_URL.test(url)) continue
      seen.add(title)

      const item = { title, source, url, at: parseAvTime(e.time_published) }
      // Below ~0.15 the ticker is a passing mention in a list, not a subject.
      ;(coverageRelevance(e) >= 0.15 ? ours : rest).push(item)
    }

    const items = [...ours, ...rest].slice(0, LIMIT)

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
