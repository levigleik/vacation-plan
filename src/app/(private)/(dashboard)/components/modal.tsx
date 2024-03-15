'use client'

import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
  User,
} from '@nextui-org/react'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { format, getDaysInMonth } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getData, postData, toastErrorsApi } from '@/lib/functions.api'
import { UserApiProps } from '@/types/models/user'
import {
  FormVacationProps,
  VacationWithDatesApiProps,
} from '@/app/(private)/(dashboard)/types'
import { FaTimes } from 'react-icons/fa'
import { PostData } from '@/types/api'
import { VacationApiProps } from '@/types/models/vaction'
import { toast } from 'react-toastify'
import {
  parsedDateField,
  setDatesOnCalendar,
} from '@/app/(private)/(dashboard)/functions'
import { useEffect, useMemo } from 'react'

export const ModalDashboard = () => {
  const {
    modalOpen,
    setModalOpen,
    dateField,
    month,
    setDateField,
    daySelected,
    dayEditId,
    setDayEditId,
  } = useDashboardHook()

  const { handleSubmit, setValue, control, reset, getValues } = useForm<
    FormVacationProps,
    'vacation'
  >()

  const allDaysInMonth = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(2024, (month ?? 0) - 1))
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(2024, (month ?? 0) - 1, i + 1)
      return {
        id: date.toISOString(),
        label: date.toISOString(),
      }
    })
  }, [month])

  const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
    mutationFn: async (val: PostData<VacationApiProps>) =>
      postData<VacationApiProps, VacationApiProps>(val),
    mutationKey: ['vacation-post'],
  })

  const { isPending: loadingGetVacation, mutateAsync } = useMutation({
    mutationKey: ['vacation-get'],
    mutationFn: () =>
      getData<VacationWithDatesApiProps[]>({
        url: '/vacation',
        query: 'include.dates=true',
      }),
  })
  const { data: dataGetVacationById, isLoading: loadingGetVacationById } =
    useQuery({
      queryFn: ({ signal }) =>
        getData<VacationWithDatesApiProps>({
          url: 'vacation',
          id: dayEditId,
          signal,
          query: 'include.users=true&&include.dates=true',
        }),
      queryKey: ['vacation-by-id-get', dayEditId],
      enabled: !!dayEditId && dayEditId > 0,
    })

  const { data: dataGetUser, isLoading: loadingGetUser } = useQuery({
    queryKey: ['user-get'],
    queryFn: ({ signal }) =>
      getData<UserApiProps[]>({
        url: '/user',
        signal,
      }),
  })

  const onSubmit = (data: FormVacationProps) => {
    try {
      const parseData = {
        ...data,
        userIds: data.userIds.map((a) => parseInt(a, 10)),
        // dates: data.dates.map((a) => new Date(a).toISOString()),
      }
      console.log(data.dates)
      mutatePost({
        url: '/vacation',
        data: parseData,
      })
        .then(() => {
          toast.success('Plans registered successfully')
          setModalOpen(false)
          mutateAsync().then((dataGetVacation) => {
            if (dataGetVacation) {
              const datesTemp = setDatesOnCalendar(dataGetVacation)
              setDateField(datesTemp)
            }
            reset()
          })
        })
        .catch((error: any) => {
          toastErrorsApi(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (daySelected) {
      setValue('dates', [daySelected.toISOString()])
    }
  }, [daySelected, setValue])

  useEffect(() => {
    if (dataGetVacationById) {
      setValue('title', dataGetVacationById.title)
      setValue(
        'userIds',
        dataGetVacationById.users?.map((a) => String(a.id)),
      )
      setValue(
        'dates',
        dataGetVacationById.dates?.map((a) => a.date),
      )
      setValue('location', dataGetVacationById.location)
      setValue('description', dataGetVacationById.description)
    }
  }, [dataGetVacationById, setValue])

  const loading =
    loadingPost ||
    loadingGetUser ||
    loadingGetVacationById ||
    loadingGetVacation

  return (
    <Modal
      isOpen={modalOpen}
      backdrop="opaque"
      classNames={{
        backdrop: 'blur-md',
      }}
      size="5xl"
      onOpenChange={setModalOpen}
      hideCloseButton
      onClose={() => {
        reset()
        setDayEditId(0)
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mt-4 flex items-center justify-between gap-1">
              Plans for {format(daySelected ?? new Date(), 'MMMM')}
              <Button
                radius="full"
                variant="light"
                isIconOnly
                onPress={onClose}
              >
                <FaTimes />
              </Button>
            </ModalHeader>
            <ModalBody>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4"
                id="formVacation"
              >
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Field is required' }}
                  render={({ field, fieldState: { error } }) => (
                    <Skeleton isLoaded={!loading}>
                      <Input
                        label="Title"
                        type="text"
                        id={field.name}
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        variant="bordered"
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        disabled={loading}
                        isRequired
                      />
                    </Skeleton>
                  )}
                />
                <Controller
                  name="dates"
                  control={control}
                  defaultValue={[]}
                  render={({ field, fieldState: { error } }) => (
                    <Skeleton className="rounded-md" isLoaded={!loading}>
                      <Select
                        label="Days selected"
                        selectedKeys={
                          Array.isArray(field.value)
                            ? new Set(field.value)
                            : new Set()
                        }
                        variant="bordered"
                        classNames={{
                          value: 'text-foreground',
                          label: 'overflow-visible',
                          base: 'w-full',
                        }}
                        onSelectionChange={(value) =>
                          field.onChange(Array.from(value))
                        }
                        id={field.name}
                        name={field.name}
                        isLoading={loading}
                        items={allDaysInMonth ?? []}
                        selectionMode="multiple"
                        isMultiline={(allDaysInMonth?.length ?? 0) > 0}
                        renderValue={(items) => {
                          return (
                            <div className="flex flex-wrap gap-2">
                              {items.map((item) => (
                                <Chip key={item.key}>
                                  {format(
                                    new Date(item.data?.label ?? ''),
                                    'dd',
                                  )}
                                </Chip>
                              ))}
                            </div>
                          )
                        }}
                      >
                        {(item) => (
                          <SelectItem
                            key={item.label}
                            className="capitalize"
                            textValue={String(item.label)}
                          >
                            <div className="flex flex-col gap-2">
                              <span className="font-bold">
                                {format(new Date(item.label ?? ''), 'dd')}
                              </span>
                            </div>
                          </SelectItem>
                        )}
                      </Select>
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
                        label="Participants"
                        id={field.name}
                        onSelectionChange={(value) =>
                          field.onChange(Array.from(value))
                        }
                        name={field.name}
                        selectedKeys={
                          Array.isArray(field.value)
                            ? new Set(field.value)
                            : new Set()
                        }
                        variant="bordered"
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        classNames={{
                          value: 'text-foreground',
                          label: 'overflow-visible',
                          base: 'w-full',
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
                                    classNames={{
                                      base: 'h-full',
                                      content: 'px-0 pr-0',
                                      closeButton:
                                        'ml-3 [&>svg]:h-[1.4em] [&>svg]:w-[1.4em]',
                                    }}
                                  >
                                    {item.data?.photo && (
                                      <User
                                        name={
                                          item.data?.name ||
                                          'Nome não informado'
                                        }
                                        avatarProps={{
                                          name: item.data?.name || '',
                                          showFallback: true,
                                          className: 'mr-2 cursor-pointer',
                                          src: item.data?.photo,
                                        }}
                                        classNames={{
                                          description: 'cursor-pointer',
                                          name: 'cursor-pointer',
                                          base: 'flex',
                                        }}
                                      />
                                    )}
                                    {!item.data?.photo && (
                                      <span className="ml-2">
                                        {item?.data?.name}
                                      </span>
                                    )}
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
                <Controller
                  name="location"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <Skeleton isLoaded={!loading}>
                      <Input
                        label="Location"
                        type="text"
                        id={field.name}
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        variant="bordered"
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        disabled={loading}
                      />
                    </Skeleton>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <Skeleton isLoaded={!loading}>
                      <Textarea
                        label="Description"
                        id={field.name}
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        variant="bordered"
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        disabled={loading}
                      />
                    </Skeleton>
                  )}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                No
              </Button>
              <Button
                color="primary"
                type="submit"
                form="formVacation"
                // onPress={() => {
                //   onClose()
                // }}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
