'use client'

import { getData, postData, putData, toastErrorsApi } from '@/lib/functions.api'
import { Button, Input, Skeleton, Switch } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UserApiProps } from '@/types/models/user'
import { PostData, PutData } from '@/types/api'
import { Row } from '@/components/layout/grid'
import { FormUserProps } from './types'
import { validatePassword } from '@/lib/validations'

const UserEdit = () => {
  const { id } = useParams<{ id: string | 'new' }>()

  const { data: dataGetUser, isLoading: loadingGet } = useQuery({
    queryFn: ({ signal }) =>
      getData<UserApiProps>({
        url: 'user',
        id: parseInt(id, 10),
        signal,
      }),
    queryKey: ['user-get', id],
    enabled: id !== 'new',
  })

  const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
    mutationFn: async (val: PostData<UserApiProps>) =>
      postData<UserApiProps, UserApiProps>(val),
    mutationKey: ['user-post'],
  })

  const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
    mutationFn: (val: PutData<UserApiProps>) =>
      putData<UserApiProps, UserApiProps>(val),
    mutationKey: ['user-put'],
  })

  const { handleSubmit, setValue, control, reset, watch } = useForm<
    FormUserProps,
    'users'
  >()

  const password = watch('password')

  const [changePassword, setChangePassword] = useState(false)

  const onSubmit = (data: FormUserProps) => {
    const parseData = {
      ...data,
    }
    if (id === 'new')
      mutatePost({
        url: '/user',
        data: parseData,
      })
        .then(() => {
          toast.success('User registered successfully')

          reset()
        })
        .catch((error: any) => {
          toastErrorsApi(error)
        })
    else
      mutatePut({
        url: '/user',
        data: {
          ...parseData,
          password:
            changePassword && data.newPassword ? data.newPassword : undefined,
        },
        id: parseInt(id, 10),
      })
        .then(() => {
          toast.success('User updated successfully')
        })
        .catch((err) => {
          toastErrorsApi(err)
        })
  }

  const loading = loadingGet || loadingPost || loadingPut

  useEffect(() => {
    if (dataGetUser && id !== 'new') {
      setValue('name', dataGetUser.name)
      setValue('email', dataGetUser.email)
    }
  }, [dataGetUser, id, setValue])

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <Row>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Field is required' }}
          render={({ field, fieldState: { error } }) => (
            <Skeleton isLoaded={!loading}>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                variant="bordered"
                label="Name"
                isInvalid={!!error}
                errorMessage={error?.message}
                disabled={loading}
              />
            </Skeleton>
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => {
              if (!value) return 'Field is required'
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
                return 'Invalid email address'
              return true
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Skeleton isLoaded={!loading}>
              <Input
                type="email"
                id={field.name}
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                variant="bordered"
                label="E-mail"
                isInvalid={!!error}
                errorMessage={error?.message}
                disabled={loading}
              />
            </Skeleton>
          )}
        />
      </Row>
      {id !== 'new' && (
        <>
          <Switch
            id="changePassword"
            checked={changePassword}
            onChange={() => setChangePassword(!changePassword)}
          >
            <div className="flex">
              <p className="text-medium">Change password</p>
            </div>
          </Switch>
          {changePassword && (
            <Row>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ validate: (value) => validatePassword(value) }}
                render={({ field, fieldState: { error } }) => (
                  <Skeleton isLoaded={!loading}>
                    <Input
                      label="Current password"
                      variant="bordered"
                      id={field.name}
                      onChange={field.onChange}
                      name={field.name}
                      value={field.value}
                      disabled={loading}
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      type="password"
                    />
                  </Skeleton>
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) => validatePassword(value),
                }}
                render={({ field, fieldState: { error } }) => (
                  <Skeleton isLoaded={!loading}>
                    <Input
                      label="New password"
                      variant="bordered"
                      id={field.name}
                      onChange={field.onChange}
                      name={field.name}
                      value={field.value}
                      disabled={loading}
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      type="password"
                    />
                  </Skeleton>
                )}
              />
            </Row>
          )}
        </>
      )}
      {!id && (
        <Row>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ validate: (value) => validatePassword(value) }}
            render={({ field, fieldState: { error } }) => (
              <Skeleton isLoaded={!loading}>
                <Input
                  label="Password"
                  variant="bordered"
                  id={field.name}
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                  disabled={loading}
                  isInvalid={!!error}
                  errorMessage={error?.message}
                  type="password"
                />
              </Skeleton>
            )}
          />
          <Controller
            name="passwordConfirmation"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => validatePassword(password, value),
            }}
            render={({ field, fieldState: { error } }) => (
              <Skeleton isLoaded={!loading}>
                <Input
                  label="Password Confirmation"
                  variant="bordered"
                  id={field.name}
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                  disabled={loading}
                  isInvalid={!!error}
                  errorMessage={error?.message}
                  type="password"
                />
              </Skeleton>
            )}
          />
        </Row>
      )}
      <Button
        type="submit"
        variant="flat"
        color="primary"
        className="w-fit"
        isDisabled={loading}
      >
        Submit
      </Button>
    </form>
  )
}

export default UserEdit
