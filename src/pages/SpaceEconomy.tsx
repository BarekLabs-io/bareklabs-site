import { useEffect, useState } from 'react'
import { Reveal } from '@/components/lab'
import { PageHero } from '@/components/Layout'
import ArticleBody, { extractHeadings, prepareReportMarkdown } from '@/components/ArticleBody'
import { CostCurveChart, EvSalesChart, ScenarioCharts } from '@/components/ReportCharts'
import { cn } from '@/lib/utils'
import reportRaw from '@/content/reports/new-space-economy.md?raw'

/* The markdown opens with a title/byline block that duplicates PageHero above it — drop
 * everything up to (and including) the first horizontal rule before rendering the body. */
const firstRule = reportRaw.indexOf('\n---\n')
const reportBody = firstRule === -1 ? reportRaw : reportRaw.slice(firstRule + '\n---\n'.length)
const headings = extractHeadings(reportBody)

/* Split the report at two headings so the hand-built charts below can sit inline,
 * right where the prose actually discusses that data, instead of bolted on at the end. */
const profilesAt = reportBody.indexOf('## 3. DETAILED PROFILES')
const valuationAt = reportBody.indexOf('## 8. VALUATION & SCENARIOS')
const scenariosAt = reportBody.indexOf('### 8.3 Scenario valuation')
const part1 = prepareReportMarkdown(reportBody.slice(0, profilesAt))
const part2 = prepareReportMarkdown(reportBody.slice(profilesAt, valuationAt))
const part3 = prepareReportMarkdown(reportBody.slice(valuationAt, scenariosAt))
const part4 = prepareReportMarkdown(reportBody.slice(scenariosAt))

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

export default function SpaceEconomy() {
  const active = useActiveHeading(headings.map((h) => h.id))

  return (
    <>
      <PageHero
        code="SECTOR DEEP DIVE"
        title="The New Space Economy,"
        serif="repriced in public."
        desc="A SECTOR NOTE ON SPCX, RKLB AND ASTS — ORBIT COSTS, SEGMENT ECONOMICS, PRICE ACTION, CATALYSTS AND SCENARIOS. EVERY NUMBER IN THE PIECE DRILLS DOWN TO A DATED SOURCE, LISTED AT THE BOTTOM."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-32 py-2">
                <div className="font-mono-lab text-[9px] tracking-[0.3em] text-faint">CONTENTS</div>
                <nav className="mt-5 flex flex-col gap-1 border-s border-line">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={cn(
                        'toc-link -ms-px border-s py-2 ps-4 font-mono-lab text-[10px] leading-4 tracking-[0.1em]',
                        active === h.id ? 'border-signal text-signal' : 'border-transparent text-dim hover:text-foreground'
                      )}
                    >
                      {h.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-10 font-mono-lab text-[10px] leading-6 tracking-wider text-faint">
                  SECTOR — AEROSPACE / SPACE INFRA
                  <br />
                  COVERAGE — SPCX · RKLB · ASTS
                  <br />
                  PUBLISHED — 4 AUG 2026
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <Reveal>
                <ArticleBody content={part1} />
              </Reveal>
              <Reveal>
                <CostCurveChart />
              </Reveal>
              <Reveal>
                <ArticleBody content={part2} />
              </Reveal>
              <Reveal>
                <ArticleBody content={part3} />
              </Reveal>
              <Reveal>
                <EvSalesChart />
              </Reveal>
              <Reveal>
                <ScenarioCharts />
              </Reveal>
              <Reveal>
                <ArticleBody content={part4} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
