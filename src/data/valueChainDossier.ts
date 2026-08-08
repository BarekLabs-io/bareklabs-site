/* The AI-infrastructure dossier: the four analytical modules that sit under
 * the constellation — the full layer map, the physical-bottleneck timeline,
 * the EPC comparison, and the niche monopolies.
 *
 * MAINTAINER NOTE, not shown to readers. The figures in GRID_FIGURES,
 * GRID_PLAYERS and EPC_DUEL are industry numbers in circulation as of Aug
 * 2026 — backlogs, lead times, margins. They are framed in the UI as a market
 * read rather than as something we measured, which is what they are. Refresh
 * them against filings when a quarter lands; do not let them silently age.
 *
 * Prices are never stored here — they come from the live quote feed at render
 * time. An earlier draft of this page carried per-ticker price presets and
 * three of the four checkable ones were off by 46-81% (GEV, MTZ, STRL), which
 * is why nothing price-like is allowed in this file.
 *
 * Prose is English here, as in companies.ts: researched content is written
 * once and rendered in every locale; only the UI chrome is translated. */

export type Maturity = 'live' | 'strained' | 'future'

export type Segment = {
  name: string
  role: string
  tickers: string[]
  /** Companies with no listing we can quote. */
  privates?: string[]
  maturity: Maturity
}

export type Layer = {
  n: string
  title: string
  note?: string
  accent: string
  segments: Segment[]
}

export const LAYERS: Layer[] = [
  {
    n: 'L1',
    title: 'Power, generation and grid',
    note: 'The binding constraint of the AI build-out is no longer only silicon — it is grid interconnection queues and megawatts per site.',
    accent: '#ef4444',
    segments: [
      {
        name: 'Nuclear base-load & IPPs',
        role: 'Continuous 24/7 supply to compute clusters, increasingly via direct PPAs.',
        tickers: ['CEG', 'VST', 'TLN', 'CCJ', 'PPC.AT'],
        maturity: 'live',
      },
      {
        name: 'SMR & advanced nuclear',
        role: 'Modular on-site reactors that bypass the public grid queue.',
        tickers: ['BWXT', 'OKLO', 'SMR', 'RR.L'],
        privates: ['Helion'],
        maturity: 'future',
      },
      {
        name: 'Grid equipment & transformers',
        role: 'HV/MV transformers, switchgear and substations.',
        tickers: ['GEV', 'ETN', 'SU.PA', 'SIE.DE', '6501.T', 'POWL'],
        maturity: 'strained',
      },
      {
        name: 'Backup generation & turbines',
        role: 'High-density thermal backup, gas and hydrogen micro-turbines.',
        tickers: ['CAT', '7011.T', 'BE'],
        maturity: 'live',
      },
    ],
  },
  {
    n: 'L2',
    title: 'Semicap, EDA and advanced packaging',
    note: 'With monolithic scaling exhausted, value moves to chiplets joined by 2.5D/3D packaging.',
    accent: '#f97316',
    segments: [
      {
        name: 'EDA software & IP cores',
        role: 'Design tooling and licensable architectures at 3nm/2nm.',
        tickers: ['SNPS', 'CDNS', 'ARM'],
        maturity: 'live',
      },
      {
        name: 'Lithography & WFE',
        role: 'EUV/High-NA lithography, deposition, etch and metrology.',
        tickers: ['ASML', 'AMAT', 'LRCX', 'KLAC', '8035.T'],
        maturity: 'live',
      },
      {
        name: 'Foundries',
        role: 'Physical fabrication of high-performance compute wafers.',
        tickers: ['TSM', '005930.KS', 'INTC'],
        maturity: 'live',
      },
      {
        name: 'IC substrates & advanced packaging',
        role: 'Multi-layer ABF substrates, dicing and CoWoS-class assembly.',
        tickers: ['4062.T', '3037.TW', 'ATS.VI', 'ASX', 'BESI.AS'],
        // Shinko Electric was taken private by the JIC-led consortium, so it
        // no longer quotes — it stays on the map because it still makes the
        // substrates, but as an unlisted name rather than a dead ticker.
        privates: ['Shinko Electric'],
        maturity: 'strained',
      },
    ],
  },
  {
    n: 'L3',
    title: 'Accelerators, HBM and silicon components',
    accent: '#eab308',
    segments: [
      {
        name: 'GPGPU & AI accelerators',
        role: 'Massively parallel tensor compute for training and inference.',
        tickers: ['NVDA', 'AMD'],
        maturity: 'live',
      },
      {
        name: 'Custom ASIC & silicon IP',
        role: 'Bespoke hyperscaler silicon — TPU, Trainium, Maia and successors.',
        tickers: ['AVGO', 'MRVL', 'QCOM'],
        maturity: 'live',
      },
      {
        name: 'HBM memory (HBM3e / HBM4)',
        role: 'Vertically stacked DRAM sitting immediately beside the accelerator.',
        tickers: ['000660.KS', '005930.KS', 'MU'],
        maturity: 'strained',
      },
      {
        name: 'Retimers & interconnect',
        role: 'PCIe switching, signal retiming and very-high-speed connectors.',
        tickers: ['ALAB', 'CRDO', 'FN', 'APH'],
        maturity: 'live',
      },
    ],
  },
  {
    n: 'L4',
    title: 'Datacenter shell, EPC and liquid cooling',
    note: 'Rack density moved from 10–15 kW to over 100 kW, which retires air cooling as the default.',
    accent: '#10b981',
    segments: [
      {
        name: 'Liquid cooling (DLC & CDU)',
        role: 'Direct-to-chip loops, cooling distribution units and chillers.',
        tickers: ['VRT', 'MOD', 'NVT', 'TT', 'SU.PA'],
        maturity: 'strained',
      },
      {
        name: 'Engineering & construction',
        role: 'Civil works, heavy electrical, piping and rapid site assembly.',
        tickers: ['PWR', 'EME', 'FIX', 'STRL', 'MTZ', 'IESC'],
        maturity: 'strained',
      },
      {
        name: 'Server ODM / OEM assembly',
        role: 'Rack integration, burn-in testing and cluster delivery.',
        tickers: ['2317.TW', '2382.TW', '6669.TW', 'SMCI', 'DELL'],
        maturity: 'live',
      },
    ],
  },
  {
    n: 'L5',
    title: 'Optical networking',
    accent: '#06b6d4',
    segments: [
      {
        name: 'Transceivers & optics (800G / 1.6T)',
        role: 'The east-west fabric that lets a cluster behave as one machine.',
        tickers: ['ANET', 'COHR', 'LITE', 'FN'],
        maturity: 'live',
      },
    ],
  },
  {
    n: 'L6',
    title: 'Cloud, neoclouds and colocation',
    accent: '#8b5cf6',
    segments: [
      {
        name: 'Hyperscalers',
        role: 'Owners of the demand curve and of most custom silicon programmes.',
        tickers: ['MSFT', 'AMZN', 'GOOGL', 'META', 'ORCL'],
        maturity: 'live',
      },
      {
        name: 'Colocation REITs & neoclouds',
        role: 'Leased capacity and GPU-first clouds serving the overflow.',
        tickers: ['EQIX', 'DLR', 'NBIS', 'CRWV'],
        maturity: 'live',
      },
    ],
  },
  {
    n: 'L7',
    title: 'Next ruptures (2027–2030)',
    accent: '#c084fc',
    segments: [
      {
        name: 'Silicon photonics & CPO',
        role: 'Co-packaged optics to move bandwidth past the electrical wall.',
        tickers: ['011790.KS'],
        maturity: 'future',
      },
    ],
  },
]

/* ---- The physical wall: how the binding constraint has moved ---- */
export const BOTTLENECKS: { period: string; label: string; detail: string }[] = [
  { period: '2023–24', label: 'Raw tensor compute', detail: 'Accelerator supply is the whole story.' },
  { period: '2024–25', label: 'Packaging & HBM', detail: 'CoWoS capacity and HBM stacks become the gate, not the die.' },
  { period: '2025–26', label: 'Thermal & electrical', detail: 'Liquid cooling stops being optional; transformers and licensed labour bind.' },
  { period: '2027+', label: 'Optical bandwidth & clean baseload', detail: 'Co-packaged optics, then behind-the-meter generation.' },
]

export type SourcedFigure = { label: string; value: string; note: string }

export const GRID_FIGURES: SourcedFigure[] = [
  { label: 'Rack thermal density', value: '120 kW+', note: 'against 10–15 kW historically' },
  { label: 'Transformer lead time', value: '~128 weeks', note: 'grid interconnection backlog' },
  { label: 'Vertiv backlog', value: '~$15B', note: 'roughly doubled year on year' },
  { label: 'Electrician shortfall', value: '100k+', note: 'unfilled roles by 2030, US and Europe' },
]

export const GRID_PLAYERS: { ticker: string; segment: string; moat: string }[] = [
  { ticker: 'VRT', segment: 'Liquid cooling (DLC, CDU), power distribution', moat: 'A backlog near $15B, roughly doubled year on year, and an engineering relationship with Nvidia on 800V DC architecture. The rare name that sells into the rack and the room.' },
  { ticker: 'GEV', segment: 'Grid transformers, substations, gas turbines', moat: 'An electrification backlog above $42B. Transformers and high-voltage switchgear are where the queue actually forms.' },
  { ticker: 'ETN', segment: 'Switchgear, power distribution, thermal', moat: 'Electrical backlog up sharply year on year, with a hard position in low and medium voltage.' },
  { ticker: 'SU.PA', segment: 'Full electrical infrastructure, cooling, BMS', moat: 'Integrated from the substation to the building management software — few competitors span both ends, which is where the pricing power sits.' },
  { ticker: 'MOD', segment: 'Liquid cooling and precision chillers', moat: 'A thermal pure-play that pivoted into high-density racks early enough to matter.' },
]

/* ---- EPC: the two names the document puts head to head ---- */
export const EPC_DUEL: { metric: string; strl: string; fix: string; read: string }[] = [
  { metric: 'Signed backlog', strl: '$4.3B (+116% YoY)', fix: '$14.06B (+73% YoY)', read: 'Scale sits with FIX — roughly 3x the book.' },
  { metric: 'Combined pipeline', strl: '$5.6B incl. ~$1.4B unsigned', fix: '$14.06B firm', read: 'STRL books earlier phases, which convert at a high rate but are less firm.' },
  { metric: 'Operating margin', strl: '~16.5–17.0% (E-Infra ~22–25%)', fix: '17.1% (+330 bps YoY)', read: 'STRL is stronger upstream; FIX is steadier across the whole book.' },
  { metric: 'Gross margin', strl: '~20–22%', fix: '25.9% (+240 bps YoY)', read: 'Off-site prefabrication is what earns FIX the spread.' },
  { metric: 'Growth engine', strl: 'E-infrastructure: fabs, datacenter sitework', fix: 'HVAC, liquid cooling, electrical fit-out', read: 'STRL prepares the ground; FIX equips the interior. Sequential, not rival.' },
]

/* ---- Niche monopolies further up the chain ---- */
export const UNSEEN: { name: string; tickers: string[]; craft: string; why: string }[] = [
  { name: 'Shin-Etsu Chemical', tickers: ['4063.T'], craft: '300mm wafers and photoresists', why: 'Supplies the resist and substrate chemistry that leading-edge lithography depends on.' },
  { name: 'Ibiden & Kyocera', tickers: ['4062.T', '6971.T'], craft: 'ABF IC substrates', why: 'Multi-layer substrates without which 2.5D packaging does not assemble.' },
  { name: 'Resonac Holdings', tickers: ['4004.T'], craft: 'Encapsulation materials', why: 'Thermally tolerant films used in HBM stacking.' },
  { name: 'Coherent & Lumentum', tickers: ['COHR', 'LITE'], craft: 'Optical transceivers and InP', why: '800G/1.6T components for synchronous inter-server links.' },
  { name: 'Horiba & MKS Instruments', tickers: ['6856.T', 'MKSI'], craft: 'Mass flow controllers', why: 'Precise corrosive-gas regulation inside etch chambers and metrology.' },
]

export const GEO_HUBS: { region: string; theme: string; detail: string }[] = [
  { region: 'Greenland · South Africa', theme: 'Raw materials', detail: 'Heavy rare earths and platinum-group metals used in durable electrodes and connectors.' },
  { region: 'Malaysia · Vietnam', theme: 'OSAT & prefabrication', detail: 'Assembly, test, and pre-wired electrical modules shipped to site.' },
  { region: 'Indonesia · Iceland', theme: 'Decarbonised hosting', detail: 'Continuous geothermal baseload, attractive precisely because training runs never idle.' },
]

/** Every ticker in a layer, for the live-quote lookup. */
export function tickersOfLayer(layer: Layer): string[] {
  return [...new Set(layer.segments.flatMap((s) => s.tickers))]
}


/* ---------------------------------------------------------------------------
 * Feeding the constellation
 *
 * The constellation used to draw only tickers that have a deep dive on file,
 * which quietly hid most of the chain — 52 of the 78 names below never
 * appeared. A node without a deep dive is still worth plotting: it carries a
 * live price and a role, and the detail panel already says when no deep dive
 * exists. So the dossier is a second source of nodes alongside companies.ts.
 * ------------------------------------------------------------------------- */

/* Nine stages, not five. The old grouping filed liquid-cooling vendors and
 * construction firms under ENERGY — a company next to its own customers — and
 * merged memory into interconnect and foundries into their toolmakers. Every
 * key here answers "who pays whom": a stage's names sell INTO the next stage,
 * they do not sit beside the people they sell to. */
export type StageKey =
  | 'ENERGY'    // generation & fuel
  | 'ELECTRIF'  // electrical equipment, cooling, power semis — sold to datacenters
  | 'BUILD'     // EPC & construction
  | 'FABTOOLS'  // fab equipment, test, EDA & IP
  | 'FOUNDRY'   // foundries, substrates, packaging, PCB
  | 'MEMORY'    // HBM/DRAM/NAND & memory IP
  | 'LINK'      // networking, optics, retimers
  | 'COMPUTE'   // accelerators, servers, neoclouds & datacenter capacity
  | 'STACK'     // hyperscalers, models, apps

/** Which constellation stage each dossier segment belongs to. */
export const SEGMENT_STAGE: Record<string, StageKey> = {
  'Nuclear base-load & IPPs': 'ENERGY',
  'SMR & advanced nuclear': 'ENERGY',
  'Grid equipment & transformers': 'ELECTRIF',
  'Backup generation & turbines': 'ELECTRIF',
  'Liquid cooling (DLC & CDU)': 'ELECTRIF',
  'Engineering & construction': 'BUILD',
  'EDA software & IP cores': 'FABTOOLS',
  'Lithography & WFE': 'FABTOOLS',
  'Foundries': 'FOUNDRY',
  'IC substrates & advanced packaging': 'FOUNDRY',
  'HBM memory (HBM3e / HBM4)': 'MEMORY',
  'Retimers & interconnect': 'LINK',
  'Transceivers & optics (800G / 1.6T)': 'LINK',
  'Silicon photonics & CPO': 'LINK',
  'GPGPU & AI accelerators': 'COMPUTE',
  'Custom ASIC & silicon IP': 'COMPUTE',
  'Server ODM / OEM assembly': 'COMPUTE',
  'Colocation REITs & neoclouds': 'COMPUTE',
  'Hyperscalers': 'STACK',
}

/** Company names for tickers the site holds no deep dive for. */
export const TICKER_NAMES: Record<string, string> = {
  'TLN': 'Talen Energy', 'CCJ': 'Cameco', 'PPC.AT': 'PPC', 'BWXT': 'BWX Technologies',
  'OKLO': 'Oklo', 'SMR': 'NuScale Power', 'RR.L': 'Rolls-Royce', 'ETN': 'Eaton',
  'SU.PA': 'Schneider Electric', 'SIE.DE': 'Siemens', '6501.T': 'Hitachi', 'POWL': 'Powell Industries',
  'CAT': 'Caterpillar', '7011.T': 'Mitsubishi Heavy', 'SNPS': 'Synopsys', 'CDNS': 'Cadence',
  'ARM': 'Arm Holdings', '005930.KS': 'Samsung Electronics', 'INTC': 'Intel', '4062.T': 'Ibiden',
  'ASX': 'ASE Technology', 'QCOM': 'Qualcomm', 'APH': 'Amphenol',
  'VRT': 'Vertiv', 'MOD': 'Modine Manufacturing', 'NVT': 'nVent Electric', 'TT': 'Trane Technologies',
  'PWR': 'Quanta Services', 'EME': 'EMCOR Group', 'FIX': 'Comfort Systems USA', 'IESC': 'IES Holdings',
  '2317.TW': 'Hon Hai (Foxconn)', '2382.TW': 'Quanta Computer', '6669.TW': 'Wiwynn',
  'DELL': 'Dell Technologies', 'COHR': 'Coherent', 'AMZN': 'Amazon', 'ORCL': 'Oracle',
  'EQIX': 'Equinix', 'DLR': 'Digital Realty', 'CRWV': 'CoreWeave', '011790.KS': 'SKC', '4063.T': 'Shin-Etsu Chemical',
  '6971.T': 'Kyocera', '6856.T': 'Horiba', 'MKSI': 'MKS Instruments',
}

export type DossierNode = { t: string; name: string; role: string; stage: StageKey }

/** Every dossier ticker, flattened into constellation-node shape. */
export function dossierNodes(): DossierNode[] {
  const out: DossierNode[] = []
  const seen = new Set<string>()
  for (const layer of LAYERS) {
    for (const seg of layer.segments) {
      const stage = SEGMENT_STAGE[seg.name]
      if (!stage) continue
      for (const t of seg.tickers) {
        if (seen.has(t)) continue
        seen.add(t)
        out.push({ t, name: TICKER_NAMES[t] ?? t, role: seg.role, stage })
      }
    }
  }
  return out
}
