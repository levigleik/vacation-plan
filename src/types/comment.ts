import { DefaultApiProps } from '@/types/index'

export interface CommentApiProps extends DefaultApiProps {
  description: string
  photo?: string
  vacationId: number
}
