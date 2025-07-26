'use client'
import logo from '@/assets/images/logo.png'
import { Button, Form, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { useLoginForm } from '../hooks/useLoginForm'
import { FormLoginProps } from '../types'
import { loginSchema } from '../validation'

const FormLogin = () => {
  const { control, handleSubmit } = useForm<FormLoginProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const searchParams = useSearchParams()
  const redirect = decodeURIComponent(searchParams.get('redirect') ?? '')
  const { login, isPending } = useLoginForm(redirect)

  const onSubmit = (formData: FormLoginProps) => {
    login(formData)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center"
      data-testid="login-form"
      validationBehavior="aria"
    >
      <div className="mb-6 flex items-center justify-center">
        <Image alt="logo" src={logo} width={200} height={200} priority />
      </div>
      <h1 className="my-8 text-center text-2xl font-bold">Login</h1>

      <div className="mb-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="email"
              id={field.name}
              {...field}
              variant="bordered"
              label="E-mail"
              isInvalid={!!error}
              errorMessage={error?.message}
              data-testid="email-input"
              autoComplete="email"
            />
          )}
        />
      </div>

      <div className="mb-6">
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              id={field.name}
              {...field}
              variant="bordered"
              label="Password"
              isInvalid={!!error}
              errorMessage={error?.message}
              data-testid="password-input"
              autoComplete="current-password"
            />
          )}
        />
      </div>

      <div className="flex justify-between">
        <Button
          variant="bordered"
          type="button"
          as={Link}
          href="/register"
          data-testid="register-link"
        >
          Register
        </Button>
        <Button type="submit" disabled={isPending} data-testid="submit-button">
          {isPending ? 'Loading...' : 'Login'}
        </Button>
      </div>
    </Form>
  )
}

export default FormLogin
