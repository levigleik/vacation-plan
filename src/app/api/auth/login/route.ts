import { userService } from '@/app/api/user/service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
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
  if (!user) {
    return NextResponse.json(
      { message: 'User does not exist' },
      { status: 400 },
    )
  }
  // check if password is correct using bcrypt
  const passwordMatch = userService.comparePassword(
    body.password,
    user.password,
  )
  if (!passwordMatch) {
    return NextResponse.json(
      { message: 'Password is incorrect' },
      { status: 400 },
    )
  }
  // if user exists and password is correct, return user
  return NextResponse.json(user, { status: 200 })
}
