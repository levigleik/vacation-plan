import { UserApiProps } from '@/types/user'
import { DefaultApiProps } from '@/types/index'

export interface GroupApiProps extends DefaultApiProps {
  name: string
  description: string
  photo: string
  password: string
  users: UserApiProps[]
}
