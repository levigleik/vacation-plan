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
    className: {
      control: {
        type: 'text',
        min: 1,
        max: 12,
      },
      description: 'classnames to be added to the component',
    },
    children: { control: 'children' },
  },
  args: {
    className: '',
    children: null,
  },
} as Meta<typeof Row>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Row content',
  },
}
