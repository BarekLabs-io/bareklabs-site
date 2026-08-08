import { lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'
import { companies, type Risk, type ChainRow } from '@/data/companies'
import { parseMetricValue } from '@/lib/priceSeries'
import { countryOf, chainSegmentOf, segmentInfoOf, segmentOf } from '@/data/valueChain'
import { domainInfoOf, domainOf } from '@/data/domains'
import { useLiveQuotes } from '@/lib/useLiveQuotes'

const PriceChart = lazy(() => import('@/components/PriceChart'))

const CHAIN_TONE: Record<ChainRow['tone'], string> = {
  core: 'text-signal',
  client: 'text-warn',
  growth: 'text-signal',
  none: 'text-faint',
  indirect: 'text-dim',
}

const SEVERITY_TONE: Record<Risk['severity'], string> = {
  high: 'text-danger',
  medium: 'text-warn',
  low: 'text-signal',
}

const TIER_LABEL: Record<'ideal' | 'acceptable' | 'expensive', string> = {
  ideal: 'REFERENCE ZONE',
  acceptable: 'CURRENT ZONE',
  expensive: 'STRETCHED',
}

const TIER_TONE: Record<'ideal' | 'acceptable' | 'expensive', string> = {
  ideal: 'border-signal/50 text-signal',
  acceptable: 'border-warn/50 text-warn',
  expensive: 'border-danger/50 text-danger',
}

function Stars({ n }: { n: number }) {
  return (
    <span className="font-mono-lab tracking-tight text-signal" dir="ltr">
      {'★'.repeat(n)}
      <span className="text-track">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

export default function CompanyPage() {
  const { ticker = '' } = useParams()
  const company = companies[ticker.toUpperCase()]
  const { quotes, asOf } = useLiveQuotes(company ? [company.ticker] : [])

  if (!company) {
    return (
      <section className="lab-grid relative border-b border-line pt-44 pb-20 md:pt-52">
        <div className="shell px-5 md:px-10">
          <div className="font-mono-lab text-[12px] tracking-[0.3em] text-signal">COMPANY DEEP DIVE</div>
          <h1 className="mt-4 text-4xl font-medium tracking-tight">No profile yet for "{ticker.toUpperCase()}"</h1>
          <p className="mt-4 max-w-7xl font-mono-lab text-[16px] leading-6 text-dim">
            This ticker doesn't have a company deep dive yet.
          </p>
          <Link to="/souk-signal" className="mt-8 inline-block border border-line px-4 py-2 font-mono-lab text-[15px] tracking-[0.2em] transition-colors hover:border-signal hover:text-signal">
            ← BACK TO SOUK SIGNAL
          </Link>
        </div>
      </section>
    )
  }

  const c = company
  const priceMetric = c.valuation.metrics.find((m) => /^price|^share price/i.test(m.label))
  /* No `?? 100` fallback. A watchlist entry with no researched price and no
   * live quote used to anchor the chart on a literal 100 and draw a walk
   * around it — a shape and a percentage move belonging to no company. When
   * there is no price to stand behind, the chart does not render at all. */
  const staticPrice = parseMetricValue(priceMetric?.values[0])
  // Live price when the proxy has it; otherwise the researched snapshot.
  // Market cap and every valuation multiple below stay on the static,
  // dated research — the quotes endpoint doesn't carry them.
  const liveQuote = quotes[c.ticker]
  const currentPrice = liveQuote?.price ?? staticPrice
  /* A researched price is a snapshot and will drift; that is expected and the
   * date says so. A researched price that is a long way from the live one is
   * something else — it means the figure was captured wrong, and every
   * multiple derived from it in this deep dive inherits the error. MTZ sat at
   * a researched $417 against a real $259 until this check existed. 20% is
   * wide enough that ordinary drift does not trip it. */
  const drift =
    liveQuote && staticPrice != null && staticPrice > 0 ? (liveQuote.price - staticPrice) / staticPrice : null
  const priceSuspect = drift != null && Math.abs(drift) > 0.2
  const marketCapMetric = c.valuation.metrics.find((m) => /^market cap|market cap$/i.test(m.label))
  const country = countryOf(c.ticker)
  const segment = segmentInfoOf(c.ticker)
  /* Two labels, two jobs: the domain says what the business is, the chain
   * position says where it sits on the AI hardware chain when it sits there
   * at all. A name off the chain gets described, not diminished. */
  const domain = domainInfoOf(c.ticker)
  const onChain = chainSegmentOf(c.ticker) != null
  const segmentPeers = Object.values(companies)
    .filter((p) =>
      p.ticker !== c.ticker &&
      (onChain ? segmentOf(p.ticker) === segmentOf(c.ticker) : domainOf(p.ticker) === domainOf(c.ticker))
    )
    .map((p) => p.ticker)

  return (
    <>
      <section className="lab-grid-fine relative border-b border-line pt-28 pb-10 md:pt-32">
        <div className="shell px-5 md:px-10">
          <Reveal>
            <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">
              COMPANY DEEP DIVE — {c.ticker} · {domain.label} · AS OF {c.asOf}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-medium tracking-tight md:text-4xl">{c.name}</span>
              <span className="font-mono-lab text-sm text-dim" dir="ltr">{c.ticker}</span>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-3 max-w-6xl font-mono-lab text-[12px] leading-5 tracking-wide text-prose">{c.tagline}</p>
          </Reveal>
          <Reveal delay={120} className="mt-5 flex flex-wrap items-center gap-2">
            <span className="border border-line px-2.5 py-1 font-mono-lab text-[10px] tracking-[0.15em] text-dim">{country.toUpperCase()}</span>
            <Link
              to="/trade-tracker/screener"
              className="border border-line px-2.5 py-1 font-mono-lab text-[10px] tracking-[0.15em] text-dim transition-colors hover:border-signal hover:text-signal"
              title={domain.note}
            >
              {domain.label}
            </Link>
            {onChain && (
              <Link
                to="/analysis/ai-value-chain"
                className="border border-signal/40 bg-signal/5 px-2.5 py-1 font-mono-lab text-[10px] tracking-[0.15em] text-signal transition-colors hover:border-signal"
                title={segment.note}
              >
                AI CHAIN · {segment.label}
              </Link>
            )}
            {priceSuspect && drift != null && (
              <span
                className="border border-warn/50 bg-warn/5 px-2.5 py-1 font-mono-lab text-[10px] tracking-[0.15em] text-warn"
                dir="ltr"
                title="The researched snapshot is a long way from the live quote. Every multiple below was derived from that snapshot, so treat them as suspect until the figure is refreshed."
              >
                SNAPSHOT {drift > 0 ? '−' : '+'}{Math.abs(drift * 100).toFixed(0)}% VS LIVE — NEEDS REFRESH
              </span>
            )}
            {marketCapMetric && (
              <span
                className="border border-line px-2.5 py-1 font-mono-lab text-[10px] tracking-[0.15em] text-dim"
                dir="ltr"
                title={`Researched snapshot as of ${c.asOf} — only the share price above updates live`}
              >
                MKT CAP {marketCapMetric.values[0]} <span className="text-faint">· AS OF {c.asOf}</span>
              </span>
            )}
          </Reveal>
          <Reveal delay={140} className="mt-8">
            {currentPrice != null ? (
              <Suspense fallback={<div className="h-[280px] animate-pulse border border-line bg-panel md:h-[320px]" />}>
                <PriceChart
                  ticker={c.ticker}
                  currentPrice={currentPrice}
                  summary={c.priceMap.technical}
                  isLivePrice={!!liveQuote}
                  asOfMs={liveQuote ? asOf : null}
                />
              </Suspense>
            ) : (
              <div className="border border-dashed border-line px-6 py-12 md:px-10">
                <div className="font-mono-lab text-[10px] tracking-[0.3em] text-faint">NO PRICE SERIES</div>
                <p className="mt-3 max-w-7xl font-mono-lab text-[11px] leading-6 text-dim">
                  The quote feed has nothing for {c.ticker} right now and no researched price is on file, so no chart is
                  drawn. The reference levels below come from the data provider and are dated.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {c.priceMap.technical.map((t) => (
                    <p key={t} className="font-mono-lab text-[11px] leading-6 text-foreground/85">{t}</p>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- value chain ---- */}
      <section>
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead
            index="01"
            label={onChain ? 'Value chain position' : 'What this company does'}
            right={onChain ? 'WHERE THE MONEY FLOWS' : 'SECTOR & ACTIVITY'}
          />
          <Reveal className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-s-2 border-signal ps-4">
            <span className="font-mono-lab text-[11px] tracking-[0.2em] text-signal">{domain.label}</span>
            <span className="font-mono-lab text-[12px] tracking-wide text-dim">{domain.note}</span>
          </Reveal>
          {onChain && (
            <Reveal className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-s-2 border-line ps-4">
              <span className="font-mono-lab text-[11px] tracking-[0.2em] text-dim">AI CHAIN · {segment.label}</span>
              <span className="font-mono-lab text-[12px] tracking-wide text-faint">{segment.note}</span>
            </Reveal>
          )}
          <Reveal>
            <p className="max-w-6xl font-mono-lab text-[16px] leading-6 tracking-wide text-prose">{c.chain.intro}</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 overflow-x-auto border border-line bg-panel p-1">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-line bg-ticker font-mono-lab text-[11px] tracking-[0.2em] text-faint">
                    <th className="px-5 py-3 text-start">LEVEL</th>
                    <th className="px-5 py-3 text-start">PLAYERS</th>
                    <th className="px-5 py-3 text-end">{c.ticker}'S POSITION</th>
                  </tr>
                </thead>
                <tbody>
                  {c.chain.rows.map((r, i) => (
                    <tr key={r.level} className={cn('border-b border-line/50', i % 2 === 1 ? 'bg-secondary/50' : 'bg-panel')}>
                      <td className="px-5 py-4 font-mono-lab text-[15px] font-medium text-foreground">{r.level}</td>
                      <td className="px-5 py-4 font-mono-lab text-[15px] text-dim">{r.players}</td>
                      <td className={cn('px-5 py-4 text-end font-mono-lab text-[15px] tracking-wide', CHAIN_TONE[r.tone])}>{r.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal delay={120}>
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">{onChain ? `WHERE ${c.ticker} DOMINATES` : 'WHAT IT SELLS'}</div>
              <ul className="mt-4 space-y-2.5">
                {c.chain.segments.map((s) => (
                  <li key={s} className="font-mono-lab text-[15px] leading-6 tracking-wide text-dim">— {s}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">{onChain ? 'HOW AI IS RESHAPING THE TAM' : 'WHAT MOVES THE MARKET IT SERVES'}</div>
              <p className="mt-4 font-mono-lab text-[15px] leading-6 tracking-wide text-prose">{c.chain.aiShift}</p>
            </Reveal>
          </div>
          {segmentPeers.length > 0 && (
            <Reveal delay={200} className="mt-8 border-t border-line pt-6">
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">{onChain ? 'OTHER TICKERS IN THIS SEGMENT' : `OTHER ${domain.label} NAMES WE COVER`}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {segmentPeers.map((t) => (
                  <Link
                    key={t}
                    to={`/companies/${t}`}
                    className="border border-line px-2.5 py-1 font-mono-lab text-[12px] tracking-wider text-dim transition-colors hover:border-signal hover:text-signal"
                    dir="ltr"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---- valuation ---- */}
      <section className="border-t border-line bg-alt">
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="02" label="Valuation vs. peers" right={c.valuation.peers.slice(1).join(' · ')} />
          {/* Every multiple in this table is derived from the snapshot price.
              If that price has drifted far from the live quote, the multiples
              are wrong by the same factor — say so above the table rather
              than letting a reader take a stale P/E at face value. */}
          {priceSuspect && drift != null && (
            <div className="mb-5 border-s-2 border-warn bg-warn/5 px-4 py-3 font-mono-lab text-[12px] leading-5 tracking-wide text-warn">
              The snapshot price behind this table is {Math.abs(drift * 100).toFixed(0)}% {drift > 0 ? 'below' : 'above'} the
              live quote. Every price-derived multiple here — P/E, P/S, P/B, EV/EBITDA — is off by roughly the same factor
              until the snapshot is refreshed. Margins, backlog and revenue are unaffected.
            </div>
          )}
          <Reveal>
            <div className="overflow-x-auto border border-line bg-panel p-1">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-line bg-ticker font-mono-lab text-[11px] tracking-[0.2em] text-faint">
                    <th className="px-5 py-3 text-start">METRIC</th>
                    {c.valuation.peers.map((p, i) => (
                      <th key={p} className={cn('px-5 py-3 text-end', i === 0 && 'text-signal')}>{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.valuation.metrics.map((m, i) => (
                    <tr key={m.label} className={cn('border-b border-line/50', i % 2 === 1 ? 'bg-secondary/50' : 'bg-panel')}>
                      <td className="px-5 py-3 font-mono-lab text-[15px] text-dim">{m.label}</td>
                      {m.values.map((v, j) => (
                        <td key={j} className={cn('px-5 py-3 text-end font-mono-lab text-[15px] tabular-nums', j === 0 ? 'font-medium text-foreground' : 'text-dim')} dir="ltr">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal delay={100}>
              <div className={cn('font-mono-lab text-[12px] tracking-[0.2em]', c.valuation.verdictTone === 'high' ? 'text-danger' : c.valuation.verdictTone === 'low' ? 'text-signal' : 'text-warn')}>
                {c.valuation.verdictTone === 'high' ? 'RICH vs. PEERS' : c.valuation.verdictTone === 'low' ? 'CHEAP vs. PEERS' : 'FAIR vs. PEERS'}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.valuation.verdictPoints.map((p) => (
                  <li key={p} className="font-mono-lab text-[15px] leading-6 tracking-wide text-dim">— {p}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140}>
              <div className="font-mono-lab text-[12px] tracking-[0.2em] text-faint">JUSTIFIABLE IF</div>
              <ul className="mt-4 space-y-2.5">
                {c.valuation.justifiedIf.map((p) => (
                  <li key={p} className="font-mono-lab text-[15px] leading-6 tracking-wide text-dim">— {p}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- price map & scenarios ---- */}
      <section className="border-t border-line">
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="03" label="Price map & scenarios" right={`HORIZON ${c.priceMap.horizon}`} />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {c.priceMap.zones.map((z, i) => (
              <Reveal key={z.tier} delay={i * 60} className="bg-secondary p-6">
                <span className={cn('border px-2.5 py-1 font-mono-lab text-[11px] tracking-[0.2em]', TIER_TONE[z.tier])}>{TIER_LABEL[z.tier]}</span>
                <div className="mt-4 text-3xl font-light tracking-tight" dir="ltr">{z.range}</div>
                <p className="mt-2 font-mono-lab text-[15px] leading-6 tracking-wide text-dim">{z.rationale}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="mt-8">
            <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">TECHNICAL CONTEXT</div>
            <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
              {c.priceMap.technical.map((t) => (
                <li key={t} className="font-mono-lab text-[15px] leading-6 tracking-wide text-dim">— {t}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="mt-10 border-t border-line pt-8">
            <div className="flex items-center justify-between">
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">SCENARIO MAP</div>
              <div className="font-mono-lab text-[11px] tracking-[0.2em] text-faint">
                INVALIDATION: <span className="text-danger">{c.priceMap.invalidation}</span>
              </div>
            </div>
            <div className="mt-4 flex h-2 w-full overflow-hidden bg-track">
              {c.priceMap.scenarios.map((s) => (
                <div
                  key={s.label}
                  className={cn('h-full transition-all duration-700', s.label === 'BEAR' ? 'bg-danger/70' : s.label === 'BULL' ? 'bg-signal' : 'bg-signal/70')}
                  style={{ width: `${s.prob}%` }}
                />
              ))}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {c.priceMap.scenarios.map((s) => (
                <div key={s.label}>
                  <div className="font-mono-lab text-[15px] tracking-[0.2em]">
                    {s.label} <span className={cn(s.label === 'BEAR' ? 'text-danger' : 'text-signal')} dir="ltr">{s.prob}%</span>
                  </div>
                  <p className="mt-2 font-mono-lab text-[15px] leading-6 tracking-wide text-dim">{s.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- risks ---- */}
      <section className="border-t border-line bg-alt">
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="04" label="Risks" right={`${c.risks.length} FLAGGED`} />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {c.risks.map((r, i) => (
              <Reveal key={r.risk} delay={i * 40} className="bg-secondary p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono-lab text-[12px] tracking-[0.2em] text-dim">{r.risk}</div>
                  <span className={cn('font-mono-lab text-[11px] tracking-[0.2em]', SEVERITY_TONE[r.severity])}>{r.severity.toUpperCase()}</span>
                </div>
                <p className="mt-2 font-mono-lab text-[15px] leading-6 tracking-wide text-faint">{r.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- backlog ---- */}
      <section className="border-t border-line">
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="05" label="Backlog & partnerships" right="VISIBILITY" />
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">VISIBILITY</div>
              <ul className="mt-4 space-y-2.5">
                {c.backlog.visibility.map((v) => (
                  <li key={v} className="font-mono-lab text-[15px] leading-6 tracking-wide text-dim">— {v}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">KEY WINS</div>
              <ul className="mt-4 space-y-2.5">
                {c.backlog.wins.map((v) => (
                  <li key={v} className="font-mono-lab text-[15px] leading-6 tracking-wide text-dim">— {v}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={140} className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
            <div>
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">DIRECT CLIENTS</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.backlog.clients.map((cl) => (
                  <span key={cl} className="border border-line px-2.5 py-1 font-mono-lab text-[12px] tracking-wider text-dim">{cl}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono-lab text-[11px] tracking-[0.25em] text-faint">KEY SUB-SUPPLIERS</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.backlog.suppliers.map((s) => (
                  <span key={s} className="border border-line px-2.5 py-1 font-mono-lab text-[12px] tracking-wider text-dim">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- synthesis ---- */}
      <section className="border-t border-line bg-alt">
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="06" label="Synthesis" right="OUR READ" />
          <Reveal>
            <div className="overflow-hidden border border-line">
              {c.synthesis.scores.map((s, i) => (
                <div key={s.criterion} className={cn('flex flex-col gap-2 border-b border-line/50 p-5 last:border-0 md:flex-row md:items-center md:gap-8', i % 2 === 1 ? 'bg-secondary/50' : 'bg-panel')}>
                  <span className="w-40 shrink-0 font-mono-lab text-[12px] tracking-wider text-dim">{s.criterion}</span>
                  <Stars n={s.stars} />
                  <span className="flex-1 font-mono-lab text-[15px] leading-6 tracking-wide text-faint">{s.note}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-8 border border-line bg-secondary p-8">
            <div className="font-mono-lab text-[12px] tracking-[0.25em] text-signal">{c.synthesis.readLabel}</div>
            <p className="mt-4 max-w-7xl font-mono-lab text-[16px] leading-6 tracking-wide text-dim">{c.synthesis.summary}</p>
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <p className="font-mono-lab text-[12px] leading-6 tracking-wider text-faint">{c.sourceNote}</p>
            <p className="mt-2 font-mono-lab text-[12px] leading-6 tracking-wider text-faint">
              This is a research artefact, not a recommendation — same rule as everything on the Investment Ideas page.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
