import { Router } from 'express'
import { requireAuth, requireRole, AuthedRequest } from '../middleware/auth'
import { db } from '../db'
import { users, events, plans, settings } from '@shared/schema'
import { z } from 'zod'
import { eq } from '@shared/schema'

const router = Router()

router.get('/users', requireAuth, requireRole(['admin']), async (_req, res) => {
  const list = await db.query.users.findMany()
  res.json({ users: list })
})

router.get('/events', requireAuth, requireRole(['admin']), async (_req, res) => {
  const list = await db.query.events.findMany()
  res.json({ events: list })
})

router.get('/plans', requireAuth, requireRole(['admin']), async (_req, res) => {
  const list = await db.query.plans.findMany()
  res.json({ plans: list })
})

router.post('/plans', requireAuth, requireRole(['admin']), async (req, res) => {
  const body = z.object({ name: z.string(), price: z.number(), currency: z.string().default('BRL'), modules: z.array(z.enum(['screen','feed'])).default([]), features: z.record(z.any()).optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const [p] = await db.insert(plans).values({ name: body.data.name, price: (body.data.price).toFixed(2) as any, currency: body.data.currency, modules: body.data.modules as any, features: body.data.features as any }).returning()
  res.json({ plan: p })
})

router.put('/plans/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  const id = req.params.id
  const body = z.object({ name: z.string().optional(), price: z.number().optional(), currency: z.string().optional(), modules: z.array(z.enum(['screen','feed'])).optional(), features: z.record(z.any()).optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const update: any = {}
  if (body.data.name !== undefined) update.name = body.data.name
  if (body.data.price !== undefined) update.price = (body.data.price).toFixed(2)
  if (body.data.currency !== undefined) update.currency = body.data.currency
  if (body.data.modules !== undefined) update.modules = body.data.modules
  if (body.data.features !== undefined) update.features = body.data.features
  await db.update(plans).set(update).where(eq(plans.id, id))
  res.json({ ok: true })
})

router.get('/settings', requireAuth, requireRole(['admin']), async (_req, res) => {
  const list = await db.query.settings.findMany()
  res.json({ settings: list })
})

router.put('/settings', requireAuth, requireRole(['admin']), async (req, res) => {
  const body = z.array(z.object({ key: z.string(), value: z.string() })).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  for (const kv of body.data) {
    await db.insert(settings).values({ key: kv.key, value: kv.value }).onConflictDoUpdate({ target: settings.key, set: { value: kv.value } })
  }
  res.json({ ok: true })
})

export default router
