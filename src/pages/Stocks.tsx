import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { NO_VALUE } from '@/data/marketTape'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import type { Lang } from '@/i18n/translations'
import { fillCoverage } from '@/lib/coverage'
import { LEDGER, ALLOCATION } from '@/lib/ledger'
import { formatPct, formatDecimal, formatWeight } from '@/lib/format'
import { cn } from '@/lib/utils'

/* The last price of a position comes from the quote feed and nowhere else.
 * A position whose ticker the feed does not cover shows a dash — the ledger
 * would rather say nothing than show a number it cannot stand behind. */
function LiveCell({ quote, lang }: { quote?: { price: number }; lang: Lang }) {
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums', quote ? 'text-foreground' : 'text-faint')}>
      {quote ? formatDecimal(quote.price, lang) : NO_VALUE}
    </span>
  )
}

/* P&L is derived from the live feed against the broker entry, and published
 * as a percentage only. Deliberately no dollar figure and no share count
 * anywhere on this page or in its shipped data: a dollar P&L divided by the
 * price move reconstructs the position size, and the size of the book is the
 * one number this ledger does not disclose. */
function PnlCell({ entry, quote, lang }: { entry: number; quote?: { price: number }; lang: Lang }) {
  if (!quote) return <span className="font-mono-lab text-sm text-faint">{NO_VALUE}</span>
  const pct = (quote.price / entry - 1) * 100
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums', pct >= 0 ? 'text-signal' : 'text-danger')} dir="ltr">
      {formatPct(pct, lang, true)}
    </span>
  )
}

/* A line says which broker it came from. Two accounts feed one ledger, and an
 * unlabelled row silently merges two books — Energy Fuels sits on both, at two
 * different entry prices, and must read as two positions rather than one. */
function Badge({ children, tone = 'dim' }: { children: React.ReactNode; tone?: 'dim' | 'warn' }) {
  return (
    <span
      className={cn(
        'whitespace-nowrap border px-2 py-0.5 font-mono-lab text-[9px] tracking-[0.2em]',
        tone === 'warn' ? 'border-danger/50 text-danger' : 'border-line text-faint'
      )}
    >
      {children}
    </span>
  )
}

function EmptyLedger({ message, note }: { message: string; note: string }) {
  return (
    <div className="border border-dashed border-line px-6 py-14 text-center">
      <p className="font-mono-lab text-[12px] tracking-wide text-dim">{message}</p>
      <p className="mx-auto mt-3 max-w-7xl font-mono-lab text-[10px] leading-5 tracking-wide text-faint">{note}</p>
    </div>
  )
}

type Tab = 'OPEN' | 'CLOSED'

export default function Stocks() {
  const [tab, setTab] = useState<Tab>('OPEN')
  const { t, lang } = useLang()
  /* Order is derived, never typed into the dictionaries: the heaviest line
   * first is what a reader looks for, and a hand-kept order drifts the moment
   * a weight changes. A closed trade has no weight in the book any more, so it
   * sorts on the capital it took while it was open; the fund lines carry no
   * share at all and sit at the bottom, where the counters already put them. */
  const OPEN = [...t.stocks.open].sort((a, b) => (b.weightPct ?? -1) - (a.weightPct ?? -1))
  const CLOSED = [...t.stocks.closed].sort(
    (a, b) =>
      Number(b.inStats) - Number(a.inStats) ||
      (b.capitalSharePct ?? -1) - (a.capitalSharePct ?? -1)
  )
  /* Two lines can share a ticker — the same company held at two brokers, or
   * bought twice at different prices. The feed is asked once per symbol. */
  const { quotes } = useLiveQuotes([...new Set(OPEN.map((p) => p.symbol ?? p.t))])
  /* Summed, not asserted. These weights are shares of the whole book — cash
   * included — so the equity rows add to the equity slice of it, not to 100 %.
   * A page that footed them at 100 % would be claiming a fully invested book. */
  const weightTotal = OPEN.length === 0 ? null : ALLOCATION.stocks

  return (
    <>
      <PageHero
        code={t.stocks.hero.code}
        title={t.stocks.hero.title}
        serif={t.stocks.hero.serif}
        desc={t.stocks.hero.desc}
      />

      <section>
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label={t.stocks.head} right={t.stocks.headRight} />

          <div className="mb-8 flex gap-2">
            {(['OPEN', 'CLOSED'] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={cn(
                  'border px-5 py-2 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
                  tab === tb ? 'border-signal bg-signal text-[#0c0e12]' : 'border-line text-dim hover:text-foreground'
                )}
              >
                {tb === 'OPEN' ? t.stocks.tabs.open : t.stocks.tabs.closed} ({tb === 'OPEN' ? OPEN.length : CLOSED.length})
              </button>
            ))}
          </div>

          {tab === 'OPEN' && OPEN.length === 0 ? (
            <EmptyLedger message={t.stocks.openEmpty} note={t.stocks.ledgerNote} />
          ) : tab === 'CLOSED' && CLOSED.length === 0 ? (
            <EmptyLedger message={t.stocks.closedEmpty} note={t.stocks.ledgerNote} />
          ) : tab === 'OPEN' ? (
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                    <th className="px-6 py-3 text-start">{t.stocks.cols.ticker}</th>
                    <th className="px-6 py-3 text-start">{t.stocks.cols.side}</th>
                    <th className="px-6 py-3 text-start">{t.stocks.cols.broker}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.entry}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.last}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.size}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.pnl}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.opened}</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN.map((p, i) => (
                    <tr key={`${p.broker}-${p.t}-${p.entry}`} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-lab text-sm font-medium" dir="ltr">{p.t}</span>
                          {p.distressed && <Badge tone="warn">{t.stocks.distressedLabel}</Badge>}
                        </div>
                        <div className="font-mono-lab text-[10px] text-faint">{p.name}</div>
                      </td>
                      <td className={cn('px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]', p.side === 'LONG' ? 'text-signal' : 'text-danger')}>
                        {t.stocks.side[p.side]}
                      </td>
                      <td className="px-6 py-4"><Badge>{p.broker}</Badge></td>
                      <td className="px-6 py-4 text-end font-mono-lab text-sm tabular-nums text-dim" dir="ltr">
                        {formatDecimal(p.entry, lang)} <span className="text-[9px] text-faint">{p.currency}</span>
                      </td>
                      <td className="px-6 py-4 text-end" dir="ltr"><LiveCell quote={quotes[p.symbol ?? p.t]} lang={lang} /></td>
                      {/* Share of the tracked book, never a share count. */}
                      <td className="px-6 py-4 text-end font-mono-lab text-[11px] text-dim" dir="ltr">{formatWeight(p.weightPct, lang)}</td>
                      <td className="px-6 py-4 text-end">
                        <PnlCell entry={p.entry} quote={quotes[p.symbol ?? p.t]} lang={lang} />
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] text-faint" dir="ltr">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
                {/* The weights are published, so the page adds them up in front
                  * of the reader rather than asking to be trusted. It reads 100 %
                  * or the ledger has a problem worth seeing. */}
                <tfoot>
                  <tr className="border-t border-line font-mono-lab text-[10px] tracking-[0.2em] text-faint">
                    <td className="px-6 py-3" colSpan={4}>{t.stocks.weightTotal}</td>
                    <td className="px-6 py-3" />
                    <td className="px-6 py-3 text-end text-dim" dir="ltr">{formatWeight(weightTotal, lang)}</td>
                    <td className="px-6 py-3" colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line">
              {CLOSED.map((c, i) => (
                <Reveal key={`${c.broker}-${c.t}-${c.closedOn}-${i}`} delay={i * 40} className="flex flex-col gap-3 bg-card2 p-6 md:flex-row md:items-center md:gap-6">
                  <div className="md:w-56">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono-lab text-sm font-medium" dir="ltr">{c.t}</span>
                      {c.distressed && <Badge tone="warn">{t.stocks.distressedLabel}</Badge>}
                      {!c.inStats && <Badge>{t.stocks.outOfStats}</Badge>}
                    </div>
                    <div className="font-mono-lab text-[10px] text-faint">{c.name}</div>
                  </div>
                  <span className={cn('font-mono-lab text-[10px] tracking-[0.2em] md:w-14', c.side === 'LONG' ? 'text-signal' : 'text-danger')}>
                    {t.stocks.side[c.side]}
                  </span>
                  <span className="md:w-20"><Badge>{c.broker}</Badge></span>
                  <span className="font-mono-lab text-[10px] text-faint md:w-24" dir="ltr">{c.closedOn}</span>
                  <span className="flex-1 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{c.note}</span>
                  {/* The trade's own currency leads; the SEK reading net of fees
                    * sits under it. Percentages only — never an amount. */}
                  <span className="text-end" dir="ltr">
                    <span className={cn('block font-mono-lab text-sm tabular-nums', c.returnPct >= 0 ? 'text-signal' : 'text-danger')}>
                      {formatPct(c.returnPct, lang, true)} <span className="text-[9px] text-faint">{c.currency}</span>
                    </span>
                    <span className="block font-mono-lab text-[10px] tabular-nums text-faint">
                      {formatPct(c.returnPctSekNet, lang, true)} SEK
                    </span>
                  </span>
                </Reveal>
              ))}
            </div>
          )}

          {/* Desk notes: the reasoning attached to a position, linked to the
            * research it leans on. Rendered only for positions that carry one. */}
          {tab === 'OPEN' &&
            OPEN.filter((p) => p.analysis).map((p) => (
              <Reveal key={`note-${p.t}`} className="mt-8">
                <div className="border border-line bg-card2 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono-lab text-sm font-medium" dir="ltr">{p.t}</span>
                    <span className="h-px w-8 bg-line" />
                    <span className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.stocks.deskNote}</span>
                  </div>
                  <p className="mt-4 max-w-6xl font-mono-lab text-[11px] leading-6 tracking-wide text-dim">{p.analysis}</p>
                  {p.report && (
                    <Link
                      to={p.report}
                      className="group/dn mt-4 inline-flex items-center gap-2 font-mono-lab text-[10px] tracking-[0.25em] text-signal"
                    >
                      {t.stocks.deskNoteLink}
                      <span className="transition-transform duration-300 group-hover/dn:translate-x-1" dir="ltr">→</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}

          {/* What the ledger cannot say, said in words rather than left to a
            * reader's guess: where a line came from, why every weight is a
            * dash, which lines sit outside the counters, and that none of this
            * predates the ledger by accident. */}
          <Reveal className="mt-8 space-y-2">
            <p className="font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.stocks.historyNote}</p>
            <p className="font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.stocks.weightNote}</p>
            {tab === 'CLOSED' && (
              <p className="font-mono-lab text-[11px] leading-5 tracking-wide text-dim">
                {fillCoverage(t.stocks.fundsNote, { counted: LEDGER.counted, listed: LEDGER.listed })}
              </p>
            )}
            <p className="font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.stocks.peaNote}</p>
          </Reveal>

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.stocks.sourceNote}</p>
            <p className="mt-2 font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.stocks.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
