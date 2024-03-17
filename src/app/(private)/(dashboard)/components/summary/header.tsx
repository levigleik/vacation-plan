'use client'
import { FilterButtonDashboard } from '@/app/(private)/(dashboard)/components/summary/filter'
import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { FaTimes } from 'react-icons/fa'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { getData } from '@/lib/functions.api'
import { VacationWithDatesApiProps } from '@/app/(private)/(dashboard)/types'
import { useDashboardSummaryHook } from '@/app/(private)/(dashboard)/components/summary/hook'

export const HeaderSummaryDashboard = () => {
  const { setDataGetVacation, setLoadingGetVacation } = useDashboardHook()

  const { filtered, setFiltered } = useDashboardSummaryHook()

  const { mutateAsync } = useMutation({
    mutationKey: ['vacation-get'],
    mutationFn: () =>
      getData<VacationWithDatesApiProps[]>({
        url: '/vacation',
        query: 'include.dates=true&&include.users=true',
      }),
  })

  return (
    <div className="flex w-full justify-between pl-4">
      <h1 className="text-2xl font-bold">Summary of the year</h1>
      <div className="flex gap-4">
        {filtered && (
          <Button
            isIconOnly
            variant="light"
            className="w-fit rounded-full"
            color="danger"
            onClick={() => {
              setLoadingGetVacation(true)
              mutateAsync()
                .then((data) => {
                  setDataGetVacation(data)
                  setFiltered(false)
                  setLoadingGetVacation(false)
                })
                .catch(() => {
                  setLoadingGetVacation(false)
                })
            }}
            title="Clear filter"
          >
            <FaTimes />
          </Button>
        )}
        <FilterButtonDashboard />
      </div>
    </div>
  )
}
