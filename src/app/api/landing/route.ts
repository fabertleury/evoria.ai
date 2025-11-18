import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { LandingSchema } from '../../../../lib/landingSchema'

const filePath = path.join(process.cwd(), 'data', 'landing.json')

export async function GET() {
  try {
    const buf = await readFile(filePath, 'utf-8')
    const json = JSON.parse(buf)
    const parsed = LandingSchema.safeParse(json)
    if (!parsed.success) return NextResponse.json({ error: 'invalid data', issues: parsed.error.flatten() }, { status: 500 })
    return NextResponse.json(parsed.data)
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const parsed = LandingSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'invalid payload', issues: parsed.error.flatten() }, { status: 400 })
    await writeFile(filePath, JSON.stringify(parsed.data, null, 2))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'save failed' }, { status: 500 })
  }
}