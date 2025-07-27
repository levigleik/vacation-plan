import { DashboardHookProps } from '@/app/(private)/dashboard/types'
import { create } from 'zustand'

export const useDashboardHook = create<DashboardHookProps>()((set) => ({
  modalVacationOpen: false,
  modalFilterOpen: false,
  filtered: false,
  loadingGetVacation: false,
  dayEditId: 0,
  setLoadingGetVacation: (loading) => set({ loadingGetVacation: loading }),
  setDataGetVacation: (dataGetVacation) => set({ dataGetVacation }),
  setDateField: (dateField) => set({ dateField }),
}))
