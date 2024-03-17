import { create } from 'zustand'
import { DashboardMonthHookProps } from '@/app/(private)/(dashboard)/components/months/types'

export const useDashboardMonthHook = create<DashboardMonthHookProps>()(
  (set) => ({
    modalVacationOpen: false,
    dayEditId: 0,
    setModalVacationOpen: (modalOpen) => set({ modalVacationOpen: modalOpen }),
    setMonth: (month) => set({ month }),
    setDayEditId: (dayEditId) => set({ dayEditId }),
    setDaysSelected: (daysSelected) => set({ daysSelected }),
  }),
)
