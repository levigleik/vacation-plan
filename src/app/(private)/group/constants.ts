import { ColumnProps } from 'components/table/types'
import { GroupApiProps } from '@/types/group'

export const columnsGroups: ColumnProps<GroupApiProps>[] = [
  {
    uid: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
  },
]
