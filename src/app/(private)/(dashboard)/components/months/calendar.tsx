'use client'

import { Calendar as CalendarUI } from 'components/calendar'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { DashboardProps } from '@/app/(private)/(dashboard)/types'
import { useEffect, useMemo } from 'react'
import { isSameDay, isSameMonth, startOfDay } from 'date-fns'
import { DayClickEventHandler } from 'react-day-picker'
import { setDatesOnCalendar } from '@/app/(private)/(dashboard)/functions'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'
// const bookedDays = [new Date(2024, 5, 10), new Date(2024, 5, 9)]
// const bookedStyle = { border: '2px solid currentColor' }

export const Calendar = ({ month }: DashboardProps) => {
  const { dateField, setDateField, dataGetVacation } = useDashboardHook()

  const {
    setModalVacationOpen,
    daysSelected,
    setDaysSelected,
    setMonth,
    setDayEditId,
  } = useDashboardMonthHook()

  useEffect(() => {
    if (dataGetVacation) {
      const dateFieldTemp = setDatesOnCalendar(dataGetVacation)
      setDateField(dateFieldTemp)
    }
  }, [dataGetVacation, setDateField])

  useEffect(() => {
    console.log('daysSelected', daysSelected)
  }, [daysSelected])

  const handleDayClick: DayClickEventHandler = (day) => {
    // Only find the matching vacation if daysSelected is empty
    const matchingVacation = !daysSelected?.length
      ? dataGetVacation?.find((vacation) =>
          vacation.dates.some((dateVacation) =>
            isSameDay(dateVacation.date, day),
          ),
        )
      : undefined
    setMonth(month)
    if (matchingVacation) {
      // If a matching vacation is found, open the modal and set the day and month
      setModalVacationOpen(true)
      setDayEditId(matchingVacation.id ?? 0)
    } else {
      // If no matching vacation is found, update the selected days
      const isDayAlreadySelected = daysSelected?.some((daySelected) =>
        isSameDay(daySelected, day),
      )
      if (isDayAlreadySelected) {
        // If the day is already selected, remove it from the selection
        setDaysSelected(
          daysSelected?.filter((daySelected) => !isSameDay(daySelected, day)) ??
            [],
        )
      } else {
        // If the day is not selected, add it to the selection
        setDaysSelected([...(daysSelected ?? []), startOfDay(day)])
      }
    }
  }

  const daysApi = useMemo(
    () =>
      Object.values(dateField ?? [])
        .map((value) => value.map(({ date }) => date))
        .flat(),

    [dateField],
  )

  return (
    <CalendarUI
      disabled={(date) => {
        // all days outside this month
        const outside = date.getMonth() !== month - 1
        // all days in api  only if daysSelected is not empty
        const api = daysApi
          // .filter((dateApi) => month - 1 === dateApi.getMonth())
          .find((day) => isSameDay(day, date))
        const daysSelectedMonth = daysSelected?.filter((day) =>
          isSameMonth(day, date),
        )
        return (!!api && !!daysSelectedMonth?.length) || outside
      }}
      mode="multiple"
      month={new Date(2024, month, 0)}
      selected={[...daysApi, ...(daysSelected ?? [])]}
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
