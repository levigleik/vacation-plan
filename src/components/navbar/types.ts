import { UserApiProps } from '@/types/models/user'

export interface NavbarMenuItem {
  name: string
  path: string
  icon: string
}

export interface NavbarProps {
  menuItems: NavbarMenuItem[]
  pathname: string
  theme?: 'dark' | 'light'
  setTheme: (theme?: 'dark' | 'light') => void
  logout: () => void
  profile?: UserApiProps
}
