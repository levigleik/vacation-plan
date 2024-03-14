import { VacationApiProps } from '@/types/models/vaction'

export interface DashboardHookProps {
  modalOpen: boolean
  setModalOpen: (modal: boolean) => void
  dateField?: Record<number, Date[]>
  setDateField: (dateField: Record<number, Date[]>) => void
  month?: number
  setMonth: (month: number) => void
}

export interface CalendarDashboardProps {
  month: number
}

export type FormVacationProps = VacationApiProps & {
  userIds: string[]
}
