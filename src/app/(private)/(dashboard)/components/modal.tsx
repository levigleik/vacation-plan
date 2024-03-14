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
import { format } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getData } from '@/lib/functions.api'
import { UserApiProps } from '@/types/models/user'
import { FormVacationProps } from '@/app/(private)/(dashboard)/types'
import { FaTimes } from 'react-icons/fa'

export const ModalDashboard = () => {
  const { modalOpen, setModalOpen, dateField, month } = useDashboardHook()

  const { handleSubmit, setValue, control, reset, getValues } = useForm<
    FormVacationProps,
    'vacation'
  >()
  const loading = false

  const daysSelected = (dateField?.[month ?? 0] ?? []).map((date) => ({
    id: date.getDate(),
    label: format(date, 'dd'),
  }))

  const { data: dataGetUser, isLoading: loadingGetUser } = useQuery({
    queryKey: ['user-get'],
    queryFn: ({ signal }) =>
      getData<UserApiProps[]>({
        url: '/user',
        signal,
      }),
  })

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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mt-4 flex items-center justify-between gap-1">
              Plans for{' '}
              {format(dateField?.[month ?? 0]?.[0] ?? new Date(), 'MMMM')}
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
                    />
                  </Skeleton>
                )}
              />
              <Skeleton className="rounded-md" isLoaded={!loading}>
                <Select
                  label="Days selected"
                  selectedKeys={daysSelected?.map((a) => String(a.id)) ?? []}
                  variant="bordered"
                  color="primary"
                  classNames={{
                    value: 'text-foreground',
                    label: 'overflow-visible',
                    base: 'w-full',
                  }}
                  isRequired
                  isLoading={loading}
                  items={daysSelected ?? []}
                  selectionMode="multiple"
                  isDisabled
                  isMultiline={(daysSelected?.length ?? 0) > 0}
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.data?.label}</Chip>
                        ))}
                      </div>
                    )
                  }}
                >
                  {(item) => (
                    <SelectItem
                      key={item.id}
                      className="capitalize"
                      textValue={String(item.label)}
                    >
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">{item.label}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </Skeleton>
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
                      color="primary"
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
                                  <User
                                    name={
                                      item.data?.name || 'Nome não informado'
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
                rules={{ required: 'Field is required' }}
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
                rules={{ required: 'Field is required' }}
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                No
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onClose()
                }}
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
