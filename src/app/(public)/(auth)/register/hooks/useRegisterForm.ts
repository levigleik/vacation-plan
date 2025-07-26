import { useAuthState } from '@/hooks/auth'
import { toastErrorsApi } from '@/lib/functions.api'
import { AuthService } from '@/services/auth.service'
import { addToast } from '@heroui/toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const useRegisterForm = (redirect: string = '') => {
  const { setProfile, setSigned } = useAuthState()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.register,
    mutationKey: ['register'],
    onSuccess: (data) => {
      addToast({
        description: 'User registered successfully, redirecting...',
      })
      setSigned(true)
      setProfile(data)
      if (redirect) router.push(redirect)
      else router.push('/')
    },
    onError: (error: AxiosError) => {
      toastErrorsApi(error)
      setSigned(false)
    },
  })

  return {
    register: mutate,
    isPending,
  }
}
