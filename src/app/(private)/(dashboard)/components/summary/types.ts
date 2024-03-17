import { VacationWithDatesApiProps } from '@/app/(private)/(dashboard)/types'

export interface DashboardSummaryHookProps {
  modalFilterOpen: boolean
  setModalFilterOpen: (modal: boolean) => void
  filtered: boolean
  setFiltered: (filtered: boolean) => void
}

export interface PrintSummaryDashboardProps {
  vacation?: VacationWithDatesApiProps
}
