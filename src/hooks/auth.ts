import { clearAuthCookies } from '@/services/token.service'
import { AuthStoreProps } from '@/types/auth'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthState = create<AuthStoreProps>()(
  devtools(
    persist(
      (set, get) => ({
        setProfile: (profile) => {
          set(() => ({ profile }))
        },
        logout: async () => {
          set(() => ({
            profile: undefined,
            signed: false,
          }))
          await clearAuthCookies()
          window.location.reload()
        },
      }),
      {
        name: 'auth-state',
      },
    ),
  ),
)
