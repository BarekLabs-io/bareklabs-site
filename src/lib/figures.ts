import type { Lang } from '@/i18n/translations'

/* Figures in companies.ts carry the lab's own working notes inline — a value
 * reads "~61.1x (rescaled from 49.2x pre-refresh, not independently
 * re-verified)". The reservation is real and belongs on the page. The wording
 * does not: it is a note from one analyst to another, and CLAUDE.md § 1.5
 * keeps that off the public site.
 *
 * So this strips the phrasing at render time and hands the caller a flag. The
 * caller prints one short localised label instead. Nothing in companies.ts is
 * edited: the data keeps its full provenance for whoever reads the file. */

const CAVEATS = [
  /mechanically rescaled/i,
  /not independently re-?verified/i,
  /not independently re-?derived/i,
  /not independently reconciled/i,
  /varies by source/i,
]

const hasCaveat = (text: string) => CAVEATS.some((re) => re.test(text))

/* A month or a full date in parentheses at the end of a figure: "(Aug 2026)",
 * "(Aug 7, 2026)". The record carries its own `asOf`, so printing both gives
 * "$54.94B (Aug 2026) (2026.08)" — one date, in the reader's format. */
const TRAILING_DATE = /\s*\((?:[A-Z][a-z]{2,8})\.?\s+\d{0,2},?\s*\d{4}\)\s*$/

export type Figure = { text: string; caveated: boolean }

/** A published figure, stripped of internal phrasing and of its own date. */
export function cleanFigure(raw: string): Figure {
  let text = raw
  let caveated = false
  /* Parentheticals first: the caveat almost always lives in one, and taking
   * the bracket keeps the sentence it was glued to readable. */
  text = text.replace(/\s*\(([^()]*)\)/g, (whole, inner: string) => {
    if (!hasCaveat(inner)) return whole
    caveated = true
    return ''
  })
  if (hasCaveat(text)) {
    caveated = true
    text = text
      .split(/(?<=[.;])\s+/)
      .filter((part) => !hasCaveat(part))
      .join(' ')
  }
  return { text: text.replace(TRAILING_DATE, '').replace(/\s{2,}/g, ' ').trim(), caveated }
}

/** Same treatment for the long source paragraph under a company file. */
export function cleanNote(raw: string): Figure {
  const { caveated } = cleanFigure(raw)
  if (!caveated) return { text: raw, caveated: false }
  const kept = raw
    .split(/(?<=\.)\s+/)
    .filter((sentence) => !hasCaveat(sentence))
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
  return { text: kept, caveated: true }
}

const LOCALE: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-u-nu-latn' }

/** `asOf` is written '2026.08', '2026.08.06' or '2026-08-07' across the
 *  roster. One reading, in the reader's own format; a month-only stamp stays a
 *  month rather than being given a day it does not have. */
export function formatAsOf(asOf: string | undefined, lang: Lang): string | null {
  if (!asOf) return null
  const parts = asOf.split(/[.-]/).map((n) => Number(n))
  const [y, m, d] = parts
  if (!y || !m) return asOf
  const date = new Date(Date.UTC(y, m - 1, d || 1))
  if (Number.isNaN(date.getTime())) return asOf
  return new Intl.DateTimeFormat(LOCALE[lang] ?? LOCALE.en, {
    year: 'numeric',
    month: 'short',
    ...(d ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  }).format(date)
}
