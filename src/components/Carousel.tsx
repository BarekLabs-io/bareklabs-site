import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Drag-to-scroll (mouse) + native swipe (touch) + snap horizontal carousel.
 * Cards are fixed-width flex children; touch scrolling is left to the browser,
 * mouse gets a pointer-drag affordance so desktop users without a trackpad can
 * still "swipe" it. */
export default function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null)
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return
    drag.current = { startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false }
    setDragging(true)
    trackRef.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !trackRef.current) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 3) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.startScroll - dx
  }
  const endDrag = () => {
    setDragging(false)
    drag.current = null
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-carousel-item]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative', className)}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={cn(
          'carousel-track flex gap-4 overflow-x-auto pb-2',
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        )}
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
          className="flex h-9 w-9 items-center justify-center border border-line text-dim transition-colors duration-300 hover:border-signal hover:text-signal rtl:rotate-180"
        >
          ←
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center border border-line text-dim transition-colors duration-300 hover:border-signal hover:text-signal rtl:rotate-180"
        >
          →
        </button>
      </div>
    </div>
  )
}
