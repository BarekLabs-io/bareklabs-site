import { useState } from 'react'
import { cn } from '@/lib/utils'

/* Cost of reaching LEO, USD/kg (2026 dollars) — figures as cited in the report body. */
const COST_CURVE = [
  { label: 'Space Shuttle (1981–2011)', value: 54500, note: '~$54,500/kg — the 50-year plateau' },
  { label: 'Delta IV Heavy / Atlas V', value: 13500, note: '~$13,000–14,000/kg — expendable generation' },
  { label: 'Ariane 6', value: 7500, note: '~$7,500/kg — Europe’s assured-access price' },
  { label: 'Falcon 9 (reused)', value: 2600, note: '~$1,500–2,700/kg depending on reuse configuration' },
  { label: 'Starship (design target)', value: 95, note: 'Below $100/kg — the next cost leg down, unproven at scale' },
]

/* log-scale bar width so a 545x range (54,500 -> 95) stays legible */
function logWidth(v: number, max: number) {
  return (Math.log10(v) / Math.log10(max)) * 100
}

export function CostCurveChart() {
  const max = COST_CURVE[0].value
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div className="my-8 border border-line bg-panel p-6">
      <div className="flex items-baseline justify-between">
        <div className="font-mono-lab text-[10px] tracking-[0.25em] text-signal">COST TO LEO, $/KG</div>
        <div className="font-mono-lab text-[9px] tracking-[0.15em] text-faint">LOG SCALE</div>
      </div>
      <div className="mt-6 space-y-3">
        {COST_CURVE.map((c, i) => (
          <div key={c.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <div className="flex items-baseline justify-between font-mono-lab text-[11px] tracking-wide text-dim">
              <span>{c.label}</span>
              <span className={cn('tabular-nums', hover === i ? 'text-signal' : 'text-foreground')} dir="ltr">
                ${c.value.toLocaleString('en-US')}/kg
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full bg-track">
              <div
                className={cn('h-full transition-all duration-500', i === COST_CURVE.length - 1 ? 'bg-signal' : 'bg-signal/50')}
                style={{ width: `${logWidth(c.value, max)}%` }}
              />
            </div>
            {hover === i && <div className="mt-1.5 font-mono-lab text-[10px] leading-4 tracking-wide text-faint">{c.note}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* EV / TTM sales, public comparables — Section 8.2. */
const EV_SALES = [
  { t: 'ASTS', v: 230, note: 'D2C optionality, pre-ramp' },
  { t: 'SPCX', v: 74.7, note: 'Starlink core + AI conglomerate' },
  { t: 'RKLB', v: 58, note: 'Neutron + defense re-rating post-Nasdaq-100' },
  { t: 'GSAT', v: 38.9, note: 'Apple D2C contract premium' },
  { t: 'PL', v: 22.1, note: 'EO data, margin inflection' },
  { t: 'FLY', v: 16.3, note: 'Post-IPO derating' },
  { t: 'LUNR', v: 10.1, note: 'Lunar services, lumpy NASA contracts' },
  { t: 'VSAT', v: 3.5, note: 'GEO decline fully priced' },
]

export function EvSalesChart() {
  const max = EV_SALES[0].v
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div className="my-8 border border-line bg-panel p-6">
      <div className="flex items-baseline justify-between">
        <div className="font-mono-lab text-[10px] tracking-[0.25em] text-signal">EV / TTM SALES — SECTOR COMPARABLES</div>
        <div className="font-mono-lab text-[9px] tracking-[0.15em] text-faint">AS OF 3 AUG 2026</div>
      </div>
      <div className="mt-6 space-y-3">
        {EV_SALES.map((c, i) => (
          <div key={c.t} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <div className="flex items-baseline justify-between font-mono-lab text-[11px] tracking-wide text-dim">
              <span className="text-foreground">{c.t}</span>
              <span className={cn('tabular-nums', hover === i ? 'text-signal' : 'text-foreground')} dir="ltr">
                {c.v}x
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full bg-track">
              <div
                className={cn('h-full transition-all duration-500', c.t === 'SPCX' || c.t === 'RKLB' || c.t === 'ASTS' ? 'bg-signal' : 'bg-signal/40')}
                style={{ width: `${(c.v / max) * 100}%` }}
              />
            </div>
            {hover === i && <div className="mt-1.5 font-mono-lab text-[10px] leading-4 tracking-wide text-faint">{c.note}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

type Scenario = { label: 'BULL' | 'BASE' | 'BEAR'; price: string; prob: number; note: string }

function ScenarioBar({ ticker, spot, scenarios }: { ticker: string; spot: string; scenarios: Scenario[] }) {
  return (
    <div className="border border-line bg-panel p-6">
      <div className="flex items-baseline justify-between">
        <div className="font-mono-lab text-[11px] tracking-[0.2em] text-foreground">{ticker}</div>
        <div className="font-mono-lab text-[10px] tracking-[0.15em] text-faint" dir="ltr">
          SPOT {spot}
        </div>
      </div>
      <div className="mt-4 flex h-2 w-full overflow-hidden bg-track">
        {scenarios.map((s) => (
          <div
            key={s.label}
            className={cn('h-full transition-all duration-700', s.label === 'BEAR' ? 'bg-danger/70' : s.label === 'BULL' ? 'bg-signal' : 'bg-signal/70')}
            style={{ width: `${s.prob}%` }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {scenarios.map((s) => (
          <div key={s.label}>
            <div className="font-mono-lab text-[11px] tracking-[0.15em]">
              {s.label} <span className={cn(s.label === 'BEAR' ? 'text-danger' : 'text-signal')} dir="ltr">{s.prob}%</span>
            </div>
            <div className="mt-1 font-mono-lab text-[13px] tabular-nums text-foreground" dir="ltr">{s.price}</div>
            <p className="mt-1.5 font-mono-lab text-[10px] leading-4 tracking-wide text-dim">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ScenarioCharts() {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <ScenarioBar
        ticker="RKLB"
        spot="$70.43"
        scenarios={[
          { label: 'BEAR', price: '$19 (-73%)', prob: 25, note: 'Neutron failure/slip, multiple compresses to peer band' },
          { label: 'BASE', price: '$49 (-30%)', prob: 45, note: 'Neutron into 2027, defense demand intact' },
          { label: 'BULL', price: '$95 (+35%)', prob: 30, note: 'Neutron flies Q4 26, Golden Dome SBI proceeds' },
        ]}
      />
      <ScenarioBar
        ticker="ASTS"
        spot="$63.52"
        scenarios={[
          { label: 'BEAR', price: '$16 (-74%)', prob: 30, note: 'Launch/schedule break vs. T-Satellite V2' },
          { label: 'BASE', price: '$63 (0%)', prob: 45, note: 'Partial ramp, guidance halves slip a quarter' },
          { label: 'BULL', price: '$146 (+130%)', prob: 25, note: '~45 sats by year-end, beta on time' },
        ]}
      />
    </div>
  )
}
