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
  /* The subject, named. The card titles are editorial — "the width trade",
   * "the December date" — and a ticker badge is only legible to someone who
   * already knows the ticker. In a carousel the reader sees the card before
   * they read it, so the company has to be on it as a plain name. Latin in
   * all three languages: it is an identifier, like the ticker beside it. */
  company: string
  title: string
  thesis: string
  entry: string
  invalidation: string
  horizon: string
  /* Optional because not every report weights its cases. Two of these carry
   * bear/base/bull without probabilities, and a made-up weight would be the
   * most quotable number on the card. Absent means the panel is not drawn. */
  scenarios?: { label: string; prob: number; tone: 'up' | 'mid' | 'down' }[]
  /* The discount rate the target came from. Shown because it is the single
   * assumption these numbers are most sensitive to, and it differs by report
   * — 9.5% on one name, 15.5% on another. Without it a reader can only argue
   * with the conclusion; with it they can argue with the input that produced
   * it, which is the more useful disagreement. */
  discountRate?: string
  tickers?: string[]
  /* A dated caveat the report itself carries: figures that predate a quarter
   * that has since printed, or a share split that has since happened. It rides
   * on the card because a reader meets the card first and the report second,
   * and a stale input is the kind of thing they need before the thesis, not
   * after it. */
  freshness?: string
  /* Set when the underlying report has been rebuilt after a method error was
   * found — the terminal-capex normalisation, on this batch. It is on the card
   * because a reader who read the first version deserves to know the numbers
   * moved, and because four of these eight are still on the old engine. */
  revised?: string
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
    title: 'Nebius Group (NBIS) — The Conversion Ratio · BAREK / LABS',
    tickers: ['NBIS'],
  },
  nrgv: {
    src: '/research/ideas/nrgv/index.html',
    title: 'Energy Vault (NRGV) — The Ten Percent · BAREK / LABS',
    tickers: ['NRGV'],
  },
  dgxx: {
    src: '/research/ideas/dgxx/index.html',
    title: 'Digi Power X (DGXX) — The December Date · BAREK / LABS',
    tickers: ['DGXX'],
  },
  rxrx: {
    src: '/research/ideas/rxrx/index.html',
    title: 'Recursion Pharmaceuticals (RXRX) — The Platform Against the Clock · BAREK / LABS',
    tickers: ['RXRX'],
  },
  isrg: {
    src: '/research/ideas/isrg/index.html',
    title: 'Intuitive Surgical (ISRG) — The Monopoly Has an Appointment · BAREK / LABS',
    tickers: ['ISRG'],
  },
  tmdx: {
    src: '/research/ideas/tmdx/index.html',
    title: 'TransMedics (TMDX) — One Organ, One Thesis · BAREK / LABS',
    tickers: ['TMDX'],
  },
  'rklb-asts': {
    src: '/research/ideas/rklb-asts/index.html',
    title: 'Rocket Lab & AST SpaceMobile — Two Space Bets, One Question · BAREK / LABS',
    tickers: ['RKLB', 'ASTS'],
  },
  auua: {
    src: '/research/ideas/auua/index.html',
    title: 'ALUULA Composites (AUUA.V) — The Width Trade · BAREK / LABS',
    tickers: ['AUUA.V'],
  },
  meta: {
    src: '/research/ideas/meta/index.html',
    title: 'Meta Platforms (META) — The Depreciation That Hasn\'t Landed · BAREK / LABS',
    tickers: ['META'],
  },

  /* The memory supply-chain series, n°09 to n°19. Posed byte-for-byte as
   * delivered (§ 4.1) — the HTML is self-contained and nothing inside it is
   * edited here; a figure that must change is refabricated upstream.
   *
   * Three of these carry no card yet: n°09 WDC/STX, n°12 Micron and n°18 SUMCO
   * are absent from the delivered markdown, which covers eight of the eleven.
   * They are declared so the documents are reachable and so the page that
   * eventually links them needs no route work — a slug with no card simply
   * shows no link, which is the documented behaviour for a thesis whose card
   * is not written. */
  'wdc-stx': {
    src: '/research/ideas/wdc-stx/index.html',
    title: 'BAREK / LABS — n°09 — WDC / STX — Five Point Three Percent',
    tickers: ['WDC', 'STX'],
  },
  phison: {
    src: '/research/ideas/phison/index.html',
    title: 'BAREK / LABS — n°10 — Phison — The Firmware Company',
    tickers: ['8299.TWO'],
  },
  'sandisk-kioxia': {
    src: '/research/ideas/sandisk-kioxia/index.html',
    title: 'BAREK / LABS — n°11 — SanDisk / Kioxia — What You Must Believe',
    tickers: ['SNDK', '285A.T'],
  },
  micron: {
    src: '/research/ideas/micron/index.html',
    title: 'BAREK / LABS — n°12 — Micron — The Perfect Quarter',
    tickers: ['MU'],
  },
  skhynix: {
    src: '/research/ideas/skhynix/index.html',
    title: 'BAREK / LABS — n°13 — SK hynix — The Rate Is The Thesis',
    tickers: ['000660.KS'],
  },
  winbond: {
    src: '/research/ideas/winbond/index.html',
    title: 'BAREK / LABS — n°14 — Winbond — Fairly Priced',
    tickers: ['2344.TW'],
  },
  adata: {
    src: '/research/ideas/adata/index.html',
    title: 'BAREK / LABS — n°15 — ADATA — A Bet On Beta, Not On ADATA',
    tickers: ['3260.TWO'],
  },
  'arrow-avnet': {
    src: '/research/ideas/arrow-avnet/index.html',
    title: 'BAREK / LABS — n°16 — Arrow / Avnet — The Revenue That Isn\'t',
    tickers: ['ARW', 'AVT'],
  },
  wtmicro: {
    src: '/research/ideas/wtmicro/index.html',
    title: 'BAREK / LABS — n°17 — WT Microelectronics — What Feeds The AI',
    tickers: ['3036.TW'],
  },
  sumco: {
    src: '/research/ideas/sumco/index.html',
    title: 'BAREK / LABS — n°18 — SUMCO — The Company That Won\'t Build',
    tickers: ['3436.T'],
  },
  shinetsu: {
    src: '/research/ideas/shinetsu/index.html',
    title: 'BAREK / LABS — n°19 — Shin-Etsu — The Segment You Cannot See',
    tickers: ['4063.T'],
  },
}

export function ideaReport(slug: string | undefined): IdeaReport | null {
  return slug ? (IDEA_REPORTS[slug] ?? null) : null
}
