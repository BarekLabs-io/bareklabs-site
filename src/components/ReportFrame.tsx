import { useEffect, useRef, useState } from 'react'

/* Embedded research reports are self-contained HTML documents, and several of
 * them drive their own visuals from scroll — fixed backgrounds, sticky rails,
 * IntersectionObserver reveals. That rules out the obvious fix of growing the
 * iframe to its content height: the inner document would stop scrolling, so
 * every reveal would fire at once and the fixed layers would scroll away.
 *
 * So the report keeps its own scrolling and instead takes the whole viewport
 * under the site header, while the page behind it is pinned. One scroll
 * container, not two stacked — reaching the top of a report is one gesture
 * rather than "scroll the document, then scroll the page".
 *
 * The header height is measured rather than assumed: it carries the nav *and*
 * the market tape, and it changes with the mobile menu and on resize. */
export function ReportFrame({ src, title, reloadKey }: { src: string; title: string; reloadKey?: string }) {
  const [headerH, setHeaderH] = useState<number | null>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return
    const measure = () => setHeaderH(header.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(header)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Pins the page behind the report and drops the footer for as long as a
  // report is open (see .report-open in index.css). Reverted on unmount, so
  // navigating away restores normal page scrolling.
  useEffect(() => {
    document.documentElement.classList.add('report-open')
    return () => document.documentElement.classList.remove('report-open')
  }, [])

  return (
    <iframe
      ref={frameRef}
      key={reloadKey}
      src={src}
      title={title}
      className="block w-full border-0"
      style={
        headerH == null
          ? { height: '100vh', visibility: 'hidden' }
          : { marginTop: headerH, height: `calc(100vh - ${headerH}px)` }
      }
    />
  )
}
