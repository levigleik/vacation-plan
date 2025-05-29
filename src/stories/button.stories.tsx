import { Meta, type StoryObj } from '@storybook/react'
import { Button, ButtonProps } from "@heroui/react"

const meta = {
  title: 'Docs/Button/Button',
  component: Button,
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
    color: {
      control: {
        type: 'select',
      },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
      ] as ButtonProps['color'][],
      description: 'The color of the button',
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['full', 'sm', 'md', 'lg', 'none'] as ButtonProps['radius'][],
      description: 'The radius of the button',
    },
    size: {
      control: {
        type: 'intersection',
        options: ['sm', 'md', 'lg', 'xl'],
      },
      description: 'The size of the button',
    },
    children: {
      type: 'string',
      description: 'The content of the button',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'bordered',
        'faded',
        'flat',
        'ghost',
        'light',
        'shadow',
        'solid',
      ] as ButtonProps['variant'][],
      description: 'The variant of the button',
    },
  },
  args: {
    color: 'default',
    radius: 'md',
    className: '',
    size: 'sm',
    variant: 'shadow',
    children: 'Button',
  },
} as Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
