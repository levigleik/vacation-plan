'use client'

import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { menuItems } from './constants'
import { useAuthState } from '@/hooks/auth'
import NavbarWrapper from 'components/navbar/wrapper'

const NavbarComp: React.FC = () => {
  const pathname = usePathname()
  const { logout, profile } = useAuthState()

  const { theme, setTheme } = useTheme()

  return (
    <NavbarWrapper
      menuItems={menuItems}
      pathname={pathname}
      theme={theme as 'dark' | 'light'}
      setTheme={(t) => setTheme(t as 'dark' | 'light')}
      logout={logout}
      profile={profile}
    />
  )
}

export default NavbarComp
