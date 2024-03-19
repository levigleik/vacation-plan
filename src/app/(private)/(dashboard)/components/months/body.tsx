'use client'
import { months } from '@/app/(private)/(dashboard)/constants'
import { format } from 'date-fns'
import { Calendar } from '@/app/(private)/(dashboard)/components/months/calendar'
import { Button } from '@nextui-org/react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'

export const BodyMonthDashboard = () => {
  const { setModalVacationOpen, daysSelected, setDaysSelected } =
    useDashboardMonthHook()

  return (
    <div className="mt-5 flex flex-wrap justify-around gap-y-4">
      {months.map((month) => {
        const daysSelectedMonth =
          daysSelected?.month === month ? daysSelected?.days : undefined
        return (
          <div
            key={month}
            className="flex max-h-[490px] flex-col rounded-large border py-4 transition-all"
          >
            <h2 className="text-center text-2xl font-bold">
              {format(new Date(2024, month, 0), 'MMMM')}
            </h2>
            <Calendar month={month} />
            {!!daysSelectedMonth?.length && (
              <div className="flex justify-between px-4">
                <Button
                  isIconOnly
                  variant="light"
                  className="w-fit rounded-full"
                  onClick={() => {
                    setDaysSelected(undefined)
                  }}
                >
                  <FaTimes className="text-danger-300" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  className="w-fit rounded-full"
                  onClick={() => {
                    // setMonth(month)
                    setModalVacationOpen(true)
                  }}
                >
                  <FaCheck className="text-green-300" />
                </Button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
