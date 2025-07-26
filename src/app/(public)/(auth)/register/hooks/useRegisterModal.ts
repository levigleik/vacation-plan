import { RegisterHookProps } from '@/app/(public)/(auth)/register/types'
import { create } from 'zustand/index'

export const useRegisterHook = create<RegisterHookProps>()((set) => ({
  modalOpen: false,
  setImage: (image?: File) => {
    set({ image })
  },
  setModalOpen: (modalOpen: boolean) => {
    set({ modalOpen })
  },
}))
