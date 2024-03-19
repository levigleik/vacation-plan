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
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import {
  deleteData,
  getData,
  postData,
  putData,
  toastErrorsApi,
} from '@/lib/functions.api'
import { UserApiProps } from '@/types/models/user'
import {
  FormVacationProps,
  VacationWithDatesApiProps,
} from '@/app/(private)/(dashboard)/types'
import { FaFilePdf, FaTimes } from 'react-icons/fa'
import { DeleteData, PostData, PutData } from '@/types/api'
import { VacationApiProps } from '@/types/models/vaction'
import { toast } from 'react-toastify'
import { setDatesOnCalendar } from '@/app/(private)/(dashboard)/functions'
import { useEffect, useMemo } from 'react'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'
import { PrintSummaryDashboard } from '@/app/(private)/(dashboard)/components/summary/print'
import { PDFDownloadLink } from '@react-pdf/renderer'

export const ModalVacationDashboard = () => {
  const {
    setDataGetVacation,
    setDateField,
    setLoadingGetVacation,
    dataGetVacation,
  } = useDashboardHook()

  const {
    modalVacationOpen,
    setModalVacationOpen,
    dayEditId,
    setDayEditId,
    daysSelected,
    month,
    setDaysSelected,
  } = useDashboardMonthHook()

  const { handleSubmit, setValue, control, reset } = useForm<
    FormVacationProps,
    'vacation'
  >()

  const { mutateAsync: mutatePost, isPending: loadingPost } = useMutation({
    mutationFn: async (val: PostData<VacationApiProps>) =>
      postData<VacationApiProps, VacationApiProps>(val),
    mutationKey: ['vacation-post'],
  })

  const { mutateAsync: mutatePut, isPending: loadingPut } = useMutation({
    mutationFn: (val: PutData<VacationApiProps>) =>
      putData<VacationApiProps, VacationApiProps>(val),
    mutationKey: ['vacation-put'],
  })

  const { isPending: loadingGetVacation, mutateAsync } = useMutation({
    mutationKey: ['vacation-get'],
    mutationFn: () =>
      getData<VacationWithDatesApiProps[]>({
        url: '/vacation',
        query: 'include.dates=true&&include.users=true',
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

  const { mutateAsync: mutateDelete, isPending: loadingDelete } = useMutation({
    mutationFn: async (val: DeleteData) => deleteData<VacationApiProps>(val),
    mutationKey: ['vacation-delete'],
  })

  const { data: dataGetUser, isLoading: loadingGetUser } = useQuery({
    queryKey: ['user-get'],
    queryFn: ({ signal }) =>
      getData<UserApiProps[]>({
        url: '/user',
        signal,
      }),
  })

  const allDaysInMonth = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(2024, (month ?? 0) - 1))
    const daysInMonthParsed = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(2024, (month ?? 0) - 1, i + 1)
      return {
        id: date.toISOString(),
      }
    })
    const daysSelectedParsed =
      daysSelected?.days?.map((a) => {
        return {
          id: a.toISOString(),
        }
      }) ?? []

    const daysMerge = [...daysInMonthParsed, ...daysSelectedParsed]
    if (dataGetVacationById) {
      const daysVacation = dataGetVacationById.dates.map((a) => {
        return {
          id: a.date,
        }
      })
      return Array.from(
        new Set([...daysMerge, ...daysVacation].map((a) => a.id)),
      ).map((id) => ({
        id,
      }))
    }
    return Array.from(new Set(daysMerge.map((a) => a.id))).map((id) => ({
      id,
    }))
  }, [dataGetVacationById, daysSelected, month])

  const handleClose = (fromMutate?: boolean) => {
    setModalVacationOpen(false)
    if (dayEditId !== 0 || fromMutate) {
      setLoadingGetVacation(true)
      mutateAsync()
        .then((dataGetVacation) => {
          if (dataGetVacation) {
            const datesTemp = setDatesOnCalendar(dataGetVacation)
            setDateField(datesTemp)
            setDataGetVacation(dataGetVacation)
          }
          setLoadingGetVacation(false)
          reset()
          setDayEditId(0)
          setDaysSelected(undefined)
        })
        .catch(() => {
          setLoadingGetVacation(false)
          setDaysSelected(undefined)
        })
    }
  }

  useEffect(() => {
    mutateAsync().then((dataGetVacation) => {
      setDataGetVacation(dataGetVacation)
    })
  }, [mutateAsync, setDataGetVacation])

  const onSubmit = (data: FormVacationProps) => {
    const parseData = {
      ...data,
      userIds: data.userIds.map((a) => parseInt(a, 10)),
      dates: data.dates,
    }
    if (!dayEditId) {
      mutatePost({
        url: '/vacation',
        data: parseData,
      })
        .then(() => {
          toast.success('Plans registered successfully')
          handleClose(true)
        })
        .catch((error: any) => {
          toastErrorsApi(error)
        })
    } else {
      mutatePut({
        url: '/vacation',
        data: parseData,
        id: dayEditId,
      })
        .then(() => {
          toast.success('Plans updated successfully')
          handleClose()
        })
        .catch((error: any) => {
          toastErrorsApi(error)
        })
    }
  }

  useEffect(() => {
    if (daysSelected) {
      setValue(
        'dates',
        daysSelected?.days?.map((a) => a.toISOString()),
      )
    }
  }, [daysSelected, setValue])

  useEffect(() => {
    if (dataGetVacationById) {
      const values = {
        title: dataGetVacationById.title,
        dates: dataGetVacationById.dates.map((a) => a.date),
        userIds: dataGetVacationById.users.map((a) => String(a.id)),
        location: dataGetVacationById.location,
        description: dataGetVacationById.description,
      }
      setValue('title', values.title)
      setValue('dates', values.dates)
      setValue('userIds', values.userIds)
      setValue('location', values.location)
      setValue('description', values.description)
    }
  }, [dataGetVacationById, setValue])

  const loading =
    loadingPost ||
    loadingGetUser ||
    loadingGetVacationById ||
    loadingGetVacation ||
    loadingPut ||
    loadingDelete

  const handleDelete = () => {
    mutateDelete({
      url: `/vacation`,
      id: dayEditId,
    })
      .then(() => {
        toast.success('Plans deleted successfully')
        handleClose()
      })
      .catch((error: any) => {
        toastErrorsApi(error)
      })
  }

  return (
    <Modal
      isOpen={modalVacationOpen}
      backdrop="opaque"
      classNames={{
        backdrop: 'blur-md',
      }}
      size="5xl"
      onOpenChange={setModalVacationOpen}
      hideCloseButton
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalContent className="max-h-[95dvh]">
        {(onClose) => (
          <>
            <ModalHeader className="mt-4 flex items-center justify-between gap-1">
              {!dayEditId && (
                <span>
                  Plans for{' '}
                  {format(daysSelected?.days?.[0] ?? new Date(), 'MMMM')}
                </span>
              )}
              {!!dayEditId && (
                <span>
                  Edit plans in{' '}
                  {format(daysSelected?.days?.[0] ?? new Date(), 'MMMM')}
                </span>
              )}
              <div className="flex gap-4">
                {!!dataGetVacationById && dayEditId !== 0 && (
                  <PDFDownloadLink
                    document={
                      <PrintSummaryDashboard vacation={dataGetVacationById} />
                    }
                    fileName={`${dataGetVacationById.title}.pdf`}
                  >
                    {({ loading }) => (
                      <Skeleton className="rounded-full" isLoaded={!loading}>
                        <Button
                          isIconOnly
                          title="Print"
                          variant="light"
                          color="danger"
                          radius="full"
                          disabled={loading}
                        >
                          <FaFilePdf size={20} />
                        </Button>
                      </Skeleton>
                    )}
                  </PDFDownloadLink>
                )}
                <Button
                  radius="full"
                  variant="light"
                  isIconOnly
                  onPress={onClose}
                >
                  <FaTimes />
                </Button>
              </div>
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
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        isMultiline={(allDaysInMonth?.length ?? 0) > 0}
                        disabledKeys={dataGetVacation
                          ?.filter((a) =>
                            a.dates.every(
                              (b) =>
                                new Date(b.date).getMonth() ===
                                (month ?? 0) - 1,
                            ),
                          )
                          .reduce((acc, curr) => {
                            return [
                              ...acc,
                              ...curr.dates.map((a) =>
                                format(new Date(a.date), 'dd'),
                              ),
                            ]
                          }, [] as string[])}
                        renderValue={(items) => {
                          return (
                            <div className="flex flex-wrap gap-2">
                              {items.map((item) => (
                                <Chip key={item.key}>
                                  {format(item.data?.id ?? new Date(), 'dd')}
                                </Chip>
                              ))}
                            </div>
                          )
                        }}
                      >
                        {(item) => (
                          <SelectItem
                            key={item.id}
                            className="capitalize"
                            textValue={String(item.id)}
                          >
                            <div className="flex flex-col gap-2">
                              <span className="font-bold">
                                {format(item.id, 'dd')}
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
                                        name={item.data?.name || 'No name'}
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
                              <User
                                name={item?.name || 'No name'}
                                avatarProps={{
                                  name: item?.name || '',
                                  showFallback: true,
                                  className: 'mr-2 cursor-pointer',
                                  src: item?.photo,
                                }}
                                classNames={{
                                  description: 'cursor-pointer',
                                  name: 'cursor-pointer',
                                  base: 'flex justify-start',
                                }}
                              />
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
            <ModalFooter className="flex w-full justify-between">
              {
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Button
                      color="danger"
                      variant="light"
                      isDisabled={!dayEditId}
                    >
                      Delete
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Are you sure to delete?
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={() => {
                            handleDelete()
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          color="primary"
                          variant="light"
                          onPress={() => {
                            onClose()
                          }}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              }
              <Button
                color="primary"
                type="submit"
                form="formVacation"
                className="self-end"
                // onPress={() => {
                //   onClose()
                // }}
              >
                {!!dayEditId ? 'Update' : 'Save'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
