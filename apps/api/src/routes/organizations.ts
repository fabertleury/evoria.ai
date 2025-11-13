import { Router } from 'express'
import { db } from '../db'
import { organizations, organizationUsers } from '@shared/schema'
import { z } from 'zod'
import { requireAuth, requireRole } from '../middleware/auth'
import { eq } from '@shared/schema'

const router = Router()

router.get('/', requireAuth, requireRole(['admin']), async (_req, res) => {
  const list = await db.query.organizations.findMany()
  res.json({ organizations: list })
})

router.post('/', requireAuth, requireRole(['admin']), async (req, res) => {
  const body = z.object({ name: z.string(), slug: z.string(), domain: z.string().optional(), logoUrl: z.string().optional(), primaryColor: z.string().optional(), billingModel: z.enum(['monthly','per_event']), monthlyPrice: z.number().optional(), perEventPrice: z.number().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const [org] = await db.insert(organizations).values({ name: body.data.name, slug: body.data.slug, domain: body.data.domain, logoUrl: body.data.logoUrl, primaryColor: body.data.primaryColor, planType: 'whitelabel', billingModel: body.data.billingModel, monthlyPrice: body.data.monthlyPrice as any, perEventPrice: body.data.perEventPrice as any }).returning()
  res.json({ organization: org })
})

router.put('/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  const id = req.params.id
  const body = z.object({ name: z.string().optional(), domain: z.string().optional(), logoUrl: z.string().optional(), primaryColor: z.string().optional(), billingModel: z.enum(['monthly','per_event']).optional(), monthlyPrice: z.number().optional(), perEventPrice: z.number().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const update: any = {}
  if (body.data.name !== undefined) update.name = body.data.name
  if (body.data.domain !== undefined) update.domain = body.data.domain
  if (body.data.logoUrl !== undefined) update.logoUrl = body.data.logoUrl
  if (body.data.primaryColor !== undefined) update.primaryColor = body.data.primaryColor
  if (body.data.billingModel !== undefined) update.billingModel = body.data.billingModel
  if (body.data.monthlyPrice !== undefined) update.monthlyPrice = (body.data.monthlyPrice).toFixed(2)
  if (body.data.perEventPrice !== undefined) update.perEventPrice = (body.data.perEventPrice).toFixed(2)
  await db.update(organizations).set(update).where(eq(organizations.id, id))
  res.json({ ok: true })
})

export default router
