'use client'

import { Calendar as CalendarUI } from '@/components/calendar'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { DashboardProps } from '@/app/(private)/(dashboard)/types'
import { CSSProperties, useEffect, useMemo } from 'react'
import { format, isSameDay, isSameMonth } from 'date-fns'
import { setDatesOnCalendar } from '@/app/(private)/(dashboard)/functions'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'
import { createColorDateMap } from '@/app/(private)/(dashboard)/components/months/utils'
import { useDayClick } from '@/app/(private)/(dashboard)/components/months/calendar/hooks/useDayClick'

export const Calendar = ({ month, data, theme }: DashboardProps) => {
  const { dateField, setDateField, dataGetVacation } = useDashboardHook()

  const { daysSelected } = useDashboardMonthHook()

  useEffect(() => {
    if (dataGetVacation) {
      const dateFieldTemp = setDatesOnCalendar(dataGetVacation)
      setDateField(dateFieldTemp)
    }
  }, [dataGetVacation, setDateField])

  const handleDayClick = useDayClick(month)

  const daysApi = useMemo(
    () =>
      Object.values(dateField ?? [])
        .map((value) => value.map(({ date }) => date))
        .flat(),

    [dateField],
  )

  const colorDateMap = createColorDateMap(data ? data : dataGetVacation ?? [])

  const modifiersStyles = Object.keys(colorDateMap).reduce(
    (styles, color) => {
      styles[color] = { backgroundColor: color }
      return styles
    },
    {} as Record<string, CSSProperties>,
  )

  return (
    <div
      className={`rounded-large
          ${theme === 'dark' ? 'bg-black text-white' : ''}`}
    >
      <CalendarUI
        disabled={(date) => {
          // all days in api  only if daysSelected is not empty
          const api = daysApi.find((day) => isSameDay(day, date))
          const daysSelectedMonth = daysSelected?.days?.filter((day) =>
            isSameMonth(day, date),
          )
          return !!api && !!daysSelectedMonth?.length
        }}
        mode="multiple"
        month={new Date(2024, month, 0)}
        selected={[...daysApi, ...(daysSelected?.days ?? [])]}
        modifiers={colorDateMap}
        modifiersStyles={modifiersStyles}
        onDayClick={handleDayClick}
        components={{
          Caption: () =>
            data ? (
              <h2 className="text-center text-2xl font-bold">
                {format(new Date(2024, month, 0), 'MMMM')}
              </h2>
            ) : null,
        }}
        className="mx-auto h-full"
        classNames={{
          day: 'w-10 h-10',
          head_cell: 'w-10 h-10',
        }}
      />
    </div>
  )
}
