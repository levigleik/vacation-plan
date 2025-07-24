'use client'

import { ToastProvider } from '@heroui/toast'
import { QueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'

import { queryClientConfig } from '@/lib/constants'
import { Button } from '@heroui/button'
import { HeroUIProvider } from '@heroui/react'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'

let persister: any
export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [queryClient, setQueryClient] = useState<QueryClient>()
  const { reset } = useQueryErrorResetBoundary()

  useEffect(() => {
    setIsClient(typeof window !== 'undefined')
  }, [])

  useEffect(() => {
    if (isClient) {
      persister = createSyncStoragePersister({
        storage: window.localStorage,
      })
      setQueryClient(new QueryClient(queryClientConfig))
    }
  }, [isClient])

  if (!isClient) {
    return null
  }
  if (!queryClient) {
    return null
  }

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }: any) => (
        // <Layout>
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Ocorreu um erro</h1>
          <Button
            className="mt-4"
            onPress={() => {
              resetErrorBoundary()
            }}
          >
            Tentar novamente
          </Button>
        </div>
        // </Layout>
      )}
    >
      <HeroUIProvider navigate={navigate.push}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
          onSuccess={() => {
            // resume mutations after initial restore from localStorage was successful
            queryClient.resumePausedMutations().then(() => {
              queryClient.invalidateQueries()
            })
          }}
        >
          <NextThemesProvider attribute="class" defaultTheme="light">
            <ToastProvider
              placement="top-center"
              toastProps={{
                classNames: {
                  base: 'bg-white dark:bg-gray-800',
                },
              }}
            />
            {children}
          </NextThemesProvider>
        </PersistQueryClientProvider>
      </HeroUIProvider>
    </ErrorBoundary>
  )
}
