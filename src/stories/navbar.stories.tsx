import type { Meta, StoryObj } from '@storybook/react'
import NavbarWrapper from '../components/navbar/wrapper'
import mockUser from '../../prisma/mock/user.json'

const meta = {
  title: 'Docs/Navbar',
  component: NavbarWrapper,

  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      control: 'object',
    },
    profile: {
      control: 'object',
    },
    logout: {
      action: 'logout',
    },
    setTheme: {
      action: 'setTheme',
    },
    pathname: {
      control: 'text',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
  args: {
    menuItems: [
      {
        name: 'Home',
        path: '/',
        icon: 'home',
      },
      {
        name: 'Users',
        path: '/user',
        icon: 'user',
      },
    ],
    pathname: '/',
    theme: 'light',
    profile: { ...mockUser[0] } as any,
  },
} as Meta<typeof NavbarWrapper>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menuItems: [
      {
        name: 'Home',
        path: '/',
        icon: 'home',
      },
      {
        name: 'Users',
        path: '/user',
        icon: 'user',
      },
    ],
    pathname: '/',
    theme: 'light',
    profile: { ...mockUser[0] } as any,
    setTheme: (theme?: 'dark' | 'light') => console.log(theme),
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
