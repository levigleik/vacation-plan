import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { userService } from '@/app/api/user/service'
import bcrypt from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query, body } = req

  switch (method) {
    case 'GET':
      const users = await userService.find({ where: { id: Number(query.id) } })
      res.status(200).json(users)
      break
    case 'POST':
      const newUser = await userService.createUser(body)
      res.status(201).json(newUser)
      break
    case 'PUT':
      const updatedUser = await userService.update({
        where: { id: Number(body.id) },
        data: body,
      })
      res.status(200).json(updatedUser)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
