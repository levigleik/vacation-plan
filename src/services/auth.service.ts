import {
  FormLoginProps,
  LoginResponseProps,
} from '@/app/(public)/(auth)/login/types'
import { FormRegisterProps } from '@/app/(public)/(auth)/register/types'
import { postData } from '@/lib/functions.api'
import { UserApiProps } from '@/types/models/user'

export const login = async (
  credentials: FormLoginProps,
): Promise<LoginResponseProps> => {
  return postData<LoginResponseProps, FormLoginProps>({
    url: 'auth/login',
    data: credentials,
  })
}
export const register = async (
  userData: FormRegisterProps,
): Promise<UserApiProps> => {
  return postData<UserApiProps, FormRegisterProps>({
    url: 'user',
    data: userData,
  })
}
