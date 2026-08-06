/* Market caps in companies.ts are prose strings written by whoever researched
 * each name — "~$404B (Aug 5, 2026)", "~¥24.4T (~$160B)", "NT$1.52T",
 * "~EUR 17-18B (~$25-26B, noisy)", "€15M–€58M". To size anything by them we
 * need one comparable number per ticker, in one currency.
 *
 * Two rules, in order:
 *   1. If the string already carries a USD figure (most non-USD entries quote
 *      one in parentheses), use that — it came from the same research pass as
 *      the native figure and needs no assumption from us.
 *   2. Otherwise convert the native figure with the approximate rates below.
 *
 * Those rates are deliberately coarse and are used ONLY to scale a bubble.
 * A derived number must never be *displayed* as a sourced market cap — the
 * UI shows the original researched string. Sizing is a visual encoding; it
 * tolerates being approximate in a way a quoted figure does not. */

/* Approximate FX, USD per 1 unit. Order-of-magnitude accuracy is all a radius
 * needs; refresh if a rate moves enough to change relative bubble sizes. */
const USD_PER: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  CHF: 1.12,
  JPY: 0.0066,
  KRW: 0.00073,
  TWD: 0.031,
  CNY: 0.14,
  SEK: 0.095,
  AUD: 0.66,
  CAD: 0.73,
}

const MULTIPLIER: Record<string, number> = { T: 1e12, B: 1e9, M: 1e6, K: 1e3 }

/** Averages "17-18", "22–28" style ranges; returns a single number otherwise. */
function midpoint(a: string, b?: string): number {
  const x = parseFloat(a.replace(/,/g, ''))
  if (b == null) return x
  const y = parseFloat(b.replace(/,/g, ''))
  return Number.isFinite(y) ? (x + y) / 2 : x
}

/* A number, optionally a range, optionally followed by a T/B/M/K multiplier. */
const NUM = String.raw`(\d[\d,]*(?:\.\d+)?)\s*(?:[-–—]\s*(\d[\d,]*(?:\.\d+)?))?\s*([TBMK])?`

/* "$160B", "~$25-26B" — but NOT the "$" inside "NT$" (New Taiwan dollar). */
const USD_RE = new RegExp(String.raw`(?<!NT)\$\s*` + NUM, 'i')
/* Bare leading number for strings like "~EUR 17-18B" or "NT$1.52T". */
const ANY_RE = new RegExp(NUM)

function toNumber(m: RegExpMatchArray | null): number | null {
  if (!m) return null
  const value = midpoint(m[1], m[2])
  if (!Number.isFinite(value)) return null
  const mult = m[3] ? (MULTIPLIER[m[3].toUpperCase()] ?? 1) : 1
  return value * mult
}

/**
 * Best-effort market cap in USD for relative sizing.
 * @param raw      the researched market-cap string, as written in companies.ts
 * @param currency the ticker's listing currency, from valueChain.currencyOf
 * @returns USD amount, or null when the string carries no usable figure
 */
export function parseMarketCapUsd(raw: string | undefined | null, currency = 'USD'): number | null {
  if (!raw) return null

  // 1. An explicit USD figure anywhere in the string wins.
  const usd = toNumber(raw.match(USD_RE))
  if (usd != null && usd > 0) return usd

  // 2. Fall back to the native figure at an approximate rate.
  const native = toNumber(raw.match(ANY_RE))
  if (native == null || native <= 0) return null
  const rate = USD_PER[currency.toUpperCase()]
  if (rate == null) return null
  return native * rate
}

/** Compact display for a USD amount derived above — always mark it as approximate. */
export function formatUsdCompact(usd: number): string {
  if (usd >= 1e12) return `$${(usd / 1e12).toFixed(usd / 1e12 >= 10 ? 0 : 1)}T`
  if (usd >= 1e9) return `$${(usd / 1e9).toFixed(usd / 1e9 >= 10 ? 0 : 1)}B`
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(0)}M`
  return `$${usd.toFixed(0)}`
}
