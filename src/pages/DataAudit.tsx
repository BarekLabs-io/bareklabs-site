import { useMemo } from 'react'
import { Link } from 'react-router'
import { PageHero, SectionHead } from '@/components/Layout'
import { cn } from '@/lib/utils'
import { companies } from '@/data/companies'
import { useLiveQuotes } from '@/lib/useLiveQuotes'
import { useFundamentals } from '@/lib/useFundamentals'
import { formatUsdCompact, parseMarketCapUsd } from '@/lib/marketCap'
import { currencyOf, formatMoney } from '@/data/valueChain'
import { parseMetricValue } from '@/lib/priceSeries'

/* An internal check, made visitable instead of runnable.
 *
 * The same audit exists as scripts/audit-prices.mjs for CI, but a script only
 * gets run by someone willing to open a terminal, and the person who most
 * needs to see a stale price is the one reviewing the site. So it is a page:
 * open it, read the top of the table, refresh the names that are red.
 *
 * Nothing here is secret — every figure is already published on its own deep
 * dive. It is simply not in the nav, because it is a maintenance view. */

const DRIFT_LIMIT = 0.2

function researchedPrice(ticker: string): number | null {
  const m = companies[ticker]?.valuation.metrics.find((mm) => /^price|^share price/i.test(mm.label))
  return parseMetricValue(m?.values[0])
}

export default function DataAudit() {
  const tickers = useMemo(() => Object.keys(companies).sort(), [])
  const { quotes, asOf } = useLiveQuotes(tickers)
  const { fundamentals, configured, diagnostic } = useFundamentals(tickers)

  const rows = useMemo(() => {
    return tickers
      .map((t) => {
        const snap = researchedPrice(t)
        const live = quotes[t]?.price ?? null
        const drift = snap != null && live != null && snap > 0 ? (live - snap) / snap : null
        /* Market cap is the second figure a stale snapshot corrupts, and
         * unlike price we have never had anything to check it against. */
        const capRaw = companies[t].valuation.metrics.find((mm) => /market cap/i.test(mm.label))?.values[0]
        const capOurs = parseMarketCapUsd(capRaw, currencyOf(t))
        const capReal = fundamentals[t]?.marketCap ?? null
        const capDrift = capOurs != null && capReal != null && capOurs > 0 ? (capReal - capOurs) / capOurs : null
        return { t, name: companies[t].name, asOf: companies[t].asOf, snap, live, drift, capOurs, capReal, capDrift }
      })
      .sort((a, b) => {
        // Worst first — this page exists to surface the problems, not the roster.
        if (a.drift == null && b.drift == null) return a.t.localeCompare(b.t)
        if (a.drift == null) return 1
        if (b.drift == null) return -1
        return Math.abs(b.drift) - Math.abs(a.drift)
      })
  }, [tickers, quotes, fundamentals])

  const checked = rows.filter((r) => r.drift != null)
  const stale = checked.filter((r) => Math.abs(r.drift!) > DRIFT_LIMIT)
  const noQuote = rows.filter((r) => r.live == null)

  return (
    <>
      <PageHero
        code="INTERNAL / DATA AUDIT"
        title="Data"
        serif="audit"
        desc="EVERY RESEARCHED SHARE PRICE, COMPARED AGAINST THE LIVE QUOTE FEED. ANYTHING PAST 20% IS A SNAPSHOT THAT NEEDS REFRESHING — AND EVERY VALUATION MULTIPLE ON THAT DEEP DIVE IS WRONG BY THE SAME FACTOR UNTIL IT IS."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10">
          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            <div className="bg-panel p-5">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">TICKERS COVERED</div>
              <div className="mt-1.5 font-mono-lab text-2xl tabular-nums text-foreground">{rows.length}</div>
            </div>
            <div className="bg-panel p-5">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">CHECKED AGAINST FEED</div>
              <div className="mt-1.5 font-mono-lab text-2xl tabular-nums text-foreground">{checked.length}</div>
            </div>
            <div className="bg-panel p-5">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">NEED REFRESH</div>
              <div className={cn('mt-1.5 font-mono-lab text-2xl tabular-nums', stale.length ? 'text-danger' : 'text-signal')}>
                {stale.length}
              </div>
            </div>
            <div className="bg-panel p-5">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">NO QUOTE</div>
              <div className="mt-1.5 font-mono-lab text-2xl tabular-nums text-dim">{noQuote.length}</div>
            </div>
            <div className="bg-panel p-5">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">FUNDAMENTALS FEED</div>
              <div
                className={cn(
                  'mt-1.5 font-mono-lab text-2xl tabular-nums',
                  configured == null ? 'text-dim' : configured ? 'text-signal' : 'text-danger'
                )}
              >
                {configured == null ? '…' : configured ? 'ON' : 'OFF'}
              </div>
              <div className="mt-1 font-mono-lab text-[10px] leading-4 text-faint">
                {configured === false
                  ? 'FMP_API_KEY not set on this deployment'
                  : `${Object.keys(fundamentals).length} answered${diagnostic?.source ? ` · via ${diagnostic.source}` : ''}`}
              </div>
            </div>
          </div>

          {/* When the provider is on but silent, show exactly what it said —
              an empty table teaches nothing about why it is empty. */}
          {configured && Object.keys(fundamentals).length === 0 && diagnostic?.note && (
            <div className="mt-6 border-s-2 border-warn bg-warn/5 px-4 py-3">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-warn">FUNDAMENTALS PROVIDER SAID</div>
              <p className="mt-2 break-words font-mono-lab text-[11px] leading-5 text-dim">
                {diagnostic.status != null && <span className="text-foreground">HTTP {diagnostic.status} · </span>}
                {diagnostic.note}
              </p>
            </div>
          )}

          {checked.length === 0 && (
            <p className="mt-6 border border-dashed border-line px-5 py-8 text-center font-mono-lab text-[12px] leading-6 tracking-wide text-dim">
              Waiting for the quote feed. If this does not fill in, the feed is not answering — which is itself the
              finding.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10">
          <SectionHead
            index="AUDIT"
            label="Researched price vs live"
            right={asOf ? `FEED ${new Date(asOf).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` : 'WAITING'}
          />
          <div className="overflow-x-auto border border-line">
            <table className="w-full min-w-[960px]">
              <thead>
                <tr className="border-b border-line bg-card2 font-mono-lab text-[10px] tracking-[0.2em] text-faint">
                  <th className="px-5 py-3 text-start">TICKER</th>
                  <th className="px-5 py-3 text-start">COMPANY</th>
                  <th className="px-5 py-3 text-end">RESEARCHED</th>
                  <th className="px-5 py-3 text-end">LIVE</th>
                  <th className="px-5 py-3 text-end">DRIFT</th>
                  <th className="px-5 py-3 text-end">CAP (OURS)</th>
                  <th className="px-5 py-3 text-end">CAP (FEED)</th>
                  <th className="px-5 py-3 text-end">SNAPSHOT</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const bad = r.drift != null && Math.abs(r.drift) > DRIFT_LIMIT
                  const ccy = currencyOf(r.t)
                  return (
                    <tr key={r.t} className={cn('border-b border-line/50', i % 2 === 1 && 'bg-stripe', bad && 'bg-danger/5')}>
                      <td className="px-5 py-3">
                        <Link to={`/companies/${r.t}`} className="font-mono-lab text-[12px] text-signal hover:underline" dir="ltr">
                          {r.t}
                        </Link>
                      </td>
                      <td className="px-5 py-3 font-mono-lab text-[12px] text-dim">{r.name}</td>
                      <td className="px-5 py-3 text-end font-mono-lab text-[12px] tabular-nums text-dim" dir="ltr">
                        {r.snap != null ? formatMoney(r.snap, ccy) : '—'}
                      </td>
                      <td className="px-5 py-3 text-end font-mono-lab text-[12px] tabular-nums text-foreground" dir="ltr">
                        {r.live != null ? formatMoney(r.live, ccy) : '—'}
                      </td>
                      <td
                        className={cn(
                          'px-5 py-3 text-end font-mono-lab text-[12px] tabular-nums',
                          r.drift == null ? 'text-faint' : bad ? 'text-danger' : 'text-signal'
                        )}
                        dir="ltr"
                      >
                        {r.drift != null ? `${r.drift >= 0 ? '+' : ''}${(r.drift * 100).toFixed(1)}%` : '—'}
                      </td>
                      <td className="px-5 py-3 text-end font-mono-lab text-[12px] tabular-nums text-dim" dir="ltr">
                        {r.capOurs != null ? formatUsdCompact(r.capOurs) : '—'}
                      </td>
                      <td
                        className={cn(
                          'px-5 py-3 text-end font-mono-lab text-[12px] tabular-nums',
                          r.capDrift != null && Math.abs(r.capDrift) > DRIFT_LIMIT ? 'text-danger' : 'text-foreground'
                        )}
                        dir="ltr"
                      >
                        {r.capReal != null ? formatUsdCompact(r.capReal) : '—'}
                        {r.capDrift != null && (
                          <span className="ms-1.5 text-[10px] text-faint">
                            {r.capDrift >= 0 ? '+' : ''}{(r.capDrift * 100).toFixed(0)}%
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-end font-mono-lab text-[11px] text-faint" dir="ltr">{r.asOf}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-5xl font-mono-lab text-[11px] leading-5 tracking-wide text-faint">
            A dash under LIVE means the feed holds nothing for that symbol — either the ticker is wrong or the company no
            longer trades. Both are worth knowing. This page checks share prices only: margins, revenue and backlog have
            no feed behind them and are still refreshed by hand.
          </p>
        </div>
      </section>
    </>
  )
}
