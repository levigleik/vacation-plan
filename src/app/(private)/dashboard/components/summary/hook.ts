import { DashboardSummaryHookProps } from '@/app/(private)/dashboard/components/summary/types'
import { create } from 'zustand'

export const useDashboardSummaryHook = create<DashboardSummaryHookProps>()(
  (set) => ({
    modalFilterOpen: false,
    filtered: false,
    setFiltered: (filtered) => set({ filtered }),
    setModalFilterOpen: (modalOpen) => set({ modalFilterOpen: modalOpen }),
  }),
)
