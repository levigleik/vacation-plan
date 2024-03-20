'use client'

import { useDashboardHook } from '@/app/(private)/(dashboard)/hook'
import { getDaysInMonth } from 'date-fns'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getData } from '@/lib/functions.api'
import { VacationWithDatesApiProps } from '@/app/(private)/(dashboard)/types'
import { useEffect, useMemo } from 'react'
import { useDashboardMonthHook } from '@/app/(private)/(dashboard)/components/months/hook'

export const useMonth = () => {
  const { setDataGetVacation } = useDashboardHook()

  const { dayEditId, daysSelected, month } = useDashboardMonthHook()

  const { isPending: loadingGetVacation, mutateAsync } = useMutation({
    mutationKey: ['vacation-get'],
    mutationFn: () =>
      getData<VacationWithDatesApiProps[]>({
        url: '/vacation',
        query: 'include.dates=true&&include.users=true',
      }),
  })

  const { data: dataGetVacationById, isLoading: loadingGetVacationById } =
    useQuery({
      queryFn: ({ signal }) =>
        getData<VacationWithDatesApiProps>({
          url: 'vacation',
          id: dayEditId,
          signal,
          query: 'include.users=true&&include.dates=true',
        }),
      queryKey: ['vacation-by-id-get', dayEditId],
      enabled: !!dayEditId && dayEditId > 0,
    })

  const allDaysInMonth = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(2024, (month ?? 0) - 1))
    const daysInMonthParsed = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(2024, (month ?? 0) - 1, i + 1)
      return {
        id: date.toISOString(),
      }
    })
    const daysSelectedParsed =
      daysSelected?.days?.map((a) => {
        return {
          id: a.toISOString(),
        }
      }) ?? []

    const daysMerge = [...daysInMonthParsed, ...daysSelectedParsed]
    if (dataGetVacationById) {
      const daysVacation = dataGetVacationById.dates.map((a) => {
        return {
          id: a.date,
        }
      })
      return Array.from(
        new Set([...daysMerge, ...daysVacation].map((a) => a.id)),
      ).map((id) => ({
        id,
      }))
    }
    return Array.from(new Set(daysMerge.map((a) => a.id))).map((id) => ({
      id,
    }))
  }, [dataGetVacationById, daysSelected, month])

  useEffect(() => {
    mutateAsync().then((dataGetVacation) => {
      setDataGetVacation(dataGetVacation)
    })
  }, [mutateAsync, setDataGetVacation])

  const loadingMonth = loadingGetVacationById || loadingGetVacation

  return {
    allDaysInMonth,
    loadingMonth,
    dataGetVacationById,
  }
}
