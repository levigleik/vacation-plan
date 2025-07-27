'use client'
import { DateRangePicker } from '@heroui/date-picker'

export default function Days() {
  return (
    <div className="flex flex-wrap gap-4">
      {[...Array(12)].map((_, index) => (
        <DateRangePicker key={index} defaultOpen={true} hidden />
      ))}
    </div>
  )
}
