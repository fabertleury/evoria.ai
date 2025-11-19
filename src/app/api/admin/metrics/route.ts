import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, events, guests, mediaAssets, transactions } from '@/lib/schema'
import { requireRole } from '@/lib/auth'

export async function GET(req: Request) {
  const me = requireRole(req, ['admin'])
  if (!me) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const db = getDb()
  const u = await db.select().from(users)
  const e = await db.select().from(events)
  const g = await db.select().from(guests)
  const m = await db.select().from(mediaAssets)
  const t = await db.select().from(transactions)
  
  const pendingMedia = m.filter(x => x.status === 'pending').length
  const approvedMedia = m.filter(x => x.status === 'approved').length
  const rejectedMedia = m.filter(x => x.status === 'rejected').length
  
  const confirmedTx = t.filter(x => x.status === 'confirmed')
  const pendingTx = t.filter(x => x.status === 'pending')
  const refundedTx = t.filter(x => x.status === 'refunded')
  
  const revenue = confirmedTx.reduce((sum, x: any) => sum + parseFloat(String(x.amount || '0')), 0)
  const recentEvents = e.slice(-5).map(x => ({ id: x.id, name: x.name, date: x.date }))
  const recentTx = t.slice(-5).map(x => ({ id: x.id, amount: String(x.amount), currency: x.currency, status: x.status }))
  
  // Distribuição de mídias por tipo
  const mediaByType = [
    { name: 'Imagens', value: m.filter(x => x.type === 'image').length },
    { name: 'Vídeos', value: m.filter(x => x.type === 'video').length },
    { name: 'Áudios', value: m.filter(x => x.type === 'audio').length },
  ].filter(x => x.value > 0)
  
  // Distribuição de mídias por status
  const mediaByStatus = [
    { name: 'Pendente', value: pendingMedia },
    { name: 'Aprovada', value: approvedMedia },
    { name: 'Rejeitada', value: rejectedMedia },
  ].filter(x => x.value > 0)
  
  // Distribuição de transações por status
  const transactionsByStatus = [
    { name: 'Confirmada', value: confirmedTx.length },
    { name: 'Pendente', value: pendingTx.length },
    { name: 'Reembolsada', value: refundedTx.length },
  ].filter(x => x.value > 0)
  
  // Distribuição de transações por provider
  const txByProvider = [
    { name: 'Stripe Card', value: t.filter(x => x.provider === 'stripe_card').length },
    { name: 'Stripe PIX', value: t.filter(x => x.provider === 'stripe_pix').length },
  ].filter(x => x.value > 0)
  
  // Usuários por role
  const usersByRole = [
    { name: 'Admin', value: u.filter(x => x.role === 'admin').length },
    { name: 'Anfitrião', value: u.filter(x => x.role === 'anfitriao').length },
    { name: 'Convidado', value: u.filter(x => x.role === 'convidado').length },
  ].filter(x => x.value > 0)
  
  return NextResponse.json({
    counts: { 
      users: u.length, 
      events: e.length, 
      guests: g.length, 
      media: m.length, 
      pendingMedia, 
      transactions: t.length 
    },
    revenue,
    recentEvents,
    recentTransactions: recentTx,
    charts: {
      mediaByType,
      mediaByStatus,
      transactionsByStatus,
      txByProvider,
      usersByRole,
    }
  })
}