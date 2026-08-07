/* Extra AI Value Chain constellation nodes, layered on top of the hand-curated
 * headline names in the i18n dict. Pulled from the same roster the Screener
 * covers (src/data/companies.ts) so every ticker here has a real deep-dive
 * page and the geographic spread (Japan, Korea, Taiwan, Netherlands, China…)
 * actually matches what the site covers — not just US mega-caps. */
export const CHAIN_EXTRA: Record<string, string[]> = {
  ENERGY: ['STRL', 'BE', 'WOLF', 'NVTS', 'FCEL'],
  FAB: ['LRCX', 'KLAC', '8035.T', '6857.T', 'ASM.AS', '2383.TW', '600961.SS'],
  LINK: ['000660.KS', 'RMBS', 'MRVL', 'CRDO', 'ALAB', 'BESI.AS', '042700.KS', '6146.T'],
  COMPUTE: ['NBIS', 'CRWV', 'IREN', 'WYFI', 'HIVE', 'PENG'],
  STACK: [],
}
