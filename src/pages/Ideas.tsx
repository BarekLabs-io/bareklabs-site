import { useState } from 'react'
import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import Carousel from '@/components/Carousel'
import { useLang } from '@/i18n/LanguageContext'
import { cn } from '@/lib/utils'

import type { IdeaItem as Idea } from '@/data/ideaReports'

/* A three-way scenario map is the point of these cards, so the middle case
 * needs its own colour: painting BASE the same green as BULL turns a 46%
 * central case into what reads as 68% of good news. */
const TONE: Record<'up' | 'mid' | 'down', { bar: string; text: string }> = {
  up: { bar: 'bg-signal/80', text: 'text-signal' },
  mid: { bar: 'bg-warn/70', text: 'text-warn' },
  down: { bar: 'bg-danger/70', text: 'text-danger' },
}

const STATUS_TONE: Record<Idea['status'], string> = {
  ACTIVE: 'border-signal/50 text-signal',
  WATCHING: 'border-warn/50 text-warn',
  CLOSED: 'border-line text-dim',
}

function IdeaCard({ idea, i }: { idea: Idea; i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useSpotlight<HTMLDivElement>()
  const { t } = useLang()
  const scenarioLabel = (l: string) => (t.ideas.scenarioLabels as Record<string, string>)[l] ?? l

  return (
    <div data-carousel-item className="w-[380px] shrink-0 md:w-[440px]" style={{ scrollSnapAlign: 'start' }}>
      <Reveal delay={i * 70}>
      <div ref={ref} className="spot-card h-full border border-line">
        <button onClick={() => setOpen(!open)} className="w-full p-6 text-start md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{idea.id}</span>
            <span className={cn('border px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em]', STATUS_TONE[idea.status])}>
              {t.ideas.status[idea.status]}
            </span>
            <span className="border border-line px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-dim">{idea.sector}</span>
            {idea.tickers?.map((tk) => (
              <span key={tk} className="border border-signal/30 bg-signal/5 px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-signal" dir="ltr">
                {tk}
              </span>
            ))}
            {idea.revised && (
              <span className="border border-warn/40 bg-warn/5 px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-warn">
                {idea.revised}
              </span>
            )}
            <span className="ms-auto font-mono-lab text-[10px] tracking-wider text-faint" dir="ltr">{idea.date}</span>
          </div>
          {/* The company, spelled out. The titles below are editorial and the
            * badges above are tickers, neither of which names the subject to a
            * reader scrolling a carousel. */}
          <div className="mt-5 font-mono-lab text-[10px] tracking-[0.25em] text-signal" dir="ltr">{idea.company}</div>
          <div className="mt-2 flex items-center justify-between gap-6">
            <h3 className="text-xl font-medium tracking-tight md:text-2xl">{idea.title}</h3>
            <span className={cn('font-mono-lab text-lg text-faint transition-transform duration-300', open && 'rotate-45')}>+</span>
          </div>
          <p className="mt-3 max-w-4xl font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{idea.thesis}</p>
        </button>

        <div className={cn('grid transition-all duration-500 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
          <div className="overflow-hidden">
            <div className="grid gap-px border-t border-line bg-line">
              <div className="bg-ticker p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.entry}</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-foreground/90">{idea.entry}</p>
              </div>
              <div className="bg-ticker p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.invalidation}</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-danger">{idea.invalidation}</p>
              </div>
              <div className="bg-ticker p-6">
                <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.horizon}</div>
                <p className="mt-3 font-mono-lab text-[11px] leading-5 text-foreground/90">{idea.horizon}</p>
              </div>
              {idea.discountRate && (
                <div className="bg-ticker p-6">
                  <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.rate}</div>
                  <p className="mt-3 font-mono-lab text-[11px] leading-5 text-warn/90">{idea.discountRate}</p>
                </div>
              )}
            </div>
            {idea.scenarios && (
            <div className="border-t border-line bg-ticker p-6">
              <div className="font-mono-lab text-[9px] tracking-[0.25em] text-faint">{t.ideas.labels.scenarios}</div>
              <div className="mt-4 flex h-2 w-full overflow-hidden bg-track">
                {idea.scenarios.map((s) => (
                  <div
                    key={s.label}
                    className={cn('h-full transition-all duration-700', TONE[s.tone].bar)}
                    style={{ width: `${s.prob}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-5">
                {idea.scenarios.map((s) => (
                  <span key={s.label} className="font-mono-lab text-[10px] tracking-wider text-dim">
                    {scenarioLabel(s.label)}{' '}
                    <span className={TONE[s.tone].text} dir="ltr">
                      {s.prob}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
            )}
            {idea.report && (
              <Link
                to={`/analysis/ideas/${idea.report}`}
                className="group/link flex items-center justify-between border-t border-line bg-ticker px-6 py-5 font-mono-lab text-[10px] tracking-[0.25em] text-signal transition-colors hover:bg-card2"
              >
                <span>{t.ideas.labels.readReport}</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-1" dir="ltr">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
      </Reveal>
    </div>
  )
}

function EmptyTheses() {
  const { t } = useLang()
  return (
    <Reveal>
      <div className="border border-dashed border-line p-12 text-center md:p-20">
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-line font-mono-lab text-lg text-faint">—</div>
        <div className="mt-6 font-mono-lab text-[11px] tracking-[0.3em] text-signal">{t.ideas.empty.label}</div>
        <p className="mx-auto mt-4 max-w-3xl font-mono-lab text-[12px] leading-6 tracking-wide text-dim">{t.ideas.empty.body}</p>
      </div>
    </Reveal>
  )
}

export default function Ideas() {
  const { t } = useLang()
  const FILTERS = t.ideas.filters
  /* By index, not by label. The labels are translated — "ALL" becomes "TOUT"
   * — so a selection held as a string stops matching the moment the reader
   * switches language, and every card silently disappears. */
  const [sectorIndex, setSectorIndex] = useState(0)
  const items = sectorIndex === 0 ? t.ideas.items : t.ideas.items.filter((i) => i.sector === FILTERS[sectorIndex])

  return (
    <>
      <PageHero
        code={t.ideas.hero.code}
        title={t.ideas.hero.title}
        serif={t.ideas.hero.serif}
        desc={t.ideas.hero.desc}
      />
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="LEDGER" label={t.ideas.head} right={t.ideas.headRight} />
          {t.ideas.items.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {FILTERS.map((f, fi) => (
                <button
                  key={f}
                  onClick={() => setSectorIndex(fi)}
                  className={cn(
                    'border px-4 py-2 font-mono-lab text-[10px] tracking-[0.2em] transition-all duration-300',
                    sectorIndex === fi
                      ? 'border-signal bg-signal text-[#0c0e12]'
                      : 'border-line text-dim hover:border-line-hover hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
          {items.length > 0 ? (
            <Carousel>
              {items.map((idea, i) => (
                <IdeaCard key={idea.id} idea={idea} i={i} />
              ))}
            </Carousel>
          ) : (
            <EmptyTheses />
          )}
          {/* Every target on this page is a discounted-cash-flow output, and a
            * DCF reads a long-duration growth asset as expensive almost by
            * construction. Saying so where the targets are read is the only
            * thing that lets a reader argue with the assumption instead of
            * just the conclusion. */}
          <Reveal className="mt-10">
            <div className="border-s-2 border-warn/40 ps-5">
              <div className="font-mono-lab text-[9px] tracking-[0.25em] text-warn">{t.ideas.method.label}</div>
              <p className="mt-3 max-w-4xl font-mono-lab text-[11px] leading-6 tracking-wide text-dim">{t.ideas.method.body}</p>
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{t.ideas.disclaimer}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
