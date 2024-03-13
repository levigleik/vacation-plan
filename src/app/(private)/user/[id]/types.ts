import { UserApiProps } from '@/types/user'

export type FormUserProps = UserApiProps & {
  passwordConfirmation?: string
}
