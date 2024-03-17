import { BodyMonthDashboard } from '@/app/(private)/(dashboard)/components/months/body'
import { HeaderMonthDashboard } from '@/app/(private)/(dashboard)/components/months/header'

export const MonthDashboard = () => {
  return (
    <div className="flex max-w-[1000px] flex-col gap-3 py-4">
      <HeaderMonthDashboard />
      <BodyMonthDashboard />
    </div>
  )
}
