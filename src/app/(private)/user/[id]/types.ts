import { GroupApiProps } from '@/types/group'

export type FormGroupApiProps = Omit<GroupApiProps, 'userIds'> & {
  userIds: string[]
}
