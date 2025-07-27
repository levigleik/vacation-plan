import { useAuthState } from '@/hooks/auth'
import { toastErrorsApi } from '@/lib/functions.api'
import { AuthService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const useLoginForm = (redirect: string = '') => {
  const { setProfile, setSigned } = useAuthState()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.login,
    mutationKey: ['login'],
    onSuccess: (data) => {
      AuthService.setAuthCookies(data)
      setSigned(true)
      setProfile(data.user)
      router.push(redirect || '/dashboard')
    },
    onError: (error: AxiosError) => {
      toastErrorsApi(error)
      setSigned(false)
    },
  })

  return {
    login: mutate,
    isPending,
  }
}
