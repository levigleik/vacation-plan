import { vacationService } from '@/app/api/vacation/service'
import { NextResponse } from 'next/server'
import { getQuery } from '@/lib/query'
import { FormVacationProps } from '@/app/(private)/(dashboard)/types'
import { CreateVacationDTO } from '@/app/api/vacation/dto/createVacation'

export async function GET(req: Request) {
  const query = getQuery(req)
  const vacations = await vacationService.find(query)
  return NextResponse.json(vacations, { status: 200 })
}

export async function POST(req: Request) {
  // register vacation
  try {
    const body = (await req.json()) as CreateVacationDTO
    if (!body.dates)
      return NextResponse.json(
        { message: 'Dates are required' },
        { status: 400 },
      )
    if (!body.title)
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 },
      )
    if (!body.userIds)
      return NextResponse.json(
        { message: 'Users are required' },
        { status: 400 },
      )

    const datesDB = (await vacationService.allDatesInDB()).map(({ date }) =>
      date.toISOString(),
    )

    const datesNotInDB = body.dates.filter((date) => !datesDB.includes(date))

    const newVacation = await vacationService.create({
      ...body,
      dates: datesNotInDB,
    })
    return NextResponse.json(newVacation, { status: 201 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(JSON.stringify(e), { status: 400 })
  }
}
