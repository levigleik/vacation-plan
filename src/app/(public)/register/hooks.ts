import { create } from 'zustand'
import { RegisterHookProps } from '@/app/(public)/register/types'

export const useRegisterHook = create<RegisterHookProps>()((set, get) => ({
  modalOpen: false,
  setImage: (image: File) => {
    set({ image })
  },
  setModalOpen: (modalOpen: boolean) => {
    set({ modalOpen })
  },
}))
