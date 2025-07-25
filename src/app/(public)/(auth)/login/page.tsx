import FormLogin from '@/app/(public)/(auth)/login/components/Form'
import islandImage from '@/assets/images/island.png'
import Image from 'next/image'
import { unstable_ViewTransition as ViewTransition } from 'react'

const LoginPage = () => {
  return (
    <>
      <FormLogin />
      <ViewTransition name="auth-placeholder">
        <div className="flex-1 bg-blue-200 text-center hidden lg:flex rounded-br-lg rounded-tr-lg">
          <Image
            alt="logo"
            src={islandImage}
            width={800}
            height={800}
            className="object-contain"
          />
        </div>
      </ViewTransition>
    </>
  )
}

export default LoginPage
