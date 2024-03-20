'use client'

import { DayClickEventHandler } from 'react-day-picker'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'
import { isSameDay, startOfDay } from 'date-fns'

export const useDayClick = (month: number): DayClickEventHandler => {
  const { dataGetVacation } = useDashboardHook()
  const {
    setModalVacationOpen,
    daysSelected,
    setDaysSelected,
    setMonth,
    setDayEditId,
  } = useDashboardMonthHook()

  return (day) => {
    const matchingVacation = !daysSelected?.days?.length
      ? dataGetVacation?.find((vacation) =>
          vacation.dates.some((dateVacation) =>
            isSameDay(dateVacation.date, day),
          ),
        )
      : undefined
    setMonth(month)
    if (matchingVacation) {
      setModalVacationOpen(true)
      setDayEditId(matchingVacation.id ?? 0)
    } else {
      const isDayAlreadySelected = daysSelected?.days?.some((daySelected) =>
        isSameDay(daySelected, day),
      )
      if (isDayAlreadySelected) {
        setDaysSelected({
          month,
          days:
            daysSelected?.days?.filter(
              (daySelected) => !isSameDay(daySelected, day),
            ) ?? [],
        })
      } else {
        setDaysSelected({
          month,
          days: [...(daysSelected?.days ?? []), startOfDay(day)],
        })
      }
    }
  }
}
