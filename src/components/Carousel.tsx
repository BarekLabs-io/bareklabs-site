import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Drag-to-scroll (mouse) + native swipe (touch) + snap horizontal carousel.
 *
 * The affordance problem this solves: with cards wider than the viewport and
 * only two small arrows in a corner, readers assumed the three visible cards
 * were all there was. Three signals now say "this scrolls": edge arrows that
 * float over the track at half height, a progress band underneath whose thumb
 * width is the visible fraction of the strip, and a "N of M" counter. The
 * right edge also fades the last partial card out, which is the oldest scroll
 * cue there is. Cards get a slight lift toward the cursor so the surface
 * reads as manipulable, not printed. */
export default function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; startScroll: number; moved: boolean } | null>(null)
  const justDragged = useRef(false)
  const [dragging, setDragging] = useState(false)
  /* Progress of the scroll strip: start fraction and visible fraction. */
  const [prog, setProg] = useState({ start: 0, span: 1 })
  const [count, setCount] = useState({ seen: 0, total: 0 })

  const measure = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const span = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1
    const start = max > 0 ? (el.scrollLeft / el.scrollWidth) : 0
    setProg({ start, span })
    const cards = el.querySelectorAll<HTMLElement>('[data-carousel-item]')
    if (cards.length) {
      const step = cards[0].offsetWidth + 16
      const first = Math.round(el.scrollLeft / step)
      const visible = Math.max(1, Math.floor((el.clientWidth + 16) / step))
      setCount({ seen: Math.min(first + visible, cards.length), total: cards.length })
    }
  }

  useEffect(() => {
    measure()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return
    // Don't capture the pointer yet — only once we've confirmed this is a drag,
    // not a click, so a plain click on a card link still reaches the <a> tag.
    drag.current = { pointerId: e.pointerId, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !trackRef.current) return
    const dx = e.clientX - drag.current.startX
    if (!drag.current.moved && Math.abs(dx) > 4) {
      drag.current.moved = true
      setDragging(true)
      trackRef.current.setPointerCapture(drag.current.pointerId)
    }
    if (drag.current.moved) {
      trackRef.current.scrollLeft = drag.current.startScroll - dx
    }
  }
  const endDrag = (e: React.PointerEvent) => {
    if (drag.current?.moved) {
      justDragged.current = true // swallow the click this pointerup is about to trigger
      if (trackRef.current?.hasPointerCapture(e.pointerId)) trackRef.current.releasePointerCapture(e.pointerId)
    }
    setDragging(false)
    drag.current = null
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (justDragged.current) {
      e.preventDefault()
      e.stopPropagation()
      justDragged.current = false
    }
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-carousel-item]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const atStart = prog.start <= 0.001
  const atEnd = prog.start + prog.span >= 0.999

  const EdgeButton = ({ dir }: { dir: 1 | -1 }) => {
    const hidden = dir === -1 ? atStart : atEnd
    return (
      <button
        onClick={() => scrollByCard(dir)}
        aria-label={dir === 1 ? 'Next' : 'Previous'}
        className={cn(
          'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-panel/90 font-mono-lab text-base text-dim shadow-[0_0_24px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 hover:border-signal hover:text-signal md:flex rtl:rotate-180',
          dir === -1 ? '-start-3' : '-end-3',
          hidden && 'pointer-events-none opacity-0'
        )}
      >
        {dir === 1 ? '→' : '←'}
      </button>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <EdgeButton dir={-1} />
      <EdgeButton dir={1} />

      {/* The fade on the trailing edge previews that content continues. */}
      {!atEnd && (
        <div className="pointer-events-none absolute inset-y-0 end-0 z-[5] w-16 bg-gradient-to-l from-background to-transparent rtl:bg-gradient-to-r" />
      )}

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onScroll={measure}
        className={cn(
          'carousel-track carousel-3d flex gap-4 overflow-x-auto pb-2',
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        )}
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>

      {/* The progress band: the thumb is the visible share of the strip, its
        * position is where the reader is. A band that is all thumb means
        * everything is on screen — and then it disappears. */}
      {prog.span < 0.999 && (
        <div className="mt-5 flex items-center gap-4" dir="ltr">
          <div className="h-[3px] flex-1 bg-track">
            <div
              className="h-full bg-signal/80 transition-[margin,width] duration-150"
              style={{ marginInlineStart: `${prog.start * 100}%`, width: `${prog.span * 100}%` }}
            />
          </div>
          <span className="font-mono-lab text-[10px] tabular-nums tracking-[0.2em] text-faint">
            {count.seen}/{count.total}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous"
              className={cn('flex h-8 w-8 items-center justify-center border border-line text-dim transition-colors duration-300 hover:border-signal hover:text-signal rtl:rotate-180', atStart && 'opacity-40')}
            >
              ←
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next"
              className={cn('flex h-8 w-8 items-center justify-center border border-line text-dim transition-colors duration-300 hover:border-signal hover:text-signal rtl:rotate-180', atEnd && 'opacity-40')}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
