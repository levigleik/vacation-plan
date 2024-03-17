import { months } from '@/app/(private)/(dashboard)/constants'
import { CardSummary } from '@/app/(private)/(dashboard)/components/summary/card'

export const BodySummaryDashboard = () =>
  months.map((month) => (
    <div key={month} className="min-h-[100px] w-full">
      <CardSummary month={month} />
    </div>
  ))
