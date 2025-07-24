'use client'

import { QueryClient } from '@tanstack/react-query'

import { queryClientConfig } from '@/lib/constants'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useEffect, useState } from 'react'

let persister: any
export function ReactQueryProvider({
  children,
}: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const [queryClient, setQueryClient] = useState<QueryClient>()

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
      {children}
    </PersistQueryClientProvider>
  )
}
