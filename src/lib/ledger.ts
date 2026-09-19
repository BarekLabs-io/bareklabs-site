import { en } from '@/i18n/dict-en'
import { CASH_WEIGHTS } from '@/data/bookAllocation'

/* Every statistic the tracker publishes about its own record is derived from
 * the record. The page used to carry a hardcoded dash for hit rate and
 * expectancy — correct while nothing had closed, and silently wrong the day a
 * closed trade landed in the dictionaries. Same rule, same reason, as
 * src/lib/coverage.ts.
 *
 * The English dictionary is the canonical book: `Dict = typeof en` makes the
 * other two copies of it, so three languages cannot publish three different
 * hit rates for one ledger. COVERAGE reads `ideasEn` for every locale in the
 * same way.
 *
 * Results are carried as numbers, never parsed back out of a display string
 * like '+12.4%': a statistic resting on a typography choice is not a
 * statistic. The page formats; this file counts. */

/* Funds are listed in the ledger but sit outside the counters — a fund is not
 * a trade the desk made, and mixing them would flatter both the hit rate and
 * the average. `inStats` is the switch, and the page says so in words. */
const COUNTED = en.stocks.closed.filter((c) => c.inStats)

const n = COUNTED.length
const wins = COUNTED.filter((c) => c.returnPct > 0).length

/* A flat exit is not a win. The one trade that closed at exactly 0.00 % counts
 * against the hit rate rather than for it — the conservative reading, and the
 * one the source statements were reconciled against. */
const mean = n === 0 ? null : COUNTED.reduce((a, c) => a + c.returnPct, 0) / n

/* Weighted by the share of capital each trade actually took, so a 400 % move
 * on a sliver of the book does not read like a 400 % book. Shares are
 * published to two decimals and sum to 100, so this reproduces the source
 * reconciliation to within a rounding step — the site prints what it can
 * recompute, not a figure typed in from elsewhere. */
function weighted(pick: (c: (typeof COUNTED)[number]) => number): number | null {
  if (n === 0) return null
  return COUNTED.reduce((a, c) => a + (pick(c) * (c.capitalSharePct ?? 0)) / 100, 0)
}

export const LEDGER = {
  /** Closed trades inside the counters — the sample size behind every ratio. */
  counted: n,
  /** Closed trades on the page, funds included. */
  listed: en.stocks.closed.length,
  /** Share of counted trades that ended positive, in percent. */
  hitRate: n === 0 ? null : (wins / n) * 100,
  /** Mean result per counted trade, in local currency, percent. */
  meanReturn: mean,
  /** Capital-weighted result, local currency, percent. */
  weightedReturn: weighted((c) => c.returnPct),
  /** Same, in SEK and net of fees — the number a Swedish statement would show. */
  weightedReturnSekNet: weighted((c) => c.returnPctSekNet),
} as const

/* The book is not the part of it that happens to be in the market. Weights are
 * published per line and added up here, so the three allocation figures are the
 * same numbers the tables show rather than a second set typed in beside them —
 * publishing 19 % equities next to weights that sum to 100 % would be two
 * different books on one page.
 *
 * The three shares sum to 100 give or take a rounding step: each line is
 * published to two decimals, and the page prints what it can recompute. */
function share(weights: readonly { weightPct: number | null }[]): number {
  return weights.reduce((a, w) => a + (w.weightPct ?? 0), 0)
}

export const ALLOCATION = {
  stocks: share(en.stocks.open),
  crypto: share(en.crypto.positions),
  cash: share(CASH_WEIGHTS),
  get total(): number {
    return this.stocks + this.crypto + this.cash
  },
}
