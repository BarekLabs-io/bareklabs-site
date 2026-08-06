import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import Carousel from '@/components/Carousel'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

type Note = { d: string; tag: string; t: string; read: string; conf: number; to?: string }

function NoteCard({ n }: { n: Note }) {
  const { t } = useLang()
  const ref = useSpotlight<HTMLDivElement>()
  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{n.d}</span>
        <span className="font-mono-lab text-[9px] tracking-[0.18em] text-signal">{n.tag}</span>
      </div>
      <h3 className="mt-5 min-h-[4.5rem] text-lg font-medium leading-snug tracking-tight transition-colors group-hover:text-signal">
        {n.t}
      </h3>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="whitespace-nowrap font-mono-lab text-[10px] tracking-wider text-faint">
          {n.read} {t.insights.readUnit}
        </span>
        <div className="flex items-center gap-2">
          <div className="h-1 w-14 overflow-hidden bg-track">
            <div className="h-full bg-signal transition-all duration-700" style={{ width: `${n.conf}%` }} />
          </div>
          <span className="font-mono-lab text-[10px] text-dim" dir="ltr">{n.conf}%</span>
        </div>
      </div>
    </>
  )
  const card = (
    <div ref={ref} className="spot-card group h-full border border-line bg-card2 p-6 md:p-7">
      {inner}
    </div>
  )
  return (
    <div data-carousel-item className="w-[300px] shrink-0 md:w-[360px]" style={{ scrollSnapAlign: 'start' }}>
      {n.to ? <Link to={n.to} className="block h-full">{card}</Link> : card}
    </div>
  )
}

export default function Insights() {
  const { t } = useLang()
  const FILTERS = t.insights.filters
  const [filter, setFilter] = useState(FILTERS[0])
  const notes = filter === FILTERS[0] ? t.insights.notes : t.insights.notes.filter((n) => n.tag === filter)

  return (
    <>
      <PageHero
        code={t.insights.hero.code}
        title={t.insights.hero.title}
        serif={t.insights.hero.serif}
        desc={t.insights.hero.desc}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="FILTER" label={t.insights.head} right={`${notes.length} ${t.insights.notesUnit}`} />
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'border px-4 py-2 font-mono-lab text-[10px] tracking-[0.2em] transition-all duration-300',
                  filter === f
                    ? 'border-signal bg-signal text-[#0c0e12]'
                    : 'border-line text-dim hover:border-line-hover hover:text-foreground'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <Reveal>
            <Carousel>
              {notes.map((n) => (
                <NoteCard key={n.t} n={n} />
              ))}
            </Carousel>
          </Reveal>

          <Reveal className="mt-10">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.insights.confidenceNote}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
