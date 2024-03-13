'use client'

import { getData, postData, putData, toastErrorsApi } from '@/lib/functions.api'
import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UserApiProps } from '@/types/user'
import { PostData, PutData } from '@/types/api'
import { Row } from 'components/layout/grid'
import { FormUserProps } from './types'

const UserEdit = () => {
  const { id } = useParams<{ id: string | 'new' }>()

  const { data: dataGetUser, isLoading: loadingGet } = useQuery({
    queryFn: ({ signal }) =>
      getData<UserApiProps>({
        url: 'user',
        id: parseInt(id, 10),
        signal,
        query: 'include.client=true',
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
        data: parseData,
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

  // const [clientSearchTerm, setClientSearchTerm] = useState('')

  useEffect(() => {
    if (dataGetUser && id !== 'new') {
      setValue('name', dataGetUser.name)
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
            <Input
              type="text"
              id={field.name}
              name={field.name}
              onChange={field.onChange}
              value={field.value}
              variant="bordered"
              label="Name"
              disabled={loading}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Field is required' }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="email"
              id={field.name}
              name={field.name}
              onChange={field.onChange}
              value={field.value}
              variant="bordered"
              label="E-mail"
              disabled={loading}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Field is required' }}
          render={({ field, fieldState: { error } }) => (
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
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => {
              if (!value) return 'Field is required'
              if (value !== password) return 'Passwords do not match'
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
              disabled={loading}
              isInvalid={!!error}
              errorMessage={error?.message}
              type="password"
            />
          )}
        />
      </Row>
      <Button
        type="submit"
        variant="flat"
        color="primary"
        className="w-fit"
        isDisabled={loading}
      >
        Salvar
      </Button>
    </form>
  )
}

export default UserEdit
