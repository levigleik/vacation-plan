'use client'
import { useAuthState } from '@/hooks/auth'
import { Calendar } from '@/components/calendar'
import { ptBR } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { format } from 'date-fns'
import { Button } from '@nextui-org/react'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function Home() {
  const { profile } = useAuthState()

  const [dateField, setDateField] = useState<Date[]>()
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i), [])

  return (
    <div className="">
      <div className="flex max-w-[900px] flex-wrap gap-3 rounded-md  py-4">
        {months.map((month) => (
          <div
            key={month}
            className="flex max-h-[390px] flex-col rounded-md border py-4"
          >
            <h2 className="text-center text-2xl font-bold">
              {format(new Date(new Date().getFullYear(), month, 1), 'MMMM', {
                locale: ptBR,
              })}
            </h2>
            <Calendar
              locale={ptBR}
              mode="multiple"
              month={new Date(new Date().getFullYear(), month, 0)}
              selected={dateField}
              onSelect={(date) => {
                console.log(date)
                setDateField(date)
              }}
              components={{
                Caption: () => null,
              }}
              className="mx-auto h-full"
            />
            <div className="flex justify-between px-4">
              <Button isIconOnly variant="light" className="w-fit rounded-full">
                <FaTimes className="text-danger-300" />
              </Button>
              <Button isIconOnly variant="light" className="w-fit rounded-full">
                <FaCheck className="text-green-300" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
