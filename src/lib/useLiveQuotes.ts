import { useEffect, useRef, useState } from 'react'

/* Talks to /api/quotes (server-side Yahoo Finance proxy — see api/quotes.ts
 * for why this is price-only, no market cap/multiples). Every caller must
 * treat a missing/failed entry as "no live data for this ticker" and fall
 * back to the researched static snapshot already in companies.ts — never
 * block rendering on this, and never show a stale spinner in its place. */

export type LiveQuote = {
  price: number
  changePercent: number | null
  currency: string | null
  marketTime: number | null
}

type QuotesResponse = { asOf: number; quotes: Record<string, LiveQuote | null> }

const REFRESH_MS = 90_000

/* One request fans out to one upstream fetch per symbol inside the serverless
 * function, and the function has a hard wall-clock limit. Past a few dozen
 * symbols a single call risks timing out and returning nothing at all, so a
 * long roster is split into parallel requests instead — each safely under the
 * limit, each separately edge-cached, all in flight at once. */
const MAX_PER_REQUEST = 25

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/** Fetches live prices for a fixed set of tickers. Silently no-ops on any
 * failure — callers read `quotes[ticker]` and fall back when it's undefined. */
export function useLiveQuotes(tickers: string[]): { quotes: Record<string, LiveQuote>; asOf: number | null } {
  const [quotes, setQuotes] = useState<Record<string, LiveQuote>>({})
  const [asOf, setAsOf] = useState<number | null>(null)
  const key = tickers.join(',')
  const keyRef = useRef(key)
  keyRef.current = key

  useEffect(() => {
    if (!key) return
    let cancelled = false

    const load = async () => {
      try {
        const batches = chunk(keyRef.current.split(','), MAX_PER_REQUEST)
        const responses = await Promise.all(
          batches.map((b) =>
            fetch(`/api/quotes?symbols=${encodeURIComponent(b.join(','))}`)
              .then((r) => (r.ok ? (r.json() as Promise<QuotesResponse>) : null))
              .catch(() => null)
          )
        )
        if (cancelled) return
        const next: Record<string, LiveQuote> = {}
        let latest = 0
        for (const data of responses) {
          if (!data) continue
          latest = Math.max(latest, data.asOf)
          for (const [ticker, q] of Object.entries(data.quotes)) {
            if (q) next[ticker] = q
          }
        }
        // A batch that failed leaves its symbols absent, which the UI already
        // renders as a dash — better than dropping the batches that worked.
        if (Object.keys(next).length === 0) return
        setQuotes(next)
        setAsOf(latest || Date.now())
      } catch {
        // No live data this round — existing state (or the caller's static
        // fallback) stands. Never surface this as an error to the page.
      }
    }

    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [key])

  return { quotes, asOf }
}
