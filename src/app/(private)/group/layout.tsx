import { cn } from '@nextui-org/react'
import Header from 'components/layout/header'
import { Metadata } from 'next'
import { Suspense } from 'react'
import HeaderTable from 'components/table/header'
import Loading from 'components/loading'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Groups',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*<Header path={'group'} defaultText="Group" />*/}
      <Link href={'/group'}>Group</Link>
      <div className="flex h-full flex-1 flex-col">
        <div
          className={cn(
            'relative z-0 flex flex-col justify-between gap-4 bg-content1 p-4',
            'max-h-[calc(100dvh-8em)] w-full overflow-auto rounded-large shadow-small',
          )}
        >
          <HeaderTable path={'group'} defaultText="Group" />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  )
}
