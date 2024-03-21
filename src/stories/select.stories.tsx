import { Meta, type StoryObj } from '@storybook/react'
import { SelectProps } from '@nextui-org/react'
import { SelectComp } from '@/components/select'

const meta = {
  title: 'Docs/Select',
  component: SelectComp,
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
      ] as SelectProps['color'][],
      description: 'The color of the input',
    },
    radius: {
      control: {
        type: 'select',
      },
      options: ['full', 'sm', 'md', 'lg', 'none'] as SelectProps['radius'][],
      description: 'The radius of the input',
    },
    size: {
      control: {
        type: 'intersection',
        options: ['sm', 'md', 'lg', 'xl'],
      },
      description: 'The size of the input',
    },
    // value: {
    //   type: 'string',
    //   description: 'The value of the input',
    // },
    selectedKeys: {
      type: 'string',
      description: 'The selected keys of the input',
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
      ] as SelectProps['variant'][],
      description: 'The variant of the input',
    },
    classNames: {
      control: {
        type: 'object',
      },

      description: 'The class names of the input',
    },
    labelPlacement: {
      control: {
        type: 'select',
      },
      options: [
        'inside',
        'outside',
        'outside-left',
      ] as SelectProps['labelPlacement'][],
      description: 'The placement of the label',
    },
    items: {
      control: {
        type: 'select',
      },
      options: [] as SelectProps['items'],
      description: 'The items of the input',
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
    color: 'default',
    radius: 'md',
    className: '',
    size: 'sm',
    // // value: '',
    variant: 'bordered',
    label: 'Label',
    labelPlacement: 'inside',
    placeholder: '',
    errorMessage: '',
    isRequired: false,
    isDisabled: false,
    isInvalid: false,
    items: [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
      { label: 'Item 3', value: 'item3' },
    ],
    classNames: {
      value: 'text-foreground',
      label: 'overflow-visible',
      base: 'w-[450px]',
    } as SelectProps['classNames'],
  },
} as Meta<typeof SelectComp>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
