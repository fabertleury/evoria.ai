import { Router } from 'express'
import { db } from '../db'
import { events, settings } from '@shared/schema'

const router = Router()

router.get('/', async (req, res) => {
  const eventId = req.query.eventId as string
  const ev = eventId ? await db.query.events.findFirst({ where: (t, { eq }) => eq(t.id, eventId) }) : null
  const s = await db.query.settings.findMany()
  const kv = Object.fromEntries(s.map((i:any)=>[i.key,i.value]))
  const feed = ev?.feedPrice ? parseFloat(ev.feedPrice as any) : parseFloat(kv.PRICE_FEED_POST || '0')
  const screen = ev?.screenPrice ? parseFloat(ev.screenPrice as any) : parseFloat(kv.PRICE_SCREEN_SLOT || '0')
  res.json({ feedPrice: feed, screenPrice: screen })
})

export default router
