export interface DashboardMonthHookProps {
  modalVacationOpen: boolean
  setModalVacationOpen: (modal: boolean) => void
  daysSelected?: { month: number; days: Date[] }
  setDaysSelected: (days?: { month: number; days: Date[] }) => void
  month?: number
  setMonth: (month: number) => void
  dayEditId: number
  setDayEditId: (id: number) => void
}
