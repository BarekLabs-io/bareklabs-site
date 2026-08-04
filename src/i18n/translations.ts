/* BAREK LABS — trilingual dictionary (EN / FR / AR)
 * Every t.* key consumed by pages/components lives here. Shapes must stay
 * identical across languages (enforced by `Dict = typeof en` + annotations).
 * Data literals (status, tone, side, tickers, dates, prices) are NOT
 * translated — they are records, not prose.
 *
 * Dictionaries live in dict-en.ts / dict-fr.ts / dict-ar.ts (split for
 * git-transport size); this module re-exports the shared types and the
 * combined `translations` map consumed by LanguageContext and Layout.
 */

import { en } from './dict-en'
import { fr } from './dict-fr'
import { ar } from './dict-ar'

export type Lang = 'en' | 'fr' | 'ar'

export const LANG_META: { id: Lang; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'fr', label: 'Français', short: 'FR' },
  { id: 'ar', label: 'العربية', short: 'AR' },
]

export type Dict = typeof en

export const translations: Record<Lang, Dict> = { en, fr, ar }
