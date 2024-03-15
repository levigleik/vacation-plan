import { create } from 'zustand'
import { DashboardHookProps } from '@/app/(private)/(dashboard)/types'

export const fakeData: Record<number, Date[]> = {
  0: [new Date(2024, 0, 1), new Date(2024, 0, 2), new Date(2024, 0, 3)],
  1: [new Date(2024, 1, 17), new Date(2024, 1, 2)],
  2: [new Date(2024, 2, 11), new Date(2024, 2, 12)],
  3: [new Date(2024, 3, 6), new Date(2024, 3, 7)],
  4: [new Date(2024, 4, 5), new Date(2024, 4, 2)],
  5: [new Date(2024, 5, 14), new Date(2024, 5, 2)],
  6: [new Date(2024, 6, 4), new Date(2024, 6, 1)],
  7: [new Date(2024, 7, 8), new Date(2024, 7, 21)],
  8: [new Date(2024, 8, 1), new Date(2024, 8, 20)],
  9: [new Date(2024, 9, 21), new Date(2024, 9, 20)],
  10: [new Date(2024, 10, 14), new Date(2024, 10, 2)],
  11: [new Date(2024, 11, 1), new Date(2024, 11, 2)],
}
export const useDashboardHook = create<DashboardHookProps>()((set, get) => ({
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
  setMonth: (month) => set({ month }),
  // dateField: fakeData,
  dayEditId: 0,
  setDayEditId: (dayEditId) => set({ dayEditId }),
  setDaySelected: (daySelected) => set({ daySelected }),
  setDateField: (dateField) => set({ dateField }),
}))
