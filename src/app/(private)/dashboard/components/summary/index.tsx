import { BodySummaryDashboard } from '@/app/(private)/dashboard/components/summary/body'
import { HeaderSummaryDashboard } from '@/app/(private)/dashboard/components/summary/header'

export const SummaryDashboard = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-6">
      <HeaderSummaryDashboard />
      <BodySummaryDashboard />
    </div>
  )
}
