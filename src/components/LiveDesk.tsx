import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { useMarketQuotes } from '@/lib/marketQuotes'
import { DESK_LISTS, MOVERS_UNIVERSE, NO_VALUE, formatLevel, formatChange } from '@/data/marketTape'
import { FeedStatus } from '@/components/FeedStatus'

/* The desk panel over the hero. Prices and changes come from the live quotes
 * feed and nothing else — where a quote is missing the row shows a dash.
 * There is deliberately no simulated tick: a number that drifts on a timer
 * looks more authoritative than a static one while being less true.
 *
 * Every venue is on screen at once rather than behind tabs. A tab hides four
 * fifths of a market panel behind a click nobody makes, so the venues are
 * laid out two abreast in a denser grid instead — the panel buys width, and
 * spends it on showing more rather than on spacing three columns apart. */

type Quote = { price: number; changePercent: number | null }

/* Row geometry lives here so every list stays on the same rhythm: the label
 * takes what is left, the price and the change sit in fixed columns at the
 * right. Without fixed columns a wide panel pushes the price far from its
 * label and the eye stops connecting the two. */
const ROW = 'grid grid-cols-[minmax(0,1fr)_auto_46px] items-baseline gap-x-2 py-[3px] font-mono-lab text-[10.5px] leading-4'

function WatchRow({ label, to, quote }: { label: string; to?: string; quote?: Quote }) {
  const up = quote?.changePercent != null ? quote.changePercent >= 0 : null
  const body = (
    <>
      <span className="truncate text-dim">{label}</span>
      <span className="tabular-nums text-foreground">{quote ? formatLevel(quote.price) : NO_VALUE}</span>
      <span className={cn('text-end tabular-nums', up == null ? 'text-faint' : up ? 'text-signal' : 'text-danger')}>
        {quote?.changePercent != null ? formatChange(quote.changePercent) : NO_VALUE}
      </span>
    </>
  )
  return to ? (
    <Link to={to} className={cn(ROW, 'transition-colors hover:bg-secondary/40')} dir="ltr">{body}</Link>
  ) : (
    <div className={ROW} dir="ltr">{body}</div>
  )
}

/* Today's extremes, ranked from the live feed and nothing else.
 *
 * Only symbols that actually returned a change are eligible: a missing quote
 * is unknown, not flat, and letting it default to 0% would park dead tickers
 * in the middle of the ranking and — on a quiet day — at the top of it. When
 * fewer than two names have data the block says so instead of ranking noise. */
function Movers({ quotes, labels }: {
  quotes: Record<string, Quote>
  labels: { head: string; gainers: string; losers: string; thin: string }
}) {
  const ranked = MOVERS_UNIVERSE
    .map((m) => ({ ...m, chg: quotes[m.symbol]?.changePercent ?? null }))
    .filter((m): m is typeof m & { chg: number } => m.chg != null)
    .sort((a, b) => b.chg - a.chg)

  if (ranked.length < 2) {
    return (
      <div className="border-t border-line px-4 py-3">
        <div className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{labels.head}</div>
        <p className="mt-2 font-mono-lab text-[10px] leading-4 text-faint">{labels.thin}</p>
      </div>
    )
  }

  const depth = Math.min(4, Math.floor(ranked.length / 2))
  const up = ranked.slice(0, depth)
  const down = ranked.slice(-depth).reverse()

  const Row = ({ m }: { m: { s: string; symbol: string; chg: number } }) => (
    <Link
      to={`/companies/${m.s}`}
      className="flex items-baseline justify-between gap-2 py-[3px] font-mono-lab text-[10.5px] leading-4 transition-colors hover:text-foreground"
      dir="ltr"
    >
      <span className="text-dim">{m.s}</span>
      <span className={cn('tabular-nums', m.chg >= 0 ? 'text-signal' : 'text-danger')}>{formatChange(m.chg)}</span>
    </Link>
  )

  return (
    <div className="border-t border-line px-4 py-3">
      <div className="flex items-baseline justify-between">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{labels.head}</span>
        <span className="font-mono-lab text-[8px] tracking-[0.2em] text-faint" dir="ltr">{ranked.length}</span>
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-x-5">
        <div>
          <div className="font-mono-lab text-[8px] tracking-[0.2em] text-signal/70">{labels.gainers}</div>
          {up.map((m) => <Row key={m.symbol} m={m} />)}
        </div>
        <div>
          <div className="font-mono-lab text-[8px] tracking-[0.2em] text-danger/70">{labels.losers}</div>
          {down.map((m) => <Row key={m.symbol} m={m} />)}
        </div>
      </div>
    </div>
  )
}

/* The wire. Headlines come from /api/news (Alpha Vantage behind a long CDN
 * cache); when the route is not configured or empty the block collapses to a
 * single honest line. Never a placeholder headline. */
type Headline = { title: string; source: string; url: string; at: number | null }

function NewsWire({ labels }: { labels: { head: string; empty: string } }) {
  const [items, setItems] = useState<Headline[] | null>(null)

  useEffect(() => {
    let dead = false
    fetch('/api/news')
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { ok?: boolean; items?: Headline[] } | null) => {
        if (!dead) setItems(j?.ok && Array.isArray(j.items) ? j.items : [])
      })
      .catch(() => { if (!dead) setItems([]) })
    return () => { dead = true }
  }, [])

  const hhmm = (at: number | null) =>
    at == null ? '' : new Date(at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + 'Z'

  return (
    <div className="border-t border-line px-4 py-3">
      <div className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{labels.head}</div>
      {items == null ? null : items.length === 0 ? (
        <p className="mt-2 font-mono-lab text-[10px] leading-4 text-faint">{labels.empty}</p>
      ) : (
        <div className="mt-1.5 flex flex-col gap-1.5">
          {items.slice(0, 4).map((n) => (
            <a
              key={n.url}
              href={n.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group block font-mono-lab text-[10px] leading-[1.35] tracking-wide text-dim transition-colors hover:text-foreground"
            >
              <span className="line-clamp-2">{n.title}</span>
              <span className="mt-px block text-[8.5px] tracking-[0.15em] text-faint" dir="ltr">
                {n.source}{n.at != null ? ` · ${hhmm(n.at)}` : ''}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function LiveDesk({ className }: { className?: string }) {
  const { t } = useLang()
  const { quotes, asOf } = useMarketQuotes()
  const allRows = DESK_LISTS.flatMap((l) => l.rows)
  const answered = allRows.reduce((n, r) => (quotes[r.symbol] ? n + 1 : n), 0)

  return (
    <div className={cn('pointer-events-auto flex flex-col border border-line bg-panel/90 backdrop-blur-sm', className)}>
      <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{t.home.liveDesk.watchlist}</span>
        <FeedStatus answered={answered} total={allRows.length} asOf={asOf} labels={t.souk.feed} />
      </div>

      {/* Every venue at once, two abreast. Only the lists scroll if the
        * viewport is short — the blocks below stay reachable. */}
      <div className="min-h-0 grow overflow-y-auto px-4 py-2.5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {DESK_LISTS.map((l) => (
            <div key={l.key}>
              <div className="border-b border-line/60 pb-1 font-mono-lab text-[8.5px] tracking-[0.22em] text-signal/80">
                {l.label}
              </div>
              <div className="pt-1">
                {l.rows.map((r) => (
                  <WatchRow key={r.symbol} label={r.s} to={r.to} quote={quotes[r.symbol]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <Movers quotes={quotes} labels={t.home.liveDesk.movers} />
        <NewsWire labels={t.home.liveDesk.wire} />
        <Link
          to="/souk-signal"
          className="group flex items-center justify-between border-t border-line px-4 py-2.5 transition-colors hover:bg-secondary/40"
        >
          <div>
            <div className="font-mono-lab text-[9px] tracking-[0.25em] text-signal">{t.home.liveDesk.signalLabel}</div>
            <div className="mt-0.5 font-mono-lab text-[10px] tracking-wide text-dim">{t.home.liveDesk.signalCta}</div>
          </div>
          <span className="font-mono-lab text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal rtl:group-hover:-translate-x-1 rtl:rotate-180">
            →
          </span>
        </Link>
      </div>
    </div>
  )
}
