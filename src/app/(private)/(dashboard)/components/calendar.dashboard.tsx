'use client'

import { Calendar } from 'components/calendar'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { CalendarDashboardProps } from '@/app/(private)/(dashboard)/types'
import { useState } from 'react'

export const CalendarDashboard = ({ month }: CalendarDashboardProps) => {
  const { dateField, setDateField } = useDashboardHook()

  return (
    <Calendar
      disabled={
        // all days outside this month
        (date) => date.getMonth() !== month - 1
      }
      mode="multiple"
      month={new Date(2024, month, 0)}
      selected={dateField?.[month] ?? []}
      // showOutsideDays={false}
      onSelect={(date) => {
        if (date) setDateField({ ...dateField, [month]: date })
      }}
      components={{
        Caption: () => null,
      }}
      className="mx-auto h-full"
      classNames={{
        day: 'w-10 h-10',
        head_cell: 'w-10 h-10',
      }}
    />
  )
}
