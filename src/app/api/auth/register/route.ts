import { NextResponse } from 'next/server'
import { userService } from '@/app/api/user/service'

export async function POST(req: Request) {
  // register user
  const body = await req.json()
  // check if email and password are provided
  if (!body.email || !body.password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      {
        status: 400,
      },
    )
  }
  // check if user exists
  const user = await userService.findOne({ where: { email: body.email } })
  if (user) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 },
    )
  }
  // create new user
  const password = await userService.hashPassword(body.password)
  const newUser = await userService.createUser({
    ...body,
    password,
  })
  return NextResponse.json(newUser, { status: 201 })
}
