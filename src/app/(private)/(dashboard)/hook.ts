import { create } from 'zustand'
import { DashboardHookProps } from '@/app/(private)/(dashboard)/types'
export const useDashboardHook = create<DashboardHookProps>()((set, get) => ({
  modalVacationOpen: false,
  modalFilterOpen: false,
  filtered: false,
  loadingGetVacation: false,
  dayEditId: 0,
  setLoadingGetVacation: (loading) => set({ loadingGetVacation: loading }),
  setDataGetVacation: (dataGetVacation) => set({ dataGetVacation }),
  setDateField: (dateField) => set({ dateField }),
}))
