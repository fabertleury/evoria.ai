import { Router } from 'express'
import { z } from 'zod'
import { stripe, webhookSecret } from '../services/stripe'
import { db } from '../db'
import { transactions, creditsWallets, plans } from '@shared/schema'
import { requireAuth, AuthedRequest } from '../middleware/auth'
import { eq, and } from '@shared/schema'

const baseUrl = process.env.WEB_BASE_URL || process.env.WEB_BASE_URL_PROD || process.env.WEB_BASE_URL_STAGING || 'http://localhost:3000'

const router = Router()

router.post('/checkout', async (req, res) => {
  const body = z.object({ amount: z.number().positive(), currency: z.string().default('BRL'), eventId: z.string(), guestId: z.string().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'pix'],
    line_items: [{ price_data: { currency: body.data.currency.toLowerCase(), product_data: { name: 'Evoria Credits' }, unit_amount: Math.round(body.data.amount * 100) }, quantity: 1 }],
    success_url: `${baseUrl}/anfitriao?payment=success`,
    cancel_url: `${baseUrl}/anfitriao?payment=cancel`,
    metadata: { eventId: body.data.eventId, guestId: body.data.guestId || '' }
  })
  res.json({ id: session.id, url: session.url })
})

router.post('/intent/pix', async (req, res) => {
  const body = z.object({ amount: z.number().positive(), currency: z.string().default('BRL'), eventId: z.string(), guestId: z.string().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const intent = await stripe.paymentIntents.create({ amount: Math.round(body.data.amount * 100), currency: body.data.currency.toLowerCase(), payment_method_types: ['pix'], metadata: { eventId: body.data.eventId, guestId: body.data.guestId || '' } })
  res.json({ client_secret: intent.client_secret, id: intent.id })
})

router.post('/plan/checkout', requireAuth, async (req, res) => {
  const body = z.object({ planId: z.string(), bundledEvents: z.number().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const plan = await db.query.plans.findFirst({ where: (t, { eq }) => eq(t.id, body.data.planId) })
  if (!plan) return res.status(404).json({ message: 'Plan not found' })
  const bundled = body.data.bundledEvents ?? (plan.bundledEvents || 1)
  const amount = plan.price ? parseFloat(plan.price as any) : 0
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'pix'],
    line_items: [{ price_data: { currency: (plan.currency || 'BRL').toLowerCase(), product_data: { name: `Plano ${plan.name}` }, unit_amount: Math.round(amount * 100) }, quantity: 1 }],
    success_url: `${baseUrl}/anfitriao?plan=success`,
    cancel_url: `${baseUrl}/anfitriao?plan=cancel`,
    metadata: { planId: plan.id, bundledEvents: String(bundled), userId: (req as AuthedRequest).user!.id }
  })
  res.json({ id: session.id, url: session.url })
})

router.post('/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string
  let event
  try {
    event = stripe.webhooks.constructEvent((req as any).rawBody, sig, webhookSecret)
  } catch (err: any) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` })
  }

  if (event.type === 'payment_intent.succeeded' || event.type === 'checkout.session.completed') {
    const metadata = (event as any).data.object.metadata || {}
    const eventId = metadata.eventId as string
    const guestId = (metadata.guestId as string) || ''
    const modulesStr = (metadata.modules as string) || ''
    const modules = modulesStr ? modulesStr.split(',').filter(Boolean) : []
    const planId = (metadata.planId as string) || ''
    const planEvents = parseInt((metadata.bundledEvents as string) || '0', 10)
    const userId = (metadata.userId as string) || ''
    const amount = (event as any).data.object.amount_received || (event as any).data.object.amount_total
    const currency = (event as any).data.object.currency?.toUpperCase() || 'BRL'
    const provider = event.type === 'payment_intent.succeeded' ? 'stripe_pix' : 'stripe_card'

    const ownerType = guestId ? 'guest' : 'user'
    const ownerId = guestId || eventId
    const [wallet] = await db.insert(creditsWallets).values({ ownerType, ownerId, balance: 0 }).onConflictDoNothing().returning()
    const walletId = wallet?.id || (await db.query.creditsWallets.findFirst({ where: (t, { eq, and }) => and(eq(t.ownerType, ownerType), eq(t.ownerId, ownerId)) }))!.id

    if (planId && userId && planEvents > 0) {
      const [wallet] = await db.insert(creditsWallets).values({ ownerType: 'user', ownerId: userId, balance: 0 }).onConflictDoNothing().returning()
      const walletId = wallet?.id || (await db.query.creditsWallets.findFirst({ where: (t, { eq, and }) => and(eq(t.ownerType, 'user'), eq(t.ownerId, userId)) }))!.id
      await db.insert(transactions).values({ eventId: eventId || 'plan', walletId, amount: (amount / 100).toFixed(2) as any, currency, provider, status: 'confirmed', module: 'plan' })
      const { hostQuotas } = await import('@shared/schema')
      const current = await db.query.hostQuotas.findFirst({ where: (t, { eq }) => eq(t.userId, userId) })
      if (current) {
        await db.update(hostQuotas).set({ remainingEvents: current.remainingEvents + planEvents }).where(eq(hostQuotas.userId, userId))
      } else {
        await db.insert(hostQuotas).values({ userId, remainingEvents: planEvents })
      }
    } else if (modules.length) {
      const per = Math.round((amount / modules.length) / 100)
      for (const m of modules) {
        await db.insert(transactions).values({ eventId, walletId, amount: per.toFixed(2) as any, currency, provider, status: 'confirmed', module: m })
        await db.insert((await import('@shared/schema')).eventModules).values({ eventId, module: m as any }).onConflictDoNothing()
      }
    } else {
      await db.insert(transactions).values({ eventId, walletId, amount: (amount / 100).toFixed(2) as any, currency, provider, status: 'confirmed' })
      const current = await db.query.creditsWallets.findFirst({ where: (t, { eq, and }) => and(eq(t.ownerType, ownerType), eq(t.ownerId, ownerId)) })
      await db.update(creditsWallets)
        .set({ balance: (current!.balance + Math.round(amount / 100)) })
        .where(and(eq(creditsWallets.ownerType, ownerType), eq(creditsWallets.ownerId, ownerId)))
    }
  }

  res.json({ received: true })
})

export default router
