import { useEffect, useMemo, useRef, useState } from 'react'
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { cn } from '@/lib/utils'
import {
  generateDailySeries,
  generateIntradaySeries,
  sma,
  TIMEFRAMES,
  TIMEFRAME_DAYS,
  type Timeframe,
} from '@/lib/priceSeries'

type Row = { t: number; price: number; sma50: number | null; sma200: number | null }

function fmtTick(t: number, tf: Timeframe) {
  const d = new Date(t)
  if (tf === '1D') return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  if (tf === '5D' || tf === '1W' || tf === '1M') return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

function CustomTooltip({ active, payload, tf }: { active?: boolean; payload?: { payload: Row }[]; tf: Timeframe }) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  const d = new Date(row.t)
  const when = tf === '1D'
    ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  return (
    <div className="border border-line bg-panel px-3 py-2 font-mono-lab text-[11px] shadow-lg" dir="ltr">
      <div className="text-faint">{when}</div>
      <div className="mt-1 text-foreground">{row.price.toFixed(2)}</div>
      {row.sma50 != null && <div className="mt-0.5 text-warn">MA50 {row.sma50.toFixed(2)}</div>}
      {row.sma200 != null && <div className="mt-0.5 text-dim">MA200 {row.sma200.toFixed(2)}</div>}
    </div>
  )
}

const GLOSSARY = [
  { k: 'MA50', v: '50-session average close — the near-term trend line. Price crossing above/below it is a common short-horizon signal.' },
  { k: 'MA200', v: '200-session average close — the long-term trend line. Watched as a broad bull/bear divider.' },
]

export default function PriceChart({
  ticker,
  currentPrice,
  summary,
}: {
  ticker: string
  currentPrice: number
  summary?: string[]
}) {
  const [tf, setTf] = useState<Timeframe>('6M')
  const [live, setLive] = useState(currentPrice)
  const base = useRef(currentPrice)

  useEffect(() => {
    base.current = currentPrice
    setLive(currentPrice)
  }, [currentPrice])

  useEffect(() => {
    const id = setInterval(() => {
      setLive((p) => +(p + (Math.random() - 0.49) * base.current * 0.0012).toFixed(2))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const daily = useMemo(() => generateDailySeries(ticker, currentPrice), [ticker, currentPrice])
  const intraday = useMemo(() => generateIntradaySeries(ticker, currentPrice), [ticker, currentPrice])

  const rows = useMemo<Row[]>(() => {
    if (tf === '1D') {
      return intraday.map((p) => ({ ...p, sma50: null, sma200: null }))
    }
    const s50 = sma(daily, 50)
    const s200 = sma(daily, 200)
    const days = TIMEFRAME_DAYS[tf]
    const start = Math.max(0, daily.length - days)
    return daily.slice(start).map((p, i) => ({
      t: p.t,
      price: p.price,
      sma50: s50[start + i],
      sma200: s200[start + i],
    }))
  }, [tf, daily, intraday])

  // live tick nudges the most recent point so the chart doesn't sit fully static
  const liveRows = useMemo(() => {
    if (!rows.length) return rows
    const copy = rows.slice()
    copy[copy.length - 1] = { ...copy[copy.length - 1], price: live }
    return copy
  }, [rows, live])

  const first = rows[0]?.price ?? currentPrice
  const changePct = first ? ((live - first) / first) * 100 : 0
  const up = changePct >= 0

  const xTicks = useMemo(() => {
    if (rows.length < 2) return undefined
    const lo = rows[0].t
    const hi = rows[rows.length - 1].t
    const n = 5
    return Array.from({ length: n + 1 }, (_, i) => Math.round(lo + ((hi - lo) * i) / n))
  }, [rows])

  return (
    <div className="border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono-lab text-2xl font-medium tabular-nums text-foreground" dir="ltr">{live.toFixed(2)}</span>
          <span className={cn('font-mono-lab text-[12px] tabular-nums', up ? 'text-signal' : 'text-danger')} dir="ltr">
            {up ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}% <span className="text-faint">({tf})</span>
          </span>
          <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
        </div>
        <div className="flex gap-1">
          {TIMEFRAMES.map((f) => (
            <button
              key={f}
              onClick={() => setTf(f)}
              className={cn(
                'border px-2.5 py-1 font-mono-lab text-[10px] tracking-[0.15em] transition-colors duration-200',
                tf === f ? 'border-signal text-signal' : 'border-line text-faint hover:text-dim'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[1fr_240px]">
        <div className="h-[280px] px-2 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={liveRows} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`fill-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--signal)" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="var(--signal)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="t"
                type="number"
                domain={['dataMin', 'dataMax']}
                scale="time"
                ticks={xTicks}
                tickFormatter={(t) => fmtTick(t, tf)}
                stroke="var(--line)"
                tick={{ fill: 'var(--faint)', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
                tickLine={false}
                axisLine={{ stroke: 'var(--line)' }}
              />
              <YAxis
                domain={['auto', 'auto']}
                orientation="right"
                stroke="var(--line)"
                tick={{ fill: 'var(--faint)', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
                tickLine={false}
                axisLine={false}
                width={54}
                tickFormatter={(v: number) => v.toFixed(0)}
              />
              <Tooltip content={<CustomTooltip tf={tf} />} cursor={{ stroke: 'var(--signal)', strokeDasharray: '3 3', strokeOpacity: 0.4 }} />
              <Area type="monotone" dataKey="price" stroke="var(--prose)" strokeWidth={1.5} fill={`url(#fill-${ticker})`} dot={false} isAnimationActive={false} />
              {tf !== '1D' && (
                <Line type="monotone" dataKey="sma50" stroke="var(--warn)" strokeWidth={1.25} dot={false} isAnimationActive={false} connectNulls />
              )}
              {tf !== '1D' && (
                <Line type="monotone" dataKey="sma200" stroke="var(--dim)" strokeWidth={1.25} strokeDasharray="4 3" dot={false} isAnimationActive={false} connectNulls />
              )}
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center gap-4 px-2 pb-3 pt-1 font-mono-lab text-[10px] tracking-[0.15em] text-faint">
            <span className="flex items-center gap-1.5"><span className="inline-block h-[2px] w-3 bg-[var(--prose)]" /> PRICE</span>
            {tf !== '1D' && <span className="flex items-center gap-1.5"><span className="inline-block h-[2px] w-3 bg-warn" /> MA50</span>}
            {tf !== '1D' && <span className="flex items-center gap-1.5"><span className="inline-block h-[2px] w-3 border-t border-dashed border-dim" /> MA200</span>}
          </div>
        </div>

        <div className="border-t border-line px-4 py-4 md:border-l md:border-t-0">
          {summary && summary.length > 0 && (
            <>
              <div className="font-mono-lab text-[10px] tracking-[0.25em] text-faint">PRICE ACTION</div>
              <ul className="mt-2.5 space-y-2">
                {summary.slice(0, 2).map((s) => (
                  <li key={s} className="font-mono-lab text-[11px] leading-5 tracking-wide text-dim">— {s}</li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-5 font-mono-lab text-[10px] tracking-[0.25em] text-faint">GLOSSARY</div>
          <ul className="mt-2.5 space-y-3">
            {GLOSSARY.map((g) => (
              <li key={g.k}>
                <div className="font-mono-lab text-[10px] tracking-[0.15em] text-dim">{g.k}</div>
                <div className="mt-1 font-mono-lab text-[10.5px] leading-4 tracking-wide text-dim">{g.v}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
