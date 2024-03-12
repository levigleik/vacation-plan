import { UserApiProps } from '@/types/user'

export interface AuthStoreProps {
  profile?: Omit<UserApiProps, 'id'>
  setProfile: (profile: UserApiProps) => void
  signed?: boolean
  setSigned: (signed: boolean) => void
}
