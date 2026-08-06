import { ReportFrame } from '@/components/ReportFrame'
import { useLang } from '@/i18n/LanguageContext'

/* The report is a self-contained bilingual (FR/EN) HTML document served from
 * public/, embedded rather than ported to JSX. Pass the site's current
 * language through so it opens in the language the visitor is reading in;
 * the document itself defaults to FR and ignores anything it doesn't know
 * (it has no Arabic edition, so AR readers get the English one). */
export default function GlobalPayments() {
  const { lang } = useLang()
  const reportLang = lang === 'fr' ? 'fr' : 'en'

  return (
    <ReportFrame
      reloadKey={reportLang}
      src={`/research/global-payments/index.html?lang=${reportLang}`}
      title="The Invisible Toll — The Global Payments Ecosystem"
    />
  )
}
