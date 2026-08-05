import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { companies } from '@/data/companies'
import { SEGMENTS, SEGMENT_OF, countryOf, type SegmentKey } from '@/data/valueChain'
import { parseMetricValue } from '@/lib/priceSeries'
import { cn } from '@/lib/utils'

type RiskTier = 'high' | 'medium' | 'low'

type Row = {
  ticker: string
  name: string
  segment: SegmentKey
  country: string
  price: number | null
  verdictTone: 'high' | 'fair' | 'low'
  riskTier: RiskTier
}

const ROWS: Row[] = Object.values(companies).map((c) => {
  const highRisks = c.risks.filter((r) => r.severity === 'high').length
  const riskTier: RiskTier = highRisks >= 2 ? 'high' : highRisks === 1 ? 'medium' : 'low'
  const priceMetric = c.valuation.metrics.find((m) => /^price\b|^share price\b/i.test(m.label))
  const priceRaw = priceMetric?.values[0]
  return {
    ticker: c.ticker,
    name: c.name,
    segment: SEGMENT_OF[c.ticker] ?? 'adjacent',
    country: countryOf(c.ticker),
    price: parseMetricValue(priceRaw),
    verdictTone: c.valuation.verdictTone,
    riskTier,
  }
}).sort((a, b) => a.ticker.localeCompare(b.ticker))

const COUNTRIES = Array.from(new Set(ROWS.map((r) => r.country))).sort()

const RISK_LABEL: Record<RiskTier, string> = { high: 'HIGH', medium: 'MEDIUM', low: 'LOW' }
const VERDICT_LABEL: Record<Row['verdictTone'], string> = { high: 'RICH', fair: 'FAIR', low: 'CHEAP' }

function toneClass(tone: Row['verdictTone']) {
  return tone === 'high' ? 'text-danger' : tone === 'low' ? 'text-signal' : 'text-warn'
}

function riskClass(tier: RiskTier) {
  return tier === 'high' ? 'text-danger' : tier === 'medium' ? 'text-warn' : 'text-dim'
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

  const bySegment = useMemo(() => {
    const map = new Map<SegmentKey, Row[]>()
    for (const s of SEGMENTS) map.set(s.key, [])
    for (const r of filtered) map.get(r.segment)?.push(r)
    return map
  }, [filtered])

  const hasFilters = query !== '' || segment !== 'ALL' || country !== 'ALL' || risk !== 'ALL'

  return (
    <>
      <PageHero
        code="03.C — SCREENER"
        title="Value chain screener"
        serif="Every ticker, in order."
        desc="Every company with a published deep dive, mapped onto the AI-infrastructure value chain — from raw materials to space. Names with thin or unconfirmed AI relevance sit in their own bucket at the end, not scattered through the core chain."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="SCREEN" label="Filters" right={`${filtered.length} / ${ROWS.length} TICKERS`} />

          <Reveal className="mb-10 grid gap-3 border border-line bg-panel p-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH TICKER OR NAME"
              className="border border-line bg-transparent px-3 py-2.5 font-mono-lab text-[11px] tracking-[0.1em] text-foreground placeholder:text-faint focus:border-signal focus:outline-none"
            />
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value as typeof segment)}
              className="border border-line bg-transparent px-3 py-2.5 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
            >
              <option value="ALL">ALL SEGMENTS</option>
              {SEGMENTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border border-line bg-transparent px-3 py-2.5 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
            >
              <option value="ALL">ALL COUNTRIES</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value as typeof risk)}
              className="border border-line bg-transparent px-3 py-2.5 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
            >
              <option value="ALL">ALL RISK TIERS</option>
              <option value="high">HIGH RISK</option>
              <option value="medium">MEDIUM RISK</option>
              <option value="low">LOW RISK</option>
            </select>
            <button
              onClick={() => { setQuery(''); setSegment('ALL'); setCountry('ALL'); setRisk('ALL') }}
              disabled={!hasFilters}
              className="border border-line px-4 py-2.5 font-mono-lab text-[10px] tracking-[0.2em] text-dim transition-colors duration-200 hover:text-foreground disabled:opacity-30"
            >
              RESET
            </button>
          </Reveal>

          <div className="overflow-x-auto border border-line">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                  <th className="px-6 py-3 text-start">TICKER</th>
                  <th className="px-6 py-3 text-start">NAME</th>
                  <th className="px-6 py-3 text-start">COUNTRY</th>
                  <th className="px-6 py-3 text-end">PRICE</th>
                  <th className="px-6 py-3 text-end">VS. PEERS</th>
                  <th className="px-6 py-3 text-end">RISK</th>
                </tr>
              </thead>
              <tbody>
                {SEGMENTS.map((s) => {
                  const rows = bySegment.get(s.key) ?? []
                  if (rows.length === 0) return null
                  return (
                    <Fragment key={s.key}>
                      <tr className="border-b border-line bg-alt">
                        <td colSpan={6} className="px-6 py-2.5">
                          <span className="font-mono-lab text-[10px] tracking-[0.25em] text-signal">{s.label}</span>
                          <span className="ms-3 font-mono-lab text-[9px] tracking-[0.15em] text-faint">{s.note}</span>
                        </td>
                      </tr>
                      {rows.map((r, i) => (
                        <tr key={r.ticker} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                          <td className="px-6 py-4">
                            <Link to={`/companies/${r.ticker}`} className="font-mono-lab text-sm font-medium text-foreground hover:text-signal" dir="ltr">
                              {r.ticker}
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-mono-lab text-[11px] text-dim">{r.name}</td>
                          <td className="px-6 py-4 font-mono-lab text-[10px] tracking-[0.1em] text-faint">{r.country.toUpperCase()}</td>
                          <td className="px-6 py-4 text-end font-mono-lab text-sm tabular-nums text-dim" dir="ltr">
                            {r.price != null ? r.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'}
                          </td>
                          <td className={cn('px-6 py-4 text-end font-mono-lab text-[10px] tracking-[0.2em]', toneClass(r.verdictTone))}>
                            {VERDICT_LABEL[r.verdictTone]}
                          </td>
                          <td className={cn('px-6 py-4 text-end font-mono-lab text-[10px] tracking-[0.2em]', riskClass(r.riskTier))}>
                            {RISK_LABEL[r.riskTier]}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center font-mono-lab text-[11px] tracking-wide text-faint">
                      No tickers match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
              Segment order follows the physical/economic AI-hardware value chain. "Adjacent / indirect exposure" holds names with
              thin, unconfirmed, or thematic-only AI links, kept out of the core chain rather than interleaved into it. Prices are
              last-known figures from each ticker's deep dive, not a live feed — see the individual company page for sourcing and
              date. This is a research framework, not investment advice.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
