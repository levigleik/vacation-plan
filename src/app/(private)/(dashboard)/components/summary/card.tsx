'use client'
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react'
import { format } from 'date-fns'
import { DashboardProps } from '@/app/(private)/(dashboard)/types'
import { AvatarGroup } from '@nextui-org/avatar'

export const CardSummary = ({ month, data, loading }: DashboardProps) => {
  const dataByMonth = data?.filter((vacation) =>
    vacation.dates.some(({ date }) => new Date(date).getMonth() === month - 1),
  )

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">
            {format(new Date(new Date().getFullYear(), month - 1, 1), 'MMMM')}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[400px]">
        <Skeleton className="overflow-auto rounded-md" isLoaded={!loading}>
          <div className="flex flex-col gap-3">
            {!dataByMonth?.length && (
              <div className="mb-4 flex flex-col gap-3 rounded-md bg-default-100 p-4">
                <span className="text-md">No vacations</span>
              </div>
            )}
            {dataByMonth?.map((vacation) => (
              <div
                key={vacation.id}
                className="mb-4 flex flex-col gap-3 rounded-md bg-default-100 p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xl">{vacation.title}</span>
                </div>

                <span>{vacation.description}</span>
                <AvatarGroup className="justify-start">
                  {vacation.users?.map((user) => (
                    <Avatar
                      title={user.name}
                      name={user.name}
                      key={user.id}
                      src={user.photo}
                    />
                  ))}
                </AvatarGroup>
                <div className="flex w-full justify-between">
                  <span className="text-sm">{vacation.location}</span>
                  <span className="text-sm">
                    Days:{' '}
                    <span
                      className="gap-2"
                      title={vacation.dates
                        .filter(
                          ({ date }) => new Date(date).getMonth() === month - 1,
                        )
                        .map(({ date }) => format(new Date(date), 'EEEE'))
                        .join(', ')}
                    >
                      {vacation.dates
                        .filter(
                          ({ date }) => new Date(date).getMonth() === month - 1,
                        )
                        .map(({ date }) => {
                          return (
                            <span
                              key={date}
                              className="ml-1 h-10 w-10 rounded-full bg-default-200 p-[6px] text-center text-sm font-bold"
                            >
                              {format(new Date(date), 'dd')}
                            </span>
                          )
                        })}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Skeleton>
      </CardBody>
    </Card>
  )
}
