import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal } from '@/components/lab'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { NO_VALUE, formatLevel } from '@/data/marketTape'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/* The last price of a position comes from the quote feed and nowhere else.
 * A position whose ticker the feed does not cover shows a dash — the ledger
 * would rather say nothing than show a number it cannot stand behind. */
function LiveCell({ quote }: { quote?: { price: number } }) {
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums', quote ? 'text-foreground' : 'text-faint')}>
      {quote ? formatLevel(quote.price) : NO_VALUE}
    </span>
  )
}

/* P&L is derived from the live feed against the broker entry, and published
 * as a percentage only. Deliberately no dollar figure and no share count
 * anywhere on this page or in its shipped data: a dollar P&L divided by the
 * price move reconstructs the position size, and the size of the book is the
 * one number this ledger does not disclose. */
function PnlCell({ entry, quote }: { entry: number; quote?: { price: number } }) {
  if (!quote) return <span className="font-mono-lab text-sm text-faint">{NO_VALUE}</span>
  const pct = (quote.price / entry - 1) * 100
  const up = pct >= 0
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums', up ? 'text-signal' : 'text-danger')} dir="ltr">
      {up ? '+' : '−'}{Math.abs(pct).toFixed(1)}%
    </span>
  )
}

function EmptyLedger({ message, note }: { message: string; note: string }) {
  return (
    <div className="border border-dashed border-line px-6 py-14 text-center">
      <p className="font-mono-lab text-[12px] tracking-wide text-dim">{message}</p>
      <p className="mx-auto mt-3 max-w-3xl font-mono-lab text-[10px] leading-5 tracking-wide text-faint">{note}</p>
    </div>
  )
}

type Tab = 'OPEN' | 'CLOSED'

export default function Stocks() {
  const [tab, setTab] = useState<Tab>('OPEN')
  const { t } = useLang()
  const OPEN = t.stocks.open
  const CLOSED = t.stocks.closed
  const { quotes } = useLiveQuotes(OPEN.map((p) => p.symbol ?? p.t))

  return (
    <>
      <PageHero
        code={t.stocks.hero.code}
        title={t.stocks.hero.title}
        serif={t.stocks.hero.serif}
        desc={t.stocks.hero.desc}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
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
                    <th className="px-6 py-3 text-end">{t.stocks.cols.entry}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.last}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.size}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.pnl}</th>
                    <th className="px-6 py-3 text-end">{t.stocks.cols.opened}</th>
                  </tr>
                </thead>
                <tbody>
                  {OPEN.map((p, i) => (
                    <tr key={p.t} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4">
                        <div className="font-mono-lab text-sm font-medium" dir="ltr">{p.t}</div>
                        <div className="font-mono-lab text-[10px] text-faint">{p.name}</div>
                      </td>
                      <td className={cn('px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]', p.side === 'LONG' ? 'text-signal' : 'text-danger')}>
                        {t.stocks.side[p.side]}
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-sm tabular-nums text-dim" dir="ltr">{p.entry.toFixed(2)}</td>
                      <td className="px-6 py-4 text-end" dir="ltr"><LiveCell quote={quotes[p.symbol ?? p.t]} /></td>
                      {/* Share of the tracked book, never a share count. */}
                      <td className="px-6 py-4 text-end font-mono-lab text-[11px] text-dim" dir="ltr">{p.size}</td>
                      <td className="px-6 py-4 text-end">
                        <PnlCell entry={p.entry} quote={quotes[p.symbol ?? p.t]} />
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] text-faint" dir="ltr">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line">
              {CLOSED.map((c, i) => (
                <Reveal key={c.t + i} delay={i * 40} className="flex flex-col gap-2 bg-card2 p-6 md:flex-row md:items-center md:gap-8">
                  <span className="w-16 font-mono-lab text-sm font-medium" dir="ltr">{c.t}</span>
                  <span className={cn('w-16 font-mono-lab text-[10px] tracking-[0.2em]', c.side === 'LONG' ? 'text-signal' : 'text-danger')}>
                    {t.stocks.side[c.side]}
                  </span>
                  <span className="flex-1 font-mono-lab text-[11px] tracking-wide text-dim">{c.note}</span>
                  <span className={cn('font-mono-lab text-sm', c.pnl.startsWith('+') ? 'text-signal' : 'text-danger')} dir="ltr">
                    {c.pnl} <span className="text-faint">/</span> {c.r}
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
                  <p className="mt-4 max-w-4xl font-mono-lab text-[11px] leading-6 tracking-wide text-dim">{p.analysis}</p>
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

          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.stocks.sourceNote}</p>
            <p className="mt-2 font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.stocks.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
