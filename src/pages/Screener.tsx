import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { companies } from '@/data/companies'
import { SEGMENTS, SEGMENT_OF, countryOf, exchangeOf, currencyOf, formatMoney, type SegmentKey } from '@/data/valueChain'
import { parseMetricValue } from '@/lib/priceSeries'
import { cn } from '@/lib/utils'

type RiskTier = 'high' | 'medium' | 'low'

type Row = {
  ticker: string
  name: string
  segment: SegmentKey
  segmentOrder: number
  country: string
  exchange: string
  currency: string
  price: number | null
  marketCap: string | null
  verdictTone: 'high' | 'fair' | 'low'
  riskTier: RiskTier
}

const SEGMENT_ORDER = new Map(SEGMENTS.map((s, i) => [s.key, i]))
const SEGMENT_SHORT: Record<SegmentKey, string> = {
  materials: 'MATERIALS',
  wfe: 'WFE',
  substrates: 'SUBSTRATES',
  pcb: 'PCB',
  test: 'TEST',
  packaging: 'PACKAGING',
  memory: 'MEMORY',
  silicon: 'SILICON',
  cloud: 'CLOUD',
  power: 'POWER',
  space: 'SPACE',
  adjacent: 'ADJACENT',
}

const ROWS: Row[] = Object.values(companies)
  .map((c) => {
    const highRisks = c.risks.filter((r) => r.severity === 'high').length
    const riskTier: RiskTier = highRisks >= 2 ? 'high' : highRisks === 1 ? 'medium' : 'low'
    const priceMetric = c.valuation.metrics.find((m) => /^price|^share price/i.test(m.label))
    const capMetric = c.valuation.metrics.find((m) => /market cap/i.test(m.label))
    const segment = SEGMENT_OF[c.ticker] ?? 'adjacent'
    return {
      ticker: c.ticker,
      name: c.name,
      segment,
      segmentOrder: SEGMENT_ORDER.get(segment) ?? 99,
      country: countryOf(c.ticker),
      exchange: exchangeOf(c.ticker),
      currency: currencyOf(c.ticker),
      price: parseMetricValue(priceMetric?.values[0]),
      marketCap: capMetric?.values[0] ?? null,
      verdictTone: c.valuation.verdictTone,
      riskTier,
    }
  })
  .sort((a, b) => a.segmentOrder - b.segmentOrder || a.ticker.localeCompare(b.ticker))

const COUNTRIES = Array.from(new Set(ROWS.map((r) => r.country))).sort()

const RISK_LABEL: Record<RiskTier, string> = { high: 'HIGH', medium: 'MEDIUM', low: 'LOW' }
const VERDICT_LABEL: Record<Row['verdictTone'], string> = { high: 'RICH', fair: 'FAIR', low: 'CHEAP' }

function Badge({ tone, children }: { tone: 'good' | 'warn' | 'bad'; children: React.ReactNode }) {
  const cls =
    tone === 'good'
      ? 'border-signal/50 bg-signal/15 text-signal'
      : tone === 'warn'
        ? 'border-warn/50 bg-warn/15 text-warn'
        : 'border-danger/50 bg-danger/15 text-danger'
  return (
    <span className={cn('inline-block min-w-[64px] border px-2 py-1 text-center font-mono-lab text-[9.5px] font-medium tracking-[0.12em]', cls)}>
      {children}
    </span>
  )
}

function verdictBadgeTone(tone: Row['verdictTone']): 'good' | 'warn' | 'bad' {
  return tone === 'high' ? 'bad' : tone === 'low' ? 'good' : 'warn'
}

function riskBadgeTone(tier: RiskTier): 'good' | 'warn' | 'bad' {
  return tier === 'high' ? 'bad' : tier === 'medium' ? 'warn' : 'good'
}

export default function Screener() {
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState<'ALL' | SegmentKey>('ALL')
  const [country, setCountry] = useState<'ALL' | string>('ALL')
  const [risk, setRisk] = useState<'ALL' | RiskTier>('ALL')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ROWS.filter((r) => {
      if (q && !r.ticker.toLowerCase().includes(q) && !r.name.toLowerCase().includes(q)) return false
      if (segment !== 'ALL' && r.segment !== segment) return false
      if (country !== 'ALL' && r.country !== country) return false
      if (risk !== 'ALL' && r.riskTier !== risk) return false
      return true
    })
  }, [query, segment, country, risk])

  const hasFilters = query !== '' || segment !== 'ALL' || country !== 'ALL' || risk !== 'ALL'

  return (
    <section className="lab-grid-fine relative pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <Reveal>
          <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">03.C — SCREENER</div>
        </Reveal>
        <Reveal delay={40}>
          <h1 className="mt-2 text-2xl font-medium tracking-tight md:text-[28px]">Value chain screener</h1>
        </Reveal>
        <Reveal delay={70}>
          <p className="mt-2 max-w-3xl font-mono-lab text-[12px] leading-5 tracking-wide text-prose">
            Every covered ticker mapped onto the AI-infrastructure value chain, raw materials to space. Sorted by chain position by
            default — filter by segment to isolate one. Thin or unconfirmed AI links sit in their own "Adjacent" bucket.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-6 flex flex-wrap items-center gap-2 border border-line bg-panel p-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH TICKER OR NAME"
            className="min-w-[180px] flex-1 border border-line bg-transparent px-3 py-2 font-mono-lab text-[11px] tracking-[0.1em] text-foreground placeholder:text-faint focus:border-signal focus:outline-none"
          />
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as typeof segment)}
            className="border border-line bg-transparent px-3 py-2 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
          >
            <option value="ALL">ALL SEGMENTS</option>
            {SEGMENTS.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-line bg-transparent px-3 py-2 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
          >
            <option value="ALL">ALL COUNTRIES</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value as typeof risk)}
            className="border border-line bg-transparent px-3 py-2 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
          >
            <option value="ALL">ALL RISK TIERS</option>
            <option value="high">HIGH RISK</option>
            <option value="medium">MEDIUM RISK</option>
            <option value="low">LOW RISK</option>
          </select>
          <button
            onClick={() => { setQuery(''); setSegment('ALL'); setCountry('ALL'); setRisk('ALL') }}
            disabled={!hasFilters}
            className="border border-line px-3 py-2 font-mono-lab text-[10px] tracking-[0.2em] text-dim transition-colors duration-200 hover:text-foreground disabled:opacity-30"
          >
            RESET
          </button>
          <span className="ms-auto font-mono-lab text-[10px] tracking-[0.15em] text-faint" dir="ltr">{filtered.length} / {ROWS.length} TICKERS</span>
        </Reveal>

        <div className="mt-4 overflow-x-auto border border-line">
          <table className="w-full min-w-[960px]">
            <thead>
              <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.2em] text-faint">
                <th className="px-3 py-3 text-start">TICKER</th>
                <th className="px-3 py-3 text-start">NAME</th>
                <th className="px-3 py-3 text-start">SEGMENT</th>
                <th className="px-3 py-3 text-start">EXCHANGE</th>
                <th className="px-3 py-3 text-end">PRICE</th>
                <th className="px-3 py-3 text-end">MKT CAP</th>
                <th className="px-3 py-3 text-center">VS. PEERS</th>
                <th className="px-3 py-3 text-center">RISK</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.ticker} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                  <td className="px-3 py-3.5">
                    <Link to={`/companies/${r.ticker}`} className="font-mono-lab text-[13.5px] font-medium text-foreground hover:text-signal" dir="ltr">
                      {r.ticker}
                    </Link>
                  </td>
                  <td className="px-3 py-3.5 font-mono-lab text-[11.5px] text-prose">{r.name}</td>
                  <td className="px-3 py-3.5 font-mono-lab text-[9.5px] tracking-[0.1em] text-dim">{SEGMENT_SHORT[r.segment]}</td>
                  <td className="px-3 py-3.5 font-mono-lab text-[10px] tracking-[0.05em] text-dim">{r.exchange}</td>
                  <td className="px-3 py-3.5 text-end font-mono-lab text-[13px] tabular-nums text-prose" dir="ltr">
                    {r.price != null ? formatMoney(r.price, r.currency) : '—'}
                  </td>
                  <td className="px-3 py-3.5 text-end font-mono-lab text-[11px] tabular-nums text-dim" dir="ltr">
                    {r.marketCap ?? '—'}
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <Badge tone={verdictBadgeTone(r.verdictTone)}>{VERDICT_LABEL[r.verdictTone]}</Badge>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <Badge tone={riskBadgeTone(r.riskTier)}>{RISK_LABEL[r.riskTier]}</Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-12 text-center font-mono-lab text-[11px] tracking-wide text-faint">
                    No tickers match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Reveal className="mt-6">
          <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
            Default sort follows the physical/economic AI-hardware value chain, materials to space — "Adjacent / indirect exposure"
            holds names with thin, unconfirmed, or thematic-only AI links. Prices and market caps are last-known figures from each
            ticker's deep dive, not a live feed — see the individual company page for sourcing and date. Exchange venue is
            best-effort reference data. This is a research framework, not investment advice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
