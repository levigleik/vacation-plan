'use client'

import logo from '@/assets/images/logo.png'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  User,
} from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'
import { FaHome, FaMoon, FaSignOutAlt, FaSun, FaUser } from 'react-icons/fa'
import { fisrtAndSecondLetterName, formatName } from './functions'
import { capitalize } from '@nextui-org/shared-utils'
import { NavbarProps } from 'components/navbar/types'
import { useRouter } from 'next/navigation'

const NavbarWrapper = ({
  menuItems,
  pathname,
  theme,
  setTheme,
  logout,
  profile,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      classNames={{
        item: [
          '[&>.nav-link]:data-[active=true]:text-main-white',
          '[&>.nav-link]:data-[active=true]:underline [&>.nav-link]:data-[active=true]:underline-offset-8',
          '[&>.nav-link]:hover:text-main-white [&>.nav-link]:transition-all [&>.nav-link]:duration-300 [&>.nav-link]:ease-in-out',
          '[&>.nav-link]:hover:underline [&>.nav-link]:hover:underline-offset-8',
          'flex flex-col ',
        ],
        wrapper: 'max-w-none w-screen px-4 md:px-8 2xl:px-16 bg-main-300',
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close' : 'Open'}
          className="md:hidden"
        />
        <NavbarBrand className="text-2xl light:text-gray-800 dark:text-white">
          <Image
            src={logo}
            alt="Logo"
            width={190}
            height={190}
            className="h-20 w-20"
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        {menuItems.map((item) => (
          <>
            {
              <NavbarItem
                key={item.path}
                isActive={
                  item.path === '/'
                    ? pathname === '/'
                    : pathname?.includes(item.path)
                }
              >
                <Link
                  className="nav-link text-white"
                  color="foreground"
                  // href={item.path}
                  onClick={() => router.push(item.path)}
                  title={item.name}
                >
                  {item.icon === 'home' && <FaHome className="mr-2" />}
                  {item.icon === 'user' && <FaUser className="mr-2" />}
                  <span className="hidden mdlg:flex">{item.name}</span>
                </Link>
              </NavbarItem>
            }
          </>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end" className="w-lg">
            <DropdownTrigger>
              <User
                name={formatName(profile?.name || '') || 'No name'}
                avatarProps={{
                  name: fisrtAndSecondLetterName(profile?.name || ''),
                  showFallback: true,
                  className: 'mr-2 cursor-pointer',
                  src: profile?.photo,
                }}
                classNames={{
                  description:
                    'hidden cursor-pointer 2xs:block text-main-white',
                  name: 'hidden cursor-pointer 2xs:block',
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Perfil" variant="flat">
              <DropdownItem
                onClick={() => {
                  router.push(`/user/${profile?.id}`)
                }}
                key="logout"
                startContent={<FaUser />}
                textValue={'My profile'}
              >
                My profile
              </DropdownItem>
              <DropdownItem
                key="theme"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                startContent={theme === 'dark' ? <FaMoon /> : <FaSun />}
                textValue={`Theme: ${capitalize(theme ?? 'light')}`}
              >
                Theme: {capitalize(theme ?? 'light')}
              </DropdownItem>
              <DropdownItem
                onClick={() => logout()}
                key="logout"
                color="danger"
                startContent={<FaSignOutAlt className="text-danger" />}
                textValue={'Log-out'}
              >
                Log-out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className={'pt-8'}>
        {menuItems.map((item) => (
          <>
            {
              <NavbarMenuItem
                key={item.path}
                isActive={item.path?.includes(pathname)}
              >
                <Link
                  color="foreground"
                  className="nav-link w-full"
                  // href={item.path}
                  size="lg"
                  onClick={() => {
                    router.push(item.path)
                    setIsMenuOpen(false)
                  }}
                >
                  {item.icon === 'home' && <FaHome className="mr-2" />}
                  {item.icon === 'user' && <FaUser className="mr-2" />}
                  {item.name}
                </Link>
              </NavbarMenuItem>
            }
          </>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavbarWrapper
