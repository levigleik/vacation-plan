import { ToastProvider as ToastProviderHeroUI } from '@heroui/toast'

export function ToastProvider() {
  return (
    <ToastProviderHeroUI
      placement="top-center"
      toastProps={{
        classNames: {
          base: 'bg-white dark:bg-gray-800',
        },
      }}
    />
  )
}
