import { Router } from 'express'
import { db } from '../db'
import { events, eventModules } from '@shared/schema'
import { z } from 'zod'
import { requireAuth, requireRole, AuthedRequest } from '../middleware/auth'
import { hostQuotas } from '@shared/schema'
import { stripe } from '../services/stripe'
import { settings } from '@shared/schema'
import { eq } from '@shared/schema'

const router = Router()

const createEventSchema = z.object({
  name: z.string().min(1),
  date: z.string(),
  coverUrl: z.string().url().optional(),
  modules: z.array(z.enum(['screen', 'feed'])).default([])
})

router.post('/', requireAuth, requireRole(['anfitriao', 'admin']), async (req, res) => {
  const parsed = createEventSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' })
  const { name, date, coverUrl, modules } = parsed.data
  if ((req as AuthedRequest).user!.role === 'anfitriao') {
    const q = await db.query.hostQuotas.findFirst({ where: (t, { eq }) => eq(t.userId, (req as AuthedRequest).user!.id) })
    if (!q || q.remainingEvents <= 0) return res.status(402).json({ message: 'No event quota' })
  }
  const inserted = await db.insert(events).values({ name, date: new Date(date) as any, coverUrl, hostId: (req as AuthedRequest).user!.id }).returning()
  const ev = inserted[0]
  if (modules.length) {
    await db.insert(eventModules).values(modules.map(m => ({ eventId: ev.id, module: m })))
  }
  if ((req as AuthedRequest).user!.role === 'anfitriao') {
    const q = await db.query.hostQuotas.findFirst({ where: (t, { eq }) => eq(t.userId, (req as AuthedRequest).user!.id) })
    if (q) await db.update(hostQuotas).set({ remainingEvents: q.remainingEvents - 1 }).where(eq(hostQuotas.userId, (req as AuthedRequest).user!.id))
  }
  res.json({ event: ev, modules })
})

router.get('/:id', requireAuth, async (req, res) => {
  const id = req.params.id
  const ev = await db.query.events.findFirst({ where: (t, { eq }) => eq(t.id, id) })
  if (!ev) return res.status(404).json({ message: 'Not found' })
  const mods = await db.query.eventModules.findMany({ where: (t, { eq }) => eq(t.eventId, id) })
  res.json({ event: ev, modules: mods.map(m => m.module) })
})

router.put('/:id/pricing', requireAuth, requireRole(['admin']), async (req, res) => {
  const id = req.params.id
  const body = z.object({ feedPrice: z.number().optional(), screenPrice: z.number().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const update: any = {}
  if (body.data.feedPrice !== undefined) update.feedPrice = (body.data.feedPrice).toFixed(2)
  if (body.data.screenPrice !== undefined) update.screenPrice = (body.data.screenPrice).toFixed(2)
  await db.update(events).set(update).where(eq(events.id, id))
  res.json({ ok: true })
})

router.post('/:id/modules/checkout', requireAuth, requireRole(['anfitriao','admin']), async (req, res) => {
  const id = req.params.id
  const body = z.object({ modules: z.array(z.enum(['screen','feed'])).min(1) }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const ev = await db.query.events.findFirst({ where: (t, { eq }) => eq(t.id, id) })
  if (!ev) return res.status(404).json({ message: 'Event not found' })
  const s = await db.query.settings.findMany()
  const kv = Object.fromEntries(s.map((i:any)=>[i.key,i.value]))
  const priceFeed = ev.feedPrice ? parseFloat(ev.feedPrice as any) : parseFloat(kv.PRICE_FEED_POST || '0')
  const priceScreen = ev.screenPrice ? parseFloat(ev.screenPrice as any) : parseFloat(kv.PRICE_SCREEN_SLOT || '0')
  const items = body.data.modules.map(m => ({ name: m === 'feed' ? 'Feed' : 'Telão', unit_amount: Math.round((m === 'feed' ? priceFeed : priceScreen) * 100) }))
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map(i => ({ price_data: { currency: 'brl', product_data: { name: `Módulo ${i.name}` }, unit_amount: i.unit_amount }, quantity: 1 })),
    success_url: `${process.env.WEB_BASE_URL}/anfitriao?modules=success`,
    cancel_url: `${process.env.WEB_BASE_URL}/anfitriao?modules=cancel`,
    metadata: { eventId: id, modules: body.data.modules.join(',') }
  })
  res.json({ id: session.id, url: session.url })
})

export default router
