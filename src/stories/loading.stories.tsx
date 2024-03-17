import { Meta, type StoryObj } from '@storybook/react'
import Loading from '../components/loading'

const meta: Meta = {
  title: 'Docs/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {},
}
