'use client'
import islandImage from '@/assets/images/island.png'
import logo from '@/assets/images/logo.png'
import { useAuthState } from '@/hooks/auth'
import { cookiesSettings } from '@/lib/constants'
import { postData, toastErrorsApi } from '@/lib/functions.api'
import { PostData } from '@/types/api'
import { Button, Input } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormLoginProps, LoginResponseProps } from './types'

const Login = () => {
  const { control, handleSubmit } = useForm<FormLoginProps>()

  const { setProfile, setSigned } = useAuthState()

  const searchParams = useSearchParams()

  const redirect = decodeURIComponent(searchParams.get('redirect') ?? '')

  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (val: PostData<FormLoginProps>) =>
      postData<LoginResponseProps, FormLoginProps>(val),
    mutationKey: ['login'],
  })

  const onSubmit = (form: FormLoginProps) => {
    mutateAsync({
      url: 'auth/login',
      data: form,
    })
      .then(async (data) => {
        Cookie.set('signed', 'true', cookiesSettings)
        Cookie.set('idToken', data.idToken, cookiesSettings)
        Cookie.set('refreshToken', data.refreshToken, cookiesSettings)
        setSigned(true)
        setProfile({ ...data.user, password: undefined })
        if (redirect) router.push(redirect)
        else router.push('/')
      })
      .catch((error: AxiosError) => {
        toastErrorsApi(error)
        setSigned(false)
      })
  }

  return (
    <>
      <ViewTransition name="auth-login">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center"
        >
          <div className="mb-6 flex items-center justify-center">
            <Image alt="logo" src={logo} width={200} height={200} />
          </div>
          <h1 className="my-8 text-center text-2xl font-bold">Login</h1>
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Field is required' }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  type="text"
                  id={field.name}
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                  variant="bordered"
                  label="E-mail"
                  isInvalid={!!error}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <div className="mb-6">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Field is required' }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                  variant="bordered"
                  label="Password"
                  isInvalid={!!error}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="bordered" type="button" as={Link} href="/register">
              Register
            </Button>
            <Button type="submit" disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
      </ViewTransition>
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

export default Login
