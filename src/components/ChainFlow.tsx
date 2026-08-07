import { useMemo } from 'react'
import type { LiveQuote } from '@/lib/useLiveQuotes'

/* The chain as five vertical rails, read left to right — electrons to tokens.
 *
 * This replaces a radial fan of satellites around each stage. The fan looked
 * good at eight names per stage and broke at twenty-five: angles collapse,
 * labels overprint, and the reader loses the one thing the picture is for,
 * which is seeing who sits in which layer. Columns take density without
 * degrading — a longer rail is just a longer rail.
 *
 * Everything that moves is tied to something real: rail thickness to how many
 * names a layer holds, node area to market cap or share, the ring around a
 * node to today's price move, and the particles to the direction value flows.
 * Nothing here animates purely for effect. */

export type FlowItem = { t: string; name: string; role: string; priv?: boolean }
export type FlowStage = { n: string; k: string; name: string; desc: string; items: FlowItem[] }
export type Sel = { s: number; i: number }

const VB_W = 1440
const TOP = 96
const BOTTOM_PAD = 34
const COL_PAD = 128
const R_MIN = 4
const R_MAX = 15
const ROW_MAX = 27

export type SizeMode = 'cap' | 'share' | 'flat'
export type CapInfo = { usd: number | null; share: number | null; shareNorm: number | null }

function radiusFor(info: CapInfo | undefined, mode: SizeMode, maxUsd: number): number {
  if (mode === 'flat') return 6
  const value = mode === 'cap' ? info?.usd : info?.shareNorm
  const max = mode === 'cap' ? maxUsd : 1
  if (value == null || !max) return R_MIN
  // Area-proportional: radius by sqrt, or big caps get exaggerated by the square.
  return R_MIN + (R_MAX - R_MIN) * Math.sqrt(Math.min(value / max, 1))
}

export function ChainFlow({
  stages, sel, setSel, hover, setHover, sizeMode, byTicker, maxUsd, quotes, flowing, hasDive, label,
}: {
  stages: FlowStage[]
  sel: Sel
  setSel: (s: Sel) => void
  hover: Sel | null
  setHover: (s: Sel | null) => void
  sizeMode: SizeMode
  byTicker: Map<string, CapInfo>
  maxUsd: number
  quotes: Record<string, LiveQuote>
  flowing: boolean
  hasDive: (t: string) => boolean
  label: string
}) {
  const geom = useMemo(() => {
    const n = stages.length
    const step = n > 1 ? (VB_W - COL_PAD * 2) / (n - 1) : 0
    const cols = stages.map((_, i) => COL_PAD + i * step)
    const tallest = Math.max(...stages.map((s) => s.items.length), 1)
    const rowGap = Math.min(ROW_MAX, Math.max(17, 560 / tallest))
    const height = TOP + tallest * rowGap + BOTTOM_PAD
    const rows = stages.map((st) => st.items.map((_, j) => TOP + 16 + j * rowGap))
    // One spine per gap, bowed slightly so the eye follows a direction.
    const spines = cols.slice(0, -1).map((x, i) => {
      const x2 = cols[i + 1]
      const mid = (x + x2) / 2
      return `M ${x} ${TOP - 34} C ${mid} ${TOP - 34}, ${mid} ${TOP - 18}, ${x2} ${TOP - 18}`
    })
    return { cols, rows, height, rowGap, spines }
  }, [stages])

  const { cols, rows, height, rowGap, spines } = geom

  return (
    <svg viewBox={`0 0 ${VB_W} ${height}`} className="min-w-[1080px]" role="img" aria-label={label}>
      <defs>
        <linearGradient id="railFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--signal))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--signal))" stopOpacity="0.04" />
        </linearGradient>
        {spines.map((d, i) => (
          <path key={i} id={`spine-${i}`} d={d} fill="none" />
        ))}
      </defs>

      {/* spines between stages, with value travelling along them */}
      {spines.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgb(var(--signal))" strokeOpacity={0.22} strokeWidth={1.2} />
          {flowing &&
            [0, 1, 2].map((k) => (
              <circle key={k} r={2.4} fill="rgb(var(--signal))">
                <animateMotion dur="3.2s" begin={`${i * 0.35 + k * 1.07}s`} repeatCount="indefinite" path={d} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="3.2s"
                  begin={`${i * 0.35 + k * 1.07}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
        </g>
      ))}

      {stages.map((st, si) => {
        const x = cols[si]
        const active = sel.s === si
        const railTop = TOP + 4
        const railBottom = TOP + 16 + Math.max(st.items.length - 1, 0) * rowGap + 10
        return (
          <g key={st.k}>
            {/* stage header */}
            <text
              x={x}
              y={TOP - 52}
              textAnchor="middle"
              className="font-mono-lab select-none"
              style={{ fontSize: 11, letterSpacing: '0.22em', fill: active ? 'rgb(var(--signal))' : 'var(--faint)' }}
            >
              {st.n}
            </text>
            <text
              x={x}
              y={TOP - 33}
              textAnchor="middle"
              className="select-none"
              style={{ fontSize: 15, fontWeight: 400, fill: active ? 'rgb(var(--signal))' : 'var(--prose)' }}
            >
              {st.name}
            </text>
            <text
              x={x}
              y={TOP - 14}
              textAnchor="middle"
              className="font-mono-lab select-none"
              style={{ fontSize: 10, letterSpacing: '0.14em', fill: 'var(--faint)' }}
            >
              {st.items.length} NAMES
            </text>

            {/* the rail itself */}
            <line x1={x} y1={railTop} x2={x} y2={railBottom} stroke="url(#railFade)" strokeWidth={active ? 2 : 1} />

            {st.items.map((it, ii) => {
              const y = rows[si][ii]
              const isSel = sel.s === si && sel.i === ii
              const isHover = hover?.s === si && hover?.i === ii
              const on = isSel || isHover
              const cap = byTicker.get(it.t)
              const r = radiusFor(cap, sizeMode, maxUsd)
              const q = quotes[it.t]
              const up = q?.changePercent != null ? q.changePercent >= 0 : null
              const dive = hasDive(it.t)
              const unsized = sizeMode !== 'flat' && (sizeMode === 'cap' ? cap?.usd : cap?.shareNorm) == null
              return (
                <g
                  key={it.t}
                  onClick={() => setSel({ s: si, i: ii })}
                  onMouseEnter={() => setHover({ s: si, i: ii })}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* generous invisible hit area — the dots are small on purpose */}
                  <rect x={x - 14} y={y - rowGap / 2} width={132} height={rowGap} fill="transparent" />
                  <line x1={x} y1={y} x2={x + 13} y2={y} stroke="var(--line)" strokeWidth={1} opacity={on ? 0.9 : 0.4} />

                  {/* today's move, as a ring — absent when the feed has nothing */}
                  {up != null && (
                    <circle
                      cx={x}
                      cy={y}
                      r={r + 3.5}
                      fill="none"
                      stroke={up ? 'rgb(var(--signal))' : 'rgb(var(--danger))'}
                      strokeOpacity={on ? 0.75 : 0.4}
                      strokeWidth={1}
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={on ? r + 1.5 : r}
                    fill={unsized ? 'transparent' : dive ? 'rgb(var(--signal))' : 'var(--prose)'}
                    fillOpacity={unsized ? 0 : dive ? (on ? 0.95 : 0.6) : on ? 0.7 : 0.32}
                    stroke={dive ? 'rgb(var(--signal))' : 'var(--faint)'}
                    strokeWidth={unsized ? 1.2 : 0}
                    strokeDasharray={unsized ? '2 2' : undefined}
                    style={{ transition: 'r 0.2s ease, fill-opacity 0.2s ease' }}
                  />
                  {isSel && (
                    <circle cx={x} cy={y} r={r + 7} fill="none" stroke="rgb(var(--signal))" strokeOpacity={0.55}>
                      <animate attributeName="r" values={`${r + 5};${r + 12}`} dur="1.9s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.55;0" dur="1.9s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text
                    x={x + 18}
                    y={y + 3.5}
                    className="font-mono-lab select-none"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.05em',
                      fill: on ? 'rgb(var(--signal))' : dive ? 'var(--prose)' : 'var(--dim)',
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    {it.t}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

export { radiusFor as flowRadiusFor }
