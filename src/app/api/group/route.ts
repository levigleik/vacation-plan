import { groupService } from './service'
import { NextResponse } from 'next/server'
import { getQuery } from '@/lib/query'

export async function GET(req: Request) {
  const query = getQuery(req)
  const groups = await groupService.find(query)
  return NextResponse.json(groups, { status: 200 })
}

export async function POST(req: Request) {
  // register group
  try {
    const body = await req.json()
    if (!body.userIds?.length) {
      return NextResponse.json(
        { message: 'UserIds is required' },
        { status: 400 },
      )
    }
    if (!body.name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 })
    }

    const group = await groupService.create(body)

    return NextResponse.json(group, { status: 201 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 400 },
    )
  }
}
