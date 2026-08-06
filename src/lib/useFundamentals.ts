import { useEffect, useRef, useState } from 'react'

/* Reads /api/fundamentals. Like useLiveQuotes, every failure is silent: the
 * caller keeps whatever researched figure it already had. `configured` is
 * exposed so a maintenance view can tell "the provider is not set up" apart
 * from "the provider returned nothing for this ticker" — two very different
 * problems that look identical from a blank cell. */

export type Fundamental = {
  marketCap: number | null
  peTrailing: number | null
  eps: number | null
  shares: number | null
  price: number | null
}

type Response = {
  asOf: number
  configured: boolean
  source?: string | null
  upstreamStatus?: number | null
  note?: string | null
  keyLength?: number | null
  fundamentals: Record<string, Fundamental | null>
}

/* Fundamentals move on earnings, so there is no reason to poll them the way
 * prices are polled. One fetch per mount, served from the edge cache. */
const MAX_PER_REQUEST = 50

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

export function useFundamentals(tickers: string[]): {
  fundamentals: Record<string, Fundamental>
  configured: boolean | null
  asOf: number | null
  /** Which upstream surface answered, and what it said when none did. */
  diagnostic: { source: string | null; status: number | null; note: string | null; keyLength: number | null } | null
} {
  const [fundamentals, setFundamentals] = useState<Record<string, Fundamental>>({})
  const [configured, setConfigured] = useState<boolean | null>(null)
  const [asOf, setAsOf] = useState<number | null>(null)
  const [diagnostic, setDiagnostic] = useState<{ source: string | null; status: number | null; note: string | null; keyLength: number | null } | null>(null)
  const key = tickers.join(',')
  const keyRef = useRef(key)
  keyRef.current = key

  useEffect(() => {
    if (!key) return
    let cancelled = false

    ;(async () => {
      try {
        const batches = chunk(keyRef.current.split(','), MAX_PER_REQUEST)
        const responses = await Promise.all(
          batches.map((b) =>
            fetch(`/api/fundamentals?symbols=${encodeURIComponent(b.join(','))}`)
              .then((r) => (r.ok ? (r.json() as Promise<Response>) : null))
              .catch(() => null)
          )
        )
        if (cancelled) return
        const next: Record<string, Fundamental> = {}
        let anyConfigured = false
        let latest = 0
        for (const data of responses) {
          if (!data) continue
          anyConfigured = anyConfigured || data.configured
          latest = Math.max(latest, data.asOf)
          for (const [t, f] of Object.entries(data.fundamentals)) {
            if (f) next[t] = f
          }
        }
        setConfigured(anyConfigured)
        const first = responses.find((r) => r)
        if (first) setDiagnostic({ source: first.source ?? null, status: first.upstreamStatus ?? null, note: first.note ?? null, keyLength: first.keyLength ?? null })
        setAsOf(latest || null)
        if (Object.keys(next).length > 0) setFundamentals(next)
      } catch {
        // Leave the caller on its researched figures.
      }
    })()

    return () => {
      cancelled = true
    }
  }, [key])

  return { fundamentals, configured, asOf, diagnostic }
}
