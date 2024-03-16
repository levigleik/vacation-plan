import { VacationApiProps } from '@/types/models/vaction'
import { DateVacationApiProps } from '@/types/models/dateVacation'

export interface DashboardHookProps {
  modalOpen: boolean
  setModalOpen: (modal: boolean) => void
  dateField?: Record<number, DateCalendarProps[]>
  setDateField: (dateField: Record<number, DateCalendarProps[]>) => void
  dataGetVacation?: VacationWithDatesApiProps[]
  setDataGetVacation: (data: VacationWithDatesApiProps[]) => void
  daySelected?: Date
  setDaySelected: (day: Date) => void
  month?: number
  setMonth: (month: number) => void
  dayEditId: number
  setDayEditId: (id: number) => void
}

export interface DashboardProps {
  month: number
}

export type FormVacationProps = VacationApiProps & {
  userIds: string[]
  dates: string[]
}

export type DateCalendarProps = {
  id: number
  date: Date
}

export type VacationWithDatesApiProps = Omit<VacationApiProps, 'dates'> & {
  dates: DateVacationApiProps[]
}
