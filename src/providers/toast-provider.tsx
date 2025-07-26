import { ToastProvider as ToastProviderHeroUI } from '@heroui/toast'

export function ToastProvider() {
  return (
    <ToastProviderHeroUI
      placement="top-center"
      toastOffset={20}
      toastProps={{
        severity: 'success',
        color: 'success',
        variant: 'bordered',
      }}
    />
  )
}
