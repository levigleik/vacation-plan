'use client'

import { Calendar } from 'components/calendar'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import {
  CalendarDashboardProps,
  VacationWithDatesApiProps,
} from '@/app/(private)/(dashboard)/types'
import { useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getData } from '@/lib/functions.api'
import { startOfDay } from 'date-fns'
import { DayClickEventHandler } from 'react-day-picker'
import {
  parsedDateField,
  setDatesOnCalendar,
} from '@/app/(private)/(dashboard)/functions'

export const CalendarDashboard = ({ month }: CalendarDashboardProps) => {
  const {
    dateField,
    setDateField,
    setModalOpen,
    setDaySelected,
    setMonth,
    setDayEditId,
  } = useDashboardHook()

  const { data: dataGetVacation, isLoading: loadingGetVacation } = useQuery({
    queryKey: ['vacation-get'],
    queryFn: ({ signal }) =>
      getData<VacationWithDatesApiProps[]>({
        url: '/vacation',
        query: 'include.dates=true',
        signal,
      }),
  })

  useEffect(() => {
    if (dataGetVacation) {
      const dateFieldTemp = setDatesOnCalendar(dataGetVacation)
      console.log('****dateFieldTemp', dateFieldTemp)
      setDateField(dateFieldTemp)
    }
  }, [dataGetVacation, setDateField])

  const handleDayClick: DayClickEventHandler = (day) => {
    setDaySelected(startOfDay(day))
    setMonth(month)
    if (dataGetVacation) {
      const dayEditId = dataGetVacation.find((vacation) =>
        vacation.dates.find(
          (dateVacation) =>
            startOfDay(dateVacation.date).getTime() ===
            startOfDay(day).getTime(),
        ),
      )?.id
      if (dayEditId) setDayEditId(dayEditId)
    }
    setModalOpen(true)
  }

  useEffect(() => {
    console.log('setDeafett', dateField)
  }, [dateField])

  return (
    <Calendar
      disabled={
        // all days outside this month
        (date) => date.getMonth() !== month - 1
      }
      mode="multiple"
      month={new Date(2024, month, 0)}
      selected={dateField ? parsedDateField(dateField)?.[month - 1] : []}
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
