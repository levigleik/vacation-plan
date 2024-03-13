import { GroupApiProps } from '@/types/group'

export type FormGroupProps = Omit<GroupApiProps, 'userIds'> & {
  userIds: string[]
}
