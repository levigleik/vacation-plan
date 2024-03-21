import type { Meta, StoryObj } from '@storybook/react'
import NavbarWrapper from '../components/navbar/wrapper'
import mockUser from '../../prisma/mock/user.json'
import { NavbarProps } from '@/components/navbar/types'

const meta = {
  title: 'Docs/Navbar',
  component: NavbarWrapper,

  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      control: 'object',
      description: 'The menu items of the navbar',
    },
    profile: {
      control: 'object',
      description: 'The profile of the user in far right of the navbar',
    },
    logout: {
      action: 'logout',
      description: 'The action to logout',
    },
    setTheme: {
      action: 'setTheme',
      description:
        'The action to set the theme (dark or light) of the entire app',
    },
    pathname: {
      control: 'text',
      description: 'The the current pathname of the page',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'The theme of the entire app',
    },
  } as Record<keyof NavbarProps, any>,
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
