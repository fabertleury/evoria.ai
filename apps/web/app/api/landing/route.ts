import { NextResponse } from 'next/server'
import data from '@/data/landing.json'

export function GET() {
  return NextResponse.json(data)
}

