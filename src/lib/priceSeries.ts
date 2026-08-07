/* Deterministic, seeded price-series generator used to drive the interactive
 * price chart on company deep-dive pages. There is no live market-data feed
 * behind this site (see the "research framework, not a live feed" note on
 * every company page) — this produces a stable, illustrative random walk per
 * ticker that always resolves to the ticker's real last-known price, with a
 * light "near-live" tick layered on top so the chart doesn't sit static. */

export type PricePoint = { t: number; price: number }

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return function rand() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function parseMetricValue(raw: string | undefined): number | null {
  if (!raw) return null
  const cleaned = raw.replace(/,/g, '')
  const m = cleaned.match(/\d+(?:\.\d+)?/)
  return m ? parseFloat(m[0]) : null
}

const DAY_MS = 86400000

/** Full illustrative daily series, ending exactly at `currentPrice`. */
export function generateDailySeries(ticker: string, currentPrice: number, days = 400, dailyVolPct = 0.024): PricePoint[] {
  const rand = mulberry32(hashSeed(ticker))
  const raw: number[] = [1]
  for (let i = 1; i < days; i++) {
    const shock = (rand() - 0.5) * 2 * dailyVolPct
    raw.push(Math.max(0.05, raw[i - 1] * (1 + shock)))
  }
  const scale = currentPrice / raw[raw.length - 1]
  const now = Date.now()
  return raw.map((v, i) => ({
    t: now - (days - 1 - i) * DAY_MS,
    price: +(v * scale).toFixed(4),
  }))
}

/** A single simulated intraday session (15-min bars), ending at `currentPrice`. */
export function generateIntradaySeries(ticker: string, currentPrice: number, points = 27, volPct = 0.0055): PricePoint[] {
  const rand = mulberry32(hashSeed(ticker + ':intraday'))
  const raw: number[] = [1]
  for (let i = 1; i < points; i++) {
    const shock = (rand() - 0.5) * 2 * volPct
    raw.push(Math.max(0.05, raw[i - 1] * (1 + shock)))
  }
  const scale = currentPrice / raw[raw.length - 1]
  const now = Date.now()
  const sessionMs = 6.5 * 60 * 60 * 1000
  const stepMs = sessionMs / (points - 1)
  const sessionStart = now - sessionMs
  return raw.map((v, i) => ({
    t: sessionStart + i * stepMs,
    price: +(v * scale).toFixed(4),
  }))
}

export function sma(points: PricePoint[], period: number): (number | null)[] {
  const out: (number | null)[] = []
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    sum += points[i].price
    if (i >= period) sum -= points[i - period].price
    out.push(i >= period - 1 ? +(sum / period).toFixed(4) : null)
  }
  return out
}

export type Timeframe = '1D' | '5D' | '1W' | '1M' | '3M' | '6M' | '1Y'
export const TIMEFRAMES: Timeframe[] = ['1D', '5D', '1W', '1M', '3M', '6M', '1Y']

export const TIMEFRAME_DAYS: Record<Exclude<Timeframe, '1D'>, number> = {
  '5D': 5,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '6M': 182,
  '1Y': 365,
}
