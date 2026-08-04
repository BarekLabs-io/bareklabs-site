import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

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

export default function AiValueChain() {
  const { t } = useLang()
  const c = t.chain
  const stages = c.stages as ChainStage[]
  const [mode, setMode] = useState<'explore' | 'flow'>('explore')
  const [sel, setSel] = useState<Sel>({ s: 3, i: 0 }) // NVDA by default

  const selStage = stages[sel.s]
  const selItem = selStage.items[sel.i]

  return (
    <>
      <PageHero code={c.hero.code} title={c.hero.title} serif={c.hero.serif} desc={c.hero.desc} />

      {/* ===== MATRIX ===== */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead
            index="MATRIX"
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

          <Reveal>
            <div className={cn('overflow-x-auto pb-4', mode === 'flow' && 'chain-flow')} dir="ltr">
              <div className="flex min-w-max items-stretch gap-0">
                {stages.map((st, si) => {
                  const isSel = sel.s === si
                  const isUpstream = si < sel.s
                  return (
                    <div key={st.k} className="flex items-stretch">
                      {/* connector */}
                      {si > 0 && (
                        <div className="flex w-8 shrink-0 items-center justify-center self-center">
                          <span
                            className={cn(
                              'font-mono-lab text-lg transition-colors duration-500 rtl:rotate-180',
                              isUpstream || isSel ? 'text-signal' : 'text-faint'
                            )}
                          >
                            →
                          </span>
                        </div>
                      )}
                      {/* stage column */}
                      <div
                        className={cn(
                          'w-[248px] shrink-0 border transition-all duration-500',
                          isSel ? 'border-signal bg-panel' : 'border-line bg-card2',
                          mode === 'explore' && !isSel && si !== sel.s && 'hover:border-line-hover'
                        )}
                      >
                        {/* header */}
                        <div
                          className={cn(
                            'border-b border-line p-4',
                            mode === 'flow' && 'flow-node'
                          )}
                          style={mode === 'flow' ? { animationDelay: `${si * 0.35}s` } : undefined}
                        >
                          <div className="flex items-baseline justify-between">
                            <span className="font-mono-lab text-[9px] tracking-[0.3em] text-signal">{st.n}</span>
                            <span className="font-mono-lab text-[8px] tracking-[0.2em] text-faint">{st.items.length}</span>
                          </div>
                          <div className="mt-2 font-mono-lab text-[11px] tracking-[0.14em] text-foreground">{st.k}</div>
                          <div className="mt-1 text-[13px] font-light tracking-tight text-foreground/85">{st.name}</div>
                        </div>
                        {/* tickers */}
                        <div className="flex flex-col">
                          {st.items.map((it, ii) => {
                            const active = isSel && sel.i === ii
                            return (
                              <button
                                key={it.t}
                                onClick={() => { setSel({ s: si, i: ii }); setMode('explore') }}
                                className={cn(
                                  'group flex items-baseline justify-between gap-3 border-b border-line/50 px-4 py-3 text-start transition-colors last:border-0',
                                  active ? 'bg-signal/[0.08]' : 'hover:bg-[var(--hover-bg)]'
                                )}
                              >
                                <span>
                                  <span className={cn('block font-mono-lab text-[11px] tracking-wider', active ? 'text-signal' : 'text-foreground/90 group-hover:text-signal')}>
                                    {it.t}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] font-light text-dim">{it.name}</span>
                                </span>
                                {it.priv && (
                                  <span className="shrink-0 border border-line px-1.5 py-0.5 font-mono-lab text-[7.5px] tracking-[0.2em] text-warn">
                                    {c.legend.private}
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* ===== DETAIL PANEL ===== */}
          <Reveal delay={120}>
            <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-12">
              <div className="bg-panel p-7 md:col-span-4 md:p-9">
                <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.detail.stage}</div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono-lab text-[10px] text-signal" dir="ltr">{selStage.n}</span>
                  <span className="text-lg font-light tracking-tight">{selStage.name}</span>
                </div>
                <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{selStage.desc}</p>
              </div>
              <div className="bg-panel p-7 md:col-span-5 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">{c.detail.role}</div>
                  <span className="border border-line px-2 py-0.5 font-mono-lab text-[8px] tracking-[0.2em] text-dim" dir="ltr">
                    {selItem.priv ? c.legend.private : c.legend.listed}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4">
                  <span className="font-mono-lab text-2xl tracking-tight text-signal" dir="ltr">{selItem.t}</span>
                  <span className="text-xl font-light tracking-tight">{selItem.name}</span>
                </div>
                <p className="mt-4 font-mono-lab text-[12px] leading-6 tracking-wide text-foreground/80">{selItem.role}</p>
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
