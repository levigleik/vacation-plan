import { format } from 'date-fns'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react'
import { FaFilter } from 'react-icons/fa'
import { CalendarDashboard } from '@/app/(private)/(dashboard)/components/calendar.dashboard'
import { ModalDashboard } from '@/app/(private)/(dashboard)/components/modal'
import { months } from '@/app/(private)/(dashboard)/constants'
import { CardDashboard } from '@/app/(private)/(dashboard)/components/card.dashboard'

export default function Home() {
  return (
    <div className="flex flex-wrap 2xl:flex-nowrap">
      <div className="flex max-w-[1000px] flex-col gap-3 py-4">
        <div className="flex w-full justify-between pl-4">
          <h1 className="text-2xl font-bold">2024</h1>
        </div>
        <div className="mt-5 flex flex-wrap justify-around gap-y-4">
          {months.map((month) => (
            <div
              key={month}
              className="flex max-h-[490px] flex-col rounded-large border py-4 transition-all"
            >
              <h2 className="text-center text-2xl font-bold">
                {format(new Date(2024, month, 0), 'MMMM')}
              </h2>
              <CalendarDashboard month={month} />
            </div>
          ))}
        </div>
      </div>
      <ModalDashboard />
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pt-6">
        <div className="flex w-full justify-between pl-4">
          <h1 className="text-2xl font-bold">Summary of the year</h1>
          <Button isIconOnly variant="light" className="w-fit rounded-full">
            <FaFilter className="text-main" />
          </Button>
        </div>
        {months.map((month) => (
          <div key={month} className="min-h-[100px] w-full">
            <CardDashboard month={month} />
          </div>
        ))}
      </div>
    </div>
  )
}
