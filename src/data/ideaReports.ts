/* The long-form report behind each investment idea.
 *
 * An idea card carries the shape of a thesis — entry, invalidation, horizon,
 * a scenario map. The reasoning that produced those numbers is a full report,
 * and those reports are self-contained HTML documents with their own FR/EN
 * toggle, so they are served as files and framed rather than rebuilt in React.
 *
 * Keyed by slug because the slug is the URL: /analysis/ideas/nbis. Ideas in
 * the i18n dicts reference a slug in their `report` field; an idea with no
 * matching slug simply shows no report link, which is the right behaviour for
 * a thesis whose write-up is not finished. */

/* One card on the Ideas page. Lives here rather than in the page so the three
 * i18n dicts can be checked against it — an idea written in English only is
 * otherwise a silent blank for a French or Arabic reader, not a build error. */
export type IdeaItem = {
  id: string
  date: string
  status: 'ACTIVE' | 'WATCHING' | 'CLOSED'
  sector: string
  title: string
  thesis: string
  entry: string
  invalidation: string
  horizon: string
  /* Optional because not every report weights its cases. Two of these carry
   * bear/base/bull without probabilities, and a made-up weight would be the
   * most quotable number on the card. Absent means the panel is not drawn. */
  scenarios?: { label: string; prob: number; tone: 'up' | 'mid' | 'down' }[]
  tickers?: string[]
  /** Key in IDEA_REPORTS below. */
  report?: string
}

export type IdeaReport = {
  /** Path under /public. */
  src: string
  /** Browser title for the framed document. */
  title: string
  /** Tickers the report covers — one report can carry more than one name. */
  tickers: string[]
}

export const IDEA_REPORTS: Record<string, IdeaReport> = {
  nbis: {
    src: '/research/ideas/nbis/index.html',
    title: 'Nebius Group (NBIS) — The Conversion Ratio · BAREK LABS',
    tickers: ['NBIS'],
  },
  nrgv: {
    src: '/research/ideas/nrgv/index.html',
    title: 'Energy Vault (NRGV) — The Ten Percent · BAREK LABS',
    tickers: ['NRGV'],
  },
  dgxx: {
    src: '/research/ideas/dgxx/index.html',
    title: 'Digi Power X (DGXX) — The December Date · BAREK LABS',
    tickers: ['DGXX'],
  },
  rxrx: {
    src: '/research/ideas/rxrx/index.html',
    title: 'Recursion Pharmaceuticals (RXRX) — The Platform Against the Clock · BAREK LABS',
    tickers: ['RXRX'],
  },
  isrg: {
    src: '/research/ideas/isrg/index.html',
    title: 'Intuitive Surgical (ISRG) — The Monopoly Has an Appointment · BAREK LABS',
    tickers: ['ISRG'],
  },
  tmdx: {
    src: '/research/ideas/tmdx/index.html',
    title: 'TransMedics (TMDX) — One Organ, One Thesis · BAREK LABS',
    tickers: ['TMDX'],
  },
  'rklb-asts': {
    src: '/research/ideas/rklb-asts/index.html',
    title: 'Rocket Lab & AST SpaceMobile — Two Space Bets, One Question · BAREK LABS',
    tickers: ['RKLB', 'ASTS'],
  },
  auua: {
    src: '/research/ideas/auua/index.html',
    title: 'ALUULA Composites (AUUA.V) — The Width Trade · BAREK LABS',
    tickers: ['AUUA.V'],
  },
}

export function ideaReport(slug: string | undefined): IdeaReport | null {
  return slug ? (IDEA_REPORTS[slug] ?? null) : null
}
