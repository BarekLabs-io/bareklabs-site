import { Link } from 'react-router'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'
import { useMarketQuotes } from '@/lib/marketQuotes'
import { TAPE_INSTRUMENTS, NO_VALUE, formatLevel, formatChange } from '@/data/marketTape'

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

export function LiveDesk({ className }: { className?: string }) {
  const { t } = useLang()
  const rows = WATCH.map((label) => TAPE_INSTRUMENTS.find((i) => i.s === label)).filter(
    (i): i is TapeRow => !!i
  )
  const { quotes, asOf } = useMarketQuotes()
  const hasData = rows.some((r) => quotes[r.symbol])

  return (
    <div className={cn('pointer-events-auto border border-line bg-panel/85 backdrop-blur-sm', className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono-lab text-[9px] tracking-[0.25em] text-dim">
          {/* The live dot only pulses when something actually arrived. */}
          <span className={cn('inline-block h-1.5 w-1.5 rounded-full', hasData ? 'dot-live bg-signal' : 'bg-faint')} />
          {t.home.liveDesk.watchlist}
        </div>
        <span className="font-mono-lab text-[8px] tracking-[0.2em] text-faint">
          {hasData && asOf
            ? new Date(asOf).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
            : t.home.liveDesk.majors}
        </span>
      </div>
      <div className="px-4 py-1">
        {rows.map((r) => (
          <WatchRow key={r.symbol} label={r.s} symbol={r.symbol} quote={quotes[r.symbol]} />
        ))}
      </div>

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
