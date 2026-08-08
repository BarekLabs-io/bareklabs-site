import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { LiveQuote } from '@/lib/useLiveQuotes'

/* The chain as a row of stage cards, read left to right — electrons to tokens.
 *
 * This replaces an SVG of vertical rails and dots. The dots were the problem:
 * at nine stages and thirty names a stage it rendered as a scatter of 4px
 * circles with tickers printed beside them, which is a spreadsheet wearing a
 * chart's clothes. It also hid the one thing a value-chain map exists for —
 * what each stage *is* — in a detail panel below the fold.
 *
 * Each stage is now a card that states its own name, its count and what it
 * does, and holds its companies as chips. Value flows between cards through a
 * visible connector rather than through an implied reading direction.
 *
 * Built in HTML rather than SVG: real text wrapping, real hover and focus
 * targets, and type that matches the rest of the site instead of approximating
 * it inside <text> elements. */

export type FlowItem = { t: string; name: string; role: string; priv?: boolean }
export type FlowStage = { n: string; k: string; name: string; desc: string; items: FlowItem[] }
export type Sel = { s: number; i: number }

export type SizeMode = 'cap' | 'share' | 'flat'
export type CapInfo = { usd: number | null; share: number | null; shareNorm: number | null }

/** Scale rides a leading dot on each chip: 3px to 9px, area-proportional. */
function dotSize(info: CapInfo | undefined, mode: SizeMode, maxUsd: number): number {
  if (mode === 'flat') return 5
  const value = mode === 'cap' ? info?.usd : info?.shareNorm
  const max = mode === 'cap' ? maxUsd : 1
  if (value == null || !max) return 3
  return 3 + 6 * Math.sqrt(Math.min(value / max, 1))
}

/* The accent walks the chain from the physical end to the abstract one, using
 * the site's own three tokens rather than inventing a rainbow: the first
 * stages are the ones with a hard constraint, the last are where it is priced. */
const ACCENTS = ['--danger', '--warn', '--warn', '--signal', '--signal', '--signal', '--signal', '--signal', '--signal']

/** More than this and a card becomes a wall; the rest sit behind one click. */
const CHIPS_COLLAPSED = 14

function StageCard({
  stage, si, last, sel, setSel, hover, setHover, sizeMode, byTicker, maxUsd, quotes, hasDive, flowing,
}: {
  stage: FlowStage
  si: number
  last: boolean
  sel: Sel
  setSel: (s: Sel) => void
  hover: Sel | null
  setHover: (s: Sel | null) => void
  sizeMode: SizeMode
  byTicker: Map<string, CapInfo>
  maxUsd: number
  quotes: Record<string, LiveQuote>
  hasDive: (t: string) => boolean
  flowing: boolean
}) {
  const [open, setOpen] = useState(false)
  const active = sel.s === si
  const accent = `rgb(var(${ACCENTS[si % ACCENTS.length]}))`
  const shown = open ? stage.items : stage.items.slice(0, CHIPS_COLLAPSED)
  const hidden = stage.items.length - shown.length

  return (
    <div className="relative flex shrink-0">
      <div
        className={cn(
          'flex w-[252px] flex-col border transition-colors duration-300',
          active ? 'border-signal/50 bg-card2' : 'border-line bg-panel hover:border-line-hover'
        )}
      >
        <div
          className="h-[3px] w-full transition-opacity duration-300"
          style={{ background: accent, opacity: active ? 1 : 0.35 }}
        />

        <div className="border-b border-line px-4 py-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono-lab text-[9.5px] tracking-[0.25em]" style={{ color: accent }} dir="ltr">
              {stage.n}
            </span>
            <span className="font-mono-lab text-[9px] tracking-[0.2em] text-faint" dir="ltr">
              {stage.items.length}
            </span>
          </div>
          <h3 className={cn('mt-1.5 text-[15px] font-medium leading-snug tracking-tight', active && 'text-signal')}>
            {stage.name}
          </h3>
          {/* The comprehension layer, on the map itself rather than under it. */}
          <p className="mt-2 font-mono-lab text-[10px] leading-[1.55] text-dim">{stage.desc}</p>
        </div>

        <div className="flex flex-1 flex-wrap content-start gap-1.5 p-3">
          {shown.map((it, ii) => {
            const isSel = sel.s === si && sel.i === ii
            const on = isSel || (hover?.s === si && hover?.i === ii)
            const dive = hasDive(it.t)
            const d = dotSize(byTicker.get(it.t), sizeMode, maxUsd)
            const chg = quotes[it.t]?.changePercent
            return (
              <button
                key={it.t}
                onClick={() => setSel({ s: si, i: ii })}
                onMouseEnter={() => setHover({ s: si, i: ii })}
                onMouseLeave={() => setHover(null)}
                title={dive ? it.name : `${it.name} — no deep dive on file`}
                className={cn(
                  'flex items-center gap-1.5 border px-1.5 py-1 font-mono-lab text-[10px] leading-none transition-all duration-200',
                  isSel
                    ? 'border-signal bg-signal/15 text-signal'
                    : on
                      ? 'border-line-hover bg-secondary/60 text-foreground'
                      : dive
                        ? 'border-line text-foreground/80 hover:border-line-hover'
                        : 'border-line/50 text-dim hover:border-line'
                )}
                dir="ltr"
              >
                <span
                  className={cn('shrink-0 rounded-full', dive ? 'bg-signal' : 'bg-faint')}
                  style={{ width: d, height: d, opacity: dive ? (on ? 1 : 0.8) : 0.45 }}
                />
                <span className="tabular-nums">{it.t}</span>
                {chg != null && (
                  <span className={cn('text-[8px]', chg >= 0 ? 'text-signal/80' : 'text-danger/80')}>
                    {chg >= 0 ? '▲' : '▼'}
                  </span>
                )}
              </button>
            )
          })}
          {hidden > 0 && (
            <button
              onClick={() => setOpen(true)}
              className="border border-dashed border-line px-1.5 py-1 font-mono-lab text-[10px] leading-none text-faint transition-colors hover:border-signal hover:text-signal"
              dir="ltr"
            >
              +{hidden}
            </button>
          )}
          {open && stage.items.length > CHIPS_COLLAPSED && (
            <button
              onClick={() => setOpen(false)}
              className="border border-dashed border-line px-1.5 py-1 font-mono-lab text-[10px] leading-none text-faint transition-colors hover:border-signal hover:text-signal"
              aria-label="collapse"
            >
              −
            </button>
          )}
        </div>
      </div>

      {/* The connector: value leaving this stage for the next one. Aligned to
        * the header band so it reads as a spine across the whole row. */}
      {!last && (
        <div className="pointer-events-none relative w-4 shrink-0">
          <div className="absolute top-[26px] h-px w-full bg-line" />
          <div
            className="absolute top-[23px] end-0 h-[5px] w-[5px] border-e border-t border-line"
            style={{ transform: 'rotate(45deg)' }}
          />
          {flowing && (
            <span
              className="absolute top-[24.5px] h-[3px] w-[3px] rounded-full bg-signal"
              style={{ animation: `chainpulse 2.2s ${si * 0.16}s linear infinite` }}
            />
          )}
        </div>
      )}
    </div>
  )
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
  return (
    <div className="carousel-track flex items-stretch gap-0 overflow-x-auto p-4" role="group" aria-label={label}>
      {stages.map((st, si) => (
        <StageCard
          key={st.k}
          stage={st}
          si={si}
          last={si === stages.length - 1}
          sel={sel}
          setSel={setSel}
          hover={hover}
          setHover={setHover}
          sizeMode={sizeMode}
          byTicker={byTicker}
          maxUsd={maxUsd}
          quotes={quotes}
          hasDive={hasDive}
          flowing={flowing}
        />
      ))}
    </div>
  )
}
