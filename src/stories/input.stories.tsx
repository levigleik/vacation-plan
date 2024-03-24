import { Meta, type StoryObj } from '@storybook/react'
import { Input, InputProps } from '@nextui-org/react'

const meta = {
  title: 'Docs/Input',
  component: Input,
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
      ] as InputProps['color'][],
      description: 'The color of the input',
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['full', 'sm', 'md', 'lg', 'none'] as InputProps['radius'][],
      description: 'The radius of the input',
    },
    size: {
      control: {
        type: 'intersection',
        options: ['sm', 'md', 'lg', 'xl'],
      },
      description: 'The size of the input',
    },
    value: {
      type: 'string',
      description: 'The value of the input',
    },
    placeholder: {
      type: 'string',
      description: 'The placeholder of the input',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['text', 'password', 'email', 'number'] as InputProps['type'][],
      description: 'The type of the input',
    },
    label: {
      type: 'string',
      description: 'The label of the input',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'bordered',
        'faded',
        'flat',
        'underlined',
      ] as InputProps['variant'][],
      description: 'The variant of the input',
    },
    labelPlacement: {
      control: {
        type: 'select',
      },
      options: [
        'inside',
        'outside',
        'outside-left',
      ] as InputProps['labelPlacement'][],
      description: 'The placement of the label',
    },
    errorMessage: {
      type: 'string',
      description: 'The error message of the input',
    },
    isRequired: {
      type: 'boolean',
      description: 'If the input is required',
    },
    isDisabled: {
      type: 'boolean',
      description: 'If the input is disabled',
    },
    isInvalid: {
      type: 'boolean',
      description: 'If the input is invalid',
    },
  },
  args: {
    value: '',
    color: 'default',
    radius: 'md',
    className: '',
    size: 'sm',
    variant: 'bordered',
    label: 'Label',
    labelPlacement: 'inside',
    type: 'text',
    placeholder: '',
    errorMessage: '',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
  },
} as Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    labelPlacement: 'inside',
  },
}
