'use server'
import { idTokenCookieSettings } from '@/lib/constants'
import { setIdToken } from '@/services/token.service'
import type { TokenProps } from '@/types/auth'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const refreshTokenFunc = async () => {
  const cookie = await cookies()
  const refreshToken = cookie.get('refreshToken')?.value

  try {
    if (!refreshToken) return
    const rs = await axios.post<{ idToken: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        refreshToken,
      },
    )

    const { idToken } = rs.data
    const expiresIdToken = new Date(Date.now() + idTokenCookieSettings.duration)
    await setIdToken(cookie, idToken, expiresIdToken)
    return idToken
  } catch (error: any) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error === 'session-revoked'
    ) {
      cookie.delete('idToken')
      cookie.delete('refreshToken')
      window.location.reload()
    }
  }
}

export const getToken = async () => {
  const cookie = await cookies()
  const storedIdToken = cookie.get('idToken')?.value

  if (storedIdToken) {
    const now = Date.now() / 1000
    const { exp } = jwtDecode<TokenProps>(storedIdToken)
    if (exp < now) {
      return await refreshTokenFunc()
    }
  }
  return storedIdToken
}

api.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      ((error.response?.status === 401 &&
        !originalRequest.url?.includes('auth')) ||
        error.response?.data?.message === 'jwt expired') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const idToken = await refreshTokenFunc()
        originalRequest.headers.Authorization = `Bearer ${idToken}`
        return api(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default api
