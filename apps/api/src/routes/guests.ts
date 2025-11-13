import { Router } from 'express'
import { db } from '../db'
import { guests, creditsWallets } from '@shared/schema'
import { z } from 'zod'

const router = Router()

router.post('/', async (req, res) => {
  const body = z.object({ eventId: z.string(), displayName: z.string().min(1) }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const inserted = await db.insert(guests).values({ eventId: body.data.eventId, displayName: body.data.displayName }).returning()
  await db.insert(creditsWallets).values({ ownerType: 'guest', ownerId: inserted[0].id, balance: 0 }).onConflictDoNothing()
  res.json({ guest: inserted[0] })
})

export default router
