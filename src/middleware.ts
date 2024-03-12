import { parse } from 'cookie'
import { type NextRequest, NextResponse } from 'next/server'
import { routesFront } from '@/lib/constants'

const sortedRoutes = routesFront.sort((a, b) => b.path.length - a.path.length)

const protectedRoutes = sortedRoutes.filter((a) => a.private)
const publicRoutes = sortedRoutes.filter((a) => !a.private)

export default function middleware(req: NextRequest) {
  const cookies = parse(req.cookies.toString() ?? '')
  const signed = cookies.signed

  const protectedRoute = protectedRoutes.find((route) =>
    req.nextUrl.pathname.startsWith(route.path),
  )

  const publicRoute = publicRoutes.find((route) =>
    req.nextUrl.pathname.startsWith(route.path),
  )

  const absoluteURL = new URL('/', req.nextUrl.origin)

  if (publicRoute && signed) {
    if (req.nextUrl.pathname !== '/') {
      return NextResponse.redirect(absoluteURL.toString())
    }
  }

  if (!signed && publicRoute) {
    return NextResponse.next()
  }

  if (!signed && protectedRoute) {
    if (req.nextUrl.pathname !== '/login') {
      const loginURL = new URL('/login', req.nextUrl.origin)
      const originalURL = req.nextUrl.pathname + req.nextUrl.search
      // // ignore if redirect is already login or only /
      // if (ignoreRoutes.includes(originalURL) || originalURL === '/') {
      //   return NextResponse.next()
      // }
      loginURL.searchParams.append('redirect', encodeURIComponent(originalURL))
      return NextResponse.redirect(loginURL.toString())
    }
  }

  if (protectedRoute && !signed) {
    if (req.nextUrl.pathname !== '/') {
      return NextResponse.redirect(absoluteURL.toString())
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/user',
    '/group',
    '/login',
    '/reset-password',
    '/change-password',
    '/dashboard/:path*',
    '/user/:path*',
    '/group/:path*',
  ],
}
