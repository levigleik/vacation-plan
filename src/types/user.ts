import { DefaultApiProps } from '@/types/index'

export interface UserApiProps extends DefaultApiProps {
  name: string
  email: string
  photo: string
  password: string
  groupsIds: number[]
}
