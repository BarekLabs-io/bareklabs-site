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
        const res = await fetch(`/api/quotes?symbols=${encodeURIComponent(keyRef.current)}`)
        if (!res.ok || cancelled) return
        const data: QuotesResponse = await res.json()
        if (cancelled) return
        const next: Record<string, LiveQuote> = {}
        for (const [ticker, q] of Object.entries(data.quotes)) {
          if (q) next[ticker] = q
        }
        setQuotes(next)
        setAsOf(data.asOf)
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
