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
 * The watchlist is tabbed by venue — crypto first, then one tab per exchange
 * on the site clock — because a single flat list either drowns in rows or
 * shows only crypto, and both defeat the point of a desk. */

type Quote = { price: number; changePercent: number | null }

function WatchRow({ label, symbol, to, quote }: { label: string; symbol: string; to?: string; quote?: Quote }) {
  const up = quote?.changePercent != null ? quote.changePercent >= 0 : null
  const inner = (
    <>
      <span className={cn('truncate pe-2', to ? 'text-dim group-hover/row:text-foreground' : 'text-dim')}>{label}</span>
      <span className="tabular-nums text-foreground">{quote ? formatLevel(quote.price) : NO_VALUE}</span>
      <span className={cn('w-16 text-end tabular-nums', up == null ? 'text-faint' : up ? 'text-signal' : 'text-danger')}>
        {quote?.changePercent != null ? formatChange(quote.changePercent) : NO_VALUE}
      </span>
    </>
  )
  const cls = 'flex items-center justify-between border-b border-line/60 py-2 font-mono-lab text-[11px] tracking-wide last:border-0'
  return to ? (
    <Link key={symbol} to={to} className={cn(cls, 'group/row transition-colors')} dir="ltr">{inner}</Link>
  ) : (
    <div key={symbol} className={cls} dir="ltr">{inner}</div>
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

  /* Four a side when the feed is rich, degrading with it. */
  const depth = Math.min(4, Math.floor(ranked.length / 2))
  const up = ranked.slice(0, depth)
  const down = ranked.slice(-depth).reverse()

  const Row = ({ m }: { m: { s: string; symbol: string; chg: number } }) => (
    <Link
      to={`/companies/${m.s}`}
      className="flex items-center justify-between py-1 font-mono-lab text-[11px] tracking-wide transition-colors hover:text-foreground"
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
      <div className="mt-2 grid grid-cols-2 gap-x-4">
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
        <div className="mt-2 flex flex-col gap-2">
          {items.slice(0, 5).map((n) => (
            <a
              key={n.url}
              href={n.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group block font-mono-lab text-[10px] leading-4 tracking-wide text-dim transition-colors hover:text-foreground"
            >
              <span className="line-clamp-2">{n.title}</span>
              <span className="mt-0.5 block text-[8.5px] tracking-[0.15em] text-faint" dir="ltr">
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
  const [tab, setTab] = useState(0)
  const list = DESK_LISTS[tab]
  const { quotes, asOf } = useMarketQuotes()
  const answered = list.rows.reduce((n, r) => (quotes[r.symbol] ? n + 1 : n), 0)

  return (
    <div className={cn('pointer-events-auto border border-line bg-panel/85 backdrop-blur-sm', className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{t.home.liveDesk.watchlist}</span>
        <FeedStatus answered={answered} total={list.rows.length} asOf={asOf} labels={t.souk.feed} />
      </div>

      {/* Venue tabs. Proper nouns, deliberately not translated. */}
      <div className="flex border-b border-line" dir="ltr">
        {DESK_LISTS.map((l, i) => (
          <button
            key={l.key}
            onClick={() => setTab(i)}
            className={cn(
              'flex-1 border-e border-line/60 py-2 font-mono-lab text-[8.5px] tracking-[0.15em] transition-colors last:border-0',
              i === tab ? 'bg-signal/10 text-signal' : 'text-faint hover:text-dim'
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-1">
        {list.rows.map((r) => (
          <WatchRow key={r.symbol} label={r.s} symbol={r.symbol} to={r.to} quote={quotes[r.symbol]} />
        ))}
      </div>

      <Movers quotes={quotes} labels={t.home.liveDesk.movers} />

      <NewsWire labels={t.home.liveDesk.wire} />

      <Link
        to="/souk-signal"
        className="group flex items-center justify-between border-t border-line px-4 py-3 transition-colors hover:bg-secondary/40"
      >
        <div>
          <div className="font-mono-lab text-[9px] tracking-[0.25em] text-signal">{t.home.liveDesk.signalLabel}</div>
          <div className="mt-1 font-mono-lab text-[10px] tracking-wide text-dim">{t.home.liveDesk.signalCta}</div>
        </div>
        <span className="font-mono-lab text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal rtl:group-hover:-translate-x-1 rtl:rotate-180">
          →
        </span>
      </Link>

      <div className="border-t border-line px-4 py-3">
        <div className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{t.home.liveDesk.feedLabel}</div>
        <div className="mt-2 flex flex-col gap-2">
          {t.home.feed.items.slice(0, 3).map((n) => (
            <Link
              key={n.t}
              to={n.to}
              className="group flex items-baseline gap-2 font-mono-lab text-[10px] leading-4 tracking-wide text-dim transition-colors hover:text-foreground"
            >
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-signal/60 group-hover:bg-signal" />
              <span className="line-clamp-2">{n.t}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
