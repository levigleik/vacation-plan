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
import { GroupApiProps } from '@/types/group'
import { columnsGroups } from '@/app/(private)/group/constants'
import { toast } from 'react-toastify'

export default function Group() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['group-get'],
    queryFn: ({ signal }) =>
      getData<GroupApiProps[]>({ url: '/group', signal }),
  })

  const { mutateAsync: mutateDelete, isPending: loadingDelete } = useMutation({
    mutationFn: async (val: DeleteData) => deleteData<GroupApiProps>(val),
    mutationKey: ['group-delete'],
  })
  const [itemDelete, setItemDelete] = useState<number>()

  const router = useRouter()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const deleteItem = (id: number) => {
    mutateDelete({
      url: `/group`,
      id: id,
    })
      .then(() => {
        toast.success('Group deleted successfully')
        void refetch()
      })
      .catch((err) => {
        toastErrorsApi(err)
      })
  }

  const finalColumns: ColumnProps<GroupApiProps>[] = [
    ...columnsGroups,
    {
      uid: 'actions',
      label: 'Ações',
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
              onClick={() => router.push(`group/${item.id}`)}
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
                Tem certeza que deseja deletar o grupo?
              </ModalHeader>
              <ModalBody>
                <div className={'flex flex-col gap-2 text-default-600'}>
                  Você está prestes a deletar o grupo, deseja continuar?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Não
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (!itemDelete) return
                    deleteItem(itemDelete)
                    onClose()
                  }}
                >
                  Sim
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
