import { Meta, type StoryObj } from '@storybook/react'
import { CardSummary } from '@/app/(private)/(dashboard)/components/summary/card'
import mockVacation from '../../prisma/mock/vacation.json'
import mockUsers from '../../prisma/mock/user.json'

const mockData = mockVacation.map((vacation) => ({
  ...vacation,
  dates: vacation.dates.map((date) => ({
    date: new Date(date),
  })),
  users: mockUsers.filter(
    (user) =>
      // pick 3 random users
      Math.random() < 0.3,
  ),
}))

const meta = {
  title: 'Docs/CardSummary',
  component: CardSummary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    month: {
      control: {
        type: 'number',
        min: 1,
        max: 12,
      },
      description: 'The month to display, 1 = January, 2 = February, etc.',
    },
    data: { control: 'object' },
  },
  args: {
    month: 1,
    theme: 'light',
    data: mockData as any,
  },
} as Meta<typeof CardSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'light',
    month: 1,
    data: mockData as any,
  },
}
