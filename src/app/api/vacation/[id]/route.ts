import { vacationService } from '@/app/api/vacation/service'
import { NextResponse } from 'next/server'
import { getQuery } from '@/lib/query'
import { ContextApiProps } from '@/types/api'
import bcrypt from 'bcrypt'

export async function GET(req: Request, context: ContextApiProps) {
  const id = Number(context.params?.id)
  if (!id) {
    return NextResponse.json(
      { message: 'Vacation ID is required' },
      { status: 400 },
    )
  }
  const vacation = await vacationService.findOne({
    ...getQuery(req),
    where: { id },
  })
  if (!vacation) {
    return NextResponse.json(
      { message: 'Vacation does not exist' },
      { status: 400 },
    )
  }
  return NextResponse.json(vacation, { status: 201 })
}

export async function PUT(req: Request, context: ContextApiProps) {
  try {
    const body = await req.json()

    const id = Number(context.params?.id)
    if (!id) {
      return NextResponse.json(
        { message: 'Vacation ID is required' },
        { status: 400 },
      )
    }
    const vacation = await vacationService.findOne({ where: { id } })
    if (!vacation) {
      return NextResponse.json(
        { message: 'Vacation does not exist' },
        { status: 400 },
      )
    }
    if (!body.dates)
      return NextResponse.json(
        { message: 'Dates are required' },
        { status: 400 },
      )

    const updatedVacation = await vacationService.update({
      where: { id },
      data: {
        title: body.title,
        users: {
          connect: body.userIds.map((id: number) => ({ id })),
        },
        description: body.description,
        location: body.location,
      },
    })

    return NextResponse.json(updatedVacation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal error' }, { status: 400 })
  }
}

export async function DELETE(req: Request, context: ContextApiProps) {
  const id = Number(context.params?.id)
  if (!id) {
    return NextResponse.json(
      { message: 'Vacation ID is required' },
      { status: 400 },
    )
  }
  const vacation = await vacationService.findOne({ where: { id } })
  if (!vacation) {
    return NextResponse.json(
      { message: 'Vacation does not exist' },
      { status: 400 },
    )
  }
  await vacationService.deleteOne(id)

  return NextResponse.json({ message: 'Vacation deleted' }, { status: 201 })
}
