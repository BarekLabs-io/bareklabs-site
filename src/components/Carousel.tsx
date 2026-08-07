import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/* Drag-to-scroll (mouse) + native swipe (touch) + snap horizontal carousel.
 * Cards are fixed-width flex children; touch scrolling is left to the browser,
 * mouse gets a pointer-drag affordance so desktop users without a trackpad can
 * still "swipe" it. */
export default function Carousel({ children, className }: { children: React.ReactNode; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; startScroll: number; moved: boolean } | null>(null)
  const justDragged = useRef(false)
  const [dragging, setDragging] = useState(false)

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

  return (
    <div className={cn('relative', className)}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
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
