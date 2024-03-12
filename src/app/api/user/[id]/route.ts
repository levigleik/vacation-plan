import { userService } from '@/app/api/user/service'
import { NextResponse } from 'next/server'
import { getQuery } from '@/lib/query'
import { ContextApiProps } from '@/types/api'

export async function GET(req: Request, context: ContextApiProps) {
  const id = Number(context.params?.id)
  if (!id) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 },
    )
  }
  const user = await userService.findOne({ where: { id } })
  if (!user) {
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 400 },
    )
  }
  return NextResponse.json(user, { status: 201 })
}

export async function PUT(req: Request, context: ContextApiProps) {
  try {
    const body = await req.json()

    const id = Number(context.params?.id)
    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 },
      )
    }
    const user = await userService.findOne({ where: { id } })
    if (!user) {
      return NextResponse.json(
        { message: 'User does not exist' },
        { status: 400 },
      )
    }
    const updatedUser = await userService.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updatedUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Any data is required to update an user' },
      { status: 400 },
    )
  }
}
