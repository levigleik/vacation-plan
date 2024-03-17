'use client'
import { Suspense, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import Loading from '@/components/loading'
import Navbar from '@/components/navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true)

  window.addEventListener('online', async () => {
    setIsOnline(true)
  })
  window.addEventListener('offline', () => {
    setIsOnline(false)
  })

  return (
    <div className="flex min-h-full flex-col">
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      {!isOnline && (
        <div className="flex items-center justify-end text-danger-300">
          <div className="mr-2 rounded-2xl bg-danger-300 px-4 py-1 text-white">
            Offline
          </div>
          <FaExclamationTriangle />
        </div>
      )}
      <div className="mx-auto max-h-full w-full max-w-[2560px]  px-4 pt-4 sm:px-8 2xl:px-16">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  )
}

export default Layout
