import { Link } from 'react-router'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { useMarketQuotes } from '@/lib/marketQuotes'
import { TAPE_INSTRUMENTS, MOVERS_UNIVERSE, NO_VALUE, formatLevel, formatChange } from '@/data/marketTape'
import { FeedStatus } from '@/components/FeedStatus'
import { Link as RouterLink } from 'react-router'

/* A compact desk panel over the hero. Prices and changes come from the live
 * quotes feed and nothing else — where a quote is missing the row shows a
 * dash. There is deliberately no simulated tick: a number that drifts on a
 * timer looks more authoritative than a static one while being less true. */
const WATCH = ['BTC', 'ETH', 'SOL', 'TAO', 'ICP', 'ZEC', 'S&P 500']

function WatchRow({ label, symbol, quote }: { label: string; symbol: string; quote?: { price: number; changePercent: number | null } }) {
  const up = quote?.changePercent != null ? quote.changePercent >= 0 : null
  return (
    <div
      key={symbol}
      className="flex items-center justify-between border-b border-line/60 py-2 font-mono-lab text-[11px] tracking-wide last:border-0"
      dir="ltr"
    >
      <span className="text-dim">{label}</span>
      <span className="tabular-nums text-foreground">{quote ? formatLevel(quote.price) : NO_VALUE}</span>
      <span className={cn('w-16 text-end tabular-nums', up == null ? 'text-faint' : up ? 'text-signal' : 'text-danger')}>
        {quote?.changePercent != null ? formatChange(quote.changePercent) : NO_VALUE}
      </span>
    </div>
  )
}


/* Today's extremes, ranked from the live feed and nothing else.
 *
 * Only symbols that actually returned a change are eligible: a missing quote
 * is unknown, not flat, and letting it default to 0% would park dead tickers
 * in the middle of the ranking and — on a quiet day — at the top of it. When
 * fewer than two names have data the block says so instead of ranking noise. */
function Movers({ quotes, labels }: {
  quotes: Record<string, { price: number; changePercent: number | null }>
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

  const up = ranked.slice(0, 2)
  const down = ranked.slice(-2).reverse()

  const Row = ({ m }: { m: { s: string; symbol: string; chg: number } }) => (
    <RouterLink
      to={`/companies/${m.s}`}
      className="flex items-center justify-between py-1 font-mono-lab text-[11px] tracking-wide transition-colors hover:text-foreground"
      dir="ltr"
    >
      <span className="text-dim">{m.s}</span>
      <span className={cn('tabular-nums', m.chg >= 0 ? 'text-signal' : 'text-danger')}>{formatChange(m.chg)}</span>
    </RouterLink>
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

export function LiveDesk({ className }: { className?: string }) {
  const { t } = useLang()
  const rows = WATCH.map((label) => TAPE_INSTRUMENTS.find((i) => i.s === label)).filter(
    (i): i is TapeRow => !!i
  )
  const { quotes, asOf } = useMarketQuotes()
  const answered = rows.reduce((n, r) => (quotes[r.symbol] ? n + 1 : n), 0)

  return (
    <div className={cn('pointer-events-auto border border-line bg-panel/85 backdrop-blur-sm', className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono-lab text-[9px] tracking-[0.25em] text-dim">{t.home.liveDesk.watchlist}</span>
        <FeedStatus answered={answered} total={rows.length} asOf={asOf} labels={t.souk.feed} />
      </div>
      <div className="px-4 py-1">
        {rows.map((r) => (
          <WatchRow key={r.symbol} label={r.s} symbol={r.symbol} quote={quotes[r.symbol]} />
        ))}
      </div>

      <Movers quotes={quotes} labels={t.home.liveDesk.movers} />

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

type TapeRow = (typeof TAPE_INSTRUMENTS)[number]
