import { prisma } from '@/app/api/prisma/prisma.config'
import { DateVacation, Prisma, Vacation } from '@prisma/client'

async function find(
  args: Prisma.DateVacationFindManyArgs,
): Promise<DateVacation[]> {
  return prisma.dateVacation.findMany(args)
}
async function update({
  data,
  ...remaining
}: Prisma.DateVacationUpdateArgs): Promise<DateVacation> {
  return prisma.dateVacation.update({ ...remaining, data })
}

export const deleteOne = async (id: number) => {
  return prisma.dateVacation.delete({ where: { id } })
}

export const dateVacationService = {
  find,
  update,
  deleteOne,
}
