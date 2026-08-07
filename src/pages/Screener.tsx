import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { companies } from '@/data/companies'
import { SEGMENTS, SEGMENT_OF, chainSegmentOf, countryOf, exchangeOf, currencyOf, formatMoney, type SegmentKey } from '@/data/valueChain'
import { DOMAINS, DOMAIN_LABEL, domainOf, type DomainKey } from '@/data/domains'
import { parseMetricValue } from '@/lib/priceSeries'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { cn } from '@/lib/utils'

/* 'unrated' is a real state, not a missing one: a ticker on the watchlist
 * whose deep dive has not been written yet. Without it the screener would
 * fall back on FAIR / MEDIUM, which are judgements nobody made. */
type RiskTier = 'high' | 'medium' | 'low' | 'unrated'

type Row = {
  ticker: string
  name: string
  tagline: string
  segment: SegmentKey
  segmentOrder: number
  domain: DomainKey
  onChain: boolean
  country: string
  exchange: string
  currency: string
  price: number | null
  marketCap: string | null
  forwardPE: string | null
  evEbitda: string | null
  verdictTone: 'high' | 'fair' | 'low' | 'unrated'
  riskTier: RiskTier
  riskNote: string
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

/* Risk tier: grounded in the deep dive's own synthesis scoring, not a raw count of
 * flagged risk items — a well-covered, profitable blue chip naturally accumulates more
 * *documented* risk factors than a thinly-researched microcap, so counting flags alone
 * makes mature, high-quality names look artificially risky. Prefer the synthesis
 * criterion that's actually about risk (star rating, 5 = safest); where a company's
 * scorecard doesn't have one under that name, fall back to its overall average score
 * as a general quality/durability proxy. */
function starsToTier(stars: number): RiskTier {
  return stars >= 3.5 ? 'low' : stars >= 2.5 ? 'medium' : 'high'
}

function riskOf(c: (typeof companies)[string]): { tier: RiskTier; note: string } {
  const riskScore = c.synthesis.scores.find((s) => /risk/i.test(s.criterion))
  if (riskScore) return { tier: starsToTier(riskScore.stars), note: riskScore.note }
  // No scores at all divides by zero and hands starsToTier a NaN, which lands
  // in whichever branch compares false — a scored-looking badge out of nothing.
  if (c.synthesis.scores.length === 0) return { tier: 'unrated', note: c.synthesis.summary }
  const avg = c.synthesis.scores.reduce((sum, s) => sum + s.stars, 0) / c.synthesis.scores.length
  return { tier: starsToTier(avg), note: c.synthesis.summary }
}

const ROWS: Row[] = Object.values(companies)
  .map((c) => {
    const priceMetric = c.valuation.metrics.find((m) => /^price|^share price/i.test(m.label))
    const capMetric = c.valuation.metrics.find((m) => /market cap/i.test(m.label))
    const peMetric = c.valuation.metrics.find((m) => /forward p\/e/i.test(m.label))
    const evEbitdaMetric = c.valuation.metrics.find((m) => /ev\s*\/?\s*ebitda/i.test(m.label))
    const segment = SEGMENT_OF[c.ticker] ?? 'adjacent'
    const risk = riskOf(c)
    return {
      ticker: c.ticker,
      name: c.name,
      tagline: c.tagline,
      segment,
      segmentOrder: SEGMENT_ORDER.get(segment) ?? 99,
      domain: domainOf(c.ticker),
      onChain: chainSegmentOf(c.ticker) != null,
      country: countryOf(c.ticker),
      exchange: exchangeOf(c.ticker),
      currency: currencyOf(c.ticker),
      price: parseMetricValue(priceMetric?.values[0]),
      marketCap: capMetric?.values[0] ?? null,
      forwardPE: peMetric?.values[0] ?? null,
      evEbitda: evEbitdaMetric?.values[0] ?? null,
      verdictTone: c.valuation.verdictTone,
      riskTier: risk.tier,
      riskNote: risk.note,
    }
  })
  .sort((a, b) => a.segmentOrder - b.segmentOrder || a.ticker.localeCompare(b.ticker))

const COUNTRIES = Array.from(new Set(ROWS.map((r) => r.country))).sort()

const RISK_LABEL: Record<RiskTier, string> = { high: 'HIGH', medium: 'MEDIUM', low: 'LOW', unrated: 'UNRATED' }
const VERDICT_LABEL: Record<Row['verdictTone'], string> = { high: 'RICH', fair: 'FAIR', low: 'CHEAP', unrated: 'UNRATED' }

function Badge({ tone, title, children }: { tone: 'good' | 'warn' | 'bad' | 'neutral'; title: string; children: React.ReactNode }) {
  const cls =
    tone === 'good'
      ? 'border-signal/50 bg-signal/15 text-signal'
      : tone === 'warn'
        ? 'border-warn/50 bg-warn/15 text-warn'
        : tone === 'neutral'
          ? 'border-line bg-card2 text-faint'
          : 'border-danger/50 bg-danger/15 text-danger'
  return (
    <span title={title} className={cn('inline-block min-w-[64px] border px-2 py-1 text-center font-mono-lab text-[9.5px] font-medium tracking-[0.12em]', cls)}>
      {children}
    </span>
  )
}

function verdictBadgeTone(tone: Row['verdictTone']): 'good' | 'warn' | 'bad' | 'neutral' {
  if (tone === 'unrated') return 'neutral'
  return tone === 'high' ? 'bad' : tone === 'low' ? 'good' : 'warn'
}

function riskBadgeTone(tier: RiskTier): 'good' | 'warn' | 'bad' | 'neutral' {
  if (tier === 'unrated') return 'neutral'
  return tier === 'high' ? 'bad' : tier === 'medium' ? 'warn' : 'good'
}

const VERDICT_EXPLAIN: Record<Row['verdictTone'], string> = {
  high: 'RICH — trading above its peer set on the multiples in its deep dive.',
  fair: 'FAIR — roughly in line with its peer set on the multiples in its deep dive.',
  low: 'CHEAP — trading below its peer set on the multiples in its deep dive.',
  unrated: 'UNRATED — on the watchlist, market data loaded, but no deep dive written yet. No peer comparison has been made.',
}
const RISK_EXPLAIN: Record<RiskTier, string> = {
  high: 'HIGH — the deep dive\'s own risk assessment (business durability, balance sheet, competitive position, valuation cushion) skews unfavorable.',
  medium: 'MEDIUM — a mixed picture: real, identified risk factors, but not a red flag across the board.',
  low: 'LOW — the deep dive\'s own risk assessment skews favorable on durability, balance sheet and competitive position.',
  unrated: 'UNRATED — no deep dive has been written for this name yet, so no risk assessment exists. The market data below is live; the judgement is not there.',
}

export default function Screener() {
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState<'ALL' | SegmentKey>('ALL')
  const [domain, setDomain] = useState<'ALL' | DomainKey>('ALL')
  const [country, setCountry] = useState<'ALL' | string>('ALL')
  const [risk, setRisk] = useState<'ALL' | RiskTier>('ALL')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ROWS.filter((r) => {
      if (q && !r.ticker.toLowerCase().includes(q) && !r.name.toLowerCase().includes(q)) return false
      if (segment !== 'ALL' && r.segment !== segment) return false
      if (domain !== 'ALL' && r.domain !== domain) return false
      if (country !== 'ALL' && r.country !== country) return false
      if (risk !== 'ALL' && r.riskTier !== risk) return false
      return true
    })
  }, [query, segment, domain, country, risk])

  const hasFilters = query !== '' || segment !== 'ALL' || domain !== 'ALL' || country !== 'ALL' || risk !== 'ALL'

  // Live prices only for what's actually on screen — keeps the upstream call
  // small when filters are applied. Market cap and the multiples below stay
  // on the researched snapshot; the quotes endpoint doesn't carry them.
  const { quotes, asOf } = useLiveQuotes(filtered.map((r) => r.ticker))
  const liveCount = filtered.reduce((n, r) => (quotes[r.ticker] ? n + 1 : n), 0)

  return (
    <section className="lab-grid-fine relative pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <Reveal>
          <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">03.C — SCREENER</div>
        </Reveal>
        <Reveal delay={40}>
          <h1 className="mt-2 text-2xl font-medium tracking-tight md:text-[28px]">Screener</h1>
        </Reveal>
        <Reveal delay={70}>
          <p className="mt-2 max-w-5xl font-mono-lab text-[12px] leading-5 tracking-wide text-prose">
            Every ticker we cover, in one list — search it, filter it, get a fast read before deciding where to dig deeper.
            Rows default to sorting by AI value-chain position, since a lot of what's here sits somewhere on that chain — but
            this is a screener, not a diagram of the chain itself. For that, see AI Value Chain under Analysis.
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
            value={domain}
            onChange={(e) => setDomain(e.target.value as typeof domain)}
            title="What the company does. Independent of the AI chain."
            className="border border-line bg-transparent px-3 py-2 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
          >
            <option value="ALL">ALL DOMAINS</option>
            {DOMAINS.map((d) => (
              <option key={d.key} value={d.key}>{d.label}</option>
            ))}
          </select>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as typeof segment)}
            title="Position on the AI hardware chain. Most names off the chain sit under OFF THE AI CHAIN — that is a description, not a demotion."

            className="border border-line bg-transparent px-3 py-2 font-mono-lab text-[11px] tracking-[0.1em] text-foreground focus:border-signal focus:outline-none"
          >
            <option value="ALL">ALL AI-CHAIN POSITIONS</option>
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
            onClick={() => { setQuery(''); setSegment('ALL'); setDomain('ALL'); setCountry('ALL'); setRisk('ALL') }}
            disabled={!hasFilters}
            className="border border-line px-3 py-2 font-mono-lab text-[10px] tracking-[0.2em] text-dim transition-colors duration-200 hover:text-foreground disabled:opacity-30"
          >
            RESET
          </button>
          <span className="ms-auto font-mono-lab text-[10px] tracking-[0.15em] text-faint" dir="ltr">{filtered.length} / {ROWS.length} TICKERS</span>
        </Reveal>

        <Reveal delay={110} className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono-lab text-[9.5px] leading-4 tracking-wide text-faint">
          <span><span className="text-dim">VS. PEERS</span> — richness of valuation vs. its own peer set. Hover a badge for detail.</span>
          <span><span className="text-dim">RISK</span> — the deep dive's overall risk-quality read, not a count of flagged items. Hover a badge for detail.</span>
        </Reveal>

        <div className="mt-3 overflow-x-auto border border-line bg-panel p-1">
          <table className="w-full min-w-[1140px] border-collapse bg-card2">
            <thead>
              <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.2em] text-faint">
                <th className="px-3 py-3 text-start">TICKER</th>
                <th className="px-3 py-3 text-start">NAME / WHAT IT DOES</th>
                <th className="px-3 py-3 text-start">DOMAIN / AI CHAIN</th>
                <th className="px-3 py-3 text-start">EXCHANGE</th>
                <th className="px-3 py-3 text-end" title="Live where available, otherwise the researched snapshot">
                  PRICE {liveCount > 0 && <span className="text-signal">· LIVE</span>}
                </th>
                <th className="px-3 py-3 text-end" title="Researched snapshot — not live">MKT CAP</th>
                <th className="px-3 py-3 text-end" title="Researched snapshot — not live">FWD P/E</th>
                <th className="px-3 py-3 text-end" title="Researched snapshot — not live">EV/EBITDA</th>
                <th className="px-3 py-3 text-center">VS. PEERS</th>
                <th className="px-3 py-3 text-center">RISK</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.ticker} className={cn('border-b border-line/50 transition-colors bg-row-hover align-top', i % 2 === 1 && 'bg-stripe')}>
                  <td className="px-3 py-3.5">
                    <Link to={`/companies/${r.ticker}`} className="font-mono-lab text-[13.5px] font-medium text-foreground hover:text-signal" dir="ltr">
                      {r.ticker}
                    </Link>
                  </td>
                  <td className="max-w-[280px] px-3 py-3.5">
                    <div className="font-mono-lab text-[11.5px] text-prose">{r.name}</div>
                    <div className="mt-1 font-mono-lab text-[10px] leading-4 tracking-wide text-dim">{r.tagline}</div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="font-mono-lab text-[9.5px] tracking-[0.1em] text-dim">{DOMAIN_LABEL[r.domain]}</div>
                    {r.onChain && (
                      <div className="mt-1 font-mono-lab text-[9px] tracking-[0.1em] text-signal/80">AI CHAIN · {SEGMENT_SHORT[r.segment]}</div>
                    )}
                  </td>
                  <td className="px-3 py-3.5 font-mono-lab text-[10px] tracking-[0.05em] text-dim">{r.exchange}</td>
                  <td className="px-3 py-3.5 text-end font-mono-lab text-[13px] tabular-nums text-prose" dir="ltr">
                    {(() => {
                      const q = quotes[r.ticker]
                      const shown = q?.price ?? r.price
                      if (shown == null) return '—'
                      return (
                        <span
                          className={cn(q && 'text-foreground')}
                          title={q ? 'Live price' : 'Researched snapshot — no live quote available for this ticker'}
                        >
                          {formatMoney(shown, q?.currency ?? r.currency)}
                          {q?.changePercent != null && (
                            <span className={cn('ms-1.5 text-[10px]', q.changePercent >= 0 ? 'text-signal' : 'text-danger')}>
                              {q.changePercent >= 0 ? '+' : ''}{q.changePercent.toFixed(2)}%
                            </span>
                          )}
                        </span>
                      )
                    })()}
                  </td>
                  <td className="px-3 py-3.5 text-end font-mono-lab text-[11px] tabular-nums text-dim" dir="ltr">
                    {r.marketCap ?? '—'}
                  </td>
                  <td className="px-3 py-3.5 text-end font-mono-lab text-[11px] tabular-nums text-dim" dir="ltr">
                    {r.forwardPE ?? '—'}
                  </td>
                  <td className="px-3 py-3.5 text-end font-mono-lab text-[11px] tabular-nums text-dim" dir="ltr">
                    {r.evEbitda ?? '—'}
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <Badge tone={verdictBadgeTone(r.verdictTone)} title={VERDICT_EXPLAIN[r.verdictTone]}>{VERDICT_LABEL[r.verdictTone]}</Badge>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <Badge tone={riskBadgeTone(r.riskTier)} title={`${RISK_EXPLAIN[r.riskTier]}\n\n${r.ticker}: ${r.riskNote}`}>
                      {RISK_LABEL[r.riskTier]}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-12 text-center font-mono-lab text-[11px] tracking-wide text-faint">
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
            holds names with thin, unconfirmed, or thematic-only AI links. RISK is drawn from each ticker's own deep-dive synthesis
            score (business durability, balance sheet, competitive position, valuation cushion), not a raw count of listed risk
            factors — a well-covered, high-quality name naturally accumulates more documented risks than a thinly-researched one,
            so counting flags alone would misread quality names as dangerous. PRICE updates live where a quote is available
            {asOf && ` (last refreshed ${new Date(asOf).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })})`}, and
            falls back to the researched figure where it isn't. MKT CAP, FWD P/E and EV/EBITDA are last-known figures from each
            ticker's deep dive, not live — so a ratio may lag a fast price move; see the individual company page for sourcing and
            date. Exchange venue is best-effort reference data. This is a research framework, not investment advice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
