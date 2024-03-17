import { Meta, type StoryObj } from '@storybook/react'
import { CardSummary } from '@/app/(private)/(dashboard)/components/summary/card'
import mockVacation from '../../prisma/mock/vacation.json'

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
    month: 3,
    data: mockVacation as any,
  },
} as Meta<typeof CardSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    month: 3,
    data: mockVacation as any,
  },
}
