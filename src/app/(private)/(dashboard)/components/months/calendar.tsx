'use client'

import { Calendar as CalendarUI } from 'components/calendar'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { DashboardProps } from '@/app/(private)/(dashboard)/types'
import { useEffect } from 'react'
import { startOfDay } from 'date-fns'
import { DayClickEventHandler } from 'react-day-picker'
import { setDatesOnCalendar } from '@/app/(private)/(dashboard)/functions'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'
// const bookedDays = [new Date(2024, 5, 10), new Date(2024, 5, 9)]
// const bookedStyle = { border: '2px solid currentColor' }

export const Calendar = ({ month }: DashboardProps) => {
  const { dateField, setDateField, dataGetVacation } = useDashboardHook()

  const { setModalVacationOpen, setDaySelected, setMonth, setDayEditId } =
    useDashboardMonthHook()

  useEffect(() => {
    if (dataGetVacation) {
      const dateFieldTemp = setDatesOnCalendar(dataGetVacation)
      setDateField(dateFieldTemp)
    }
  }, [dataGetVacation, setDateField])

  const handleDayClick: DayClickEventHandler = (day) => {
    setDaySelected(startOfDay(day))
    setMonth(month)
    const dayEditId = dataGetVacation?.find((vacation) =>
      vacation.dates.find(
        (dateVacation) =>
          startOfDay(dateVacation.date).getTime() === startOfDay(day).getTime(),
      ),
    )?.id
    setDayEditId(dayEditId ?? 0)
    console.log(dataGetVacation, 'dataGetVacation')
    console.log(dayEditId, 'dayEditId')
    setModalVacationOpen(true)
  }

  return (
    <CalendarUI
      disabled={
        // all days outside this month
        (date) => date.getMonth() !== month - 1
      }
      mode="multiple"
      month={new Date(2024, month, 0)}
      selected={
        dateField
          ? Object.values(dateField)
              .map((value) => value.map(({ date }) => date))
              .flat()
          : []
      }
      // modifiers={{ booked: bookedDays }}
      // modifiersStyles={{ booked: bookedStyle }}
      onDayClick={handleDayClick}
      components={{
        Caption: () => null,
      }}
      className="mx-auto h-full"
      classNames={{
        day: 'w-10 h-10',
        head_cell: 'w-10 h-10',
      }}
    />
  )
}
