import { Router } from 'express'
import { requireAuth, AuthedRequest } from '../middleware/auth'
import { db } from '../db'
import { hostQuotas } from '@shared/schema'

const router = Router()

router.get('/quota', requireAuth, async (req, res) => {
  const q = await db.query.hostQuotas.findFirst({ where: (t, { eq }) => eq(t.userId, (req as AuthedRequest).user!.id) })
  res.json({ remainingEvents: q?.remainingEvents || 0 })
})

export default router
