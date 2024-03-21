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
  },
  args: {
    color: 'default',
    radius: 'full',
    className: '',
    size: 'sm',
    value: '',
    variant: 'bordered',
    label: 'Label',
    placeholder: 'Insert your text here',
  },
} as Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
