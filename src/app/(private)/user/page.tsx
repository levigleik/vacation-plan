'use client'

import Table from '@/components/table'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { ColumnProps } from 'components/table/types'
import { DeleteData } from '@/types/api'
import { deleteData, getData, toastErrorsApi } from '@/lib/functions.api'
import { UserApiProps } from '@/types/user'
import { toast } from 'react-toastify'
import { columnsUsers } from './constants'

export default function User() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-get'],
    queryFn: ({ signal }) => getData<UserApiProps[]>({ url: '/user', signal }),
  })

  const { mutateAsync: mutateDelete, isPending: loadingDelete } = useMutation({
    mutationFn: async (val: DeleteData) => deleteData<UserApiProps>(val),
    mutationKey: ['user-delete'],
  })
  const [itemDelete, setItemDelete] = useState<number>()

  const router = useRouter()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const deleteItem = (id: number) => {
    mutateDelete({
      url: `/user`,
      id: id,
    })
      .then(() => {
        toast.success('User deleted successfully')
        void refetch()
      })
      .catch((err) => {
        toastErrorsApi(err)
      })
  }

  const finalColumns: ColumnProps<UserApiProps>[] = [
    ...columnsUsers,
    {
      uid: 'actions',
      label: 'Actions',
      renderCell: (item) => (
        <div className="relative flex cursor-pointer items-center justify-end gap-5">
          <Tooltip
            content="Edit"
            placement="bottom-end"
            className="text-white"
            color="primary"
          >
            <Button
              isIconOnly
              color="primary"
              className="rounded-full text-white"
              onClick={() => router.push(`user/${item.id}`)}
            >
              <FaPencilAlt size={20} className="text-white" />
            </Button>
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="bottom-end"
            className="text-white"
            color="primary"
          >
            <Button
              isIconOnly
              color="danger"
              className="rounded-full"
              onClick={() => {
                setItemDelete(item.id)
                onOpen()
              }}
            >
              <FaTrash size={20} className="text-white" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  return (
    <>
      <Table data={data} columns={finalColumns} loading={isLoading} />
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        classNames={{
          backdrop: 'blur-md',
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-4 flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <div className={'flex flex-col gap-2 text-default-600'}>
                  You are about to delete the user, do you want to continue?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (!itemDelete) return
                    deleteItem(itemDelete)
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
    </>
  )
}
