import { Meta, type StoryObj } from '@storybook/react'
import { Calendar } from '@/app/(private)/(dashboard)/components/months/calendar'
import mockVacation from '../../prisma/mock/vacation.json'

const mockData = mockVacation.map((vacation) => ({
  ...vacation,
  dates: vacation.dates.map((date) => ({
    date: new Date(date),
  })),
}))

const meta = {
  title: 'Docs/Calendar',
  component: Calendar,
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
    theme: {
      description: 'The theme of the calendar',
    },
  },
  args: {
    month: 1,
    theme: 'light',
    data: mockData.slice(0, 4) as any,
    daysSelected: { month: 1, days: ['2024-01-15T05:00:00.000Z' as any] },
  },
} as Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    month: 1,
    theme: 'dark',
    data: mockData.slice(0, 4) as any,
  },
}
