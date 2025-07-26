import islandImage from '@/assets/images/island.png'
import Image from 'next/image'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { ModalCropImage } from './components/CropImage'
import FormRegister from './components/FormRegister'

const Register = () => {
  return (
    <>
      <ViewTransition name="auth-placeholder">
        <div className="flex-1 bg-blue-200 text-center hidden lg:flex rounded-bl-lg rounded-tl-lg">
          <Image
            alt="logo"
            src={islandImage}
            width={800}
            height={800}
            className="object-contain"
          />
        </div>
      </ViewTransition>
      <FormRegister />
      <ModalCropImage />
    </>
  )
}

export default Register
