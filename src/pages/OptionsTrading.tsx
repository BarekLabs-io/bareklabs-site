import { Link } from 'react-router'
import { Reveal, useSpotlight } from '@/components/lab'
import { PageHero, SectionHead } from '@/components/Layout'
import { useLang } from '@/i18n/LanguageContext'

/* The options desk of the trade tracker. It hosts analysis modules — full
 * self-contained HTML documents, served like the idea reports — not a ledger:
 * the lab publishes distributions and mechanisms here, never option trades. */

function ModuleCard({
  to, code, name, desc, stats, i,
}: {
  to: string; code: string; name: string; desc: string; stats: string[]; i: number
}) {
  const ref = useSpotlight<HTMLAnchorElement>()
  return (
    <Reveal delay={i * 100}>
      <Link ref={ref} to={to} className="spot-card group block h-full border border-line p-8 transition-colors duration-300 border-line-hover md:p-12">
        <div className="flex items-start justify-between">
          <span className="font-mono-lab text-[10px] tracking-[0.3em] text-signal">{code}</span>
          <span className="font-mono-lab text-lg text-faint transition-all duration-300 group-hover:-translate-x-1 group-hover:text-signal rtl:rotate-180">→</span>
        </div>
        <h2 className="mt-10 text-3xl font-medium tracking-tight transition-colors group-hover:text-signal md:text-4xl">{name}</h2>
        <p className="mt-5 max-w-xl font-mono-lab text-[11px] leading-5 tracking-wide text-dim">{desc}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span key={s} className="border border-line px-2.5 py-1 font-mono-lab text-[9px] tracking-[0.2em] text-dim">{s}</span>
          ))}
        </div>
      </Link>
    </Reveal>
  )
}

export default function OptionsTrading() {
  const { t } = useLang()
  const o = t.optionsTrading
  return (
    <>
      <PageHero code={o.hero.code} title={o.hero.title} serif={o.hero.serif} desc={o.hero.desc} />
      <section>
        <div className="shell px-5 py-16 md:px-10">
          <SectionHead index="03.D" label={o.modules.head} right={o.modules.headRight} />
          <div className="grid gap-4 md:grid-cols-2">
            {o.modules.items.map((m, i) => (
              <ModuleCard key={m.code} to={m.to} code={m.code} name={m.name} desc={m.desc} stats={m.stats} i={i} />
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="font-mono-lab text-[10px] leading-5 tracking-wider text-faint">{o.note}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
