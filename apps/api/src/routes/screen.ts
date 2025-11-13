import { Router } from 'express'
import { eq, and } from '@shared/schema'
import { z } from 'zod'
import { db } from '../db'
import { broadcastSessions, creditsWallets } from '@shared/schema'

const router = Router()

function ensureState(state: any) {
  if (!state || typeof state !== 'object') return { queue: [], currentIndex: 0 }
  if (!Array.isArray(state.queue)) state.queue = []
  if (typeof state.currentIndex !== 'number') state.currentIndex = 0
  return state
}

router.get('/state', async (req, res) => {
  const eventId = req.query.eventId as string
  if (!eventId) return res.status(400).json({ message: 'Missing eventId' })
  const sess = await db.query.broadcastSessions.findFirst({ where: (t, { eq }) => eq(t.eventId, eventId) })
  const state = ensureState(sess?.state)
  const current = state.queue[state.currentIndex] || null
  res.json({ state, current })
})

router.post('/enqueue', async (req, res) => {
  const body = z.object({ eventId: z.string(), mediaId: z.string(), guestId: z.string().optional(), durationSec: z.number().default(30), bidCredits: z.number().default(0) }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const sess = await db.query.broadcastSessions.findFirst({ where: (t, { eq }) => eq(t.eventId, body.data.eventId) })
  const state = ensureState(sess?.state)
  const media = await db.query.mediaAssets.findFirst({ where: (t, { eq }) => eq(t.id, body.data.mediaId) })
  if (!media || media.status !== 'approved') return res.status(400).json({ message: 'Media not approved' })
  if (body.data.guestId && body.data.bidCredits > 0) {
    const wallet = await db.query.creditsWallets.findFirst({ where: (t, { eq, and }) => and(eq(t.ownerType, 'guest'), eq(t.ownerId, body.data.guestId!)) })
    if (!wallet || wallet.balance < body.data.bidCredits) return res.status(400).json({ message: 'Insufficient credits' })
    await db.update(creditsWallets)
      .set({ balance: wallet.balance - body.data.bidCredits })
      .where(and(eq(creditsWallets.ownerType, 'guest'), eq(creditsWallets.ownerId, body.data.guestId!)))
  }
  state.queue.push({ mediaId: body.data.mediaId, guestId: body.data.guestId, durationSec: body.data.durationSec, bidCredits: body.data.bidCredits, ts: Date.now() })
  if (sess) {
    await db.update(broadcastSessions).set({ state }).where(eq(broadcastSessions.id, sess.id))
  } else {
    await db.insert(broadcastSessions).values({ eventId: body.data.eventId, state })
  }
  res.json({ ok: true })
})

router.post('/advance', async (req, res) => {
  const body = z.object({ eventId: z.string() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const sess = await db.query.broadcastSessions.findFirst({ where: (t, { eq }) => eq(t.eventId, body.data.eventId) })
  const state = ensureState(sess?.state)
  if (state.currentIndex < state.queue.length - 1) state.currentIndex += 1
  else state.currentIndex = state.queue.length - 1
  if (sess) await db.update(broadcastSessions).set({ state }).where(eq(broadcastSessions.id, sess.id))
  res.json({ ok: true, state })
})

export default router
