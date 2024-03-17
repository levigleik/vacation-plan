import { create } from 'zustand'
import { DashboardHookProps } from '@/app/(private)/(dashboard)/types'
import { DashboardMonthHookProps } from '@/app/(private)/(dashboard)/components/months/types'
export const useDashboardMonthHook = create<DashboardMonthHookProps>()(
  (set, get) => ({
    modalVacationOpen: false,
    dayEditId: 0,
    setModalVacationOpen: (modalOpen) => set({ modalVacationOpen: modalOpen }),
    setMonth: (month) => set({ month }),
    setDayEditId: (dayEditId) => set({ dayEditId }),
    setDaySelected: (daySelected) => set({ daySelected }),
  }),
)
