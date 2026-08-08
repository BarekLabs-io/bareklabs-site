/* Screener tickers assigned to constellation stages, beyond the hand-curated
 * headline names in the i18n dicts. Keys are the nine StageKeys. A ticker
 * placed here must exist in companies.ts or it is skipped at merge time.
 *
 * Placement answers "who pays whom": a stage sells INTO the next stage. A
 * cooling vendor is not an energy company, a builder is not a utility, and a
 * memory maker is not a network — that conflation is what this file fixes. */
export const CHAIN_EXTRA: Record<string, string[]> = {
  ENERGY: ['BE', 'FCEL'],
  ELECTRIF: ['WOLF', 'NVTS', 'IFX.DE'],
  BUILD: ['MTZ'],
  FABTOOLS: [
    'LRCX', 'KLAC', '8035.T', '6857.T', 'ASM.AS', '6622.T', 'VACN.SW', 'MYCR.ST',
    'AEHR', 'FORM', 'CAMT', 'TPRO.MI', 'ATEYY', '6146.T', 'SMHN.DE', 'BESI.AS', '042700.KS',
  ],
  FOUNDRY: [
    '600961.SS', 'AXTI', '2383.TW', '3037.TW', 'TTMI', 'ATS.VI', '4004.T', '2802.T',
    '5706.T', '300476.SZ', '301377.SZ', '6278.T', '6981.T', 'AMKR',
  ],
  MEMORY: ['RMBS', 'WDC', 'SIMO', '2408.TW', '2344.TW', '2337.TW', '603986.SS', '8299.TWO', '6770.TW'],
  LINK: ['MRVL', 'ALAB', 'CIEN', 'AAOI', 'FN', 'LITE', 'SIVE.ST'],
  // INTC is deliberately absent: the dossier places it under Foundries, which
  // is the AI-relevant story — 18A capacity, not its own accelerators.
  COMPUTE: ['NBIS', 'CRWV', 'IREN', 'WYFI', 'HIVE', 'PENG', 'DGXX', '2454.TW'],
  STACK: ['AMZN'],
}
