import { ReportFrame } from '@/components/ReportFrame'
import { useLang } from '@/i18n/LanguageContext'

/* Unlike the other embedded reports, this one ships as two separate
 * single-language documents rather than one file with a built-in toggle —
 * so the language choice happens here, at the src. Arabic readers get the
 * English edition; there is no Arabic version of this report. */
export default function Oracle() {
  const { lang } = useLang()
  const edition = lang === 'fr' ? 'fr' : 'en'

  return (
    <ReportFrame
      reloadKey={edition}
      src={`/research/oracle/index.${edition}.html`}
      title="Oracle deep dive — BAREK LABS"
    />
  )
}
