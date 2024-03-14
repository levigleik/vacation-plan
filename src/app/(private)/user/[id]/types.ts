import { UserApiProps } from '@/types/models/user'

export type FormUserProps = UserApiProps & {
  passwordConfirmation?: string
  newPassword?: string
}
