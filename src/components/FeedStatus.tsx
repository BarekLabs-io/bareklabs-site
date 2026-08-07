import { cn } from '@/lib/utils'

/* What the quote feed is actually doing, stated rather than implied.
 *
 * This replaces a counter that incremented 0→99 every three seconds beside the
 * word REFRESH. It looked like a progress bar for a refresh that was not
 * happening, and it moved whether or not a single quote had arrived. A widget
 * that animates while the data is dead is worse than a static one: it spends
 * the reader's trust on nothing.
 *
 * The three states are distinguishable on sight:
 *   live    — at least one quote arrived; shows the feed timestamp
 *   partial — some tickers answered, some did not; shows the ratio
 *   dark    — nothing arrived; says so
 */
export function FeedStatus({
  answered,
  total,
  asOf,
  labels,
  className,
}: {
  answered: number
  total: number
  asOf: number | null
  labels: { live: string; partial: string; dark: string }
  className?: string
}) {
  const state = answered === 0 ? 'dark' : answered < total ? 'partial' : 'live'
  const time = asOf ? new Date(asOf).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : null

  return (
    <span className={cn('flex items-center gap-2 font-mono-lab text-[9px] tracking-[0.2em]', className)} dir="ltr">
      <span
        className={cn(
          'inline-block h-1.5 w-1.5 rounded-full',
          // The dot only pulses when something actually arrived.
          state === 'dark' ? 'bg-faint' : 'dot-live',
          state === 'live' ? 'bg-signal' : state === 'partial' ? 'bg-warn' : ''
        )}
      />
      <span className={state === 'dark' ? 'text-faint' : state === 'partial' ? 'text-warn' : 'text-dim'}>
        {state === 'dark' && labels.dark}
        {state === 'partial' && `${labels.partial} ${answered}/${total}`}
        {state === 'live' && `${labels.live}${time ? ` ${time}` : ''}`}
      </span>
    </span>
  )
}
