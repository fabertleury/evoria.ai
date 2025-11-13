import { NextResponse } from 'next/server'

export function middleware(req: Request & { nextUrl: URL }) {
  const url = new URL(req.url)
  const path = url.pathname
  const isProtected = path.startsWith('/admin') || path.startsWith('/anfitriao')
  const hasSession = req.headers.get('cookie')?.includes('sb')
  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/login', url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*', '/anfitriao/:path*'] }
