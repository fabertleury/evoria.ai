import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'src', 'data', 'pricing.json')

export async function GET() {
  try {
    const buf = await readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(buf))
  } catch (e) {
    return NextResponse.json({ plans: [] })
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || !Array.isArray(body.plans)) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  await writeFile(filePath, JSON.stringify({ plans: body.plans }, null, 2))
  return NextResponse.json({ ok: true })
}