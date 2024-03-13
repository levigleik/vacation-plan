import { ColumnProps } from 'components/table/types'
import { GroupApiProps } from '@/types/group'

export const columnsGroups: ColumnProps<GroupApiProps>[] = [
  {
    uid: 'name',
    label: 'Nome',
    sortable: true,
    filterable: true,
  },
]
