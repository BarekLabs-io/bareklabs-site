import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { companies } from '@/data/companies'
import { countryOf, currencyOf, formatMoney } from '@/data/valueChain'
import { CHAIN_EXTRA } from '@/data/chainExtra'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { DcfSimulator } from '@/components/DcfSimulator'
import { parseMarketCapUsd, formatUsdCompact } from '@/lib/marketCap'

type ChainItem = { t: string; name: string; role: string; priv?: boolean }
type ChainStage = { n: string; k: string; name: string; desc: string; items: ChainItem[] }

type Sel = { s: number; i: number }

function PickCard({ p, i }: { p: { t: string; title: string; d: string }; i: number }) {
  const ref = useSpotlight<HTMLDivElement>()
  return (
    <Reveal delay={i * 90}>
      <div ref={ref} className="spot-card border border-line p-7 md:p-9">
        <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal" dir="ltr">{p.t}</div>
        <h3 className="mt-6 text-xl font-medium tracking-tight md:text-2xl">{p.title}</h3>
        <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{p.d}</p>
      </div>
    </Reveal>
  )
}

/* Merges the hand-curated headline names (from the i18n dict) with the wider,
 * real Screener roster (CHAIN_EXTRA -> companies.ts) so the constellation
 * actually reflects the full covered universe, not just US mega-caps. */
function useMergedStages(baseStages: ChainStage[]): ChainStage[] {
  return useMemo(
    () =>
      baseStages.map((st) => {
        const seen = new Set(st.items.map((it) => it.t))
        const extra: ChainItem[] = (CHAIN_EXTRA[st.k] ?? [])
          .filter((t) => !seen.has(t) && companies[t])
          .map((t) => ({ t, name: companies[t].name, role: companies[t].tagline }))
        return { ...st, items: [...st.items, ...extra] }
      }),
    [baseStages]
  )
}

function keyMetric(ticker: string, pattern: RegExp): string | null {
  const c = companies[ticker]
  if (!c) return null
  const m = c.valuation.metrics.find((mm) => pattern.test(mm.label))
  return m?.values[0] ?? null
}

/* ---------- CONSTELLATION LAYOUT ---------- */
const VB_W = 1440
const VB_H = 620
const MARGIN_X = 182
const HUB_Y = 165
const HUB_R = 30
const SAT_DIST = 100
const SAT_R = 7
/* Bubble radius range when sized by a metric. Area (not radius) is made
 * proportional to the value — radius-proportional sizing exaggerates large
 * values by the square and is a classic way to mislead with a bubble chart. */
const R_MIN = 4.5
const R_MAX = 17

type SizeMode = 'cap' | 'share' | 'flat'

type Hub = { x: number; y: number }
type Sat = { x: number; y: number; angle: number; ring: number }

/** Per-ticker sizing inputs, derived from the researched market caps.
 *  `share` is the true fraction (shown as a %); `shareNorm` rescales it so the
 *  leader of each layer fills the bubble — that's what makes "who dominates
 *  this layer" legible layer by layer, which raw shares (rarely above ~0.4)
 *  do not. Only ever used for sizing, never displayed as a number. */
type CapInfo = { usd: number | null; share: number | null; shareNorm: number | null }

function useCapData(stages: ChainStage[]) {
  return useMemo(() => {
    const byTicker = new Map<string, CapInfo>()
    let maxUsd = 0

    // 1. Resolve a USD market cap per ticker (null where we have no figure —
    //    private companies like OpenAI, and tickers with no deep dive yet).
    const perStage = stages.map((st) =>
      st.items.map((it) => {
        const co = companies[it.t]
        const usd = co ? parseMarketCapUsd(keyMetric(it.t, /market cap/i), currencyOf(it.t)) : null
        if (usd != null) maxUsd = Math.max(maxUsd, usd)
        return { ticker: it.t, usd }
      })
    )

    // 2. Share of each stage's *covered* market cap. This is share of the
    //    names this site tracks in that layer — not true industry market
    //    share, which we have no data for. Labelled as such in the UI.
    perStage.forEach((row) => {
      const total = row.reduce((sum, r) => sum + (r.usd ?? 0), 0)
      const maxInStage = row.reduce((m, r) => Math.max(m, r.usd ?? 0), 0)
      row.forEach((r) => {
        const share = r.usd != null && total > 0 ? r.usd / total : null
        byTicker.set(r.ticker, {
          usd: r.usd,
          share,
          shareNorm: r.usd != null && maxInStage > 0 ? r.usd / maxInStage : null,
        })
      })
    })

    return { byTicker, maxUsd }
  }, [stages])
}

/** Area-proportional radius; falls back to a small neutral dot when unsized. */
function radiusFor(info: CapInfo | undefined, mode: SizeMode, maxUsd: number): number {
  if (mode === 'flat') return SAT_R
  const value = mode === 'cap' ? info?.usd : info?.shareNorm
  const max = mode === 'cap' ? maxUsd : 1
  if (value == null || !max) return R_MIN
  return R_MIN + (R_MAX - R_MIN) * Math.sqrt(Math.min(value / max, 1))
}

function useConstellation(stages: ChainStage[]) {
  return useMemo(() => {
    const n = stages.length
    const step = n > 1 ? (VB_W - MARGIN_X * 2) / (n - 1) : 0
    const hubs: Hub[] = stages.map((_, i) => ({
      x: MARGIN_X + i * step,
      y: HUB_Y + Math.sin(i * 1.15) * 22,
    }))
    const sats: Sat[][] = stages.map((st, si) => {
      const k = st.items.length
      const spreadStep = Math.min(30, 150 / Math.max(k - 1, 1)) // tighten spacing as satellite count grows
      return st.items.map((_, j) => {
        const angleDeg = 90 + (j - (k - 1) / 2) * spreadStep
        const angleRad = (angleDeg * Math.PI) / 180
        // Alternate inner/outer ring so bubbles and labels on adjacent tight
        // angles don't collide — the gap has to clear two max-radius bubbles.
        const ringIdx = k > 6 ? j % 2 : 0
        const dist = SAT_DIST + ringIdx * 52
        return {
          x: hubs[si].x + dist * Math.cos(angleRad),
          y: hubs[si].y + dist * Math.sin(angleRad),
          angle: angleDeg,
          ring: ringIdx,
        }
      })
    })
    const connectors = hubs.slice(0, -1).map((h, i) => {
      const next = hubs[i + 1]
      const midX1 = h.x + (next.x - h.x) * 0.42
      const midX2 = h.x + (next.x - h.x) * 0.58
      return `M ${h.x} ${h.y} C ${midX1} ${h.y}, ${midX2} ${next.y}, ${next.x} ${next.y}`
    })
    return { hubs, sats, connectors }
  }, [stages])
}

export default function AiValueChain() {
  const { t } = useLang()
  const c = t.chain
  const stages = useMergedStages(c.stages as ChainStage[])
  const [mode, setMode] = useState<'explore' | 'flow'>('explore')
  const [sel, setSel] = useState<Sel>({ s: 3, i: 1 }) // AMD by default — has a deep dive on file, unlike NVDA
  const [hover, setHover] = useState<Sel | null>(null)

  const selStage = stages[sel.s]
  const selItem = selStage.items[sel.i]
  const selCompany = companies[selItem.t]
  const price = keyMetric(selItem.t, /^price|^share price/i)
  const marketCap = keyMetric(selItem.t, /market cap/i)
  const { hubs, sats, connectors } = useConstellation(stages)
  const [sizeMode, setSizeMode] = useState<SizeMode>('cap')
  const { byTicker, maxUsd } = useCapData(stages)
  const selCap = byTicker.get(selItem.t)
  // Live price for the selected node only — market cap stays on the
  // researched snapshot (the quotes endpoint doesn't carry it).
  const { quotes } = useLiveQuotes(selCompany ? [selItem.t] : [])
  const liveQuote = quotes[selItem.t]

  return (
    <>
      <PageHero code={c.hero.code} title={c.hero.title} serif={c.hero.serif} desc={c.hero.desc} />

      {/* ===== CONSTELLATION ===== */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead
            index="MAP"
            label={c.hint}
            right={
              <div className="flex gap-2">
                {(['explore', 'flow'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      'border px-4 py-1.5 font-mono-lab text-[9px] tracking-[0.25em] transition-all duration-300',
                      mode === m ? 'border-signal bg-signal text-[#0c0e12]' : 'border-line text-dim hover:text-foreground'
                    )}
                  >
                    {c.modes[m]}
                  </button>
                ))}
              </div>
            }
          />

          {/* bubble-size encoding control */}
          <Reveal>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-line border-b-0 bg-panel px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{c.sizing.label}</span>
                {(['cap', 'share', 'flat'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSizeMode(m)}
                    className={cn(
                      'border px-3 py-1.5 font-mono-lab text-[9px] tracking-[0.18em] transition-all duration-300',
                      sizeMode === m ? 'border-signal text-signal' : 'border-line text-dim hover:text-foreground'
                    )}
                  >
                    {c.sizing.modes[m]}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 font-mono-lab text-[9px] tracking-wider text-faint">
                {sizeMode !== 'flat' && (
                  <span className="flex items-center gap-1.5">
                    <svg width="34" height="16" aria-hidden="true">
                      <circle cx="5" cy="8" r="3" fill="var(--card2)" stroke="var(--line-hover)" strokeWidth="1.2" />
                      <circle cx="22" cy="8" r="7" fill="var(--card2)" stroke="var(--line-hover)" strokeWidth="1.2" />
                    </svg>
                    {c.sizing.legendArea}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" aria-hidden="true">
                    <circle cx="7" cy="7" r="5" fill="none" stroke="var(--line)" strokeWidth="1.2" strokeDasharray="2 2" />
                  </svg>
                  {c.sizing.legendNoData}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto border border-line bg-panel" dir="ltr">
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="min-w-[1180px]" role="img" aria-label={c.hint}>
                {/* stage-to-stage flow connectors */}
                {connectors.map((d, i) => {
                  const isActivePath = i < sel.s || i === sel.s
                  return (
                    <g key={i}>
                      <path d={d} fill="none" stroke="var(--line)" strokeWidth={1.5} />
                      <path
                        d={d}
                        fill="none"
                        stroke="rgb(var(--signal))"
                        strokeWidth={1.5}
                        opacity={isActivePath ? 0.5 : 0.12}
                      />
                      {mode === 'flow' && (
                        <circle r={3.5} fill="rgb(var(--signal))">
                          <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
                        </circle>
                      )}
                    </g>
                  )
                })}

                {/* satellite connector lines */}
                {stages.map((st, si) =>
                  st.items.map((it, ii) => {
                    const sat = sats[si][ii]
                    const hub = hubs[si]
                    const active = sel.s === si && sel.i === ii
                    return (
                      <line
                        key={`${st.k}-${it.t}-line`}
                        x1={hub.x}
                        y1={hub.y}
                        x2={sat.x}
                        y2={sat.y}
                        stroke={active ? 'rgb(var(--signal))' : 'var(--line)'}
                        strokeWidth={active ? 1.5 : 1}
                        opacity={active ? 0.8 : 0.45}
                      />
                    )
                  })
                )}

                {/* satellite ticker nodes */}
                {stages.map((st, si) =>
                  st.items.map((it, ii) => {
                    const sat = sats[si][ii]
                    const active = sel.s === si && sel.i === ii
                    const isHover = hover?.s === si && hover?.i === ii
                    /* In crowded stages the nodes alternate between an inner and
                     * an outer ring, so alternate the label side to match —
                     * neighbours then never stack their labels. (Radially
                     * placed labels were tried and are worse here: they run
                     * straight into the next node along the fan.) */
                    const labelBelow = st.items.length > 6 ? sat.ring === 1 : sat.angle > 90
                    const hasDive = !!companies[it.t]
                    const cap = byTicker.get(it.t)
                    const r = radiusFor(cap, sizeMode, maxUsd)
                    const rDrawn = active || isHover ? r + 2.5 : r
                    // Unsized nodes (private, or no cap figure) stay hollow so
                    // a small bubble never reads as "small company" when it
                    // actually means "no data".
                    const unsized = sizeMode !== 'flat' && (sizeMode === 'cap' ? cap?.usd : cap?.shareNorm) == null
                    return (
                      <g
                        key={`${st.k}-${it.t}`}
                        onClick={() => { setSel({ s: si, i: ii }) }}
                        onMouseEnter={() => setHover({ s: si, i: ii })}
                        onMouseLeave={() => setHover(null)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={sat.x}
                          cy={sat.y}
                          r={rDrawn}
                          fill={active ? 'rgb(var(--signal))' : unsized ? 'transparent' : 'var(--card2)'}
                          fillOpacity={active ? 1 : unsized ? 0 : 0.9}
                          stroke={active ? 'rgb(var(--signal))' : isHover ? 'rgb(var(--signal))' : hasDive ? 'var(--line-hover)' : 'var(--line)'}
                          strokeWidth={1.5}
                          strokeDasharray={unsized || !hasDive ? '2 2' : undefined}
                          className="transition-all duration-300"
                        />
                        {/* inner dot keeps big hollow rings clickable and readable */}
                        {!active && r > 12 && (
                          <circle cx={sat.x} cy={sat.y} r={1.6} fill="var(--dim)" opacity={0.55} />
                        )}
                        {it.priv && (
                          <circle cx={sat.x + rDrawn * 0.72} cy={sat.y - rDrawn * 0.72} r={3} fill="rgb(var(--warn))" />
                        )}
                        <text
                          x={sat.x}
                          y={labelBelow ? sat.y + rDrawn + 14 : sat.y - rDrawn - 7}
                          textAnchor="middle"
                          className="font-mono-lab pointer-events-none select-none"
                          style={{ fontSize: 10.5, letterSpacing: '0.05em', fill: active || isHover ? 'rgb(var(--signal))' : 'var(--dim)' }}
                        >
                          {it.t}
                        </text>
                        <title>
                          {it.name} — {it.role}
                          {cap?.usd != null ? `\nMarket cap ≈ ${formatUsdCompact(cap.usd)}` : '\nNo market-cap figure on file'}
                          {cap?.share != null ? ` · ${(cap.share * 100).toFixed(1)}% of this layer's covered cap` : ''}
                        </title>
                      </g>
                    )
                  })
                )}

                {/* stage hub nodes */}
                {stages.map((st, si) => {
                  const hub = hubs[si]
                  const isSel = sel.s === si
                  return (
                    <g key={st.k} onClick={() => setSel({ s: si, i: 0 })} className="cursor-pointer">
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r={HUB_R}
                        fill={isSel ? 'rgb(var(--signal))' : 'var(--card2)'}
                        fillOpacity={isSel ? 0.14 : 1}
                        stroke={isSel ? 'rgb(var(--signal))' : 'var(--line-hover)'}
                        strokeWidth={isSel ? 2 : 1.5}
                        className="transition-all duration-300"
                      />
                      <text
                        x={hub.x}
                        y={hub.y - 3}
                        textAnchor="middle"
                        className="font-mono-lab pointer-events-none select-none"
                        style={{ fontSize: 11, letterSpacing: '0.15em', fill: isSel ? 'rgb(var(--signal))' : 'var(--foreground)' }}
                      >
                        {st.n}
                      </text>
                      <text
                        x={hub.x}
                        y={hub.y + 12}
                        textAnchor="middle"
                        className="font-mono-lab pointer-events-none select-none"
                        style={{ fontSize: 8, letterSpacing: '0.1em', fill: 'var(--faint)' }}
                      >
                        {st.k}
                      </text>
                      <text
                        x={hub.x}
                        y={hub.y - HUB_R - 12}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        style={{ fontSize: 13, fontWeight: 300, fill: 'var(--prose)' }}
                      >
                        {st.name}
                      </text>
                      <text
                        x={hub.x}
                        y={hub.y + HUB_R + 22}
                        textAnchor="middle"
                        className="font-mono-lab pointer-events-none select-none"
                        style={{ fontSize: 9, letterSpacing: '0.1em', fill: 'var(--faint)' }}
                      >
                        {st.items.length} TICKERS
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </Reveal>

          {/* ===== DETAIL PANEL ===== */}
          <Reveal delay={120}>
            <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-12">
              <div className="bg-panel p-7 md:col-span-3 md:p-9">
                <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.detail.stage}</div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono-lab text-[10px] text-signal" dir="ltr">{selStage.n}</span>
                  <span className="text-lg font-light tracking-tight">{selStage.name}</span>
                </div>
                <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{selStage.desc}</p>
              </div>
              <div className="bg-panel p-7 md:col-span-6 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.detail.role}</div>
                  <div className="flex items-center gap-2">
                    <span className="border border-line px-2 py-0.5 font-mono-lab text-[8px] tracking-[0.2em] text-dim" dir="ltr">
                      {countryOf(selItem.t)}
                    </span>
                    <span className="border border-line px-2 py-0.5 font-mono-lab text-[8px] tracking-[0.2em] text-dim" dir="ltr">
                      {selItem.priv ? c.legend.private : c.legend.listed}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4">
                  <span className="font-mono-lab text-2xl tracking-tight text-signal" dir="ltr">{selItem.t}</span>
                  <span className="text-xl font-light tracking-tight">{selItem.name}</span>
                </div>
                <p className="mt-4 font-mono-lab text-[12px] leading-6 tracking-wide text-foreground/80">{selItem.role}</p>
                {selCompany && (price || marketCap) && (
                  <div className="mt-5 flex flex-wrap gap-6 border-t border-line pt-4">
                    {(price || liveQuote) && (
                      <div>
                        <div className="font-mono-lab text-[8px] tracking-[0.2em] text-faint">
                          PRICE {liveQuote && <span className="text-signal">· LIVE</span>}
                        </div>
                        <div className="mt-1 font-mono-lab text-sm tabular-nums text-foreground" dir="ltr">
                          {liveQuote ? formatMoney(liveQuote.price, liveQuote.currency ?? currencyOf(selItem.t)) : price}
                          {liveQuote?.changePercent != null && (
                            <span className={cn('ms-1.5 text-[11px]', liveQuote.changePercent >= 0 ? 'text-signal' : 'text-danger')}>
                              {liveQuote.changePercent >= 0 ? '+' : ''}{liveQuote.changePercent.toFixed(2)}%
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {marketCap && (
                      <div>
                        <div className="font-mono-lab text-[8px] tracking-[0.2em] text-faint">MARKET CAP</div>
                        <div
                          className="mt-1 font-mono-lab text-sm tabular-nums text-foreground"
                          dir="ltr"
                          title={selCompany ? `Researched snapshot as of ${selCompany.asOf} — not live` : undefined}
                        >
                          {marketCap}
                        </div>
                      </div>
                    )}
                    {selCap?.share != null && (
                      <div>
                        <div className="font-mono-lab text-[8px] tracking-[0.2em] text-faint">{c.sizing.shareLabel}</div>
                        <div className="mt-1 flex items-baseline gap-2" dir="ltr">
                          <span className="font-mono-lab text-sm tabular-nums text-signal">
                            {(selCap.share * 100).toFixed(1)}%
                          </span>
                          <span className="h-1.5 w-16 bg-track">
                            <span
                              className="block h-full bg-signal transition-all duration-700"
                              style={{ width: `${Math.min(selCap.share * 100, 100)}%` }}
                            />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-5">
                  {selCompany ? (
                    <Link
                      to={`/companies/${selItem.t}`}
                      className="inline-flex items-center gap-2 border border-signal/50 px-4 py-2 font-mono-lab text-[10px] tracking-[0.2em] text-signal transition-all duration-300 hover:bg-signal hover:text-[#0c0e12]"
                    >
                      DEEP DIVE →
                    </Link>
                  ) : (
                    <span className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">NO DEEP DIVE ON FILE YET</span>
                  )}
                </div>
                {selCap?.share != null && (
                  <p className="mt-5 border-t border-line pt-4 font-mono-lab text-[9.5px] leading-4 tracking-wide text-faint">
                    {c.sizing.shareNote}
                  </p>
                )}
              </div>
              <div className="bg-panel p-7 md:col-span-3 md:p-9">
                <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.detail.exposure}</div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono-lab text-[10px] tracking-wider">
                    <span className="text-dim">{c.legend.upstream}</span>
                    <span className="text-signal" dir="ltr">{sel.s === 0 ? '—' : `${sel.s} ${sel.s === 1 ? 'STAGE' : 'STAGES'}`}</span>
                  </div>
                  <div className="h-1 w-full bg-track">
                    <div className="h-full bg-signal/70 transition-all duration-500" style={{ width: `${(sel.s / (stages.length - 1)) * 100}%` }} />
                  </div>
                  <div className="flex items-center justify-between font-mono-lab text-[10px] tracking-wider">
                    <span className="text-dim">{c.legend.downstream}</span>
                    <span className="text-signal" dir="ltr">
                      {stages.length - 1 - sel.s === 0 ? '—' : `${stages.length - 1 - sel.s} ${stages.length - 1 - sel.s === 1 ? 'STAGE' : 'STAGES'}`}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-track">
                    <div className="h-full bg-signal/40 transition-all duration-500" style={{ width: `${((stages.length - 1 - sel.s) / (stages.length - 1)) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ===== DCF SIMULATOR — follows the constellation selection ===== */}
          <Reveal delay={160}>
            <div className="mt-4">
              <DcfSimulator ticker={selItem.t} livePrice={liveQuote?.price ?? null} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONVICTION PICKS ===== */}
      <section className="border-b border-line bg-alt">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="CONVICTION" label={c.picks.head} right={c.picks.headRight} />
          <div className="grid gap-4 md:grid-cols-3">
            {c.picks.items.map((p, i) => (
              <PickCard key={p.t} p={p} i={i} />
            ))}
          </div>
          <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{c.picks.note}</p>
            <Link
              to="/analysis/ideas"
              className="border border-foreground/30 px-6 py-2.5 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300 hover:border-signal hover:bg-signal hover:text-[#0c0e12]"
            >
              {t.nav.sub.ideas.label} →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
