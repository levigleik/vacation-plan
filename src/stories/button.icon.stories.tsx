import { Meta, type StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '@nextui-org/react'
import { FaArrowLeft, FaFilePdf, FaPlus, FaTimes } from 'react-icons/fa'

const icons = {
  Plus: <FaPlus />,
  Pdf: <FaFilePdf />,
  ArrowLeft: <FaArrowLeft />,
  Close: <FaTimes />,
}

const meta = {
  title: 'Docs/Button/Icon',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          Plus: 'Plus',
          Pdf: 'Pdf',
          ArrowLeft: 'ArrowLeft',
          Close: 'Close',
        },
      },
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

    isIconOnly: {
      control: false,
      defaultValue: true,
    },
  },
  args: {
    children: 'Plus',
    color: 'default',
    variant: 'shadow',
    radius: 'full',
    className: '',
    size: 'sm',
    isIconOnly: true,
  },
} as Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
