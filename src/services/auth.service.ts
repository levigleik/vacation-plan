import {
  FormLoginProps,
  LoginResponseProps,
} from '@/app/(public)/(auth)/login/types'
import { cookiesSettings } from '@/lib/constants'
import { postData } from '@/lib/functions.api'
import Cookie from 'js-cookie'

export const AuthService = {
  login: async (credentials: FormLoginProps): Promise<LoginResponseProps> => {
    console.log('VEIO AQUI MESMO')
    return postData<LoginResponseProps, FormLoginProps>({
      url: 'auth/login',
      data: credentials,
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
