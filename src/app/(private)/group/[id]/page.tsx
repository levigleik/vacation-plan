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
import { GroupApiProps } from '@/types/group'
import { PostData, PutData } from '@/types/api'
import { Row } from 'components/layout/grid'
import { FormGroupProps } from '@/app/(private)/group/[id]/types'

const GroupEdit = () => {
  const { id } = useParams<{ id: string | 'new' }>()

  const { data: dataGetGroup, isLoading: loadingGet } = useQuery({
    queryFn: ({ signal }) =>
      getData<GroupApiProps>({
        url: 'group',
        id: parseInt(id, 10),
        signal,
        query: 'include.users=true',
      }),
    queryKey: ['group-get', id],
    enabled: id !== 'new',
  })

  const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
    mutationFn: async (val: PostData<GroupApiProps>) =>
      postData<GroupApiProps, GroupApiProps>(val),
    mutationKey: ['group-post'],
  })

  const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
    mutationFn: (val: PutData<GroupApiProps>) =>
      putData<GroupApiProps, GroupApiProps>(val),
    mutationKey: ['group-put'],
  })

  const { handleSubmit, setValue, control, reset, getValues } = useForm<
    FormGroupProps,
    'groups'
  >()

  const { data: dataGetUser, isLoading: loadingGetUser } = useQuery({
    queryKey: ['user-get'],
    queryFn: ({ signal }) =>
      getData<UserApiProps[]>({
        url: '/user',
        signal,
      }),
  })

  const onSubmit = (data: FormGroupProps) => {
    const parseData = {
      ...data,
      userIds: data.userIds.map((userId) => Number(userId)),
    }
    if (id === 'new')
      mutatePost({
        url: '/group',
        data: parseData,
      })
        .then(() => {
          toast.success('Group created successfully')

          reset()
        })
        .catch((error: any) => {
          toastErrorsApi(error)
        })
    else
      mutatePut({
        url: '/group',
        data: parseData,
        id: parseInt(id, 10),
      })
        .then(() => {
          toast.success('Group updated successfully')
        })
        .catch((err) => {
          toastErrorsApi(err)
        })
  }

  const loading = loadingGet || loadingPost || loadingPut

  // const [clientSearchTerm, setClientSearchTerm] = useState('')

  useEffect(() => {
    if (dataGetGroup && id !== 'new') {
      setValue('name', dataGetGroup.name)
      setValue('userIds', dataGetGroup.users?.map((a) => String(a.id)) ?? [])
    }
  }, [dataGetGroup, id, setValue])

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
            <Skeleton className="rounded-md" isLoaded={!loading}>
              <Input
                label="Name"
                id={field.name}
                type="text"
                onChange={field.onChange}
                name={field.name}
                value={field.value}
                variant="bordered"
                color="primary"
                isRequired
                isInvalid={!!error}
                errorMessage={error?.message}
              />
            </Skeleton>
          )}
        />
        <Controller
          name="userIds"
          control={control}
          rules={{ required: 'Field is required' }}
          render={({ field, fieldState: { error } }) => (
            <Skeleton className="rounded-md" isLoaded={!loading}>
              <Select
                label="Users"
                id={field.name}
                onSelectionChange={(value) => field.onChange(Array.from(value))}
                name={field.name}
                selectedKeys={
                  Array.isArray(field.value) ? new Set(field.value) : new Set()
                }
                variant="bordered"
                color="primary"
                isInvalid={!!error}
                errorMessage={error?.message}
                classNames={{
                  value: 'text-foreground',
                  label: 'overflow-visible',
                }}
                isRequired
                isLoading={loadingGetUser}
                items={dataGetUser ?? []}
                selectionMode="multiple"
                isMultiline={(field.value?.length ?? 0) > 0}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <div key={item.key}>
                          <Chip
                            isCloseable
                            onClose={() => {
                              setValue(
                                field.name,
                                field.value?.filter(
                                  (a) => a !== item.key?.toString(),
                                ),
                              )
                            }}
                          >
                            {item.data?.name}
                          </Chip>
                        </div>
                      ))}
                    </div>
                  )
                }}
              >
                {(item) => (
                  <SelectItem
                    key={item.id}
                    className="capitalize"
                    textValue={String(item.name)}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-bold">{item.name}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </Skeleton>
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

export default GroupEdit
