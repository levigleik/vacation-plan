import { VacationApiProps } from '@/types/models/vaction'
import { DateVacationApiProps } from '@/types/models/dateVacation'

export interface DashboardHookProps {
  loadingGetVacation: boolean
  setLoadingGetVacation: (loading: boolean) => void
  dateField?: Record<number, DateCalendarProps[]>
  setDateField: (dateField: Record<number, DateCalendarProps[]>) => void
  dataGetVacation?: VacationWithDatesApiProps[]
  setDataGetVacation: (data: VacationWithDatesApiProps[]) => void
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
