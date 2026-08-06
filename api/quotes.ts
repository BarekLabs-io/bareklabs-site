import type { VercelRequest, VercelResponse } from '@vercel/node'

/* Live-price proxy — server-side only, so the browser never CORS-fails and
 * we can cache at the edge instead of hammering Yahoo per visitor.
 *
 * Deliberately narrow in scope: Yahoo's public v8 "chart" endpoint (no key,
 * no crumb/cookie auth required, unlike the newer-locked-down v7 "quote"
 * endpoint) reliably gives regularMarketPrice/previousClose/marketTime and
 * nothing else useful for this site — no market cap, no P/E, no EV/EBITDA.
 * So this route only ever returns *price*. Market cap and every valuation
 * multiple stay as the researched, dated snapshot already in companies.ts —
 * this route does not touch them, and callers must not imply it does.
 *
 * Ticker format matches what's already in valueChain.ts/companies.ts
 * (AAPL, 6857.T, 000660.KS, ASM.AS, ALHAF.PA, ...) since that's Yahoo's own
 * suffix convention and the same one this dataset was originally researched
 * against — no remapping needed.
 *
 * This is an unofficial, undocumented endpoint: it can change or start
 * blocking without notice. Every failure — network, shape, timeout — must
 * degrade to "omit this symbol", never throw, so the frontend's fallback to
 * the static snapshot always has a clean path. */

type Quote = {
  price: number
  changePercent: number | null
  currency: string | null
  marketTime: number | null
}

const MAX_SYMBOLS = 100
const UPSTREAM_TIMEOUT_MS = 6000

async function fetchOne(symbol: string): Promise<Quote | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        // Yahoo's chart endpoint 4xx's some clients with no UA at all.
        'User-Agent': 'Mozilla/5.0 (compatible; BarekLabsResearchTerminal/1.0)',
        Accept: 'application/json',
      },
    })
    if (!res.ok) return null
    const json = await res.json()
    const meta = json?.chart?.result?.[0]?.meta
    const price = meta?.regularMarketPrice
    if (typeof price !== 'number') return null
    const prevClose = typeof meta?.previousClose === 'number' ? meta.previousClose : meta?.chartPreviousClose
    const changePercent = typeof prevClose === 'number' && prevClose !== 0 ? ((price - prevClose) / prevClose) * 100 : null
    return {
      price,
      changePercent,
      currency: typeof meta?.currency === 'string' ? meta.currency : null,
      marketTime: typeof meta?.regularMarketTime === 'number' ? meta.regularMarketTime * 1000 : null,
    }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.symbols
  const symbolsParam = Array.isArray(raw) ? raw[0] : raw
  const symbols = (symbolsParam ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_SYMBOLS)

  if (symbols.length === 0) {
    res.status(400).json({ error: 'symbols query param required, comma-separated' })
    return
  }

  const results = await Promise.all(symbols.map((s) => fetchOne(s)))
  const quotes: Record<string, Quote | null> = {}
  symbols.forEach((s, i) => {
    quotes[s] = results[i]
  })

  // Edge-cache for 2 minutes, serve stale up to 10 while revalidating in the
  // background — keeps this "15-20 min delayed at worst" without refetching
  // Yahoo on every single page load from every visitor.
  res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600')
  res.status(200).json({ asOf: Date.now(), quotes })
}
