import type { Lang } from '@/i18n/translations'

/* Figures in companies.ts carry the lab's own working notes inline. A multiple
 * reads "~61.1x (rescaled from 49.2x pre-refresh, not independently
 * re-verified)"; a technical level reads "Current $322.87 (Aug 5, 2026) —
 * pre-refresh 50-day MA ($338) ... not independently re-verified in this pass".
 * The reservation is real and belongs on the page. The wording does not: it is
 * a note from one analyst to another about a refresh pass, and CLAUDE.md § 1.5
 * keeps that off the public site.
 *
 * Detection is by clause, not by phrase. Five exact strings were tried first
 * and missed most of the family — "rescaled from $240–250 pre-refresh", "in
 * this pass", "the real recent low is closer to ~$200" all slipped through.
 * What these share is subject matter: they describe the refresh, not the
 * company. So any clause that mentions the process is dropped whole, and its
 * neighbours in the same bracket survive.
 *
 * Nothing in companies.ts is edited. The data keeps its full provenance for
 * whoever opens the file; only the render is cleaned. */

/** Vocabulary of the update process — never of a business. */
const PROCESS = new RegExp(
  [
    'mechanically',
    'rescal\\w*',
    'pre-?refresh',
    'in this pass',
    're-?verif\\w*',
    're-?deriv\\w*',
    'reconcil\\w*',
    'varies by (?:source|date)',
    'not independently',
    'the real [^.;]{0,40}?is closer to',
    'treat (?:those|these|them|it) as directional',
    'not a live feed',
    'flagged as stale',
    'price refreshed',
    'refreshed via',
    'pre-rally',
    'this pass',
  ].join('|'),
  'i'
)

const isProcess = (text: string) => PROCESS.test(text)

/** Drops the process clauses inside one bracket, keeping any that describe the
 *  company. "(10:1 split-adjusted; the real recent low is closer to ~$200)"
 *  keeps the split and loses the correction. */
function cleanBracket(inner: string): string | null {
  const clauses = inner.split(/\s*;\s*/).filter((c) => !isProcess(c))
  if (clauses.length === 0) return null
  return clauses.join('; ')
}

/* A month or a full date in parentheses: "(Aug 2026)", "(Aug 7, 2026)". */
const DATE_IN_BRACKET = /^([A-Z][a-z]{2,8})\.?\s+(?:(\d{1,2}),?\s+)?(\d{4})$/
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const LOCALE: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-u-nu-latn' }

function localeDate(y: number, m: number, d: number | null, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang] ?? LOCALE.en, {
    year: 'numeric',
    month: 'short',
    ...(d ? { day: 'numeric' } : {}),
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m, d ?? 1)))
}

export type Figure = { text: string; caveated: boolean }

type Options = {
  /** Rewrite dates written inside the text into the reader's format. */
  lang?: Lang
  /** Drop a date sitting at the very end — used where the record's own `asOf`
   *  is printed beside the figure, so the reader would otherwise see two. */
  dropTrailingDate?: boolean
}

export function cleanFigure(raw: string, opts: Options = {}): Figure {
  let caveated = false
  let text = raw

  /* Brackets first: the caveat almost always lives in one, and taking the
   * bracket keeps the sentence it was glued to readable. */
  text = text.replace(/\s*\(([^()]*)\)/g, (whole, inner: string) => {
    const date = DATE_IN_BRACKET.exec(inner.trim())
    if (date) {
      if (opts.dropTrailingDate) return ''
      if (!opts.lang) return whole
      const month = MONTHS.indexOf(date[1].slice(0, 3).toLowerCase())
      if (month < 0) return whole
      return ` (${localeDate(Number(date[3]), month, date[2] ? Number(date[2]) : null, opts.lang)})`
    }
    if (!isProcess(inner)) return whole
    caveated = true
    const kept = cleanBracket(inner)
    return kept === null ? '' : ` (${kept})`
  })

  /* Then trailing clauses hung off a dash — "… — pre-refresh 50-day MA …". */
  const segments = text.split(/\s+[—–]\s+/)
  if (segments.length > 1) {
    const kept = segments.filter((seg) => !isProcess(seg))
    if (kept.length !== segments.length) {
      caveated = true
      text = (kept.length ? kept : [segments[0]]).join(' — ')
    }
  }

  if (isProcess(text)) {
    caveated = true
    /* Empty when every sentence was process talk — the cell said only "not
     * captured in this pass". Keeping the original would defeat the whole
     * pass, so it falls through to the dash below. */
    text = text
      .split(/(?<=[.;])\s+/)
      .filter((part) => !isProcess(part))
      .join(' ')
  }

  const out = text.replace(/\s{2,}/g, ' ').replace(/\s+([,.;])/g, '$1').trim()
  /* Nothing left once the process talk is gone — the cell said only "not
   * captured in this pass", which is missing data rather than a caveated
   * figure. The caller shows its dash, and no reservation label: a dash
   * already says "we do not have this". */
  if (!out || /^[\s,;.—–-]*$/.test(out)) return { text: '', caveated: false }
  return { text: out, caveated }
}

/** Same treatment for the long source paragraph under a company file. */
export function cleanNote(raw: string, lang?: Lang): Figure {
  if (!isProcess(raw)) return { text: raw, caveated: false }
  const kept = raw
    .split(/(?<=\.)\s+/)
    .filter((sentence) => !isProcess(sentence))
    .join(' ')
  return { text: cleanFigure(kept, { lang }).text, caveated: true }
}

/** `asOf` is written '2026.08', '2026.08.06' or '2026-08-07' across the
 *  roster. One reading, in the reader's own format; a month-only stamp stays a
 *  month rather than being given a day it does not have. */
export function formatAsOf(asOf: string | undefined, lang: Lang): string | null {
  if (!asOf) return null
  const [y, m, d] = asOf.split(/[.-]/).map((n) => Number(n))
  if (!y || !m) return asOf
  const date = new Date(Date.UTC(y, m - 1, d || 1))
  if (Number.isNaN(date.getTime())) return asOf
  return localeDate(y, m - 1, d || null, lang)
}
