import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import ArticleBody, { prepareReportMarkdown } from '@/components/ArticleBody'
import reportRaw from '@/content/reports/new-space-economy.md?raw'

/* The markdown opens with a title/byline block that duplicates PageHero above it — drop
 * everything up to (and including) the first horizontal rule before rendering the body. */
const firstRule = reportRaw.indexOf('\n---\n')
const reportBody = firstRule === -1 ? reportRaw : reportRaw.slice(firstRule + '\n---\n'.length)
const report = prepareReportMarkdown(reportBody)

export default function SpaceEconomy() {
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
          <SectionHead index="REPORT" label="SECTOR NOTE" right="SPCX · RKLB · ASTS" />
          <Reveal>
            <div className="max-w-[880px]">
              <ArticleBody content={report} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
