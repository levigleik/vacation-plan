import type { Meta, StoryObj } from '@storybook/react'
import { Row } from '../components/layout/grid'

const meta = {
  title: 'Docs/Row',
  component: Row,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'string' },
      description: 'The content of the row',
    },
    className: {
      control: { type: 'string' },
      description: 'The class name of the row',
    },
  },
  args: {
    children: 'Row content',
    className: '',
  },
} as Meta<typeof Row>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Row content',
  },
}
