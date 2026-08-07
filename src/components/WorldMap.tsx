import { useEffect, useRef } from 'react'

/* Rough continent silhouettes as lon/lat ellipses — good enough at dot-matrix
 * resolution to read as "a world map" without shipping a multi-KB traced path. */
const LANDMASSES: { cx: number; cy: number; rx: number; ry: number }[] = [
  // North America
  { cx: -103, cy: 52, rx: 32, ry: 17 },
  { cx: -92, cy: 37, rx: 20, ry: 10 },
  { cx: -113, cy: 62, rx: 26, ry: 10 },
  { cx: -85, cy: 22, rx: 10, ry: 8 }, // Mexico / Central America
  { cx: -42, cy: 72, rx: 12, ry: 8 }, // Greenland
  // South America
  { cx: -62, cy: -8, rx: 16, ry: 14 },
  { cx: -66, cy: -30, rx: 10, ry: 16 },
  // Europe
  { cx: 14, cy: 51, rx: 17, ry: 10 },
  { cx: 24, cy: 60, rx: 14, ry: 8 }, // Scandinavia / Baltic
  { cx: 0, cy: 44, rx: 8, ry: 7 }, // Iberia / France
  // Africa
  { cx: 18, cy: 12, rx: 19, ry: 15 },
  { cx: 26, cy: -14, rx: 14, ry: 18 },
  // Asia
  { cx: 70, cy: 55, rx: 34, ry: 15 }, // Russia / Central Asia
  { cx: 110, cy: 57, rx: 30, ry: 13 }, // Siberia
  { cx: 45, cy: 35, rx: 16, ry: 12 }, // Middle East / Caucasus
  { cx: 78, cy: 24, rx: 12, ry: 12 }, // India
  { cx: 108, cy: 35, rx: 18, ry: 12 }, // China
  { cx: 106, cy: 12, rx: 12, ry: 10 }, // SE Asia
  { cx: 138, cy: 39, rx: 5, ry: 7 }, // Japan
  // Oceania
  { cx: 134, cy: -25, rx: 16, ry: 10 },
  { cx: 173, cy: -41, rx: 5, ry: 6 }, // New Zealand
]

/* Hubs at real lon/lat, drawn on top of the dot field and linked in a west-to-
 * east chain. `dx`/`dy` nudge labels apart where cities sit close together —
 * Seoul and Tokyo are only ~13° of longitude apart and would otherwise
 * overprint each other. */
const HUBS: { name: string; lon: number; lat: number; dx?: number; dy?: number }[] = [
  { name: 'STOCKHOLM', lon: 18.07, lat: 59.33, dy: -4 },
  { name: 'PARIS', lon: 2.35, lat: 48.85, dx: -6 },
  { name: 'TUNIS', lon: 10.18, lat: 36.8, dy: 16 },
  { name: 'DUBAI', lon: 55.27, lat: 25.2, dy: 16 },
  { name: 'SEOUL', lon: 126.98, lat: 37.57, dx: -14, dy: -13 },
  { name: 'TOKYO', lon: 139.69, lat: 35.69, dy: 21 },
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

    // Deliberately brighter than the --canvas-node grid dots: this map is
    // content, not background texture, and read as far too faint at that value.
    let dotColor = 'rgba(150,185,255,0.55)'
    let signalColor = '0 232 122'
    const readTheme = () => {
      const cs = getComputedStyle(canvas)
      // (intentionally not sourced from --canvas-node — see above)
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

    const step = 8
    const dots: { x: number; y: number; wobble: number }[] = []
    for (let y = step / 2; y < h; y += step) {
      for (let x = step / 2; x < w; x += step) {
        const { lon, lat } = unproject(x, y)
        /* Fill the landmass nearly solid, with a few random gaps for texture.
         * Weighting density by distance-from-centre (the obvious approach)
         * thins every coastline until the continents stop reading as land. */
        const s = insideLand(lon, lat)
        if (s > 0.012 && hash(x * 0.13, y * 0.13) < 0.9) {
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
        const r = 1.5 + Math.sin(t * 0.6 + d.wobble * 20) * 0.2
        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      /* Hubs are linked as an open west-to-east chain rather than a closed
       * loop — wrapping Tokyo back to Stockholm would drag a line across the
       * whole map for no reason. */
      ctx.strokeStyle = `rgb(${signalColor} / 0.5)`
      ctx.lineWidth = 1.2
      for (let i = 0; i < hubPts.length - 1; i++) {
        const a = hubPts[i]
        const b = hubPts[i + 1]
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
        ctx.fillStyle = `rgb(${signalColor})`
        ctx.beginPath()
        ctx.arc(ix, iy, 2, 0, Math.PI * 2)
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
        ctx.arc(hb.x, hb.y, 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.font = '700 10px "IBM Plex Mono", monospace'
        ctx.textBaseline = 'bottom'
        const right = hb.x > w * 0.78
        ctx.textAlign = right ? 'right' : 'left'
        const lx = (right ? hb.x - 7 : hb.x + 7) + (hb.dx ?? 0)
        const ly = hb.y - 8 + (hb.dy ?? 0)
        // dark backing so labels stay readable over the dot field
        ctx.fillStyle = 'rgba(6,10,18,0.7)'
        const tw = ctx.measureText(hb.name).width
        ctx.fillRect(right ? lx - tw - 3 : lx - 3, ly - 10, tw + 6, 12)
        ctx.fillStyle = `rgb(${signalColor})`
        ctx.fillText(hb.name, lx, ly)
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
