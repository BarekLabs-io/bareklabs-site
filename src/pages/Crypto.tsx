import { useState } from 'react'
import { Reveal } from '@/components/lab'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { NO_VALUE } from '@/data/marketTape'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'
import type { Lang } from '@/i18n/translations'
import { formatPct, formatDecimal, formatWeight } from '@/lib/format'
import { cn } from '@/lib/utils'

/* See Stocks.tsx — last price is fed, never simulated. */
function LiveCell({ quote, lang }: { quote?: { price: number }; lang: Lang }) {
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums', quote ? 'text-foreground' : 'text-faint')}>
      {quote ? formatDecimal(quote.price, lang) : NO_VALUE}
    </span>
  )
}

/* Same rule as the equity ledger: P&L is recomputed live against the entry and
 * published as a percentage only — never an amount, never a quantity. */
function PnlCell({ entry, quote, lang }: { entry: number | null; quote?: { price: number }; lang: Lang }) {
  if (!quote || entry === null) return <span className="font-mono-lab text-sm text-faint">{NO_VALUE}</span>
  const pct = (quote.price / entry - 1) * 100
  return (
    <span className={cn('font-mono-lab text-sm tabular-nums', pct >= 0 ? 'text-signal' : 'text-danger')} dir="ltr">
      {formatPct(pct, lang, true)}
    </span>
  )
}

/* Which account a line sits on. The equity ledger carries the same badge. */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap border border-line px-2 py-0.5 font-mono-lab text-[9px] tracking-[0.2em] text-faint">
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

type Tab = 'POSITIONS' | 'REGIME'

export default function Crypto() {
  const [tab, setTab] = useState<Tab>('POSITIONS')
  const { t, lang } = useLang()
  /* Same rule as the equity ledger: heaviest first, derived from the weights. */
  const POSITIONS = [...t.crypto.positions].sort((a, b) => (b.weightPct ?? -1) - (a.weightPct ?? -1))
  const { quotes } = useLiveQuotes([...new Set(POSITIONS.map((p) => p.symbol ?? p.t))])

  return (
    <>
      <PageHero
        code={t.crypto.hero.code}
        title={t.crypto.hero.title}
        serif={t.crypto.hero.serif}
        desc={t.crypto.hero.desc}
      />

      <section>
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label={t.crypto.head} right={t.crypto.headRight} />

          <div className="mb-8 flex gap-2">
            {(['POSITIONS', 'REGIME'] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={cn(
                  'border px-5 py-2 font-mono-lab text-[10px] tracking-[0.25em] transition-all duration-300',
                  tab === tb ? 'border-signal bg-signal text-[#0c0e12]' : 'border-line text-dim hover:text-foreground'
                )}
              >
                {tb === 'POSITIONS' ? t.crypto.tabs.positions : t.crypto.tabs.regime}
              </button>
            ))}
          </div>

          {tab === 'POSITIONS' && POSITIONS.length === 0 ? (
            <EmptyLedger message={t.crypto.openEmpty} note={t.crypto.ledgerNote} />
          ) : tab === 'POSITIONS' ? (
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[1080px]">
                <thead>
                  <tr className="border-b border-line bg-ticker font-mono-lab text-[9px] tracking-[0.25em] text-faint">
                    <th className="px-6 py-3 text-start">{t.crypto.cols.pair}</th>
                    <th className="px-6 py-3 text-start">{t.crypto.cols.side}</th>
                    <th className="px-6 py-3 text-start">{t.crypto.cols.broker}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.entry}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.last}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.size}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.pnl}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.funding}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.status}</th>
                    <th className="px-6 py-3 text-end">{t.crypto.cols.opened}</th>
                  </tr>
                </thead>
                <tbody>
                  {POSITIONS.map((p, i) => (
                    <tr key={p.t} className={cn('border-b border-line/50 transition-colors bg-row-hover', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-6 py-4">
                        <div className="font-mono-lab text-sm font-medium" dir="ltr">{p.t}</div>
                        <div className="font-mono-lab text-[10px] text-faint">{p.name}</div>
                      </td>
                      <td className={cn(
                        'px-6 py-4 font-mono-lab text-[10px] tracking-[0.2em]',
                        p.side === 'LONG' ? 'text-signal' : p.side === 'SHORT' ? 'text-danger' : 'text-dim'
                      )}>
                        {t.crypto.side[p.side]}
                      </td>
                      <td className="px-6 py-4"><Badge>{p.broker}</Badge></td>
                      <td className="px-6 py-4 text-end font-mono-lab text-sm tabular-nums text-dim" dir="ltr">
                        {formatDecimal(p.entry, lang)} <span className="text-[9px] text-faint">{p.currency}</span>
                      </td>
                      <td className="px-6 py-4 text-end" dir="ltr">
                        <LiveCell quote={quotes[p.symbol ?? p.t]} lang={lang} />
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[11px] text-dim" dir="ltr">{formatWeight(p.weightPct, lang)}</td>
                      <td className="px-6 py-4 text-end">
                        <PnlCell entry={p.entry} quote={quotes[p.symbol ?? p.t]} lang={lang} />
                      </td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] tracking-wider text-dim">{p.funding}</td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] tracking-wider text-dim">{p.status}</td>
                      <td className="px-6 py-4 text-end font-mono-lab text-[10px] text-faint" dir="ltr">{p.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {t.crypto.regime.map((r, i) => (
                <Reveal key={r.k} delay={i * 60} className="flex items-center justify-between gap-6 bg-card2 p-7">
                  <div>
                    <div className="font-mono-lab text-[10px] tracking-[0.2em] text-dim">{r.k}</div>
                    <div className="mt-2 font-mono-lab text-[10px] tracking-wider text-faint">{r.note}</div>
                  </div>
                  <div className={cn('font-mono-lab text-lg tracking-tight', r.tone === 'up' ? 'text-signal' : 'text-warn')} dir="ltr">
                    {r.v}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-8 space-y-2">
            <p className="font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.stocks.weightNote}</p>
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.crypto.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
