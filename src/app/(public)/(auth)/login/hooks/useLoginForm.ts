import { useAuthState } from '@/hooks/auth'
import { toastErrorsApi } from '@/lib/functions.api'
import { login } from '@/services/auth.service'
import { setAuthCookies } from '@/services/token.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const useLoginForm = (redirect: string = '') => {
  const { setProfile } = useAuthState()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: async (data) => {
      await setAuthCookies(data)
      setProfile(data.user)
      router.push(redirect || '/dashboard')
    },
    onError: (error: AxiosError) => {
      toastErrorsApi(error)
    },
  })

  return {
    login: mutate,
    isPending,
  }
}
