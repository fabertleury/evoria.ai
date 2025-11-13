import { Router } from 'express'
import { db } from '../db'
import { creditsWallets } from '@shared/schema'

const router = Router()

router.get('/', async (req, res) => {
  const guestId = req.query.guestId as string
  if (!guestId) return res.status(400).json({ message: 'Missing guestId' })
  const w = await db.query.creditsWallets.findFirst({ where: (t, { eq, and }) => and(eq(t.ownerType, 'guest'), eq(t.ownerId, guestId)) })
  res.json({ balance: w?.balance || 0 })
})

export default router
