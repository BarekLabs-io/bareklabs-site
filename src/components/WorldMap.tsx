import { useEffect, useRef } from 'react'

/* Rough continent silhouettes as lon/lat ellipses — good enough at dot-matrix
 * resolution to read as "a world map" without shipping a multi-KB traced path. */
const LANDMASSES: { cx: number; cy: number; rx: number; ry: number }[] = [
  { cx: -100, cy: 45, rx: 34, ry: 24 }, // North America
  { cx: -42, cy: 72, rx: 11, ry: 9 }, // Greenland
  { cx: -58, cy: -16, rx: 17, ry: 29 }, // South America
  { cx: 12, cy: 50, rx: 19, ry: 13 }, // Europe
  { cx: 20, cy: 4, rx: 21, ry: 31 }, // Africa
  { cx: 92, cy: 56, rx: 54, ry: 23 }, // Asia / Siberia
  { cx: 96, cy: 16, rx: 24, ry: 17 }, // India / SE Asia
  { cx: 136, cy: 38, rx: 6, ry: 8 }, // Japan
  { cx: 134, cy: -25, rx: 17, ry: 11 }, // Australia
]

/* The three hubs — plotted at real lon/lat, highlighted on top of the dot field. */
const HUBS: { name: string; lon: number; lat: number }[] = [
  { name: 'PARIS', lon: 2.35, lat: 48.85 },
  { name: 'TUNIS', lon: 10.18, lat: 36.8 },
  { name: 'DUBAI', lon: 55.27, lat: 25.2 },
]

const LAT_MIN = -58
const LAT_MAX = 78

function hash(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return s - Math.floor(s)
}

function insideLand(lon: number, lat: number): number {
  let best = 0
  for (const m of LANDMASSES) {
    const dx = (lon - m.cx) / m.rx
    const dy = (lat - m.cy) / m.ry
    const d = dx * dx + dy * dy
    if (d < 1) best = Math.max(best, 1 - d)
  }
  return best
}

export function WorldMap({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let dotColor = 'rgba(150,180,255,0.16)'
    let signalColor = '0 232 122'
    const readTheme = () => {
      const cs = getComputedStyle(canvas)
      dotColor = cs.getPropertyValue('--canvas-node').trim() || dotColor
      signalColor = cs.getPropertyValue('--signal').trim() || signalColor
    }
    readTheme()
    const mo = new MutationObserver(readTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const project = (lon: number, lat: number) => ({
      x: ((lon + 180) / 360) * w,
      y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * h,
    })
    const unproject = (x: number, y: number) => ({
      lon: (x / w) * 360 - 180,
      lat: LAT_MAX - (y / h) * (LAT_MAX - LAT_MIN),
    })

    const step = 9
    const dots: { x: number; y: number; wobble: number }[] = []
    for (let y = step / 2; y < h; y += step) {
      for (let x = step / 2; x < w; x += step) {
        const { lon, lat } = unproject(x, y)
        const s = insideLand(lon, lat)
        if (s > 0 && hash(x * 0.13, y * 0.13) < s * 1.15 - 0.08) {
          dots.push({ x, y, wobble: hash(x, y) })
        }
      }
    }

    const hubPts = HUBS.map((hb) => ({ ...hb, ...project(hb.lon, hb.lat) }))

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = dotColor
      dots.forEach((d) => {
        const r = 1 + Math.sin(t * 0.6 + d.wobble * 20) * 0.15
        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      // connecting arcs between the three hubs
      ctx.strokeStyle = `rgb(${signalColor} / 0.35)`
      ctx.lineWidth = 1
      for (let i = 0; i < hubPts.length; i++) {
        const a = hubPts[i]
        const b = hubPts[(i + 1) % hubPts.length]
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2 - 26
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.quadraticCurveTo(mx, my, b.x, b.y)
        ctx.stroke()

        // a small pulse travelling along the arc
        const p = (t * 0.15 + i * 0.33) % 1
        const ix = (1 - p) * (1 - p) * a.x + 2 * (1 - p) * p * mx + p * p * b.x
        const iy = (1 - p) * (1 - p) * a.y + 2 * (1 - p) * p * my + p * p * b.y
        ctx.fillStyle = `rgb(${signalColor} / 0.9)`
        ctx.beginPath()
        ctx.arc(ix, iy, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // hub markers
      hubPts.forEach((hb) => {
        const pulse = (t * 0.7) % (Math.PI * 2)
        const ringR = 4 + ((Math.sin(pulse) + 1) / 2) * 10
        const ringA = 0.5 - ((Math.sin(pulse) + 1) / 2) * 0.5
        ctx.strokeStyle = `rgb(${signalColor} / ${ringA.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(hb.x, hb.y, ringR, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = `rgb(${signalColor})`
        ctx.beginPath()
        ctx.arc(hb.x, hb.y, 2.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.font = '600 9px "IBM Plex Mono", monospace'
        ctx.fillStyle = `rgb(${signalColor})`
        ctx.textBaseline = 'bottom'
        const labelY = hb.y - 8
        ctx.textAlign = hb.x > w * 0.8 ? 'right' : 'left'
        ctx.fillText(hb.name, hb.x > w * 0.8 ? hb.x - 6 : hb.x + 6, labelY)
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
