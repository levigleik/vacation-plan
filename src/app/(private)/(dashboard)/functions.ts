import {
  DateCalendarProps,
  VacationWithDatesApiProps,
} from '@/app/(private)/(dashboard)/types'
import { startOfDay } from 'date-fns'

export const setDatesOnCalendar = (datesApi?: VacationWithDatesApiProps[]) => {
  if (!datesApi) return {}
  const datesParsed = datesApi.map((vacation) => ({
    id: vacation.id,
    dates: vacation.dates.map((date) => startOfDay(date.date)),
  }))

  // console.log(datesParsed, 'datesParsed')

  return datesParsed.reduce(
    (acc, item) => {
      item.dates.forEach((date) => {
        const month = date.getMonth()
        if (!acc[month]) {
          acc[month] = []
        }
        acc[month].push({ id: item.id, date })
      })
      return acc
    },
    {} as Record<number, DateCalendarProps[]>,
  )
}
