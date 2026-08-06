import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { useLang } from '@/i18n/LanguageContext'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { NO_VALUE, formatChange } from '@/data/marketTape'
import { currencyOf, formatMoney } from '@/data/valueChain'
import { companies } from '@/data/companies'
import {
  LAYERS, BOTTLENECKS, GRID_FIGURES, GRID_PLAYERS, EPC_DUEL, UNSEEN, GEO_HUBS,
  tickersOfLayer, type Maturity,
} from '@/data/valueChainDossier'

type Tab = 'layers' | 'wall' | 'epc' | 'unseen'

/* Quotes are fetched per tab rather than for the whole dossier at once: the
 * full roster is ~60 symbols, and one serverless call fanning out to 60
 * upstream requests risks the function timeout. Only the open tab's symbols
 * are ever asked for. */
function useTabTickers(tab: Tab): string[] {
  return useMemo(() => {
    if (tab === 'layers') return [...new Set(LAYERS.flatMap(tickersOfLayer))]
    if (tab === 'wall') return GRID_PLAYERS.map((p) => p.ticker)
    if (tab === 'epc') return ['STRL', 'FIX', 'EME', 'IESC', 'MTZ', 'PWR']
    return [...new Set(UNSEEN.flatMap((u) => u.tickers))]
  }, [tab])
}

/* The roster spans yen, won, new Taiwan dollars, euros and sterling, so a
 * bare number is ambiguous — 19,010 means nothing without the ¥. The feed's
 * own currency wins; the listing suffix is the fallback. */
function Quote({ ticker, quote }: { ticker: string; quote?: { price: number; changePercent: number | null; currency?: string | null } }) {
  const hasDive = !!companies[ticker]
  const ccy = quote?.currency ?? currencyOf(ticker)
  const up = quote?.changePercent != null ? quote.changePercent >= 0 : null
  const body = (
    <>
      <span className={cn('font-mono-lab text-[11.5px] tracking-wider', hasDive ? 'text-signal' : 'text-foreground/80')}>
        {ticker}
      </span>
      <span className="font-mono-lab text-[12.5px] tabular-nums text-dim" dir="ltr">
        {quote ? formatMoney(quote.price, ccy) : NO_VALUE}
      </span>
      {quote?.changePercent != null && (
        <span className={cn('font-mono-lab text-[10.5px] tabular-nums', up ? 'text-signal' : 'text-danger')} dir="ltr">
          {formatChange(quote.changePercent)}
        </span>
      )}
    </>
  )
  const cls = 'inline-flex items-center gap-1.5 border border-line px-2 py-1 transition-colors'
  return hasDive ? (
    <Link to={`/companies/${ticker}`} className={cn(cls, 'hover:border-signal')} title="Deep dive on file">
      {body}
    </Link>
  ) : (
    <span className={cls}>{body}</span>
  )
}

function MaturityTag({ m }: { m: Maturity }) {
  const { t } = useLang()
  const d = t.chain.dossier.maturity
  const tone =
    m === 'strained' ? 'border-warn/50 text-warn' : m === 'future' ? 'border-signal/40 text-signal/80' : 'border-line text-dim'
  return (
    <span className={cn('border px-2 py-0.5 font-mono-lab text-[9.5px] tracking-[0.2em]', tone)}>{d[m]}</span>
  )
}

export function ValueChainDossier() {
  const { t } = useLang()
  const d = t.chain.dossier
  const [tab, setTab] = useState<Tab>('layers')
  const { quotes } = useLiveQuotes(useTabTickers(tab))

  const TABS: { id: Tab; label: string }[] = [
    { id: 'layers', label: d.tabs.layers },
    { id: 'wall', label: d.tabs.wall },
    { id: 'epc', label: d.tabs.epc },
    { id: 'unseen', label: d.tabs.unseen },
  ]

  return (
    <div className="border border-line bg-panel">
      <div className="border-b border-line px-6 py-4">
        <div className="font-mono-lab text-[10.5px] tracking-[0.3em] text-signal">{d.label}</div>
        <h3 className="mt-1 text-lg font-medium tracking-tight md:text-xl">{d.title}</h3>
        <p className="mt-2 max-w-3xl font-mono-lab text-[13px] leading-6 tracking-wide text-dim">{d.intro}</p>
      </div>

      <div className="flex flex-wrap gap-px border-b border-line bg-line">
        {TABS.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={cn(
              'flex-1 whitespace-nowrap bg-panel px-4 py-3 font-mono-lab text-[12.5px] tracking-[0.2em] transition-colors duration-300',
              tab === tb.id ? 'bg-card2 text-signal' : 'text-dim hover:text-foreground'
            )}
          >
            {tb.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === 'layers' && (
          <div className="flex flex-col gap-4">
            {LAYERS.map((l) => (
              <div key={l.n} className="border border-line bg-card2 p-5" style={{ borderInlineStartWidth: 3, borderInlineStartColor: l.accent }}>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-mono-lab text-[11.5px] tracking-[0.2em] text-signal">{l.n}</span>
                  <span className="text-base font-medium tracking-tight">{l.title}</span>
                </div>
                {l.note && <p className="mt-2 max-w-3xl font-mono-lab text-[11.5px] leading-6 tracking-wide text-dim">{l.note}</p>}
                <div className="mt-4 flex flex-col gap-4">
                  {l.segments.map((sg) => (
                    <div key={sg.name} className="border-t border-line pt-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-lab text-[12.5px] tracking-wide text-foreground">{sg.name}</span>
                        <MaturityTag m={sg.maturity} />
                      </div>
                      <p className="mt-1.5 max-w-2xl font-mono-lab text-[11.5px] leading-6 tracking-wide text-dim">{sg.role}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {sg.tickers.map((tk) => (
                          <Quote key={tk} ticker={tk} quote={quotes[tk]} />
                        ))}
                        {sg.privates?.map((p) => (
                          <span key={p} className="inline-flex items-center border border-dashed border-line px-2 py-1 font-mono-lab text-[11.5px] text-faint">
                            {p} · {d.private}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'wall' && (
          <div>
            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {GRID_FIGURES.map((f) => (
                <div key={f.label} className="bg-card2 p-4">
                  <div className="font-mono-lab text-[11.5px] tracking-[0.2em] text-faint">{f.label}</div>
                  <div className="mt-1.5 font-mono-lab text-xl tabular-nums text-signal" dir="ltr">{f.value}</div>
                  <div className="mt-1 font-mono-lab text-[10.5px] leading-6 text-dim">{f.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="font-mono-lab text-[10.5px] tracking-[0.25em] text-dim">{d.timeline}</div>
              <div className="mt-3 flex flex-col gap-px overflow-hidden border border-line bg-line md:flex-row">
                {BOTTLENECKS.map((b, i) => (
                  <div key={b.period} className="flex-1 bg-card2 p-4">
                    <div className="font-mono-lab text-[10.5px] tracking-[0.2em] text-signal" dir="ltr">{b.period}</div>
                    <div className="mt-1.5 font-mono-lab text-[12.5px] tracking-wide text-foreground">{b.label}</div>
                    <p className="mt-1.5 font-mono-lab text-[12.5px] leading-6 tracking-wide text-dim">{b.detail}</p>
                    {i < BOTTLENECKS.length - 1 && <div className="mt-3 h-px w-full bg-signal/25" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {GRID_PLAYERS.map((p) => (
                <div key={p.ticker} className="border border-line bg-card2 p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Quote ticker={p.ticker} quote={quotes[p.ticker]} />
                    <span className="font-mono-lab text-[11.5px] tracking-wide text-dim">{p.segment}</span>
                  </div>
                  <p className="mt-2 font-mono-lab text-[11.5px] leading-6 tracking-wide text-foreground/80">
                    {p.moat}
                    
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'epc' && (
          <div>
            <p className="max-w-3xl font-mono-lab text-[13px] leading-6 tracking-wide text-dim">{d.epcIntro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['STRL', 'FIX', 'EME', 'IESC', 'MTZ', 'PWR'].map((tk) => (
                <Quote key={tk} ticker={tk} quote={quotes[tk]} />
              ))}
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] border border-line">
                <thead>
                  <tr className="border-b border-line bg-card2 font-mono-lab text-[11.5px] tracking-[0.2em] text-faint">
                    <th className="px-4 py-3 text-start">{d.cols.metric}</th>
                    <th className="px-4 py-3 text-start">STRL</th>
                    <th className="px-4 py-3 text-start">FIX</th>
                    <th className="px-4 py-3 text-start">{d.cols.read}</th>
                  </tr>
                </thead>
                <tbody>
                  {EPC_DUEL.map((r, i) => (
                    <tr key={r.metric} className={cn('border-b border-line/50 align-top', i % 2 === 1 && 'bg-stripe')}>
                      <td className="px-4 py-3 font-mono-lab text-[11.5px] tracking-wide text-foreground">{r.metric}</td>
                      <td className="px-4 py-3 font-mono-lab text-[11.5px] tabular-nums text-dim" dir="ltr">
{r.strl}</td>
                      <td className="px-4 py-3 font-mono-lab text-[11.5px] tabular-nums text-dim" dir="ltr">
{r.fix}</td>
                      <td className="px-4 py-3 font-mono-lab text-[11.5px] leading-6 tracking-wide text-foreground/80">{r.read}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'unseen' && (
          <div>
            <div className="flex flex-col gap-3">
              {UNSEEN.map((u) => (
                <div key={u.name} className="border border-line bg-card2 p-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-sm font-medium tracking-tight">{u.name}</span>
                    {u.tickers.map((tk) => (
                      <Quote key={tk} ticker={tk} quote={quotes[tk]} />
                    ))}
                  </div>
                  <div className="mt-2 font-mono-lab text-[12.5px] tracking-[0.15em] text-signal">{u.craft}</div>
                  <p className="mt-1.5 font-mono-lab text-[11.5px] leading-6 tracking-wide text-foreground/80">{u.why}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="font-mono-lab text-[10.5px] tracking-[0.25em] text-dim">{d.geo}</div>
              <div className="mt-3 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
                {GEO_HUBS.map((g) => (
                  <div key={g.region} className="bg-card2 p-4">
                    <div className="font-mono-lab text-[11.5px] tracking-wide text-signal">{g.region}</div>
                    <div className="mt-1 font-mono-lab text-[10.5px] tracking-[0.2em] text-faint">{g.theme}</div>
                    <p className="mt-2 font-mono-lab text-[12.5px] leading-6 tracking-wide text-dim">{g.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 border-t border-line pt-4 font-mono-lab text-[12.5px] leading-6 tracking-wide text-faint">
          {d.methodology}
        </p>
      </div>
    </div>
  )
}
