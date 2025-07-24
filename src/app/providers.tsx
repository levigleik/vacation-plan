'use client'

import { ErrorBoundaryProvider } from '@/providers/error-boundary'
import { ReactQueryProvider } from '@/providers/react-query'
import { ToastProvider } from '@/providers/toast-provider'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useRouter()

  return (
    <ErrorBoundaryProvider>
      <HeroUIProvider navigate={navigate.push}>
        <ReactQueryProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <ToastProvider />
            {children}
          </NextThemesProvider>
        </ReactQueryProvider>
      </HeroUIProvider>
    </ErrorBoundaryProvider>
  )
}
