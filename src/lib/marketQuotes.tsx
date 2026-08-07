import { createContext, useContext, type ReactNode } from 'react'
import { useLiveQuotes, type LiveQuote } from '@/lib/useLiveQuotes'
import { TAPE_SYMBOLS, MOVERS_SYMBOLS } from '@/data/marketTape'

/* The tape, the homepage ticker, the watchlist and the hero quote all want
 * prices for the same roster — the watchlist and hero quote are strict
 * subsets of the tape. Left to fetch independently they each issued their own
 * request on a different cache key, so one page load meant three function
 * invocations and three trips to Yahoo for overlapping data.
 *
 * One fetch of the full roster is shared here instead, and each consumer
 * indexes out the symbols it cares about. Anything on a different roster
 * (a company deep dive, an open position) still calls useLiveQuotes directly
 * — this is for the shared tape set only. */

type MarketQuotes = { quotes: Record<string, LiveQuote>; asOf: number | null }

const Ctx = createContext<MarketQuotes>({ quotes: {}, asOf: null })

export function MarketQuotesProvider({ children }: { children: ReactNode }) {
  /* One roster for the whole shared layer: the tape plus the movers pool.
   * Deduped because the mega-caps sit in both. */
  const value = useLiveQuotes(Array.from(new Set([...TAPE_SYMBOLS, ...MOVERS_SYMBOLS])))
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useMarketQuotes(): MarketQuotes {
  return useContext(Ctx)
}
