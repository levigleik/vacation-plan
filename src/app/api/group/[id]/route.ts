import { groupService } from '@/app/api/group/service'
import { NextResponse } from 'next/server'
import { getQuery } from '@/lib/query'
import { ContextApiProps } from '@/types/api'

export async function GET(req: Request, context: ContextApiProps) {
  const id = Number(context.params?.id)
  if (!id) {
    return NextResponse.json(
      { message: 'Group ID is required' },
      { status: 400 },
    )
  }
  const group = await groupService.findOne({
    ...getQuery(req),
    where: { id },
  })
  if (!group) {
    return NextResponse.json(
      { message: 'Group does not exist' },
      { status: 400 },
    )
  }
  return NextResponse.json(group, { status: 201 })
}

export async function PUT(req: Request, context: ContextApiProps) {
  try {
    const body = await req.json()

    const id = Number(context.params?.id)
    if (!id) {
      return NextResponse.json(
        { message: 'Group ID is required' },
        { status: 400 },
      )
    }
    const group = await groupService.findOne({ where: { id } })
    if (!group) {
      return NextResponse.json(
        { message: 'Group does not exist' },
        { status: 400 },
      )
    }
    const updatedGroup = await groupService.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updatedGroup, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Any data is required to update an group' },
      { status: 400 },
    )
  }
}
export async function DELETE(req: Request, context: ContextApiProps) {
  const id = Number(context.params?.id)
  if (!id) {
    return NextResponse.json(
      { message: 'Group ID is required' },
      { status: 400 },
    )
  }
  const user = await groupService.findOne({ where: { id } })
  if (!user) {
    return NextResponse.json(
      { message: 'Group does not exist' },
      { status: 400 },
    )
  }
  await groupService.deleteOne(id)

  return NextResponse.json({ message: 'Group deleted' }, { status: 201 })
}
