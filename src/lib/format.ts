import type { Lang } from '@/i18n/translations'

/* Numbers are punctuated differently in each language, and the ledger publishes
 * almost nothing but numbers. A French reader expects 38,9 % — comma, and a
 * space before the sign — where an English one expects 38.9%. Hand-built
 * strings got this wrong in one direction or the other, so every figure on a
 * page goes through Intl here rather than through toFixed and a literal '%'.
 *
 * Arabic keeps Latin digits (`-u-nu-latn`): the site has always shown them, and
 * a ticker or an entry price is read across languages. Only the punctuation
 * follows the locale. */
const LOCALE: Record<Lang, string> = { en: 'en-US', fr: 'fr-FR', ar: 'ar-u-nu-latn' }

/* Intl.NumberFormat construction is the expensive part, not format() — these
 * run inside table rows that re-render on every quote refresh. */
const cache = new Map<string, Intl.NumberFormat>()
function nf(lang: Lang, opts: Intl.NumberFormatOptions): Intl.NumberFormat {
  const k = `${lang}|${JSON.stringify(opts)}`
  let f = cache.get(k)
  if (!f) {
    f = new Intl.NumberFormat(LOCALE[lang] ?? LOCALE.en, opts)
    cache.set(k, f)
  }
  return f
}

/** The dash the ledger shows wherever it has nothing to stand behind. */
export const NO_VALUE = '—'

/** A percentage already expressed in percent units (38.9, not 0.389).
 *  `signed` spells the sign in the reader's own convention. */
export function formatPct(value: number | null | undefined, lang: Lang, signed = false): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return NO_VALUE
  return nf(lang, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: signed ? 'always' : 'auto',
  }).format(value / 100)
}

/** A price or a plain decimal. The currency code is rendered beside it by the
 *  caller, so the reader sees which currency an entry is quoted in. */
export function formatDecimal(value: number | null | undefined, lang: Lang, digits = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return NO_VALUE
  return nf(lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
}
