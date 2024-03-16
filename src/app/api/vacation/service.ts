import { prisma } from '@/app/api/prisma/prisma.config'
import { CreateVacationDTO } from '@/app/api/vacation/dto/createVacation'
import { Prisma, Vacation } from '@prisma/client'
import { dateVacationService } from '@/app/api/dateVacation/service'

async function findOne(
  args: Prisma.VacationFindUniqueArgs,
): Promise<Vacation | null> {
  return prisma.vacation.findUnique(args)
}
async function find(args: Prisma.VacationFindManyArgs): Promise<Vacation[]> {
  return prisma.vacation.findMany(args)
}
async function create(data: CreateVacationDTO): Promise<Vacation> {
  return prisma.vacation.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      dates: {
        createMany: {
          data: data.dates.map((date) => ({ date })),
        },
      },
      users: {
        connect: data.userIds.map((id) => ({ id })),
      },
    },
  })
}
async function update({
  data,
  ...remaining
}: Prisma.VacationUpdateArgs): Promise<Vacation> {
  return prisma.vacation.update({ ...remaining, data })
}

export const deleteOne = async (id: number) => {
  const datesFound = await prisma.dateVacation.findMany({
    where: { vacationId: id },
  })

  await Promise.all(
    datesFound.map((date) => dateVacationService.deleteOne(date.id)),
  )

  return prisma.vacation.delete({ where: { id } })
}

export const vacationService = {
  findOne,
  find,
  create,
  update,
  deleteOne,
}
