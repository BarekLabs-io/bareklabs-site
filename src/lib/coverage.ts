import { companies } from '@/data/companies'
import { countryOf } from '@/data/valueChain'

/* Counts the site publishes about its own coverage belong to the data, never to
 * the copy. The home page advertised 68 companies against a real 118, and 13
 * markets against 14, because those numbers lived in three translation files
 * while the roster grew somewhere else. Anything the site claims about its own
 * size is derived here and interpolated into the translated string, so the two
 * cannot drift apart again. */
const TICKERS = Object.keys(companies)

export const COVERAGE = {
  tickers: TICKERS.length,
  countries: new Set(TICKERS.map(countryOf)).size,
} as const

type CoverageKey = keyof typeof COVERAGE

/* Substitutes {tickers}, {countries}, and any caller-supplied token in a
 * translated string. An unknown token is left written as-is: a typo should be
 * visible on screen rather than silently rendering an empty slot. */
export function fillCoverage(text: string, extra: Record<string, number | string> = {}): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) => {
    const value = extra[key] ?? COVERAGE[key as CoverageKey]
    return value === undefined ? whole : String(value)
  })
}
