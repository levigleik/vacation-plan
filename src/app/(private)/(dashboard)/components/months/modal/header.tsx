'use client'

import { format } from 'date-fns'

interface HeaderModalDashboardMonthProps {
  dayEditId: number
  daysSelected?: Date
}

export const HeaderModalDashboardMonth = ({
  dayEditId,
  daysSelected,
}: HeaderModalDashboardMonthProps) => {
  return (
    <>
      {!dayEditId && (
        <span>Plans for {format(daysSelected ?? new Date(), 'MMMM')}</span>
      )}
      {!!dayEditId && <span>Edit plan</span>}
    </>
  )
}
