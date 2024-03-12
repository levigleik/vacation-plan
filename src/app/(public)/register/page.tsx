'use client'
// import logo from '@/assets/images/logo.webp'
// import Loading from 'components/loading'
import Cookie from 'js-cookie'
// import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'

import { useMutation } from '@tanstack/react-query'
import { PostData } from '@/types/api'
import { postData, toastErrorsApi } from '@/lib/functions.api'
import { UserApiProps } from '@/types/user'
import { cookiesSettings } from '@/lib/constants'
import { useAuthState } from '@/hooks/auth'
import { AxiosError } from 'axios'
import { inputStyleLogin } from '@/app/(public)/constants.styles'

// import '../style.css'

interface RegisterFormProps {
  name: string
  email: string
  password: string
  passwordConfirmation?: string
  photo?: string
}

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="border-main-100 h-32 w-32 animate-spin rounded-full border-b-2 border-t-2"></div>
    </div>
  )
}

const Register = () => {
  const { control, handleSubmit, watch } = useForm<RegisterFormProps>()

  const { setProfile, setSigned } = useAuthState()

  const { get } = useSearchParams()

  const redirect = decodeURIComponent(get('redirect') || '')

  const router = useRouter()

  const password = watch('password')

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (val: PostData<RegisterFormProps>) =>
      postData<UserApiProps, RegisterFormProps>(val),
    mutationKey: ['login'],
  })

  const onSubmit = (form: RegisterFormProps) => {
    mutateAsync({
      url: 'user',
      data: { ...form, passwordConfirmation: undefined },
    })
      .then(async (data) => {
        Cookie.set('signed', 'true', cookiesSettings)

        setSigned(true)
        setProfile(data)
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
        <div className="rounded-md bg-main-200 p-10 shadow-sm shadow-main-200 brightness-90 md:w-[500px] md:p-16 md:pt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*<div className="mb-6 flex items-center justify-center">*/}
            {/*  <Image alt="logo" src={logo} width={200} height={200} />*/}
            {/*</div>*/}
            <h1 className="my-8 text-center text-2xl font-bold">Register</h1>
            <div className="mb-4 flex flex-col gap-4">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
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
                    classNames={inputStyleLogin}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
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
                    classNames={inputStyleLogin}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Campo obrigatório' }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Password"
                    variant="bordered"
                    id={field.name}
                    onChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    disabled={isPending}
                    isInvalid={!!error}
                    errorMessage={error?.message}
                    classNames={inputStyleLogin}
                    type="password"
                  />
                )}
              />
              <Controller
                name="passwordConfirmation"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) => {
                    if (!value) return 'Campo obrigatório'
                    if (value !== password) return 'As senhas não coincidem'
                    return true
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Password Confirmation"
                    variant="bordered"
                    id={field.name}
                    onChange={field.onChange}
                    name={field.name}
                    value={field.value}
                    disabled={isPending}
                    isInvalid={!!error}
                    errorMessage={error?.message}
                    classNames={inputStyleLogin}
                    type="password"
                  />
                )}
              />
            </div>
            <div className="mb-8">
              <Link
                className="text-sm italic text-white underline"
                href="/reset-password"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <div className="flex justify-center">
              <Button
                // variant="bordered"
                type="submit"
                color="primary"
                className="text-white"
                disabled={isPending}
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Register
