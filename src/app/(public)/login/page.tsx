'use client'
import Cookie from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { PostData } from '@/types/api'
import { postData, toastErrorsApi } from '@/lib/functions.api'
import { UserApiProps } from '@/types/models/user'
import { cookiesSettings } from '@/lib/constants'
import { useAuthState } from '@/hooks/auth'
import { AxiosError } from 'axios'
import { Button, Input } from '@nextui-org/react'
import { FormLoginProps } from './types'
import Loading from 'components/loading'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'

const Login = () => {
  const { control, handleSubmit } = useForm<FormLoginProps>()

  const { setProfile, setSigned } = useAuthState()

  const { get } = useSearchParams()

  const redirect = decodeURIComponent(get('redirect') || '')

  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (val: PostData<FormLoginProps>) =>
      postData<UserApiProps, FormLoginProps>(val),
    mutationKey: ['login'],
  })

  const onSubmit = (form: FormLoginProps) => {
    mutateAsync({
      url: 'auth/login',
      data: form,
    })
      .then(async (data) => {
        Cookie.set('signed', 'true', cookiesSettings)

        setSigned(true)
        setProfile({ ...data, password: undefined })
        if (redirect) router.push(redirect)
        else router.push('/')
      })
      .catch((error: AxiosError) => {
        toastErrorsApi(error)
        setSigned(false)
      })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-main to-main-white">
      {isPending && <Loading />}
      {!isPending && (
        <div className="rounded-md bg-content1 p-10 shadow-sm shadow-main-200 brightness-90 md:w-[500px] md:p-16 md:pt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button
                variant="bordered"
                type="button"
                onClick={() => {
                  router.push('/register')
                }}
              >
                Register
              </Button>
              <Button
                // variant="bordered"
                type="submit"
                disabled={isPending}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login
