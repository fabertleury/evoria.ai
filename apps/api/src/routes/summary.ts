import { Router } from 'express'
import { db } from '../db'
import { events, posts, mediaAssets, guests } from '@shared/schema'

const router = Router()

router.get('/event/:id', async (req, res) => {
  const eventId = req.params.id
  const totalPosts = await db.query.posts.findMany({ where: (t, { eq }) => eq(t.eventId, eventId) })
  const totalInteractions = totalPosts.reduce((acc, p) => acc + (p.likes || 0), 0)
  const mostLikedMediaId = totalPosts.sort((a,b)=> (b.likes||0)-(a.likes||0))[0]?.mediaId || null
  const guestsList = await db.query.guests.findMany({ where: (t, { eq }) => eq(t.eventId, eventId) })
  const mostActiveGuestId = guestsList[0]?.id || null
  const hours = totalPosts.map(p => new Date(p.createdAt!).getHours())
  const peakHour = hours.sort((a,b)=> hours.filter(h=>h===b).length - hours.filter(h=>h===a).length)[0] || null
  res.json({
    interactions: totalInteractions,
    mostLikedMediaId,
    mostActiveGuestId,
    peakHour
  })
})

export default router
