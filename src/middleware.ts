import { verifySession } from '@/services/token.service'
import { NextRequest, NextResponse } from 'next/server'
import { privateRoutes, publicRoutes } from './lib/routes'

export function middleware(req: NextRequest) {
  const idToken = req.cookies.get('idToken')?.value
  const isAuthenticated = idToken ? verifySession() : false
  const { pathname } = req.nextUrl

  const isPublicRoute = publicRoutes.includes(pathname)
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (isPrivateRoute && !isAuthenticated) {
    const loginURL = new URL('/login', req.nextUrl.origin)
    const originalURL = req.nextUrl.pathname + req.nextUrl.search
    // ignore if redirect is already login or only /
    if (originalURL === '/' || originalURL.includes('/login')) {
      return NextResponse.next()
    }
    loginURL.searchParams.append('redirect', encodeURIComponent(originalURL))
    return NextResponse.redirect(loginURL.toString())
  }

  if (isPublicRoute && isAuthenticated) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*.png$).*)'],
}
