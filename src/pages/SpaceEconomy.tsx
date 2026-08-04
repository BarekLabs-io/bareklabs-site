import { Reveal } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'

export default function SpaceEconomy() {
  return (
    <>
      <PageHero
        code="SECTOR DEEP DIVE"
        title="The New Space Economy,"
        serif="repriced in public."
        desc="An interactive institutional research note on SPCX, RKLB and ASTS — orbit costs, segment economics, price action, catalysts and scenarios. Every number on the page drills down to a dated source."
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
          <SectionHead index="REPORT" label="INTERACTIVE EDITION" right="SPCX · RKLB · ASTS" />
          <Reveal>
            <div className="overflow-hidden border border-line bg-card2">
              <iframe
                src="/research/new-space-economy.html"
                title="The New Space Economy — interactive sector note"
                className="block h-[86vh] w-full bg-white"
              />
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">
                INTERACTIVE CHARTS · CLICK ANY NUMBER FOR ITS DATED SOURCE · SCENARIOS ARE JUDGMENTS, NOT PRICE TARGETS
              </p>
              <a
                href="/research/new-space-economy.html"
                target="_blank"
                rel="noreferrer"
                className="border border-line px-4 py-2 font-mono-lab text-[10px] tracking-[0.2em] text-dim transition-all duration-300 hover:border-signal hover:text-signal"
              >
                OPEN FULL PAGE ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
