import { ModalVacationDashboard } from './components/months/modal'
import { ModalFilterDashboard } from './components/summary/modal'
import { SummaryDashboard } from '@/app/(private)/(dashboard)/components/summary'
import { MonthDashboard } from '@/app/(private)/(dashboard)/components/months'

export default function Home() {
  return (
    <div className="flex flex-wrap 2xl:flex-nowrap">
      <MonthDashboard />
      <ModalVacationDashboard />
      <ModalFilterDashboard />
      <SummaryDashboard />
    </div>
  )
}
