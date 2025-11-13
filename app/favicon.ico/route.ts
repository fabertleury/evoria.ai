import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const target = new URL('/icon.svg', url.origin)
  return NextResponse.redirect(target.toString(), 308)
}
