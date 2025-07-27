'use client'
import { useAuthState } from '@/hooks/auth'
import { Button } from '@heroui/button'

const DashboardPage = () => {
  const { logout } = useAuthState()
  return (
    <>
      <Button
        className="text-white font-bold px-8 py-3"
        color="primary"
        onPress={() => {
          logout()
        }}
      >
        Signout
      </Button>
    </>
  )
}

export default DashboardPage
