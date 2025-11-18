import { NextResponse } from 'next/server'

export function middleware(req: Request & { nextUrl: URL }) {
  const url = new URL(req.url)
  const path = url.pathname
  const cookies = req.headers.get('cookie') || ''
  const hasToken = cookies.includes('evoria_token=')
  const roleCookie = (cookies.match(/(?:^|;\s*)role=([^;]+)/) || [])[1] || ''
  if ((path.startsWith('/admin') || path.startsWith('/anfitriao')) && !hasToken) return NextResponse.redirect(new URL('/login', url))
  if (path.startsWith('/admin') && roleCookie !== 'admin') return NextResponse.redirect(new URL('/login', url))
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*', '/anfitriao/:path*'] }
