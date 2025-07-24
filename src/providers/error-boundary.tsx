'use client'

import { Button } from '@heroui/button'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

export function ErrorBoundaryProvider({
  children,
}: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
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
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
