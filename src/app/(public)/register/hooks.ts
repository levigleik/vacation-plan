import { create } from 'zustand'
import { DashboardHookProps } from '@/app/(private)/(dashboard)/types'
import { DashboardSummaryHookProps } from '@/app/(private)/(dashboard)/components/summary/types'
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
