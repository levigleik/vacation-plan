import { Meta, type StoryObj } from '@storybook/react'
import { Calendar } from '@/app/(private)/(dashboard)/components/months/calendar'
import mockVacation from '../../prisma/mock/vacation.json'

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
  },
  args: {
    month: 3,
    data: mockVacation as any,
  },
} as Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    month: 3,
    data: mockVacation as any,
  },
}
