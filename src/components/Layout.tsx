import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/lab'
import { useLang } from '@/i18n/LanguageContext'
import { useTheme } from '@/theme/ThemeContext'
import { LANG_META, type Lang } from '@/i18n/translations'
import SearchPalette from '@/components/SearchPalette'
import { MarketQuotesProvider, useMarketQuotes } from '@/lib/marketQuotes'
import { TAPE_INSTRUMENTS, NO_VALUE, formatLevel, formatChange } from '@/data/marketTape'

/* ---------- READING PROGRESS BAR ---------- */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div ref={barRef} className="reading-progress" />
}

/* ---------- NAV STRUCTURE ---------- */
type NavItem = {
  to: string
  label: string
  children?: { to: string; label: string; note: string }[]
}

function useNav(): NavItem[] {
  const { t } = useLang()
  return [
    {
      to: '/analysis',
      label: t.nav.analysis,
      children: [
        { to: '/analysis/insights', label: t.nav.sub.insights.label, note: t.nav.sub.insights.note },
        { to: '/analysis/ideas', label: t.nav.sub.ideas.label, note: t.nav.sub.ideas.note },
        { to: '/analysis/ai-value-chain', label: t.nav.sub.chain.label, note: t.nav.sub.chain.note },
      ],
    },
    { to: '/souk-signal', label: t.nav.soukSignal },
    {
      to: '/trade-tracker',
      label: t.nav.tradeTracker,
      children: [
        { to: '/trade-tracker/stocks', label: t.nav.sub.stocks.label, note: t.nav.sub.stocks.note },
        { to: '/trade-tracker/crypto', label: t.nav.sub.crypto.label, note: t.nav.sub.crypto.note },
        { to: '/trade-tracker/screener', label: t.nav.sub.screener.label, note: t.nav.sub.screener.note },
        { to: '/trade-tracker/options', label: t.nav.sub.options.label, note: t.nav.sub.options.note },
      ],
    },
    { to: '/about', label: t.nav.about },
  ]
}

const GROUP_TONE: Record<string, string> = {
  US: 'text-[#7db4ff]',
  EU: 'text-[#c9a86a]',
  AS: 'text-[#d98cb3]',
  M7: 'text-[#9d8cff]',
  CR: 'text-signal',
}

function TapeBar() {
  const { t } = useLang()
  const { quotes } = useMarketQuotes()
  // Duplicated so the marquee loops seamlessly — same instruments, twice.
  const items = [...TAPE_INSTRUMENTS, ...TAPE_INSTRUMENTS]
  return (
    <div className="overflow-hidden border-b border-line bg-tape">
      <div className="ticker-track flex w-max items-center py-2">
        {items.map((it, i) => {
          const q = quotes[it.symbol]
          const up = q?.changePercent != null ? q.changePercent >= 0 : null
          return (
            <div key={i} className="flex items-center gap-2.5 px-5 font-mono-lab text-[10.5px] tracking-wider" dir="ltr">
              <span className={cn('text-[8px] tracking-[0.2em]', GROUP_TONE[it.g])}>{t.tape.groups[it.g]}</span>
              <span className="font-medium text-foreground/90">{it.s}</span>
              <span className="tabular-nums text-dim">{q ? formatLevel(q.price) : NO_VALUE}</span>
              {/* No quote yet (or the feed is down) reads as a dash, not as a
                  flat 0% — an absent number must not look like a real one. */}
              <span className={cn('tabular-nums', up == null ? 'text-faint' : up ? 'text-signal' : 'text-danger')}>
                {q?.changePercent != null ? `${up ? '▲' : '▼'} ${formatChange(q.changePercent)}` : NO_VALUE}
              </span>
              <span className="ms-2 h-3 w-px bg-line" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- CLOCK ---------- */
/* The four venues the coverage actually spans, in the order a session moves
 * through them: Tokyo opens, then Dubai, then Paris, then New York. A market
 * clock that reads left to right in session order tells you where the tape is
 * right now; an alphabetical one does not. Hours are the local exchange day,
 * so an open venue is marked rather than merely listed. */
const CLOCK_VENUES: { code: string; tz: string; open: number; close: number }[] = [
  { code: 'TYO', tz: 'Asia/Tokyo', open: 9, close: 15 },
  { code: 'DXB', tz: 'Asia/Dubai', open: 10, close: 15 },
  { code: 'PAR', tz: 'Europe/Paris', open: 9, close: 17 },
  { code: 'NYC', tz: 'America/New_York', open: 9, close: 16 },
]

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = (tz: string) => {
    const [h, m] = now
      .toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false })
      .split(':')
    return { label: `${h}:${m}`, hour: Number(h), weekday: now.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short' }) }
  }

  return (
    <div className="hidden items-center gap-3 font-mono-lab text-[10px] tracking-wider text-dim lg:flex" dir="ltr">
      {CLOCK_VENUES.map((v, i) => {
        const { label, hour, weekday } = parts(v.tz)
        // Weekend is closed everywhere here; the Gulf week runs Mon–Fri too.
        const weekend = weekday === 'Sat' || weekday === 'Sun'
        const open = !weekend && hour >= v.open && hour < v.close
        return (
          <span key={v.code} className="flex items-center gap-1.5">
            {i > 0 && <span className="me-1.5 text-faint">/</span>}
            <span
              className={cn('inline-block h-1 w-1 rounded-full', open ? 'bg-signal' : 'bg-faint/50')}
              title={open ? `${v.code} open` : `${v.code} closed`}
            />
            <span className={open ? 'text-foreground' : ''}>
              {v.code} {label}
            </span>
          </span>
        )
      })}
    </div>
  )
}

/* ---------- LANGUAGE SWITCH ---------- */
function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center border border-line" role="group" aria-label="Language">
      {LANG_META.map((l: { id: Lang; label: string; short: string }) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          title={l.label}
          className={cn(
            'px-2.5 py-1.5 font-mono-lab text-[9.5px] tracking-[0.15em] transition-all duration-300',
            lang === l.id ? 'bg-signal text-[#0c0e12]' : 'text-dim hover:text-foreground'
          )}
        >
          {compact ? l.short : l.short}
        </button>
      ))}
    </div>
  )
}

/* ---------- THEME TOGGLE ---------- */
function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useLang()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? t.header.themeToLight : t.header.themeToDark}
      className="flex h-8 w-8 items-center justify-center border border-line text-dim transition-colors duration-300 hover:border-signal hover:text-signal"
      aria-label={theme === 'dark' ? t.header.themeToLight : t.header.themeToDark}
    >
      {theme === 'dark' ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      )}
    </button>
  )
}

/* ---------- SEARCH BUTTON ---------- */
function SearchButton() {
  const { t } = useLang()
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('barek:search'))}
      className="hidden items-center gap-2.5 border border-line px-3 py-1.5 font-mono-lab text-[9.5px] tracking-[0.15em] text-dim transition-colors duration-300 hover:border-signal hover:text-signal md:flex"
    >
      <span>⌕</span>
      <span className="hidden lg:inline">{t.header.search}</span>
      <span className="border border-line px-1 py-px text-[8px] text-faint" dir="ltr">{t.header.searchHint}</span>
    </button>
  )
}

/* ---------- DESKTOP NAV ITEM (hover dropdown) ---------- */
function DesktopNavItem({ n }: { n: NavItem }) {
  const loc = useLocation()
  const isActive = n.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(n.to)
  const { t } = useLang()

  if (!n.children) {
    return (
      <NavLink
        to={n.to}
        end={n.to === '/'}
        className={cn(
          'nav-link flex h-full items-center whitespace-nowrap font-mono-lab text-[11px] tracking-[0.12em] transition-colors',
          isActive ? 'active' : 'text-foreground/85 hover:text-signal'
        )}
      >
        {n.label}
      </NavLink>
    )
  }

  return (
    <div className="group relative flex h-full items-center">
      <NavLink
        to={n.to}
        className={cn(
          'nav-link flex items-center gap-1.5 whitespace-nowrap font-mono-lab text-[11px] tracking-[0.12em] transition-colors',
          isActive ? 'active' : 'text-foreground/85 group-hover:text-signal'
        )}
      >
        {n.label}
        <span className="text-[8px] text-faint transition-all duration-300 group-hover:rotate-180 group-hover:text-signal">▼</span>
      </NavLink>

      {/* dropdown */}
      <div className="invisible absolute start-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 rtl:translate-x-1/2">
        <div className="min-w-[280px] border border-line bg-tape shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="whitespace-nowrap border-b border-line px-5 py-2.5 font-mono-lab text-[8px] tracking-[0.3em] text-faint">
            {n.label} / {t.nav.subSections}
          </div>
          {n.children.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              className={({ isActive: subActive }) =>
                cn(
                  'group/sub flex items-center justify-between gap-6 border-b border-line/50 px-5 py-3.5 transition-colors last:border-0 hover:bg-signal/[0.06]',
                  subActive && 'bg-signal/[0.04]'
                )
              }
            >
              <div>
                <div className="font-mono-lab text-[11px] tracking-[0.16em] text-foreground/90 group-hover/sub:text-signal">{c.label}</div>
                <div className="mt-1 font-mono-lab text-[9px] tracking-wider text-faint">{c.note}</div>
              </div>
              <span className="font-mono-lab text-faint transition-all duration-300 group-hover/sub:-translate-x-1 group-hover/sub:text-signal rtl:rotate-180">→</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- LAYOUT ---------- */
export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()
  const { t } = useLang()
  const NAV = useNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [loc.pathname])

  return (
    <MarketQuotesProvider>
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />
      <SearchPalette />

      {/* ---- header ---- */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className={cn('relative z-10 border-b transition-all duration-500', scrolled ? 'border-line header-glass' : 'border-line/60 header-glass')}>
          <div className="shell flex h-20 items-stretch justify-between px-5 md:h-[76px] md:px-10">
            <Link to="/" className="flex items-center gap-3 md:me-10">
              <img src="/logo.svg" alt="BAREK / LABS" className="h-8 w-auto md:h-10 logo-adaptive" />
            </Link>

            <nav className="hidden items-stretch gap-9 md:flex">
              {NAV.map((n) => (
                <DesktopNavItem key={n.to} n={n} />
              ))}
            </nav>

            <div className="flex items-center gap-4 md:ms-10">
              <Clock />
              <div className="hidden items-center gap-2 font-mono-lab text-[10px] tracking-wider text-signal 2xl:flex">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                {t.header.systemsNominal}
              </div>
              <SearchButton />
              <ThemeToggle />
              <LangSwitch />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label="Menu"
              >
                <span className={cn('h-px w-5 bg-foreground transition-transform', menuOpen && 'translate-y-[3.5px] rotate-45')} />
                <span className={cn('h-px w-5 bg-foreground transition-transform', menuOpen && '-translate-y-[3.5px] -rotate-45')} />
              </button>
            </div>
          </div>

          {/* mobile menu */}
          {menuOpen && (
            <nav className="border-t border-line bg-ink px-5 py-6 md:hidden">
              {NAV.map((n) => (
                <div key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      cn('block py-3 font-mono-lab text-sm tracking-[0.12em]', isActive ? 'text-signal' : 'text-foreground/80')
                    }
                  >
                    {n.label}
                  </NavLink>
                  {n.children && (
                    <div className="mb-2 ms-6 border-s border-line ps-4">
                      {n.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) =>
                            cn('block py-2 font-mono-lab text-[11px] tracking-[0.16em]', isActive ? 'text-signal' : 'text-dim')
                          }
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 border-t border-line pt-4">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    window.dispatchEvent(new Event('barek:search'))
                  }}
                  className="flex w-full items-center gap-3 py-3 font-mono-lab text-sm tracking-[0.12em] text-foreground/80"
                >
                  <span>⌕</span> {t.header.search}
                </button>
              </div>
            </nav>
          )}
        </div>

        {/* ---- global market tape under menu ---- */}
        <TapeBar />
      </header>

      {/* ---- page ---- */}
      <main>
        <Outlet />
      </main>

      {/* ---- footer ---- */}
      <footer className="border-t border-line bg-footer">
        <div className="shell px-5 py-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <img src="/logo.svg" alt="BAREK / LABS" className="h-6 w-auto logo-adaptive" />
              <p className="mt-5 max-w-sm font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.footer.tagline}</p>
              <div className="mt-6 flex items-center gap-2 font-mono-lab text-[10px] tracking-wider text-signal">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                {t.footer.operational}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{t.footer.sitemap}</div>
              <ul className="mt-4 space-y-2.5">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{t.footer.subSections}</div>
              <ul className="mt-4 space-y-2.5">
                <li><Link to="/analysis/insights" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.insights}</Link></li>
                <li><Link to="/analysis/ideas" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.ideas}</Link></li>
                <li><Link to="/trade-tracker/stocks" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.stocks}</Link></li>
                <li><Link to="/trade-tracker/crypto" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.crypto}</Link></li>
                <li><Link to="/trade-tracker/screener" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.screener}</Link></li>
                <li><Link to="/trade-tracker/options" className="font-mono-lab text-[11px] tracking-wider text-dim transition-colors hover:text-signal">{t.footer.subLinks.options}</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{t.footer.protocol}</div>
              <p className="mt-4 font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{t.footer.protocolText}</p>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono-lab text-[10px] tracking-[0.2em] text-faint md:flex-row md:items-center">
            <span>{t.footer.copyright}</span>
            <span dir="ltr">{t.footer.build}</span>
          </div>
        </div>
      </footer>
    </div>
    </MarketQuotesProvider>
  )
}

/* Page hero shell shared by inner pages */
export function PageHero({
  code,
  title,
  serif,
  desc,
  children,
}: {
  code: string
  title: string
  serif?: string
  /* ReactNode, not string, so a page whose chapô names the lab can pass it
   * through withBrandMark and keep the BAREK / LABS treatment (rule 1.4).
   * A plain string still satisfies this, so every other caller is unchanged. */
  desc: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="lab-grid relative border-b border-line pt-32 pb-12 md:pt-40 md:pb-14">
      <div className="scanline" />
      <div className="shell px-5 md:px-10">
        <Reveal>
          <div className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{code}</div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-3 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            {title}
            {serif && <span className="font-serif-lab italic text-dim"> {serif}</span>}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-7xl font-mono-lab text-[12.5px] leading-6 tracking-wide text-dim">{desc}</p>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

/* Section heading */
export function SectionHead({ index, label, right }: { index: string; label: string; right?: React.ReactNode }) {
  return (
    <Reveal className="mb-10 flex items-end justify-between border-b border-line pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono-lab text-[10px] text-signal">{index}</span>
        <h2 className="text-xl font-medium tracking-tight md:text-2xl">{label}</h2>
      </div>
      {right && <div className="font-mono-lab text-[10px] tracking-[0.2em] text-faint">{right}</div>}
    </Reveal>
  )
}
