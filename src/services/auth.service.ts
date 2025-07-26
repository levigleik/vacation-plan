import { FormLoginProps, LoginResponseProps } from '@/app/(public)/(auth)/login/types'
import { FormRegisterProps } from '@/app/(public)/(auth)/register/types'
import { cookiesSettings } from '@/lib/constants'
import { postData } from '@/lib/functions.api'
import { UserApiProps } from '@/types/models/user'
import Cookie from 'js-cookie'

export const AuthService = {
  login: async (credentials: FormLoginProps): Promise<LoginResponseProps> => {
    return postData<LoginResponseProps, FormLoginProps>({
      url: 'auth/login',
      data: credentials,
    })
  },
  register: async (userData: FormRegisterProps): Promise<UserApiProps> => {
    return postData<UserApiProps, FormRegisterProps>({
      url: 'user',
      data: userData,
    })
  },

  setAuthCookies: (data: LoginResponseProps): void => {
    Cookie.set('signed', 'true', cookiesSettings)
    Cookie.set('idToken', data.idToken, cookiesSettings)
    Cookie.set('refreshToken', data.refreshToken, cookiesSettings)
  },

  clearAuthCookies: (): void => {
    Cookie.remove('signed')
    Cookie.remove('idToken')
    Cookie.remove('refreshToken')
  },
}
