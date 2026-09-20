import { Link } from 'react-router'
import { MarketCanvas, Reveal } from '@/components/lab'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { SectionHead } from '@/components/Layout'
import { FeedStatus } from '@/components/FeedStatus'
import { useLang } from '@/i18n/LanguageContext'
import type { Lang } from '@/i18n/translations'
import { useMarketQuotes } from '@/lib/marketQuotes'
import { computeBreadth, breadthTone } from '@/lib/soukSignal'
import { formatDecimal, formatPct, NO_VALUE } from '@/lib/format'
import { fillCoverage } from '@/lib/coverage'
import { cleanFigure, formatAsOf } from '@/lib/figures'
import { cn } from '@/lib/utils'
import { companies } from '@/data/companies'
import { parseMetricValue } from '@/lib/priceSeries'

/* The composite is not drawn while five of its six components have no feed.
 * Weighting one live reading against five blanks would publish a number that
 * looks like a market score and is really a single ratio with padding. The
 * gauge shows the dash, and the weights stay published underneath it. */

function Gauge({ label, pending }: { label: string; pending: string }) {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[260px]">
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="var(--track)" strokeWidth="10" />
        {/* No arc and no needle: an arc drawn at any length is a reading, and
          * there is no reading to give until the components have a feed. */}
        <text x="100" y="92" textAnchor="middle" className="fill-[rgb(var(--faint))] font-mono-lab" fontSize="34">
          {pending}
        </text>
      </svg>
      <div className="mt-2 text-center font-mono-lab text-[9px] leading-4 tracking-[0.2em] text-faint">{label}</div>
    </div>
  )
}

function tickerHref(t: string) {
  return companies[t] ? `/companies/${t}` : '/trade-tracker/screener'
}

/* The legend keys are translated, so colouring them by comparing the label to
 * 'STRONG' / 'CAUTION' only ever matched English — the French and Arabic
 * legends rendered entirely grey. The tone travels with the entry instead. */
const LEGEND_TONE: Record<string, string> = { up: 'text-signal', down: 'text-danger', mid: 'text-dim' }

function keyMetric(ticker: string, pattern: RegExp): string | null {
  const c = companies[ticker]
  if (!c) return null
  return c.valuation.metrics.find((m) => pattern.test(m.label))?.values[0] ?? null
}

/* Price is the live quote where the feed has one, otherwise the researched
 * snapshot from the deep dive — which is dated, so it is shown dimmed and
 * without a live marker. It is never nudged on a timer to look alive. */
function MiniWatchRow({ row, quote, lang }: { row: { t: string; s: string; sig: string; up: boolean }; quote?: { price: number; changePercent: number | null }; lang: Lang }) {
  const raw = keyMetric(row.t, /^price|^share price/i)
  const base = parseMetricValue(raw ?? undefined)
  const price = quote?.price ?? base
  const chg = quote?.changePercent ?? null
  /* Bar width is |change| against a 5% full scale, clamped. It exists to make
   * a row scannable, so it is drawn only from a real change — a missing quote
   * leaves the track empty rather than flat-at-zero, which would read as
   * "unchanged" when the truth is "unknown". */
  const width = chg == null ? 0 : Math.min(Math.abs(chg) / 5, 1) * 100

  return (
    <Link
      to={tickerHref(row.t)}
      className="group block border-b border-line/60 py-2.5 font-mono-lab text-[11px] tracking-wide last:border-0"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-2" dir="ltr">
          <span className="text-foreground transition-colors group-hover:text-signal">{row.t}</span>
          {price != null && (
            <span
              className={cn('tabular-nums', quote ? 'text-dim' : 'text-faint')}
              title={quote ? undefined : 'Researched snapshot — not live'}
            >
              {formatDecimal(price, lang)}
            </span>
          )}
          {!quote && <span className="text-[8px] tracking-[0.2em] text-faint">SNAP</span>}
        </div>
        <span
          className={cn(
            'shrink-0 tabular-nums text-end text-[10px]',
            chg == null ? 'text-faint' : chg >= 0 ? 'text-signal' : 'text-danger'
          )}
          dir="ltr"
        >
          {chg == null ? NO_VALUE : formatPct(chg, lang, true, 2)}
        </span>
      </div>
      <div className="mt-1.5 h-[2px] w-full bg-track">
        <div
          className={cn('h-full transition-all duration-700', chg == null ? '' : chg >= 0 ? 'bg-signal/70' : 'bg-danger/70')}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <span className="truncate text-[9.5px] text-faint">{row.s}</span>
        <span className={cn('shrink-0 text-[9px] tracking-[0.15em]', row.up ? 'text-signal' : 'text-danger')}>{row.sig}</span>
      </div>
    </Link>
  )
}

/* Momentum strip — the same six real component scores that drive the
 * composite, as an animated horizontal bar each instead of a table row. */
function ComponentBar({
  label, value, tone, delay,
}: { label: string; value: string; tone: 'up' | 'mid' | 'down' | null; delay: number }) {
  /* A bar is only drawn for a component that has a reading. The rest keep
   * their track empty rather than showing a width that means nothing. */
  const width = tone === null ? 0 : { up: 90, mid: 55, down: 20 }[tone]
  return (
    <Reveal delay={delay} className="min-w-[140px] flex-1">
      <div className="flex items-baseline justify-between font-mono-lab text-[9px] tracking-[0.2em] text-faint">
        <span>{label}</span>
        <span
          className={cn(
            tone === null ? 'text-faint' : tone === 'up' ? 'text-signal' : tone === 'down' ? 'text-danger' : 'text-warn'
          )}
          dir="ltr"
        >
          {value}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full bg-track">
        <div
          className={cn('h-full transition-all duration-1000', tone === 'up' ? 'bg-signal' : tone === 'down' ? 'bg-danger' : 'bg-warn')}
          style={{ width: `${width}%` }}
        />
      </div>
    </Reveal>
  )
}

export default function SoukSignal() {
  const { t, lang } = useLang()
  const { quotes: deskQuotes } = useMarketQuotes()
  /* The one component the quote feed can actually answer. */
  const breadth = computeBreadth(deskQuotes)
  const breadthValue = breadth?.ratio == null ? null : formatDecimal(breadth.ratio, lang)
  const componentValue = (id: string) => (id === 'breadth' ? breadthValue : null)
  const componentTone = (id: string) => (id === 'breadth' && breadth ? breadthTone(breadth) : null)
  const componentNote = (id: string) =>
    id === 'breadth' && breadth
      ? fillCoverage(t.souk.components.breadthNote, { up: breadth.up, down: breadth.down, counted: breadth.counted })
      : (t.souk.components.rows.find((r) => r.id === id) as { pendingWhy?: string } | undefined)?.pendingWhy ?? ''

  /* The hero terminal watches the full radar list, not the six shown: the
   * feed status should describe the feed, not the slice on screen. */
  const allWatch = t.souk.watchlist.rows
  const miniWatch = allWatch.slice(0, 6)
  const { quotes, asOf } = useLiveQuotes(allWatch.map((r) => r.t))
  const answered = allWatch.reduce((n, r) => (quotes[r.t] ? n + 1 : n), 0)

  return (
    <>
      {/* ============ TERMINAL HERO ============ */}
      <section className="relative overflow-hidden border-b border-line pt-32 pb-14 md:pt-40">
        <MarketCanvas className="absolute inset-0 opacity-70" />
        <div className="scanline" />
        <div className="relative z-10 shell px-5 md:px-10">
          <Reveal>
            <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{t.souk.hero.code}</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              {t.souk.hero.title}
              {t.souk.hero.serif && <span className="font-serif-lab italic text-dim"> {t.souk.hero.serif}</span>}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-7xl font-mono-lab text-[12.5px] leading-6 tracking-wide text-dim">{t.souk.hero.desc}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-7xl text-xl font-light leading-snug tracking-tight text-foreground/90 md:text-2xl">
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

          {/* live terminal panel */}
          <Reveal delay={360}>
            <div className="mt-10 border border-line bg-panel/90 backdrop-blur-sm">
              <div className="grid gap-8 p-6 md:grid-cols-12 md:p-8">
                <div className="flex flex-col items-center md:col-span-3 md:items-start">
                  <div className="mb-3 inline-block border border-line px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-faint">
                    {t.souk.gaugeWhat}
                  </div>
                  <Gauge label={t.souk.gaugeLabel} pending={t.souk.components.pending} />
                  <p className="mx-auto mt-4 max-w-[280px] text-center font-mono-lab text-[9px] leading-4 tracking-wider text-faint md:mx-0 md:text-start">
                    {t.souk.methodNote}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <h2 className="text-xl font-light leading-snug tracking-tight md:text-2xl">
                    {t.souk.read.title1} <span className="font-serif-lab italic font-semibold">{t.souk.read.title2}</span>
                  </h2>
                  <p className="mt-4 max-w-md font-mono-lab text-[11px] leading-6 tracking-wide text-dim">{t.souk.read.body}</p>
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-5 border-t border-line pt-5">
                    {t.souk.components.rows.map((r, i) => (
                      <ComponentBar
                        key={r.k}
                        label={r.k}
                        value={componentValue(r.id) ?? t.souk.components.pending}
                        tone={componentTone(r.id)}
                        delay={i * 60}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-t border-line pt-6 md:col-span-4 md:border-t-0 md:border-s md:ps-8 md:pt-0">
                  <div className="flex items-center justify-between font-mono-lab text-[9px] tracking-[0.25em] text-dim">
                    <span className="flex items-center gap-2">
                      <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                      {t.souk.watchlist.head}
                    </span>
                    <FeedStatus answered={answered} total={allWatch.length} asOf={asOf} labels={t.souk.feed} />
                  </div>
                  {/* The same stamp the table below carries: the prices in these
                    * rows are live, the words beside them were written once. */}
                  <div className="mt-1 font-mono-lab text-[8.5px] tracking-[0.2em] text-faint">
                    {t.souk.watchlist.refresh}
                  </div>
                  <div className="mt-3">
                    {miniWatch.map((r) => (
                      <MiniWatchRow key={r.t} row={r} quote={quotes[r.t]} lang={lang} />
                    ))}
                  </div>
                  <a
                    href="#signals"
                    className="group mt-5 flex items-center justify-between border border-foreground/30 px-4 py-2.5 font-mono-lab text-[10px] tracking-[0.2em] transition-all duration-300 hover:border-signal hover:bg-signal hover:text-[#0c0e12]"
                  >
                    {t.souk.watchlist.head} — {t.souk.viewSignals}
                    <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="signals" className="scroll-mt-24 border-t border-line bg-alt">
        <div className="shell px-5 py-20 md:px-10">
          <SectionHead index="WATCHLIST" label={t.souk.watchlist.head} right={t.souk.watchlist.refresh} />
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
                  /* The price on this line comes from the feed, never from the
                    * deep-dive snapshot: a researched August price sitting
                    * undated beside a live signal reads as today's price. The
                    * market cap has no live source, so it carries the date of
                    * the record it comes from. */
                  const q = quotes[r.t]
                  const price = q ? formatDecimal(q.price, lang) : null
                  const cap = cleanFigure(keyMetric(r.t, /market cap/i) ?? '')
                  const capAsOf = formatAsOf(companies[r.t]?.asOf, lang)
                  return (
                    <tr key={r.t} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4">
                        <Link to={tickerHref(r.t)} className="group inline-flex flex-col gap-0.5">
                          <span className="font-mono-lab text-sm font-medium text-foreground transition-colors group-hover:text-signal" dir="ltr">
                            {r.t} <span className="text-faint">→</span>
                          </span>
                          {companies[r.t] && (
                            <span className="font-mono-lab text-[9px] tracking-wider text-faint" dir="ltr">
                              {companies[r.t].name}{price ? ` · ${price}` : ''}{cap.text ? ` · ${cap.text}${capAsOf ? ` · ${capAsOf}` : ''}` : ''}
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
                <span className={cn('tracking-[0.15em]', LEGEND_TONE[l.tone] ?? 'text-dim')}>{l.k}</span>
                {' — '}{l.d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell px-5 py-20 md:px-10">
          <SectionHead index="FEEDS" label={t.souk.components.head} right={t.souk.components.headRight} />
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {t.souk.components.rows.map((r, i) => {
              const v = componentValue(r.id)
              const tone = componentTone(r.id)
              return (
              <Reveal key={r.k} delay={i * 50} className="group flex items-center justify-between gap-6 bg-card2 p-6 transition-colors hover:bg-[var(--hover-bg)] md:p-7">
                <div>
                  <div className="font-mono-lab text-[10px] tracking-[0.2em] text-dim">{r.k}</div>
                  <div className="mt-1 font-mono-lab text-[10px] leading-4 tracking-wider text-dim/80">
                    {fillCoverage(r.what, { counted: breadth?.counted ?? 0 })}
                  </div>
                  {/* Either the live reading behind the number, or the reason
                    * there is no number. Never a sentence about data the page
                    * does not have. */}
                  <div className="mt-2 font-mono-lab text-[10px] tracking-wider text-faint">{componentNote(r.id)}</div>
                </div>
                <div
                  className={cn(
                    'font-mono-lab text-xl tracking-tight md:text-2xl',
                    v === null ? 'text-faint' : tone === 'up' ? 'text-signal' : tone === 'down' ? 'text-danger' : 'text-warn'
                  )}
                  dir="ltr"
                >
                  {v ?? t.souk.components.pending}
                </div>
              </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
