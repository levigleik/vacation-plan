'use client'

import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Skeleton,
  User,
} from '@nextui-org/react'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getData, toastErrorsApi } from '@/lib/functions.api'
import {
  FormVacationProps,
  VacationWithDatesApiProps,
} from '@/app/(private)/(dashboard)/types'
import { FaTimes } from 'react-icons/fa'
import { setDatesOnCalendar } from '@/app/(private)/(dashboard)/functions'
import { UserApiProps } from '@/types/models/user'
import { useDashboardSummaryHook } from '@/app/(private)/(dashboard)/components/summary/hook'

export const ModalFilterDashboard = () => {
  const { setDataGetVacation, setDateField, setLoadingGetVacation } =
    useDashboardHook()

  const { modalFilterOpen, setModalFilterOpen, setFiltered } =
    useDashboardSummaryHook()

  const { handleSubmit, setValue, control, reset } = useForm<
    FormVacationProps,
    'vacation'
  >()

  const { isPending: loadingGetVacation, mutateAsync } = useMutation({
    mutationKey: ['vacation-get'],
    mutationFn: (val: FormVacationProps) =>
      getData<VacationWithDatesApiProps[]>({
        url: '/vacation',
        query: `include.dates=true&&include.users=true${
          !!val?.userIds?.length
            ? `&&where.users.some.id.in=[${val.userIds}]`
            : ''
        }`,
      }),
  })

  const { data: dataGetUser, isLoading: loadingGetUser } = useQuery({
    queryKey: ['user-get'],
    queryFn: ({ signal }) =>
      getData<UserApiProps[]>({
        url: '/user',
        signal,
      }),
  })

  const handleClose = () => {
    setModalFilterOpen(false)
  }

  const onSubmit = (data: FormVacationProps) => {
    const parseData = {
      ...data,
      userIds: data.userIds?.map((a) => a),
    }
    setModalFilterOpen(false)
    setLoadingGetVacation(true)
    mutateAsync(parseData)
      .then((res) => {
        if (res) {
          const datesTemp = setDatesOnCalendar(res)
          setDateField(datesTemp)
          setDataGetVacation(res)
          if (parseData.userIds?.length !== 0) setFiltered(true)
          reset()
          setLoadingGetVacation(false)
        }
      })
      .catch((err) => {
        setLoadingGetVacation(false)
        toastErrorsApi(err)
      })
  }

  const loading = loadingGetVacation

  return (
    <Modal
      isOpen={modalFilterOpen}
      backdrop="opaque"
      classNames={{
        backdrop: 'blur-md',
      }}
      size="5xl"
      onOpenChange={setModalFilterOpen}
      hideCloseButton
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalContent className="max-h-[95dvh]">
        {(onClose) => (
          <>
            <ModalHeader className="mt-4 flex items-center justify-between gap-1">
              <span>Filtering data</span>
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
                  name="userIds"
                  control={control}
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
                              <User
                                name={item?.name || 'Nome não informado'}
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
              </form>
            </ModalBody>
            <ModalFooter className="flex w-full justify-between">
              <Button
                color="primary"
                type="submit"
                form="formVacation"
                className="self-end"
              >
                Filter
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
