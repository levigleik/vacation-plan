import type { Meta, StoryObj } from '@storybook/react'
import NavbarComp from '../components/navbar'
import { menuItems } from '../components/navbar/constants'

const meta = {
  title: 'Docs/Navbar',
  component: NavbarComp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menuItems: { control: 'object' },
    profile: { control: 'object' },
  },
  args: {
    menuItems: menuItems,
    profile: {},
  },
} as Meta<typeof NavbarComp>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
