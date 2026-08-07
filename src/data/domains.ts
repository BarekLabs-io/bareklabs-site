/* What a company does — independent of the AI value chain.
 *
 * The chain map in valueChain.ts answers one question: where does this name
 * sit between a mineral and a token. That question is central to one line of
 * research here, and irrelevant to another. A Brazilian merchant acquirer, an
 * ophthalmic device maker and a subsea robotics firm are not weak AI plays;
 * they are not AI plays, and describing them by what they lack tells a reader
 * nothing about what they are.
 *
 * So coverage carries two orthogonal labels:
 *
 *   domain   — what the business is. Every ticker has one. Positive by
 *              construction: no domain is defined as the absence of another.
 *   segment  — where it sits on the AI hardware chain. Null for most names,
 *              and null is not a judgement.
 *
 * Domains are also where the next research pushes land. Several below hold
 * one or two names today because that is where coverage starts, not because
 * the domain is marginal. */

export type DomainKey =
  | 'ai-infra'
  | 'energy-nuclear'
  | 'space-defence'
  | 'robotics'
  | 'quantum'
  | 'medtech-bio'
  | 'fintech-markets'
  | 'commerce-platforms'
  | 'software-apps'
  | 'industrial-materials'
  | 'consumer-hardware'

export const DOMAINS: { key: DomainKey; label: string; note: string }[] = [
  { key: 'ai-infra', label: 'AI INFRASTRUCTURE', note: 'The physical chain behind AI compute — minerals, wafers, tools, packaging, memory, silicon, datacenters and the power feeding them.' },
  { key: 'energy-nuclear', label: 'ENERGY & NUCLEAR FUEL', note: 'Uranium mining, the enrichment and conversion cycle, hydrogen, and the generation assets that industrial demand runs on.' },
  { key: 'space-defence', label: 'SPACE & DEFENCE', note: 'Launch, satellites and constellations, defence electronics and the budgets behind them.' },
  { key: 'robotics', label: 'ROBOTICS & AUTONOMY', note: 'Physical robotics — subsea, industrial and field autonomy, and the sensing that makes it work.' },
  { key: 'quantum', label: 'QUANTUM', note: 'Quantum computing hardware, control electronics and error correction. Reserved for coverage in progress.' },
  { key: 'medtech-bio', label: 'MEDTECH & LIFE SCIENCES', note: 'Surgical robotics, implantable and ophthalmic devices, organ transport, diagnostics and drug discovery.' },
  { key: 'fintech-markets', label: 'FINTECH & MARKET INFRASTRUCTURE', note: 'Payments, merchant acquiring, banking for small business, brokerage and the plumbing underneath.' },
  { key: 'commerce-platforms', label: 'COMMERCE & CONSUMER PLATFORMS', note: 'Marketplaces, e-commerce, logistics networks and consumer internet.' },
  { key: 'software-apps', label: 'ENTERPRISE SOFTWARE', note: 'Application, data and platform software sold to enterprises and governments.' },
  { key: 'industrial-materials', label: 'INDUSTRIALS & ADVANCED MATERIALS', note: 'Engineered materials and composites, energy storage, grid and heavy infrastructure construction.' },
  { key: 'consumer-hardware', label: 'CONSUMER HARDWARE', note: 'Devices and the software and services attached to them.' },
]

export const DOMAIN_LABEL: Record<DomainKey, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.key, d.label])
) as Record<DomainKey, string>

/* Explicit for every name that is not primarily an AI-infrastructure business.
 * Anything absent falls to 'ai-infra', which is correct for the researched
 * roster: it was assembled chain-first. */
const NON_AI: Record<string, DomainKey> = {
  // Energy & nuclear fuel
  UUUU: 'energy-nuclear',
  CCJ: 'energy-nuclear',
  'SLX.AX': 'energy-nuclear',
  BWXT: 'energy-nuclear',
  'ALHAF.PA': 'energy-nuclear',
  'VH2.DE': 'energy-nuclear',

  // Space & defence
  RKLB: 'space-defence',
  SIF: 'space-defence',
  ASTS: 'space-defence',

  // Robotics & autonomy
  KRKNF: 'robotics',
  '090360.KQ': 'robotics',
  '454910.KS': 'robotics',
  '108490.KQ': 'robotics',
  '056080.KQ': 'robotics',
  '348340.KQ': 'robotics',
  '277810.KQ': 'robotics',
  /* An automaker by revenue; covered here from the robotics watch — the group
   * holds a controlling stake in Boston Dynamics and fields its own robotics
   * unit. The domain follows the coverage intent, the tagline states the
   * business. */
  '005380.KS': 'robotics',

  // Medtech & life sciences
  ISRG: 'medtech-bio',
  GKOS: 'medtech-bio',
  TMDX: 'medtech-bio',
  RXRX: 'medtech-bio',

  // Fintech & market infrastructure
  IBKR: 'fintech-markets',
  PAGS: 'fintech-markets',
  STNE: 'fintech-markets',

  // Commerce & consumer platforms
  MELI: 'commerce-platforms',
  JMIA: 'commerce-platforms',
  BABA: 'commerce-platforms',

  // Enterprise software
  CRM: 'software-apps',
  PLTR: 'software-apps',

  // Industrials & advanced materials
  'AUUA.V': 'industrial-materials',
  AMPX: 'industrial-materials',
  BWEN: 'industrial-materials',
  MTZ: 'industrial-materials',
  TPC: 'industrial-materials',
  '000150.KS': 'industrial-materials',
  NRGV: 'industrial-materials',

  // Consumer hardware
  AAPL: 'consumer-hardware',
}

export function domainOf(ticker: string): DomainKey {
  return NON_AI[ticker] ?? 'ai-infra'
}

export function domainInfoOf(ticker: string) {
  const key = domainOf(ticker)
  return DOMAINS.find((d) => d.key === key) ?? DOMAINS[0]
}
