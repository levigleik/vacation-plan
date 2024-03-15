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

  console.log(datesParsed)
  const datesReturn = datesParsed.reduce(
    (acc, date) => {
      const month = date.dates[0]?.getMonth() + 1
      if (!acc[month]) acc[month] = []
      else {
        date.dates.forEach((d) => {
          acc[month].push({ id: date.id, date: d })
        })
      }
      return acc
    },
    {} as Record<number, DateCalendarProps[]>,
  )
  // put it into an object with the month as key
  console.log('datesReturn--', datesReturn)
  return datesReturn
}
export const parsedDateField = (
  dateField?: Record<number, DateCalendarProps[]>,
) => {
  if (!dateField) return {}
  // make the dates flat
  const dates = Object.values(dateField)
    .map((a) => a.map((b) => b.date).flat())
    .flat()

  console.log('parsedDateField--', dateField)
  // put it into an object with the month as key
  return dates.reduce(
    (acc, date) => {
      const month = date.getMonth()
      if (!acc[month]) acc[month] = []
      else {
        acc[month].push(date)
      }
      return acc
    },
    {} as Record<number, Date[]>,
  )
}

// export const getIdByDay = (
//   day: Date,
//   datesApi: VacationWithDatesApiProps[],
// ) => {
//   const date = startOfDay(day)
//   return datesApi.find((vacation) =>
//     vacation.dates.find((dateVacation) => {
//       return startOfDay(dateVacation.date).getTime() === date.getTime()
//     }),
//   )?.id
// }
