import { useAuthState } from '@/hooks/auth'
import { toastErrorsApi } from '@/lib/functions.api'
import { register } from '@/services/auth.service'
import { addToast } from '@heroui/toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const useRegisterForm = (redirect: string = '') => {
  const { setProfile } = useAuthState()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    mutationKey: ['register'],
    onSuccess: (data) => {
      addToast({
        description: 'User registered successfully, redirecting...',
      })
      setProfile(data)
      if (redirect) router.push(redirect)
      else router.push('/')
    },
    onError: (error: AxiosError) => {
      toastErrorsApi(error)
    },
  })

  return {
    register: mutate,
    isPending,
  }
}
