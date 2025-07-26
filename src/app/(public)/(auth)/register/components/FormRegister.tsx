'use client'
import logoImage from '@/assets/images/logo.png'
import { convertToBase64 } from '@/lib/utils'
import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaUpload } from 'react-icons/fa'
import { useRegisterForm } from '../hooks/useRegisterForm'
import { useRegisterHook } from '../hooks/useRegisterModal'
import { FormRegisterProps } from '../types'
import { registerSchema } from '../validation'

const FormRegister = () => {
  const { control, handleSubmit } = useForm<FormRegisterProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const searchParams = useSearchParams()
  const redirect = decodeURIComponent(searchParams.get('redirect') ?? '')
  const { register, isPending } = useRegisterForm(redirect)

  const onSubmit = async (formData: FormRegisterProps) => {
    const photoBase64 = image
      ? ((await convertToBase64(image)) as string)
      : undefined
    register({ ...formData, photo: photoBase64 })
  }

  const { setModalOpen, setImage, image } = useRegisterHook()

  const [tempImage, setTempImage] = useState<File>()

  const [imageBase64, setImageBase64] = useState<string>()

  useEffect(() => {
    if (image) {
      convertToBase64(image).then((base64) => {
        setImageBase64(base64 as string)
      })
    }
  }, [image])

  useEffect(() => {
    return () => {
      setImage(undefined)
    }
  }, [setImage])

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center items-stretch"
      data-testid="register-form"
      validationBehavior="aria"
    >
      <div className="mb-6 flex items-center justify-center">
        <Image alt="logo" src={logoImage} width={200} height={200} />
      </div>
      <h1 className="my-8 text-center text-2xl font-bold">Register</h1>
      <div className="mb-4 flex flex-col gap-4 w-full">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Input
              type="text"
              id={field.name}
              name={field.name}
              onChange={field.onChange}
              value={field.value}
              variant="bordered"
              label="Name"
              disabled={isPending}
              isInvalid={!!error}
              isRequired
              errorMessage={error?.message}
              data-testid="name-input"
              classNames={{
                base: 'transition-all ease-in duration-300',
              }}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Input
              type="email"
              id={field.name}
              name={field.name}
              onChange={field.onChange}
              value={field.value}
              variant="bordered"
              label="E-mail"
              disabled={isPending}
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
              data-testid="email-input"
            />
          )}
        />
        <Input
          type="text"
          variant="bordered"
          label="Photo"
          disabled
          endContent={
            <label className="flex h-full w-fit cursor-pointer flex-col justify-center rounded-md bg-default-100 px-3 py-2">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0])
                    setTempImage(e.target.files[0])
                    setModalOpen(true)
                  }
                }}
              />
              <FaUpload className="text-xl" />
            </label>
          }
        />
        {imageBase64 && (
          <div className="flex w-full justify-center">
            <Image
              src={imageBase64}
              alt={'image-croppped'}
              width={100}
              height={100}
              title="Edit"
              onClick={() => {
                if (tempImage) setImage(tempImage)
                setModalOpen(true)
              }}
              className="cursor-pointer rounded-full"
            />
          </div>
        )}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Password"
              variant="bordered"
              id={field.name}
              onChange={field.onChange}
              name={field.name}
              value={field.value}
              disabled={isPending}
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
              type="password"
              data-testid="password-input"
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Password Confirmation"
              variant="bordered"
              id={field.name}
              onChange={field.onChange}
              name={field.name}
              value={field.value}
              disabled={isPending}
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
              type="password"
              data-testid="password-confirmation-input"
            />
          )}
        />
      </div>
      <div className="flex justify-between">
        <Button
          variant="bordered"
          type="button"
          disabled={isPending}
          as={Link}
          href="/login"
        >
          Back to Login
        </Button>
        <Button type="submit" disabled={isPending} data-testid="submit-button">
          Register
        </Button>
      </div>
    </Form>
  )
}

export default FormRegister
