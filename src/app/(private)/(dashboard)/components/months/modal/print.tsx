'use client'

import { Button, Skeleton } from '@nextui-org/react'
import { FaFilePdf } from 'react-icons/fa'
import { PrintSummaryDashboard } from '@/app/(private)/(dashboard)/components/summary/print'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { VacationWithDatesApiProps } from '@/app/(private)/(dashboard)/types'

interface PrintModalDashboardProps {
  dataGetVacationById: VacationWithDatesApiProps
}

export const PrintModalDashboard = ({
  dataGetVacationById,
}: PrintModalDashboardProps) => {
  return (
    <>
      <PDFDownloadLink
        document={<PrintSummaryDashboard vacation={dataGetVacationById} />}
        fileName={`${dataGetVacationById.title}.pdf`}
      >
        {({ loading }) => (
          <Skeleton className="rounded-full" isLoaded={!loading}>
            <Button
              isIconOnly
              title="Print"
              variant="light"
              color="danger"
              radius="full"
              disabled={loading}
            >
              <FaFilePdf size={20} />
            </Button>
          </Skeleton>
        )}
      </PDFDownloadLink>
    </>
  )
}
