'use client'
import Loading from '@/components/loading'
import Navbar from '@/components/navbar'
import { Suspense } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      <div className="mx-auto max-h-full w-full max-w-[2560px]  px-4 pt-4 sm:px-8 2xl:px-16">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  )
}

export default Layout
