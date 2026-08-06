import { Link } from 'react-router'
import { TICKER_ITEMS } from '@/components/Layout'
import { useLivePrice } from '@/components/lab'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

/* A compact "desk" panel — reuses the exact same tape data already shown
 * sitewide (see TICKER_ITEMS in Layout.tsx), just re-cut into a watchlist
 * shape, ticking through the same simulated-live mechanism already used
 * for the corner quote on this page (useLivePrice). No new numbers are
 * invented here — same source, same simulation convention. */
const WATCH_SYMBOLS = ['BTC', 'ETH', 'SOL', 'TAO', 'ICP', 'ZEC', 'S&P 500']

function parseValue(v: string): number {
  return Number(v.replace(/,/g, ''))
}

function formatValue(n: number, decimals: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function WatchRow({ s, v, d, up }: { s: string; v: string; d: string; up: boolean }) {
  const base = parseValue(v)
  const decimals = v.includes('.') ? v.split('.')[1].length : 0
  const { price, dir } = useLivePrice(base, 0.0012)
  return (
    <div className="flex items-center justify-between border-b border-line/60 py-2 font-mono-lab text-[11px] tracking-wide last:border-0" dir="ltr">
      <span className="text-dim">{s}</span>
      <span className={cn('tabular-nums', dir > 0 ? 'text-foreground' : 'text-foreground/80')}>{formatValue(price, decimals)}</span>
      <span className={cn('w-14 text-end tabular-nums', up ? 'text-signal' : 'text-danger')}>{d}</span>
    </div>
  )
}

export function LiveDesk({ className }: { className?: string }) {
  const { t } = useLang()
  const rows = WATCH_SYMBOLS.map((s) => TICKER_ITEMS.find((it) => it.s === s)).filter(
    (it): it is (typeof TICKER_ITEMS)[number] => !!it
  )

  return (
    <div className={cn('pointer-events-auto border border-line bg-panel/85 backdrop-blur-sm', className)}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono-lab text-[9px] tracking-[0.25em] text-dim">
          <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          {t.home.liveDesk.watchlist}
        </div>
        <span className="font-mono-lab text-[8px] tracking-[0.2em] text-faint">{t.home.liveDesk.majors}</span>
      </div>
      <div className="px-4 py-1">
        {rows.map((r) => (
          <WatchRow key={r.s} {...r} />
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
