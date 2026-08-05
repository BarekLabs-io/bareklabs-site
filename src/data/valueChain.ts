/* Value-chain segmentation for the Trade Tracker screener.
 * Order matters: segments run in physical/economic sequence along the
 * AI-hardware value chain — raw materials → equipment → materials/PCB →
 * test → packaging → memory → silicon/connectivity → cloud → power → space —
 * with names that have thin or unconfirmed AI relevance held in their own
 * bucket at the end rather than interleaved into the real chain. */

export type SegmentKey =
  | 'materials'
  | 'wfe'
  | 'substrates'
  | 'pcb'
  | 'test'
  | 'packaging'
  | 'memory'
  | 'silicon'
  | 'cloud'
  | 'power'
  | 'space'
  | 'adjacent'

export const SEGMENTS: { key: SegmentKey; label: string; note: string }[] = [
  { key: 'materials', label: 'RAW MATERIALS & SUBSTRATE WAFERS', note: 'Inputs to every fab downstream' },
  { key: 'wfe', label: 'WFE EQUIPMENT — LITHOGRAPHY, ETCH & DEPOSITION', note: 'Front-end fabrication tools' },
  { key: 'substrates', label: 'SUBSTRATES & ADVANCED PACKAGING MATERIALS', note: 'ABF, CCL, copper foil, CMP slurry' },
  { key: 'pcb', label: 'PCB FABRICATION & COMPONENTS', note: 'Boards, tooling, passives' },
  { key: 'test', label: 'TEST & INSPECTION EQUIPMENT', note: 'ATE, probe cards, metrology' },
  { key: 'packaging', label: 'ADVANCED PACKAGING & HYBRID BONDING', note: 'Dicing, bonding, HBM stacking' },
  { key: 'memory', label: 'MEMORY (HBM/DRAM) & MEMORY IP', note: 'The bandwidth bottleneck' },
  { key: 'silicon', label: 'CUSTOM SILICON & CONNECTIVITY', note: 'ASICs, retimers, optical interconnect' },
  { key: 'cloud', label: 'AI CLOUD & COMPUTE INFRASTRUCTURE', note: 'Neoclouds, GPU rental, integrators' },
  { key: 'power', label: 'POWER & ENERGY FOR AI DATACENTERS', note: 'The other bottleneck' },
  { key: 'space', label: 'SPACE INFRASTRUCTURE', note: 'Launch & satellite systems' },
  { key: 'adjacent', label: 'ADJACENT / INDIRECT EXPOSURE', note: 'Thin, unconfirmed or pre-transformation AI links — not part of the core chain' },
]

export const SEGMENT_OF: Record<string, SegmentKey> = {
  // Raw materials & substrate wafers
  '600961.SS': 'materials',
  AXTI: 'materials',

  // WFE equipment — front-end
  ASML: 'wfe',
  LRCX: 'wfe',
  AMAT: 'wfe',
  KLAC: 'wfe',
  '8035.T': 'wfe',
  '6622.T': 'wfe',
  'VACN.SW': 'wfe',
  'MYCR.ST': 'wfe',

  // Substrates & advanced packaging materials
  '4004.T': 'substrates',
  '2802.T': 'substrates',
  '5706.T': 'substrates',
  '2383.TW': 'substrates',
  '3037.TW': 'substrates',
  TTMI: 'substrates',
  'ATS.VI': 'substrates',

  // PCB fabrication & components
  '300476.SZ': 'pcb',
  '301377.SZ': 'pcb',
  '6278.T': 'pcb',
  '6981.T': 'pcb',

  // Test & inspection equipment
  ATEYY: 'test',
  '6857.T': 'test',
  AEHR: 'test',
  FORM: 'test',
  'TPRO.MI': 'test',
  CAMT: 'test',

  // Advanced packaging & hybrid bonding
  '6146.T': 'packaging',
  '042700.KS': 'packaging',
  'BESI.AS': 'packaging',
  'SMHN.DE': 'packaging',

  // Memory (HBM/DRAM) & memory IP
  '000660.KS': 'memory',
  RMBS: 'memory',

  // Custom silicon & connectivity
  MRVL: 'silicon',
  CRDO: 'silicon',
  ALAB: 'silicon',
  CIEN: 'silicon',
  AAOI: 'silicon',
  FN: 'silicon',
  'SIVE.ST': 'silicon',

  // AI cloud & compute infrastructure
  IREN: 'cloud',
  WYFI: 'cloud',
  HIVE: 'cloud',
  NBIS: 'cloud',
  CRWV: 'cloud',
  PENG: 'cloud',

  // Power & energy for AI datacenters
  WOLF: 'power',
  NVTS: 'power',
  BE: 'power',
  FCEL: 'power',
  HYLN: 'power',

  // Space infrastructure
  RKLB: 'space',

  // Adjacent / indirect exposure — thin or unconfirmed AI link, kept out of the core chain
  'AUUA.V': 'adjacent',
  AMPX: 'adjacent',
  '000150.KS': 'adjacent',
  BWEN: 'adjacent',
  'VH2.DE': 'adjacent',
  'SLX.AX': 'adjacent',
  'OBDU.ST': 'adjacent',
  'SHT.ST': 'adjacent',
}

const COUNTRY_OVERRIDE: Record<string, string> = { ATEYY: 'Japan' }

const SUFFIX_COUNTRY: Record<string, string> = {
  T: 'Japan',
  KS: 'South Korea',
  TW: 'Taiwan',
  SS: 'China',
  SZ: 'China',
  DE: 'Germany',
  AS: 'Netherlands',
  SW: 'Switzerland',
  ST: 'Sweden',
  AX: 'Australia',
  MI: 'Italy',
  VI: 'Austria',
  V: 'Canada',
}

export function countryOf(ticker: string): string {
  if (COUNTRY_OVERRIDE[ticker]) return COUNTRY_OVERRIDE[ticker]
  const suffix = ticker.split('.')[1]
  return suffix ? SUFFIX_COUNTRY[suffix] ?? 'Unknown' : 'United States'
}

const SUFFIX_EXCHANGE: Record<string, string> = {
  T: 'Tokyo SE',
  KS: 'Korea Exchange',
  TW: 'Taiwan SE',
  SS: 'Shanghai SE',
  SZ: 'Shenzhen SE',
  DE: 'Deutsche Börse',
  AS: 'Euronext Amsterdam',
  SW: 'SIX Swiss Exchange',
  ST: 'Nasdaq Stockholm',
  AX: 'ASX',
  MI: 'Borsa Italiana',
  VI: 'Wiener Börse',
  V: 'TSX Venture',
}

const SUFFIX_CURRENCY: Record<string, string> = {
  T: 'JPY',
  KS: 'KRW',
  TW: 'TWD',
  SS: 'CNY',
  SZ: 'CNY',
  DE: 'EUR',
  AS: 'EUR',
  SW: 'CHF',
  ST: 'SEK',
  AX: 'AUD',
  MI: 'EUR',
  VI: 'EUR',
  V: 'CAD',
}

// US-listed tickers only — primary listing venue, verified individually (not a suffix default).
const US_EXCHANGE: Record<string, string> = {
  LRCX: 'NASDAQ', AXTI: 'NASDAQ', AEHR: 'NASDAQ', ATEYY: 'OTC', IREN: 'NASDAQ', WOLF: 'NYSE',
  KLAC: 'NASDAQ', AAOI: 'NASDAQ', WYFI: 'NASDAQ', CIEN: 'NYSE', FORM: 'NASDAQ', ASML: 'NASDAQ',
  TTMI: 'NASDAQ', HIVE: 'NASDAQ', CRDO: 'NASDAQ', BE: 'NYSE', RMBS: 'NASDAQ', ALAB: 'NASDAQ',
  AMAT: 'NASDAQ', MRVL: 'NASDAQ', FN: 'NYSE', CAMT: 'NASDAQ', NVTS: 'NASDAQ', NBIS: 'NASDAQ',
  RKLB: 'NASDAQ', PENG: 'NASDAQ', CRWV: 'NASDAQ', AMPX: 'NYSE', HYLN: 'NYSE', FCEL: 'NASDAQ',
  BWEN: 'NASDAQ',
}

export function exchangeOf(ticker: string): string {
  const suffix = ticker.split('.')[1]
  if (!suffix) return US_EXCHANGE[ticker] ?? 'NASDAQ'
  return SUFFIX_EXCHANGE[suffix] ?? 'Unknown'
}

export function currencyOf(ticker: string): string {
  const suffix = ticker.split('.')[1]
  return suffix ? SUFFIX_CURRENCY[suffix] ?? 'USD' : 'USD'
}

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$', EUR: '€', JPY: '¥', GBP: '£', CHF: 'CHF ', AUD: 'A$', CAD: 'C$',
}

// Currencies conventionally quoted without decimal places (no minor-unit subdivision in everyday quotes).
const ZERO_DECIMAL_CURRENCIES = new Set(['JPY', 'KRW', 'CNY', 'TWD'])

export function formatMoney(value: number, currency: string): string {
  const decimals = ZERO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2
  const num = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const symbol = CURRENCY_SYMBOL[currency]
  return symbol ? `${symbol}${num}` : `${num} ${currency}`
}

export function segmentOf(ticker: string): SegmentKey {
  return SEGMENT_OF[ticker] ?? 'adjacent'
}

export function segmentInfoOf(ticker: string): { label: string; note: string } {
  const key = segmentOf(ticker)
  return SEGMENTS.find((s) => s.key === key) ?? SEGMENTS[SEGMENTS.length - 1]
}
