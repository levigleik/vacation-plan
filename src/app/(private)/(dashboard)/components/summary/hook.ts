import { create } from 'zustand'
import { DashboardHookProps } from '@/app/(private)/(dashboard)/types'
import { DashboardSummaryHookProps } from '@/app/(private)/(dashboard)/components/summary/types'
export const useDashboardSummaryHook = create<DashboardSummaryHookProps>()(
  (set, get) => ({
    modalFilterOpen: false,
    filtered: false,
    setFiltered: (filtered) => set({ filtered }),
    setModalFilterOpen: (modalOpen) => set({ modalFilterOpen: modalOpen }),
  }),
)
