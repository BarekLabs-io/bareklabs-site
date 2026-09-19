import { companies } from '@/data/companies'
import { countryOf } from '@/data/valueChain'
import { ideasEn } from '@/i18n/ideas-en'
import { en } from '@/i18n/dict-en'

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
  ideas: ideasEn.length,
  /* The research-pillar card advertised 5 NOTES beside a list that is free to
   * grow. Same class of drift as the 68-against-118 count this file exists to
   * stop, so it is counted rather than typed. */
  notes: en.insights.notes.length,
  /* Ledger sizes, for the Trade Tracker cards: STOCKS read 0 OPEN while the
   * equity book carried twelve lines. */
  openStocks: en.stocks.open.length,
  openCrypto: en.crypto.positions.length,
  optionModules: en.optionsTrading.modules.items.length,
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
