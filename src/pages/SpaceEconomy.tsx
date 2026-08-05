import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'

export default function SpaceEconomy() {
  return (
    <>
      <PageHero
        code="SECTOR DEEP DIVE"
        title="The New Space Economy,"
        serif="repriced in public."
        desc="AN INTERACTIVE INSTITUTIONAL RESEARCH NOTE ON SPCX, RKLB AND ASTS — ORBIT COSTS, SEGMENT ECONOMICS, PRICE ACTION, CATALYSTS AND SCENARIOS. EVERY NUMBER ON THE PAGE DRILLS DOWN TO A DATED SOURCE."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="REPORT" label="INTERACTIVE EDITION" right="SPCX · RKLB · ASTS" />
          <Reveal>
            <div className="border border-line bg-card2 p-3 md:p-6">
              <div className="overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <iframe
                  src="/research/new-space-economy/"
                  title="The New Space Economy — interactive sector note"
                  className="block h-[86vh] w-full bg-white"
                />
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-6 flex items-center justify-between gap-4 font-mono-lab text-[10px] tracking-[0.2em] text-dim">
            <span>FULL DRILL-DOWNS AND SOURCES INSIDE THE FRAME</span>
            <a
              href="/research/new-space-economy/"
              target="_blank"
              rel="noreferrer"
              className="border border-line px-4 py-2 transition-colors duration-300 hover:border-signal hover:text-signal"
            >
              OPEN FULL PAGE →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
