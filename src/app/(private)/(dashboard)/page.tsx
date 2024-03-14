'use client'
import { useAuthState } from '@/hooks/auth'
import { Calendar } from '@/components/calendar'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react'
import { FaCheck, FaFilter, FaTimes } from 'react-icons/fa'

export default function Home() {
  const { profile } = useAuthState()

  const [dateField, setDateField] = useState<Date[]>()
  const [viewBoolean, setViewBoolean] = useState(false)
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i), [])

  return (
    <div className="flex flex-wrap 2xl:flex-nowrap">
      <div className="flex max-w-[1000px] flex-col gap-3 rounded-md  py-4">
        <div className="flex w-full justify-between pl-4">
          <h1 className="text-2xl font-bold">2024</h1>
          <Button isIconOnly variant="light" className="w-fit rounded-full">
            <FaFilter className="text-main" />
          </Button>
        </div>
        <div className="flex flex-wrap justify-around gap-y-4">
          {months.map((month) => (
            <div
              key={month}
              className="flex max-h-[490px] flex-col rounded-md border py-4 transition-all"
            >
              <h2 className="text-center text-2xl font-bold">
                {format(new Date(new Date().getFullYear(), month, 1), 'MMMM')}
              </h2>
              <Calendar
                mode="multiple"
                month={new Date(new Date().getFullYear(), month, 0)}
                selected={dateField}
                onSelect={(date) => {
                  console.log(date)
                  setDateField(date)
                  setViewBoolean((a) => !a)
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
              {viewBoolean && (
                <div className="flex justify-between px-4">
                  <Button
                    isIconOnly
                    variant="light"
                    className="w-fit rounded-full"
                  >
                    <FaTimes className="text-danger-300" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    className="w-fit rounded-full"
                  >
                    <FaCheck className="text-green-300" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-6">
        {months.map((month) => (
          <div key={month} className="max-h-[300px] min-h-[100px] w-full">
            <Card className="max-h-[400px] w-full">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">
                    {format(
                      new Date(new Date().getFullYear(), month, 1),
                      'MMMM',
                    )}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>Make</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <h1>Visit source code on GitHub.</h1>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
