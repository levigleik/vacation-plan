'use client'

import { useDashboardSummaryHook } from '@/app/(private)/dashboard/components/summary/hook'
import { Button } from '@heroui/react'
import { FaFilter } from 'react-icons/fa'

export const FilterButtonDashboard = () => {
  const { setModalFilterOpen } = useDashboardSummaryHook()

  return (
    <Button
      isIconOnly
      variant="light"
      className="w-fit rounded-full"
      onPress={() => {
        setModalFilterOpen(true)
      }}
    >
      <FaFilter className="text-main" />
    </Button>
  )
}
