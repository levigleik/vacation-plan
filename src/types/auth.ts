import { DefaultApiProps } from '@/types/index'
import { UserApiProps } from '@/types/models/user'

export interface AuthStoreProps {
  profile?: Omit<UserApiProps, keyof DefaultApiProps>
  setProfile: (profile: Omit<UserApiProps, keyof DefaultApiProps>) => void
  signed?: boolean
  setSigned: (signed: boolean) => void
  logout: () => void
}

export interface TokenProps {
  exp: number
  iat: number
  sessionId: number
}
