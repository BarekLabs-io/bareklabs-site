import type { IdeaItem } from '@/data/ideaReports'

/* The open theses, in English. Kept out of dict-en.ts because these are the
 * only entries in the dictionary that carry real research: they change on
 * their own schedule, they get re-dated, and they should be reviewable as a
 * file rather than as a diff buried in a 900-line translation object.
 *
 * Every figure here traces to the long-form report the card links to. Two of
 * the eight publish bear/base/bull without probabilities; those cards carry
 * no scenario bar rather than an invented weighting.
 *
 * Data as of 6 August 2026 for the whole batch. */
export const ideasEn: IdeaItem[] = [
  {
    id: 'IDEA-01',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    tickers: ['NBIS'],
    report: 'nbis',
    title: 'Nebius: the gap between contracted and live',
    thesis:
      'Nebius ended 2025 claiming more than three gigawatts of contracted power. About 170 megawatts were actually live and billing — 5.7%. The company is genuinely executing, revenue went from $91.5m in 2024 to $529.8m in 2025 to $399.0m in Q1 2026 alone. But any model that values contracted gigawatts linearly is wrong by a factor of seventeen, and that ratio is the only number that should govern the valuation.',
    entry:
      'Unusually for this batch, the market is not paying more than our model supports. The current $48.5bn enterprise value implies a 7.4x exit multiple on our central 2033 EBITDA; our own Gordon terminal value comes out at 5.5x — the market is more conservative than we are. The debate here is execution, not price, which also means the margin for error is thin in both directions. Twenty-nine percent of the float is sold short.',
    invalidation:
      'Conversion stalling on permits rather than on demand. On 6 August a contested planning hearing in Vineland, New Jersey took 11% off the stock, because that site serves the $17.4bn Microsoft contract — a town meeting erased six billion dollars of market cap. The second tell is financing: July\'s $775m secured facility covers more than 100% of the capex it funds, and whether that structure replicates on the Meta contracts decides how much dilution the current shareholder absorbs.',
    horizon: 'Q2 print on 12 August 2026. The conversion trajectory runs to 2028.',
    discountRate: '11.5% WACC, central case (10.5–13.5% across the three)',
    scenarios: [
      { label: 'BEAR', prob: 32, tone: 'down' },
      { label: 'BASE', prob: 46, tone: 'mid' },
      { label: 'BULL', prob: 22, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-02',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'ENERGY',
    tickers: ['NRGV'],
    report: 'nrgv',
    title: 'Energy Vault: the ten percent',
    thesis:
      'Energy Vault communicates a $1.35bn backlog. In the same SEC filing, its remaining performance obligations under ASC 606 — contracted revenue not yet recognised — are $142.4m. That is 10.5% of the headline. This thesis is about the other 89.5%: what it contains, why it is there, and what it is worth.',
    entry:
      'None of our approaches reaches the current $3.01 — not the scenario DCF, not the sum of the parts, not the probability-weighted average. The gap is a factor of three to four, which is large enough to be a statement about our assumptions rather than about the company. Either our cost of capital and conversion rates are too severe, in which case the project-finance variant at 10% gives $1.70 a share and at 9% gives $2.42, or the market is pricing an option on the $3.5bn developed pipeline rather than a path of cash flows.',
    invalidation:
      'SOSA and Stoney Creek closing at ordinary infrastructure terms would break the bear case outright. The covenant waivers of 26 June make that harder, not easier. Watch the direction of that one item before anything else.',
    horizon: 'Q2 print on 11 August 2026. The project financings decide 2027.',
    discountRate: '14.0% WACC, central case (12.5–16.5% across the three)',
    scenarios: [
      { label: 'BEAR', prob: 35, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-03',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    tickers: ['DGXX'],
    report: 'dgxx',
    title: 'Digi Power X: the December date',
    thesis:
      'A $342m valuation rests on a single contract: 40 megawatts leased to Cerebras, $1.1bn over ten years, signed 4 May 2026. To date it has produced zero dollars of revenue. Phase one — 15 of the 40 megawatts — targets service on 15 December 2026, and the remaining 25 are expressly conditional on financing that has not been announced. The whole case sits on that date and that condition.',
    entry:
      'Weighted across our three cases the equity is worth about $0.83 against a $3.75 share price. The lever that moves it is the cost of capital, not the operations: the same central cash flows are worth $0.81 at the 15.7% we reconstruct for the company, and $2.18 at the 9% a non-recourse project loan secured on a ten-year contract would plausibly carry. A project financing announcement therefore matters more than the December date, because it conditions it.',
    invalidation:
      'Phase one slipping past Q1 2027, or phase two never being financed. One caveat on every multiple here: our share count of 91.09m comes from the 15 May 10-Q cover, and cash went from $57.8m at 31 March to about $155m at 3 July with no debt raised — which points to at-the-market issuance under the programme lifted to $175m on 8 May. Market cap and enterprise value are therefore probably understated until the 14 August print settles it.',
    horizon: 'To 15 December 2026, then the 2027–2028 build-out.',
    discountRate: '15.5% WACC, central case (14.0–18.5%). At 9%, the rate a non-recourse project loan would carry, the same cash flows are worth $2.18',
    scenarios: [
      { label: 'BEAR', prob: 40, tone: 'down' },
      { label: 'BASE', prob: 42, tone: 'mid' },
      { label: 'BULL', prob: 18, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-04',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'BIOTECH',
    tickers: ['RXRX'],
    report: 'rxrx',
    title: 'Recursion: the platform against the clock',
    thesis:
      'Recursion has pushed industrialised AI drug discovery further than anyone — 2.2 million samples processed a week, 36 petabytes of proprietary data, and more than $500m collected from Roche, Sanofi, Bayer and Merck KGaA. No Recursion-discovered drug has yet cleared phase 2 with a robust efficacy signal. The question is not whether the platform works, but how much time is left and how many shares it takes to find out.',
    entry:
      'The risk-adjusted pipeline comes to $230m of rNPV, and REC-4881 alone is 48% of that — the only programme with published efficacy data (median polyp burden down 43% at week 13, 53% at week 25) and two FDA designations. Set against $1.68bn of market cap and $556.8m of cash, the mechanism that dominates everything else is reflexive: the scenario sets the raise price, and the dilution then amplifies the scenario.',
    invalidation:
      'REC-4881 failing to hold its week-25 depth, or a financing priced near the bear case — in that case more than twice the existing share count has to be created. Q2 2026 revenue of $7.7m was down 60% year on year and 36.9% below consensus, with a $131.0m net loss.',
    horizon: 'To the readouts. Runway is guided into early 2028.',
    discountRate: '13% on the DCF, 12% on the risk-adjusted pipeline',
    scenarios: [
      { label: 'BEAR', prob: 40, tone: 'down' },
      { label: 'BASE', prob: 40, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-05',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEDTECH',
    tickers: ['ISRG'],
    report: 'isrg',
    title: 'Intuitive Surgical: the monopoly has an appointment',
    thesis:
      'Eleven thousand seven hundred and ten da Vinci robots placed and more than 3.2 million procedures in 2025, at 66% gross margin, 31% operating margin, $8.6bn of cash and zero debt. It is one of the finest machines in medtech, and the stock is 38% off its high. Two things happened at once: US procedure growth fell to +12% in Q2 2026, and on 22 July the FDA authorised Johnson & Johnson\'s OTTAVA across ten general-surgery procedures — the core of da Vinci volume.',
    entry:
      'Sixty-five percent of the value sits beyond 2035, which makes this a very long-duration asset and the discount rate the dominant variable. At $373.71 the price implies a beta of 0.75 — a stock that moves 25% less than the index — on a business that has just acquired its first credible competitor in twenty years. Our probability-weighted case is $289.26.',
    invalidation:
      'US procedure growth reaccelerating back above the mid-teens would reset the bear case on its own. In the other direction, OTTAVA converting placements rather than merely clearing the FDA is what would turn a regulatory event into a commercial one.',
    horizon: 'Multi-year. On this name the duration is the thesis.',
    discountRate: '9.5% WACC, on an assumed beta of 1.05–1.10 against an observed 1.46. Moving the rate to 8.50% adds more than $100 a share',
    scenarios: [
      { label: 'BEAR', prob: 25, tone: 'down' },
      { label: 'BASE', prob: 50, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-06',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEDTECH',
    tickers: ['TMDX'],
    report: 'tmdx',
    title: 'TransMedics: one organ, one thesis',
    thesis:
      'TransMedics built, in five years, the only integrated organ procurement, perfusion and transport network in the United States, and revenue has grown 2.5x since 2023. Two things qualify that: 78% of organ revenue comes from the liver, and adjusted operating margin fell from 23.2% to 13.6% in a year. Neither business lost margin — product gross margin actually improved. It is the growing weight of the logistics business that drags the average down.',
    entry:
      'Q2 2026 revenue of $189.9m was an absolute record, up 21% year on year, against 2026 guidance of $737–757m. The market pays $78.74 for that; our probability-weighted case is $60.51. The convertible strikes at $94.00 with a capped call at $141.88, which bounds where dilution begins and ends.',
    invalidation:
      'Heart or lung scaling would widen the thesis rather than end it — liver concentration is the risk, not the ceiling. The live risk is legal: the part of the securities litigation that attacks the core commercial model survived its motion to dismiss and is now in discovery.',
    horizon: '2026–2027, on the mix shift and on discovery.',
    discountRate: '10.5% WACC, 3% perpetual growth. Justifying the current price needs 9.5% or lower with at least 3.5% growth',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-07',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'SPACE',
    tickers: ['RKLB', 'ASTS'],
    report: 'rklb-asts',
    title: 'Rocket Lab and AST SpaceMobile: two space bets, one question',
    thesis:
      'Two fundamentally different businesses that the market currently values on the same basis — belief. Rocket Lab is a real industrial company: 92 successful Electron launches, a $2.2bn backlog, $679.6m of trailing revenue. AST SpaceMobile is a call option on direct-to-device satellite telephony, a market that exists commercially for nobody today, on $84.9m of trailing revenue and twelve satellites in orbit.',
    entry:
      'Rather than conclude "overvalued" and stop, we inverted the model and asked what the current price requires. Justifying $78.42 for RKLB needs a 4.37% discount rate — below the US 10-year at 4.65%, meaning a negative risk premium on one of the Nasdaq\'s most volatile names at a beta of 2.63. At an unchanged cost of capital it instead needs $88bn of 2035 revenue, more than Lockheed Martin does today. For ASTS the same exercise asks for $42bn in 2035, against a global direct-to-device market GM Insights sizes at $15.5bn — 2.7 times its entire market. The report\'s own conclusion is not that these are worth a tenth of the price: it is that they are priced as options — on Neutron and the Golden Dome budget for Rocket Lab, on spectrum value and a near-monopoly in direct-to-device for ASTS — rather than as cash flows. That is a defensible position. It is simply not a position a discounted cash flow can express, and of the two, Rocket Lab is the higher-quality file: real revenue, a real backlog, defence diversification.',
    invalidation:
      'Neutron flying on schedule at the end of 2026 and Golden Dome budget converting would rebuild the Rocket Lab case on fundamentals rather than belief. For ASTS the tangible floor is spectrum value, and 22.3% of the float is sold short — the convexity is real even where the cash-flow case is not.',
    horizon: 'Q2 prints for both on 10 August 2026. The reverse-DCF questions resolve over 2027–2030.',
    discountRate: '13.5% for RKLB, 14.0% for ASTS — deliberately below the 17.1% the observed beta of 2.63 would imply, on the view that beta converges toward 1 over ten years',
  },
  {
    id: 'IDEA-08',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MATERIALS',
    tickers: ['AUUA.V'],
    report: 'auua',
    title: 'ALUULA Composites: the width trade',
    thesis:
      'ALUULA fuses an ultra-high-molecular-weight polyethylene laminate in Victoria, British Columbia. Revenue nearly doubled last quarter, gross margin has held in the 40–45% band for six straight quarters, and the stock is up 271% in a year. Almost everything that happens next depends on 128 millimetres — the width the current line can produce.',
    entry:
      'The plant runs at 100% utilisation, so FY2026 lands between C$11.0m and C$12.2m regardless of demand; the scenarios only separate from FY2027, when the constraint stops being physical and becomes commercial. At the current 43% gross margin and a C$6.6m cost base, breakeven needs about C$15.3m of annual revenue — roughly 46% above the trailing twelve months, and about 25% above the Q2 print annualised.',
    invalidation:
      'Vancouver overhead arriving before Vancouver revenue: every dollar of added operating cost raises the breakeven revenue by more than two. Note the market structure too — about 12,000 shares a day, roughly C$45,000 of turnover, no analyst coverage, and no company guidance of any kind. Disclosed defence revenue is, and has always been, zero.',
    horizon: 'FY2027 is the first year the expansion can contribute.',
    discountRate: 'No DCF. The three cases are gross-margin assumptions — 40%, 43% and 45% — not discounted flows',
  },
]
