'use client'

import { Button } from '@nextui-org/react'
import { FaFilter } from 'react-icons/fa'
import { useDashboardSummaryHook } from '@/app/(private)/(dashboard)/components/summary/hook'

export const FilterButtonDashboard = () => {
  const { setModalFilterOpen } = useDashboardSummaryHook()

  return (
    <Button
      isIconOnly
      variant="light"
      className="w-fit rounded-full"
      onClick={() => {
        setModalFilterOpen(true)
      }}
    >
      <FaFilter className="text-main" />
    </Button>
  )
}
