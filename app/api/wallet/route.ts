import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { creditsWallets, transactions } from '@/lib/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { requireRole } from '@/lib/auth'
import { rateLimit, rateKey } from '@/lib/rateLimit'

const topupSchema = z.object({ ownerType: z.enum(['user','guest']), ownerId: z.string(), amount: z.string(), currency: z.string().default('BRL') })

export async function GET(req: Request) {
  const url = new URL(req.url)
  const ownerId = url.searchParams.get('ownerId')
  const db = getDb()
  const list = ownerId ? await db.select().from(creditsWallets).where(eq(creditsWallets.ownerId, ownerId)) : await db.select().from(creditsWallets)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const user = requireRole(req, ['admin'])
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const key = rateKey('POST', '/api/wallet', req.headers.get('x-forwarded-for') || 'local')
  if (!rateLimit(key, 20, 60_000)) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  const body = await req.json().catch(() => null)
  const parsed = topupSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const db = getDb()
  const existing = await db.query.creditsWallets.findFirst({ where: eq(creditsWallets.ownerId, parsed.data.ownerId) })
  const amount = Number(parsed.data.amount)
  if (existing) {
    await db.update(creditsWallets).set({ balance: (existing.balance ?? 0) + amount }).where(eq(creditsWallets.id, existing.id))
  } else {
    await db.insert(creditsWallets).values({ ownerType: parsed.data.ownerType, ownerId: parsed.data.ownerId, balance: amount })
  }
  const txn = await db.insert(transactions).values({ eventId: 'system', walletId: existing?.id ?? 'new', amount: parsed.data.amount as any, currency: parsed.data.currency, provider: 'stripe_card', status: 'confirmed' }).returning()
  return NextResponse.json({ ok: true, txn: txn[0] })
}
