/* Cash is part of the book and has no ledger row of its own: a weight computed
 * over invested positions only makes an 80 %-cash book read like a fully
 * invested one. These three lines are what the equity and crypto ledgers are
 * measured against, so the allocation below adds up to the whole book rather
 * than to the part of it that happens to be in the market.
 *
 * Percentages only — the broker statements behind them carry amounts, and
 * amounts never reach this repository (CLAUDE.md § 7). */
export const CASH_WEIGHTS: { broker: string; weightPct: number }[] = [
  { broker: 'IBKR', weightPct: 78.92 },
  { broker: 'Nordnet', weightPct: 0.22 },
  { broker: 'Binance', weightPct: 0.0 },
]

/** The date the whole book was weighed. Nordnet's leg is the 18th close. */
export const BOOK_AS_OF = '2026.09.19'
