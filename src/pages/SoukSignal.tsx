import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { companies } from '@/data/companies'

/* Composite = weighted blend of the six signal-component tones below.
   Breadth and foreign flow carry the most weight (the page's own "breadth &
   flows" premise); anomaly flags act as a penalty. Fixed order matches
   souk.components.rows across all languages. */
const TONE_SCORE: Record<string, number> = { up: 100, mid: 50, down: 0 }
const COMPONENT_WEIGHTS = [0.28, 0.12, 0.25, 0.1, 0.1, 0.15]

function compositeSignal(rows: { tone: string }[]) {
  const total = rows.reduce((sum, r, i) => sum + (COMPONENT_WEIGHTS[i] ?? 0) * (TONE_SCORE[r.tone] ?? 50), 0)
  return Math.round(total)
}

function Gauge({ value, label }: { value: number; label: string }) {
  const angle = (value / 100) * 180
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[260px]">
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="var(--track)" strokeWidth="10" />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="rgb(var(--signal))"
          strokeWidth="10"
          strokeDasharray={`${(value / 100) * 283} 283`}
          className="transition-all duration-1000"
        />
        <line
          x1="100" y1="100"
          x2={100 + 70 * Math.cos(Math.PI - (angle * Math.PI) / 180)}
          y2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="var(--prose)" strokeWidth="2"
          className="transition-all duration-1000"
        />
        <circle cx="100" cy="100" r="5" fill="rgb(var(--signal))" />
      </svg>
      <div className="mt-2 text-3xl font-light tracking-tight" dir="ltr">
        {value}<span className="text-dim text-xl">/100</span>
      </div>
      <div className="mt-1 text-center font-mono-lab text-[10px] tracking-[0.25em] text-dim">{label}</div>
    </div>
  )
}

function tickerHref(t: string) {
  return companies[t] ? `/companies/${t}` : '/trade-tracker/screener'
}

function keyMetric(ticker: string, pattern: RegExp): string | null {
  const c = companies[ticker]
  if (!c) return null
  return c.valuation.metrics.find((m) => pattern.test(m.label))?.values[0] ?? null
}

export default function SoukSignal() {
  const [pulse, setPulse] = useState(0)
  const { t } = useLang()
  const composite = compositeSignal(t.souk.components.rows)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <PageHero
        code={t.souk.hero.code}
        title={t.souk.hero.title}
        serif={t.souk.hero.serif}
        desc={t.souk.hero.desc}
      >
        <Reveal delay={200}>
          <p className="mt-6 max-w-3xl text-xl font-light leading-snug tracking-tight text-foreground/90 md:text-2xl">
            {t.souk.hero.welcome1}
            <span className="font-serif-lab italic font-semibold">{t.souk.hero.welcomeAccent}</span>
            {t.souk.hero.welcome2}
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-8 flex items-center gap-3 font-mono-lab text-[10px] tracking-[0.25em] text-signal">
            <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            {t.souk.hero.nextUpdate}
          </div>
        </Reveal>
      </PageHero>

      <section className="lab-grid-fine">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="mb-3 inline-block border border-line px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-faint">
                {t.souk.gaugeWhat}
              </div>
              <Gauge value={composite} label={t.souk.gaugeLabel} />
              <p className="mx-auto mt-4 max-w-[280px] text-center font-mono-lab text-[9px] leading-4 tracking-wider text-faint">
                {t.souk.methodNote}
              </p>
            </Reveal>
            <div className="md:col-span-7">
              <Reveal delay={100}>
                <h2 className="text-2xl font-light leading-snug tracking-tight md:text-3xl">
                  {t.souk.read.title1} <span className="font-serif-lab italic font-semibold">{t.souk.read.title2}</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-5 max-w-2xl font-mono-lab text-[12px] leading-6 tracking-wide text-dim">{t.souk.read.body}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-alt">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="WATCHLIST" label={t.souk.watchlist.head} right={`${t.souk.watchlist.refresh} ${pulse}%`} />
          <div className="overflow-hidden border border-line">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                  <th className="px-6 py-3 text-start">{t.souk.watchlist.cols.ticker}</th>
                  <th className="px-6 py-3 text-start">{t.souk.watchlist.cols.setup}</th>
                  <th className="hidden px-6 py-3 text-start md:table-cell">{t.souk.watchlist.cols.trigger}</th>
                  <th className="px-6 py-3 text-end">{t.souk.watchlist.cols.signal}</th>
                </tr>
              </thead>
              <tbody>
                {t.souk.watchlist.rows.map((r, i) => {
                  const price = keyMetric(r.t, /^price|^share price/i)
                  const marketCap = keyMetric(r.t, /market cap/i)
                  return (
                    <tr key={r.t} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4">
                        <Link to={tickerHref(r.t)} className="group inline-flex flex-col gap-0.5">
                          <span className="font-mono-lab text-sm font-medium text-foreground transition-colors group-hover:text-signal" dir="ltr">
                            {r.t} <span className="text-faint">→</span>
                          </span>
                          {companies[r.t] && (
                            <span className="font-mono-lab text-[9px] tracking-wider text-faint" dir="ltr">
                              {companies[r.t].name}{price ? ` · ${price}` : ''}{marketCap ? ` · ${marketCap}` : ''}
                            </span>
                          )}
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-mono-lab text-[11px] leading-5 text-dim">{r.s}</td>
                      <td className="hidden px-6 py-4 font-mono-lab text-[11px] leading-5 text-dim md:table-cell">{r.g}</td>
                      <td className={cn('px-6 py-4 text-end font-mono-lab text-[10px] tracking-[0.2em]', r.up ? 'text-signal' : 'text-danger')}>
                        {r.sig}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-mono-lab text-[9.5px] leading-4 tracking-wide text-faint">
            {t.souk.watchlist.legend.map((l) => (
              <span key={l.k}>
                <span className={cn('tracking-[0.15em]', l.k === 'STRONG' || l.k === 'BUILDING' ? 'text-signal' : l.k === 'CAUTION' ? 'text-danger' : 'text-dim')}>{l.k}</span>
                {' — '}{l.d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
          <SectionHead index="FEEDS" label={t.souk.components.head} right={t.souk.components.headRight} />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {t.souk.components.rows.map((r, i) => (
              <Reveal key={r.k} delay={i * 50} className="group flex items-center justify-between gap-6 bg-card2 p-6 transition-colors hover:bg-[var(--hover-bg)] md:p-7">
                <div>
                  <div className="font-mono-lab text-[10px] tracking-[0.2em] text-dim">{r.k}</div>
                  <div className="mt-1 font-mono-lab text-[10px] leading-4 tracking-wider text-dim/80">{r.what}</div>
                  <div className="mt-2 font-mono-lab text-[10px] tracking-wider text-faint">{r.note}</div>
                </div>
                <div
                  className={cn(
                    'font-mono-lab text-xl tracking-tight md:text-2xl',
                    r.tone === 'up' ? 'text-signal' : r.tone === 'down' ? 'text-danger' : 'text-warn'
                  )}
                  dir="ltr"
                >
                  {r.v}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
