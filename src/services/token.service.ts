'use server'
import { LoginResponseProps } from '@/app/(public)/(auth)/login/types'
import {
  idTokenCookieSettings,
  refreshTokenCookieSettings,
} from '@/lib/constants'
import { postData } from '@/lib/functions.api'
import { TokenProps } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'

export const setIdToken = async (
  cookie: ReadonlyRequestCookies,
  idToken: string,
  expires: Date,
) => {
  cookie.set(idTokenCookieSettings.name, idToken, {
    ...idTokenCookieSettings.options,
    expires,
  })
}

const setRefreshToken = async (
  cookie: ReadonlyRequestCookies,
  refreshToken: string,
  expires: Date,
) => {
  cookie.set(refreshTokenCookieSettings.name, refreshToken, {
    ...refreshTokenCookieSettings.options,
    expires,
  })
}

export const setAuthCookies = async (data: LoginResponseProps) => {
  const expiresIdToken = new Date(Date.now() + idTokenCookieSettings.duration)
  const expiresRefreshToken = new Date(
    Date.now() + refreshTokenCookieSettings.duration,
  )
  const cookie = await cookies()
  await setIdToken(cookie, data.idToken, expiresIdToken)
  await setRefreshToken(cookie, data.refreshToken, expiresRefreshToken)
}

export const clearAuthCookies = async () => {
  const cookie = await cookies()
  cookie.delete('idToken')
  cookie.delete('refreshToken')
}

// Cache for session verification to reduce API calls
const sessionVerificationCache = new Map<
  string,
  { isValid: boolean; expiry: number }
>()
const SESSION_CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache TTL

export const verifySession = async (forceCheck = false): Promise<boolean> => {
  const cookie = await cookies()
  const idToken = cookie.get('idToken')?.value

  if (!idToken) return false

  // Check cache first if not forcing a check
  if (!forceCheck) {
    const cachedResult = sessionVerificationCache.get(idToken)
    if (cachedResult && Date.now() < cachedResult.expiry) {
      return cachedResult.isValid
    }
  }

  try {
    // First do a local validation to avoid unnecessary API calls
    const { exp } = jwtDecode<TokenProps>(idToken)
    const now = Date.now() / 1000

    // If token is expired locally, no need to check with API
    if (exp < now) {
      sessionVerificationCache.set(idToken, {
        isValid: false,
        expiry: Date.now() + SESSION_CACHE_TTL,
      })
      return false
    }

    // For stronger validation, verify with the API
    const response = await postData<{ valid: boolean }, { idToken: string }>({
      url: 'auth/verify-session',
      data: { idToken },
    })

    const isValid = response.valid

    // Cache the result
    sessionVerificationCache.set(idToken, {
      isValid,
      expiry: Date.now() + SESSION_CACHE_TTL,
    })

    // Clean up old cache entries periodically
    if (sessionVerificationCache.size > 100) {
      const now = Date.now()
      for (const [key, value] of sessionVerificationCache.entries()) {
        if (value.expiry < now) {
          sessionVerificationCache.delete(key)
        }
      }
    }

    return isValid
  } catch (error) {
    // If verification fails, consider the session invalid
    sessionVerificationCache.set(idToken, {
      isValid: false,
      expiry: Date.now() + SESSION_CACHE_TTL,
    })
    return false
  }
}
