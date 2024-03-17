import { VacationWithDatesApiProps } from '@/app/(private)/(dashboard)/types'

const colors = [
  '#001959',
  '#002073',
  '#002c7f',
  '#00136e',
  '#003c71',
  '#002259',
  '#003971',
  '#003553',
  '#00387f',
  '#001161',
  '#003877',
  '#021375',
  '#001268',
  '#003a5d',
  '#001379',
  '#003752',
  '#033452',
  '#001a63',
  '#00106c',
  '#003370',
  '#07335c',
  '#012483',
  '#09356c',
  '#06205a',
  '#002367',
  '#000f80',
  '#003555',
  '#060f5a',
  '#002a53',
  '#002d5e',
  '#004058',
]
export function createColorDateMap(
  vacations: VacationWithDatesApiProps[],
): Record<string, Date[]> {
  const colorDateMap: Record<string, Date[]> = {}

  vacations.forEach((vacation) => {
    const color = colors[vacation.id % colors.length] // Use the id to select a color
    colorDateMap[color] = vacation.dates.map(
      (dateVacation) => new Date(dateVacation.date),
    )
  })

  return colorDateMap
}
