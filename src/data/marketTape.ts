/* The instruments on the global tape and the homepage watchlist.
 *
 * This file holds *identity only* — a label and the Yahoo symbol behind it.
 * It deliberately carries no prices and no percentage changes: those come
 * from /api/quotes at render time, and when the feed has nothing for a
 * symbol the UI shows a dash. An undated hardcoded price with a pulsing
 * "live" dot next to it is not a placeholder, it is a wrong number, and the
 * reader has no way to tell the difference. */

export type TapeGroup = 'US' | 'EU' | 'AS' | 'M7' | 'CR'

export type TapeInstrument = {
  /** What the reader sees. */
  s: string
  /** Yahoo Finance symbol — indices are the ^-prefixed ones, crypto is -USD. */
  symbol: string
  g: TapeGroup
}

export const TAPE_INSTRUMENTS: TapeInstrument[] = [
  { s: 'S&P 500', symbol: '^GSPC', g: 'US' },
  { s: 'NASDAQ', symbol: '^IXIC', g: 'US' },
  { s: 'DOW', symbol: '^DJI', g: 'US' },
  { s: 'STOXX 600', symbol: '^STOXX', g: 'EU' },
  { s: 'DAX', symbol: '^GDAXI', g: 'EU' },
  { s: 'CAC 40', symbol: '^FCHI', g: 'EU' },
  { s: 'FTSE 100', symbol: '^FTSE', g: 'EU' },
  { s: 'NIKKEI 225', symbol: '^N225', g: 'AS' },
  { s: 'HANG SENG', symbol: '^HSI', g: 'AS' },
  { s: 'CSI 300', symbol: '000300.SS', g: 'AS' },
  { s: 'AAPL', symbol: 'AAPL', g: 'M7' },
  { s: 'MSFT', symbol: 'MSFT', g: 'M7' },
  { s: 'NVDA', symbol: 'NVDA', g: 'M7' },
  { s: 'GOOGL', symbol: 'GOOGL', g: 'M7' },
  { s: 'AMZN', symbol: 'AMZN', g: 'M7' },
  { s: 'META', symbol: 'META', g: 'M7' },
  { s: 'TSLA', symbol: 'TSLA', g: 'M7' },
  { s: 'BTC', symbol: 'BTC-USD', g: 'CR' },
  { s: 'ETH', symbol: 'ETH-USD', g: 'CR' },
  { s: 'SOL', symbol: 'SOL-USD', g: 'CR' },
  { s: 'TAO', symbol: 'TAO22974-USD', g: 'CR' },
  { s: 'ICP', symbol: 'ICP-USD', g: 'CR' },
  { s: 'ZEC', symbol: 'ZEC-USD', g: 'CR' },
]

/* The movers pool: liquid names drawn from our own covered universe, so the
 * biggest gainer of the day is always something the site can explain rather
 * than a random symbol. Kept off the scrolling tape (which stays indices,
 * mega-caps and crypto) — these exist so the desk has an equity population to
 * rank. A pool of six crypto pairs would produce a "top movers" list that is
 * only ever crypto. */
export const MOVERS_UNIVERSE: { s: string; symbol: string }[] = [
  { s: 'NVDA', symbol: 'NVDA' },
  { s: 'AMD', symbol: 'AMD' },
  { s: 'AVGO', symbol: 'AVGO' },
  { s: 'MU', symbol: 'MU' },
  { s: 'INTC', symbol: 'INTC' },
  { s: 'MRVL', symbol: 'MRVL' },
  { s: 'WDC', symbol: 'WDC' },
  { s: 'LRCX', symbol: 'LRCX' },
  { s: 'AMAT', symbol: 'AMAT' },
  { s: 'KLAC', symbol: 'KLAC' },
  { s: 'ASML', symbol: 'ASML' },
  { s: 'TSM', symbol: 'TSM' },
  { s: 'ANET', symbol: 'ANET' },
  { s: 'SMCI', symbol: 'SMCI' },
  { s: 'CRDO', symbol: 'CRDO' },
  { s: 'NBIS', symbol: 'NBIS' },
  { s: 'IREN', symbol: 'IREN' },
  { s: 'CEG', symbol: 'CEG' },
  { s: 'VST', symbol: 'VST' },
  { s: 'GEV', symbol: 'GEV' },
  { s: 'CCJ', symbol: 'CCJ' },
  { s: 'UUUU', symbol: 'UUUU' },
  { s: 'RKLB', symbol: 'RKLB' },
  { s: 'ASTS', symbol: 'ASTS' },
  { s: 'ISRG', symbol: 'ISRG' },
  { s: 'TMDX', symbol: 'TMDX' },
  { s: 'PLTR', symbol: 'PLTR' },
  { s: 'BWXT', symbol: 'BWXT' },
]

export const MOVERS_SYMBOLS = MOVERS_UNIVERSE.map((i) => i.symbol)

/* The desk's tabbed lists: crypto first, then one list per trading venue,
 * matching the venues on the site clock. Each venue leads with its index and
 * follows with five liquid names; `to` links a row to its deep-dive page when
 * we cover the ticker, and rows without coverage are plain text. Symbols are
 * Yahoo's — venue suffixes: .PA Paris, .T Tokyo, .SR Tadawul, .AE DFM/ADX.
 * A row whose symbol the feed cannot resolve shows dashes, never a stand-in. */
export type DeskList = {
  key: string
  /** Tab label — a venue name, kept Latin in all three languages. */
  label: string
  rows: { s: string; symbol: string; to?: string }[]
}

export const DESK_LISTS: DeskList[] = [
  {
    key: 'crypto',
    label: 'CRYPTO',
    rows: [
      { s: 'BTC', symbol: 'BTC-USD' },
      { s: 'ETH', symbol: 'ETH-USD' },
      { s: 'SOL', symbol: 'SOL-USD' },
      { s: 'TAO', symbol: 'TAO22974-USD' },
      { s: 'ICP', symbol: 'ICP-USD' },
      { s: 'ZEC', symbol: 'ZEC-USD' },
    ],
  },
  {
    key: 'nyc',
    label: 'NYC',
    rows: [
      { s: 'S&P 500', symbol: '^GSPC' },
      { s: 'NVDA', symbol: 'NVDA', to: '/companies/NVDA' },
      { s: 'PLTR', symbol: 'PLTR', to: '/companies/PLTR' },
      { s: 'TSM', symbol: 'TSM', to: '/companies/TSM' },
      { s: 'ISRG', symbol: 'ISRG', to: '/companies/ISRG' },
      { s: 'RKLB', symbol: 'RKLB', to: '/companies/RKLB' },
    ],
  },
  {
    key: 'par',
    label: 'PARIS',
    rows: [
      { s: 'CAC 40', symbol: '^FCHI' },
      { s: 'LVMH', symbol: 'MC.PA' },
      { s: 'TOTAL', symbol: 'TTE.PA' },
      { s: 'AIRBUS', symbol: 'AIR.PA' },
      { s: 'SCHNEIDER', symbol: 'SU.PA', to: '/companies/SU.PA' },
      { s: 'HAFFNER', symbol: 'ALHAF.PA', to: '/companies/ALHAF.PA' },
    ],
  },
  {
    key: 'tyo',
    label: 'TOKYO',
    rows: [
      { s: 'NIKKEI 225', symbol: '^N225' },
      { s: 'TOKYO ELECTRON', symbol: '8035.T', to: '/companies/8035.T' },
      { s: 'ADVANTEST', symbol: '6857.T', to: '/companies/6857.T' },
      { s: 'DISCO', symbol: '6146.T', to: '/companies/6146.T' },
      { s: 'SOFTBANK', symbol: '9984.T' },
      { s: 'TOYOTA', symbol: '7203.T' },
    ],
  },
  {
    key: 'gulf',
    label: 'GULF',
    rows: [
      { s: 'TASI', symbol: '^TASI.SR' },
      { s: 'ARAMCO', symbol: '2222.SR' },
      { s: 'AL RAJHI', symbol: '1120.SR' },
      { s: 'STC', symbol: '7010.SR' },
      { s: 'EMAAR', symbol: 'EMAAR.AE' },
      { s: 'DIB', symbol: 'DIB.AE' },
    ],
  },
]

export const DESK_SYMBOLS = DESK_LISTS.flatMap((l) => l.rows.map((r) => r.symbol))

export const TAPE_SYMBOLS = TAPE_INSTRUMENTS.map((i) => i.symbol)

/** Shown wherever a quote has not arrived — never a stand-in number. */
export const NO_VALUE = '—'

/* Index levels and large crypto are quoted whole; everything else to the
 * cent. Driven off magnitude so a new instrument needs no extra config. */
export function formatLevel(value: number): string {
  const decimals = Math.abs(value) >= 10_000 ? 0 : 2
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function formatChange(pct: number): string {
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`
}
