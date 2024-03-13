'use client'

import logo from '@/asstets/images/logo.png'

import {
  cn,
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
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  FaBuilding,
  FaCogs,
  FaHome,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaUser,
  FaUserCog,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa'
import { menuItems } from './constants'
import { fisrtAndSecondLetterName, formatName } from './functions'
import { PiMonitorFill } from 'react-icons/pi'
import { IoMdPaper } from 'react-icons/io'
import { useAuthState } from '@/hooks/auth'

const NavbarComp: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { logout, profile } = useAuthState()

  const [hoverProfile, setHoverProfile] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        classNames={{
          item: [
            '[&>.nav-link]:data-[active=true]:text-main-white',
            '[&>.nav-link]:data-[active=true]:underline [&>.nav-link]:data-[active=true]:underline-offset-8',
            '[&>.nav-link]:hover:text-main-white [&>.nav-link]:transtion-all [&>.nav-link]:duration-300 [&>.nav-link]:ease-in-out',
            '[&>.nav-link]:hover:underline [&>.nav-link]:hover:underline-offset-8',
            'flex flex-col ',
          ],
          wrapper: 'max-w-none w-screen px-4 md:px-8 2xl:px-16 bg-main-300',
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Fechar' : 'Abrir'}
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
                      : pathname.includes(item.path)
                  }
                >
                  <Link
                    className="nav-link text-white"
                    color="foreground"
                    href={item.path}
                    title={item.name}
                  >
                    {item.icon === 'home' && <FaHome className="mr-2" />}
                    {item.icon === 'group' && <FaUsers className="mr-2" />}
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
            <Dropdown
              placement="bottom-end"
              isOpen={hoverProfile}
              onOpenChange={(open) => setHoverProfile(open)}
              className="w-lg"
            >
              <DropdownTrigger
              // onMouseOver={() => setHoverProfile(true)}
              // onMouseLeave={() => setHoverProfile(false)}
              >
                <User
                  name={formatName(profile?.name || '') || 'Nome não informado'}
                  avatarProps={{
                    name: fisrtAndSecondLetterName(profile?.name || ''),
                    showFallback: true,
                    className: 'mr-2 cursor-pointer',
                  }}
                  classNames={{
                    description:
                      'hidden cursor-pointer 2xs:block text-main-white',
                    name: 'hidden cursor-pointer 2xs:block',
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu
                // onMouseOver={() => setHoverProfile(true)}
                // onMouseLeave={() => setHoverProfile(false)}
                aria-label="Perfil"
                variant="flat"
              >
                <DropdownItem
                  key="emailProfile"
                  className="h-14 cursor-auto gap-2 [&>span]:font-semibold"
                >
                  {profile?.email}
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  textValue={'Meu perfil'}
                  key="profile"
                  startContent={<FaUser />}
                  href={`/user/${profile?.id}`}
                  className="text-default-foreground"
                >
                  Meu perfil
                </DropdownItem>
                <DropdownItem
                  key="theme"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  startContent={theme === 'dark' ? <FaMoon /> : <FaSun />}
                  textValue={`Tema: ${theme === 'dark' ? 'escuro' : 'claro'}`}
                >
                  Tema: {theme === 'dark' ? 'escuro' : 'claro'}
                </DropdownItem>
                <DropdownItem
                  onClick={() => logout()}
                  key="logout"
                  color="danger"
                  startContent={<FaSignOutAlt className="text-danger" />}
                  textValue={'Sair'}
                >
                  Sair
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
                  isActive={item.path.includes(pathname)}
                >
                  <Link
                    color="foreground"
                    className="nav-link w-full"
                    href={item.path}
                    size="lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon === 'home' && <FaHome className="mr-2" />}
                    {item.icon === 'group' && <FaUsers className="mr-2" />}
                    {item.icon === 'user' && <FaUser className="mr-2" />}
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              }
            </>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default NavbarComp
