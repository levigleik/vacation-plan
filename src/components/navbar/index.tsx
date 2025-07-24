'use client'

import logo from '@/assets/images/logo.png'

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NavbarComponent = () => {
  const router = useRouter()

  return (
    <Navbar
      classNames={{
        item: [
          '[&>.nav-link]:data-[active=true]:text-background',
          'data-[active=true]:[&>.nav-link]:underline data-[active=true]:[&>.nav-link]:underline-offset-8',
          '[&>.nav-link]:hover:text-background [&>.nav-link]:transition-all [&>.nav-link]:duration-300 [&>.nav-link]:ease-in-out',
          'hover:[&>.nav-link]:underline hover:[&>.nav-link]:underline-offset-8',
          '[&>.nav-link]:text-background flex flex-col ',
        ],
        wrapper:
          'max-w-none w-screen px-4 md:px-8 2xl:px-16 shadow-xs bg-white',
      }}
      height="5rem"
    >
      <NavbarContent>
        <NavbarBrand className="text-2xl ">
          <Image
            src={logo}
            alt="Logo"
            width={190}
            height={190}
            className="h-20 w-20"
          />
          <p className="text-primary ml-3 text-2xl font-bold tracking-tight">
            Vacation Planner
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem key="signin">
          <Button
            className="font-bold"
            variant="faded"
            onPress={() => router.push('/signin')}
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem key="signup">
          <Button
            className="text-white font-bold"
            color="primary"
            onPress={() => router.push('/signup')}
          >
            Create Account
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavbarComponent
