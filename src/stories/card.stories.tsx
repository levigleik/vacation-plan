import { Meta, type StoryObj } from '@storybook/react'
import { Card, CardProps } from '@nextui-org/react'

const meta = {
  title: 'Docs/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      type: 'string',
      description:
        'The class name of the button (you can use tailwind classes) like bg-danger',
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['full', 'sm', 'md', 'lg', 'none'] as CardProps['radius'][],
      description: 'The radius of the card',
    },
    children: {
      type: 'string',
      description: 'The content of the card',
    },
    shadow: {
      control: {
        type: 'select',
      },
      options: ['none', 'sm', 'md', 'lg'] as CardProps['shadow'][],
      description: 'The shadow of the card',
    },
  },
  args: {
    radius: 'md',
    className: 'p-4',
    children: 'Card',
  },
} as Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
