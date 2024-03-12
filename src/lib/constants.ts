import {QueryClientConfig} from "@tanstack/react-query";

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      // suspense: true,
      retry: 1,
      staleTime: 5 * 1000,
      networkMode: 'offlineFirst',
      // throwOnError: true,
    },
    mutations: {
      // suspense: true,
      // throwOnError: true,
      networkMode: 'offlineFirst',
    },
  },
} as QueryClientConfig
export const routesFront: {
  path: string
  private: boolean
}[] = [
  // private routes
  {
    path: '/',
    private: true,
  },
  {
    path: '/user',
    private: true,
  },
  {
    path: '/client',
    private: true,
  },
  {
    path: '/rol',
    private: true,
  },
  {
    path: '/priceList',
    private: true,
  },
  // public routes
  {
    path: '/login',
    private: false,
  },
  {
    path: '/tinturaria',
    private: false,
  },
  {
    path: '/reset-password',
    private: false,
  },
  {
    path: '/change-password',
    private: false,
  },
  {
    path: '/version',
    private: false,
  },
]

export const cookiesSettings = {
  // expires in 1 week
  expires: 7,
  // secure: true,
}