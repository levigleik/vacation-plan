import { format } from 'date-fns'

import { Calendar } from './components/months/calendar'
import { ModalVacationDashboard } from './components/months/modal'
import { months } from './constants'
import { ModalFilterDashboard } from './components/summary/modal'
import { SummaryDashboard } from '@/app/(private)/(dashboard)/components/summary'

export default function Home() {
  return (
    <div className="flex flex-wrap 2xl:flex-nowrap">
      <div className="flex max-w-[1000px] flex-col gap-3 py-4">
        <div className="flex w-full justify-between pl-4">
          <h1 className="text-2xl font-bold">2024</h1>
        </div>
        <div className="mt-5 flex flex-wrap justify-around gap-y-4">
          {months.map((month) => (
            <div
              key={month}
              className="flex max-h-[490px] flex-col rounded-large border py-4 transition-all"
            >
              <h2 className="text-center text-2xl font-bold">
                {format(new Date(2024, month, 0), 'MMMM')}
              </h2>
              <Calendar month={month} />
            </div>
          ))}
        </div>
      </div>
      <ModalVacationDashboard />
      <ModalFilterDashboard />
      <SummaryDashboard />
    </div>
  )
}
