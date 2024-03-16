const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const mockVacation = require('./mock/vacation.json')
const mockUser = require('./mock/user.json')
const prisma = new PrismaClient()

async function main() {
  // All randomly generated photos were hand picked
  // from the authorized section of UI Faces.
  // Please visit UI Faces FAQ for more information regarding how
  // you can use these faces.
  // https://web.archive.org/web/20160811185628/http://uifaces.com/faq

  const users = await Promise.all(
    mockUser.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      return prisma.user.create({
        data: { ...user, password: hashedPassword },
      })
    }),
  )
  console.log('Users created:')
  const vacations = await Promise.all(
    mockVacation.map(async (vacation) =>
      prisma.vacation.create({
        data: {
          title: vacation.title,
          users: { connect: vacation.userIds.map((id) => ({ id })) },
          description: vacation.description,
          location: vacation.location,
          dates: {
            createMany: {
              data: vacation.dates.map((date) => ({ date })),
            },
          },
        },
      }),
    ),
  )
  console.log('Vacations created:')
}
// create a seed with mock Vacation data
main()
