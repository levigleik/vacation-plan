import { Meta, type StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '@nextui-org/react'

const meta = {
  title: 'Docs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isIconOnly: {
      type: 'boolean',
    },
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
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['full', 'sm', 'md', 'lg', 'none'] as ButtonProps['radius'][],
    },
    size: {
      control: {
        type: 'intersection',
        options: ['sm', 'md', 'lg', 'xl'],
      },
    },
    children: {
      type: 'string',
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
    },
  },
  args: {
    isIconOnly: false,
    color: 'default',
    radius: 'md',
    className: '',
    size: 'sm',
    children: 'Button',
  },
} as Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
