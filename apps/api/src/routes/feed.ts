import { Router } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { posts, mediaAssets, creditsWallets, events, settings } from '@shared/schema'
import { eq, and } from '@shared/schema'

const router = Router()

router.get('/posts', async (req, res) => {
  const eventId = req.query.eventId as string
  if (!eventId) return res.status(400).json({ message: 'Missing eventId' })
  const list = await db.query.posts.findMany({ where: (t, { eq }) => eq(t.eventId, eventId) })
  res.json({ posts: list })
})

router.post('/posts', async (req, res) => {
  const body = z.object({ eventId: z.string(), guestId: z.string(), content: z.string().optional(), mediaId: z.string().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  if (body.data.mediaId) {
    const media = await db.query.mediaAssets.findFirst({ where: (t, { eq }) => eq(t.id, body.data.mediaId!) })
    if (!media || media.status !== 'approved') return res.status(400).json({ message: 'Media not approved' })
  }
  const ev = await db.query.events.findFirst({ where: (t, { eq }) => eq(t.id, body.data.eventId) })
  const s = await db.query.settings.findMany()
  const kv = Object.fromEntries(s.map((i:any)=>[i.key,i.value]))
  const price = ev?.feedPrice ? parseFloat(ev.feedPrice as any) : parseFloat(kv.PRICE_FEED_POST || '0')
  if (price > 0) {
    const wallet = await db.query.creditsWallets.findFirst({ where: (t, { eq, and }) => and(eq(t.ownerType, 'guest'), eq(t.ownerId, body.data.guestId)) })
    if (!wallet || wallet.balance < Math.round(price)) return res.status(400).json({ message: 'Insufficient credits' })
    await db.update(creditsWallets)
      .set({ balance: wallet.balance - Math.round(price) })
      .where(and(eq(creditsWallets.ownerType, 'guest'), eq(creditsWallets.ownerId, body.data.guestId)))
  }
  const [post] = await db.insert(posts).values({ eventId: body.data.eventId, guestId: body.data.guestId, content: body.data.content, mediaId: body.data.mediaId, likes: 0 }).returning()
  res.json({ post })
})

export default router
