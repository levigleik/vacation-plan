import { prisma } from '@/app/api/prisma/prisma.config'
import { CreateVacationDTO } from '@/app/api/vacation/dto/createVacation'
import { Prisma, Vacation } from '@prisma/client'

async function findOne(
  args: Prisma.VacationFindUniqueArgs,
): Promise<Vacation | null> {
  return prisma.vacation.findUnique(args)
}

async function findFirst(
  args: Prisma.VacationFindFirstArgs,
): Promise<Vacation | null> {
  return prisma.vacation.findFirst(args)
}

async function find(args: Prisma.VacationFindManyArgs): Promise<Vacation[]> {
  return prisma.vacation.findMany(args)
}

async function checkDatesInDB(dates: string[]) {
  const datesInDb = await prisma.dateVacation.findMany({
    where: {
      date: {
        in: dates,
      },
    },
  })
  return datesInDb.length > 0
}
async function allDatesInDB() {
  return prisma.dateVacation.findMany()
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
  return prisma.vacation.delete({ where: { id } })
}

export const vacationService = {
  findOne,
  findFirst,
  allDatesInDB,
  find,
  create,
  update,
  deleteOne,
}
