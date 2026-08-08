import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { companies } from '@/data/companies'
import { chainSegmentOf, countryOf, currencyOf, formatMoney } from '@/data/valueChain'
import { CHAIN_EXTRA } from '@/data/chainExtra'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { DcfSimulator } from '@/components/DcfSimulator'
import { ValueChainDossier } from '@/components/ValueChainDossier'
import { dossierNodes } from '@/data/valueChainDossier'
import { ChainFlow } from '@/components/ChainFlow'
import { parseMarketCapUsd } from '@/lib/marketCap'

type ChainItem = { t: string; name: string; role: string; priv?: boolean }
type ChainStage = { n: string; k: string; name: string; desc: string; items: ChainItem[] }

type Sel = { s: number; i: number }

function PickCard({ p, i }: { p: { t: string; title: string; d: string }; i: number }) {
  const ref = useSpotlight<HTMLDivElement>()
  return (
    <Reveal delay={i * 90}>
      <div ref={ref} className="spot-card border border-line p-7 md:p-9">
        <div className="font-mono-lab text-[11.5px] tracking-[0.3em] text-signal" dir="ltr">{p.t}</div>
        <h3 className="mt-6 text-xl font-medium tracking-tight md:text-2xl">{p.title}</h3>
        <p className="mt-4 font-mono-lab text-[12.5px] leading-6 tracking-wide text-dim">{p.d}</p>
      </div>
    </Reveal>
  )
}

/* Three sources feed the constellation, in descending order of depth:
 *   1. the hand-curated headline names in the i18n dict,
 *   2. the Screener roster (CHAIN_EXTRA -> companies.ts), which have deep dives,
 *   3. the dossier, which covers the rest of the chain.
 * A node from (3) has no deep dive, and the detail panel says so — but it
 * still carries a live price and a role, and plotting it is the difference
 * between a map of the chain and a map of the names we happen to have
 * written up. */
function useMergedStages(baseStages: ChainStage[]): ChainStage[] {
  return useMemo(() => {
    /* One ticker, one column. The set is global rather than per stage: some
     * names genuinely belong to two layers — Broadcom sells interconnect and
     * custom accelerators — and plotting them twice makes the map look like
     * it has more coverage than it does. First placement wins, and the
     * sources are walked most-curated first. */
    const placed = new Set<string>()
    baseStages.forEach((st) => st.items.forEach((it) => placed.add(it.t)))

    const withExtra = baseStages.map((st) => {
      const items: ChainItem[] = [...st.items]
      for (const t of CHAIN_EXTRA[st.k] ?? []) {
        if (placed.has(t) || !companies[t]) continue
        placed.add(t)
        items.push({ t, name: companies[t].name, role: companies[t].tagline })
      }
      return { ...st, items }
    })

    const fromDossier = dossierNodes()
    const withDossier = withExtra.map((st) => {
      const items = [...st.items]
      for (const n of fromDossier) {
        if (n.stage !== st.k || placed.has(n.t)) continue
        placed.add(n.t)
        // Prefer the deep dive's own words where we have one.
        const c = companies[n.t]
        items.push({ t: n.t, name: c?.name ?? n.name, role: c?.tagline ?? n.role })
      }
      return { ...st, items }
    })

    /* Safety sweep: every covered ticker that sits on the AI chain must land
     * somewhere. The screener's fine-grained segment map catches names that
     * neither the curated lists, CHAIN_EXTRA nor the dossier placed — a new
     * screener addition should appear here on the day it is added, not after
     * someone remembers to update three lists. */
    const SWEEP: Record<string, string> = {
      materials: 'FOUNDRY', wfe: 'FABTOOLS', substrates: 'FOUNDRY', pcb: 'FOUNDRY',
      test: 'FABTOOLS', packaging: 'FOUNDRY', memory: 'MEMORY', silicon: 'COMPUTE',
      cloud: 'COMPUTE', power: 'ELECTRIF',
    }
    for (const [t, co] of Object.entries(companies)) {
      if (placed.has(t)) continue
      const seg = chainSegmentOf(t)
      const stageKey = seg ? SWEEP[seg] : undefined
      if (!stageKey) continue
      const st = withDossier.find((s) => s.k === stageKey)
      if (!st) continue
      placed.add(t)
      st.items.push({ t, name: co.name, role: co.tagline })
    }
    return withDossier
  }, [baseStages])
}

function keyMetric(ticker: string, pattern: RegExp): string | null {
  const c = companies[ticker]
  if (!c) return null
  const m = c.valuation.metrics.find((mm) => pattern.test(mm.label))
  return m?.values[0] ?? null
}


type SizeMode = 'cap' | 'share' | 'flat'


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

export default function AiValueChain() {
  const { t } = useLang()
  const c = t.chain
  const stages = useMergedStages(c.stages as ChainStage[])
  const [mode, setMode] = useState<'explore' | 'flow'>('explore')
  const [sel, setSel] = useState<Sel>({ s: 7, i: 1 }) // AMD by default — has a deep dive on file, unlike NVDA
  const [hover, setHover] = useState<Sel | null>(null)

  const selStage = stages[sel.s]
  const selItem = selStage.items[sel.i]
  const selCompany = companies[selItem.t]
  const price = keyMetric(selItem.t, /^price|^share price/i)
  const marketCap = keyMetric(selItem.t, /market cap/i)
  const [sizeMode, setSizeMode] = useState<SizeMode>('cap')
  const { byTicker, maxUsd } = useCapData(stages)
  const selCap = byTicker.get(selItem.t)
  /* Every node on the map, so each one can carry today's move as a ring —
   * not just the selected one. Market cap stays on the researched snapshot;
   * the quotes endpoint carries price only. */
  const allTickers = useMemo(() => [...new Set(stages.flatMap((st) => st.items.map((i) => i.t)))], [stages])
  const { quotes } = useLiveQuotes(allTickers)
  const liveQuote = quotes[selItem.t]

  /* Deep links: /analysis/ai-value-chain#dossier scrolls to the dossier once
   * the page has mounted. An SPA does not honour hash anchors on its own. */
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }, [hash])

  return (
    <>
      <PageHero code={c.hero.code} title={c.hero.title} serif={c.hero.serif} desc={c.hero.desc} />

      {/* Jump rail: the dossier lives far down a long page, and nobody should
        * have to discover it by scrolling. */}
      <div className="border-b border-line bg-panel">
        <div className="shell flex flex-wrap gap-2 px-5 py-3 md:px-10">
          {c.jump.items.map((j) => (
            <a
              key={j.href}
              href={j.href}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(j.href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="border border-line px-3.5 py-1.5 font-mono-lab text-[10px] tracking-[0.2em] text-dim transition-colors duration-300 hover:border-signal hover:text-signal"
            >
              {j.label}
            </a>
          ))}
        </div>
      </div>

      {/* ===== CONSTELLATION ===== */}
      <section className="border-b border-line">
        <div className="shell scroll-mt-28 px-5 py-16 md:px-10" id="map">
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
                      'border px-4 py-1.5 font-mono-lab text-[10.5px] tracking-[0.25em] transition-all duration-300',
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
                <span className="font-mono-lab text-[10.5px] tracking-[0.25em] text-faint">{c.sizing.label}</span>
                {(['cap', 'share', 'flat'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSizeMode(m)}
                    className={cn(
                      'border px-3 py-1.5 font-mono-lab text-[10.5px] tracking-[0.18em] transition-all duration-300',
                      sizeMode === m ? 'border-signal text-signal' : 'border-line text-dim hover:text-foreground'
                    )}
                  >
                    {c.sizing.modes[m]}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 font-mono-lab text-[10.5px] tracking-wider text-faint">
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
            {/* ChainFlow owns its own horizontal scrolling — a second one here would
                nest two scrollers and swallow every drag. */}
            <div className="border border-line bg-alt" dir="ltr">
              <ChainFlow
                stages={stages}
                sel={sel}
                setSel={setSel}
                hover={hover}
                setHover={setHover}
                sizeMode={sizeMode}
                byTicker={byTicker}
                maxUsd={maxUsd}
                quotes={quotes}
                flowing={mode === 'flow'}
                hasDive={(t) => !!companies[t]}
                label={c.hint}
              />
            </div>
          </Reveal>

          {/* ===== DETAIL PANEL ===== */}
          <Reveal delay={120}>
            <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-12">
              <div className="bg-panel p-7 md:col-span-3 md:p-9">
                <div className="font-mono-lab text-[10.5px] tracking-[0.3em] text-faint">{c.detail.stage}</div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono-lab text-[11.5px] text-signal" dir="ltr">{selStage.n}</span>
                  <span className="text-lg font-light tracking-tight">{selStage.name}</span>
                </div>
                <p className="mt-4 font-mono-lab text-[12.5px] leading-6 tracking-wide text-dim">{selStage.desc}</p>
              </div>
              <div className="bg-panel p-7 md:col-span-6 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-mono-lab text-[10.5px] tracking-[0.3em] text-faint">{c.detail.role}</div>
                  <div className="flex items-center gap-2">
                    <span className="border border-line px-2 py-0.5 font-mono-lab text-[9.5px] tracking-[0.2em] text-dim" dir="ltr">
                      {countryOf(selItem.t)}
                    </span>
                    <span className="border border-line px-2 py-0.5 font-mono-lab text-[9.5px] tracking-[0.2em] text-dim" dir="ltr">
                      {selItem.priv ? c.legend.private : c.legend.listed}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4">
                  <span className="font-mono-lab text-2xl tracking-tight text-signal" dir="ltr">{selItem.t}</span>
                  <span className="text-xl font-light tracking-tight">{selItem.name}</span>
                </div>
                <p className="mt-4 font-mono-lab text-[13px] leading-6 tracking-wide text-foreground/80">{selItem.role}</p>
                {selCompany && (price || marketCap) && (
                  <div className="mt-5 flex flex-wrap gap-6 border-t border-line pt-4">
                    {(price || liveQuote) && (
                      <div>
                        <div className="font-mono-lab text-[9.5px] tracking-[0.2em] text-faint">
                          PRICE {liveQuote && <span className="text-signal">· LIVE</span>}
                        </div>
                        <div className="mt-1 font-mono-lab text-sm tabular-nums text-foreground" dir="ltr">
                          {liveQuote ? formatMoney(liveQuote.price, liveQuote.currency ?? currencyOf(selItem.t)) : price}
                          {liveQuote?.changePercent != null && (
                            <span className={cn('ms-1.5 text-[12.5px]', liveQuote.changePercent >= 0 ? 'text-signal' : 'text-danger')}>
                              {liveQuote.changePercent >= 0 ? '+' : ''}{liveQuote.changePercent.toFixed(2)}%
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    {marketCap && (
                      <div>
                        <div className="font-mono-lab text-[9.5px] tracking-[0.2em] text-faint">MARKET CAP</div>
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
                        <div className="font-mono-lab text-[9.5px] tracking-[0.2em] text-faint">{c.sizing.shareLabel}</div>
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
                      className="inline-flex items-center gap-2 border border-signal/50 px-4 py-2 font-mono-lab text-[11.5px] tracking-[0.2em] text-signal transition-all duration-300 hover:bg-signal hover:text-[#0c0e12]"
                    >
                      DEEP DIVE →
                    </Link>
                  ) : (
                    <span className="font-mono-lab text-[11.5px] tracking-[0.2em] text-faint">NO DEEP DIVE ON FILE YET</span>
                  )}
                </div>
                {selCap?.share != null && (
                  <p className="mt-5 border-t border-line pt-4 font-mono-lab text-[12.5px] leading-6 tracking-wide text-faint">
                    {c.sizing.shareNote}
                  </p>
                )}
              </div>
              <div className="bg-panel p-7 md:col-span-3 md:p-9">
                <div className="font-mono-lab text-[10.5px] tracking-[0.3em] text-faint">{c.detail.exposure}</div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono-lab text-[11.5px] tracking-wider">
                    <span className="text-dim">{c.legend.upstream}</span>
                    <span className="text-signal" dir="ltr">{sel.s === 0 ? '—' : `${sel.s} ${sel.s === 1 ? 'STAGE' : 'STAGES'}`}</span>
                  </div>
                  <div className="h-1 w-full bg-track">
                    <div className="h-full bg-signal/70 transition-all duration-500" style={{ width: `${(sel.s / (stages.length - 1)) * 100}%` }} />
                  </div>
                  <div className="flex items-center justify-between font-mono-lab text-[11.5px] tracking-wider">
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

          {/* ===== DOSSIER — the four analytical modules ===== */}
          <Reveal delay={200}>
            <div className="mt-4 scroll-mt-28" id="dossier">
              <ValueChainDossier />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONVICTION PICKS ===== */}
      <section className="border-b border-line bg-alt">
        <div className="shell px-5 py-20 md:px-10">
          <SectionHead index="CONVICTION" label={c.picks.head} right={c.picks.headRight} />
          <div className="grid gap-4 md:grid-cols-3">
            {c.picks.items.map((p, i) => (
              <PickCard key={p.t} p={p} i={i} />
            ))}
          </div>
          <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-mono-lab text-[11.5px] leading-6 tracking-wider text-faint">{c.picks.note}</p>
            <Link
              to="/analysis/ideas"
              className="border border-foreground/30 px-6 py-2.5 font-mono-lab text-[11.5px] tracking-[0.25em] transition-all duration-300 hover:border-signal hover:bg-signal hover:text-[#0c0e12]"
            >
              {t.nav.sub.ideas.label} →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
