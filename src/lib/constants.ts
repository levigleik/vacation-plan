import { QueryClientConfig } from '@tanstack/react-query'

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
} as QueryClientConfig

export const cookiesSettings = {
  // expires in 1 week
  expires: 7,
  // secure: true,
}
