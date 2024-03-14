import { UserApiProps } from './user'
import { DefaultApiProps } from '@/types'

export interface VacationApiProps extends DefaultApiProps {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  users: UserApiProps[]
  reason: string
}
