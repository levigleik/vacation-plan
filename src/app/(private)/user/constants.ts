import { ColumnProps } from 'components/table/types'
import { UserApiProps } from '@/types/user'

export const columnsUsers: ColumnProps<UserApiProps>[] = [
  {
    uid: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    uid: 'email',
    label: 'E-mail',
    sortable: true,
    filterable: true,
  },
]
