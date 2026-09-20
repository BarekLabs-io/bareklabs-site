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

/* Return since the ledger's first purchase, derived rather than published as a
 * figure. Every line of the Nordnet equity book carries the share of cost it
 * took and what it returned on that cost, so the book-level number is the
 * weighted sum — it moves when a line moves, and it cannot drift away from the
 * lines a reader can add up for themselves.
 *
 * The basis is cost of the positions, not cash that left the account. The two
 * differ by 2.1 points because a position received in a share swap is carried
 * at the cost booked at the transfer AND its predecessor kept its own cost, so
 * the same money appears twice in the denominator. Cost basis is the one the
 * ledger already publishes per line (capitalSharePct), and it is the one that
 * decomposes exactly, so it is the one shown. */
const BOOK = [...en.stocks.open, ...en.stocks.closed].filter(
  (p): p is typeof p & { costSharePct: number; totalReturnPct: number } =>
    typeof p.costSharePct === 'number' && typeof p.totalReturnPct === 'number'
)

export const SINCE_INCEPTION = {
  /** Lines carrying a cost share — the Nordnet equity book, funds excluded. */
  lines: BOOK.length,
  /** Should read 100: a missing share silently understates the return. */
  coverage: BOOK.reduce((a, p) => a + p.costSharePct, 0),
  /** Weighted total return, in percent. */
  pct: BOOK.length === 0 ? null : BOOK.reduce((a, p) => a + (p.costSharePct * p.totalReturnPct) / 100, 0),
} as const
