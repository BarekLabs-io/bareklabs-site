import type { LiveQuote } from '@/lib/useLiveQuotes'
import { MOVERS_SYMBOLS } from '@/data/marketTape'

/* The composite used to read 74 out of 100. It was arithmetic — a weighted
 * average of the six component tones — but every tone and every component
 * value was typed into the three dictionaries by hand. A number computed from
 * invented inputs is worse than a number simply typed in: it looks derived.
 *
 * Exactly one of the six components can be computed from what the site
 * actually receives. /api/quotes returns price, changePercent, currency and
 * marketTime — nothing else. So:
 *
 *   BREADTH            computed here, from changePercent
 *   TRADE INTENSITY    needs volume against a 20-day average — no volume
 *   FOREIGN NET FLOW   needs exchange custody data — no such feed
 *   VOLATILITY REGIME  needs ten sessions of range — the feed is spot only
 *   SECTOR LEADERSHIP  needs price AND volume by sector — no volume
 *   ANOMALY DETECTION  needs a distribution to sit three sigma away from
 *
 * The five that cannot be computed show a dash and say why. The weights stay
 * published: the method is the part of this page that was never fake. */

/** Minimum share of the universe that must answer before breadth is published.
 *  A ratio struck on four names that happen to have quoted is not breadth. */
const MIN_COVERAGE = 0.6

export type Breadth = {
  /** Advancers divided by decliners. Null when nothing declined — the ratio
   *  is undefined, and the counts below say more than an infinity would. */
  ratio: number | null
  up: number
  down: number
  flat: number
  counted: number
  universe: number
}

export function computeBreadth(quotes: Record<string, LiveQuote>): Breadth | null {
  const changes = MOVERS_SYMBOLS.map((s) => quotes[s]?.changePercent).filter(
    (c): c is number => typeof c === 'number' && Number.isFinite(c)
  )
  if (changes.length < MOVERS_SYMBOLS.length * MIN_COVERAGE) return null
  const up = changes.filter((c) => c > 0).length
  const down = changes.filter((c) => c < 0).length
  return {
    ratio: down === 0 ? null : up / down,
    up,
    down,
    flat: changes.length - up - down,
    counted: changes.length,
    universe: MOVERS_SYMBOLS.length,
  }
}

/** Up when more names rose than fell, down when fewer, level when they tie. */
export function breadthTone(b: Breadth): 'up' | 'mid' | 'down' {
  if (b.up > b.down) return 'up'
  if (b.up < b.down) return 'down'
  return 'mid'
}
