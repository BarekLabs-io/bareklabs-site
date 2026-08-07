import { Navigate, useParams } from 'react-router'
import { ReportFrame } from '@/components/ReportFrame'
import { ideaReport } from '@/data/ideaReports'

/* One route for every idea report, rather than a page file each: the reports
 * differ only by which file they frame, and a slug that matches nothing is a
 * mistyped URL, which belongs back on the Ideas index rather than on an empty
 * frame. */
export default function IdeaReportPage() {
  const { slug } = useParams()
  const report = ideaReport(slug)
  if (!report) return <Navigate to="/analysis/ideas" replace />
  return <ReportFrame src={report.src} title={report.title} />
}
