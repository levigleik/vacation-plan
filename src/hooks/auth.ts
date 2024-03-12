import { AuthStoreProps } from '@/types/auth'
import Cookie from 'js-cookie'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthState = create<AuthStoreProps>()(
  devtools(
    persist(
      (set, get) => ({
        setProfile: (profile) => {
          set(() => ({ profile }))
        },
        setSigned: (signed) => {
          set(() => ({ signed }))
        },
        logout: async () => {
          set(() => ({
            profile: undefined,
            signed: false,
          }))
          Cookie.remove('signed')
          window.location.reload()
        },
      }),
      {
        name: 'auth-state',
      },
    ),
  ),
)
