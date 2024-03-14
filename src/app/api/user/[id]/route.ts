import { userService } from '@/app/api/user/service'
import { NextResponse } from 'next/server'
import { getQuery } from '@/lib/query'
import { ContextApiProps } from '@/types/api'
import bcrypt from 'bcrypt'

export async function GET(req: Request, context: ContextApiProps) {
  const id = Number(context.params?.id)
  if (!id) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 },
    )
  }
  const user = await userService.findOne({ ...getQuery(req), where: { id } })
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
    if (body.password) {
      if (body.password.length < 6) {
        return NextResponse.json(
          { message: 'Password must have at least 6 characters' },
          { status: 400 },
        )
      }
      const isPasswordValid = bcrypt.compareSync(body.password, user.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Current password is not valid' },
          { status: 400 },
        )
      }
      body.password = bcrypt.hashSync(body.password, 10)
    }

    const updatedUser = await userService.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        photo: body.photo,
        password: body.password,
      },
    })

    return NextResponse.json(updatedUser, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal error' }, { status: 400 })
  }
}

export async function DELETE(req: Request, context: ContextApiProps) {
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
  await userService.deleteOne(id)

  return NextResponse.json({ message: 'User deleted' }, { status: 201 })
}
