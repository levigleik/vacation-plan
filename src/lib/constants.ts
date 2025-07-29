import { QueryClientConfig } from '@tanstack/react-query'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
} as QueryClientConfig

export const idTokenCookieSettings = {
  name: 'idToken',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  } as ResponseCookie,
  duration: 24 * 60 * 60 * 1000,
}

export const refreshTokenCookieSettings = {
  name: 'refreshToken',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  } as ResponseCookie,
  duration: 7 * 24 * 60 * 60 * 1000,
}
