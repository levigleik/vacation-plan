'use client'
import { months } from '@/app/(private)/(dashboard)/constants'
import { CardSummary } from '@/app/(private)/(dashboard)/components/summary/card'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'

export const BodySummaryDashboard = () => {
  const { dataGetVacation, loadingGetVacation } = useDashboardHook()

  return months.map((month) => (
    <div key={month} className="min-h-[100px] w-full">
      <CardSummary
        data={dataGetVacation}
        month={month}
        loading={loadingGetVacation}
      />
    </div>
  ))
}
