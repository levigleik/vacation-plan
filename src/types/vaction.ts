import { CommentApiProps } from '@/types/comment'
import { UserApiProps } from '@/types/user'
import { DefaultApiProps } from '@/types/index'
import { GroupApiProps } from '@/types/group'

export interface VacationApiProps extends DefaultApiProps {
  title: string
  description: string
  startDate: string
  endDate: string
  comments: CommentApiProps[]
  users: UserApiProps[]
  groups: GroupApiProps[]
  reason: string
}
