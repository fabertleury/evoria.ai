export type Role = 'admin' | 'anfitriao' | 'convidado'

export type User = {
  id: string
  email: string
  role: Role
}

export type EventModule = 'screen' | 'feed'

export type Event = {
  id: string
  hostId: string
  name: string
  coverUrl?: string
  date: string
  modules: EventModule[]
}

export type Guest = {
  id: string
  eventId: string
  displayName: string
}

export type MediaType = 'image' | 'video' | 'audio'

export type MediaAsset = {
  id: string
  eventId: string
  guestId?: string
  type: MediaType
  url: string
  status: 'pending' | 'approved' | 'rejected'
}

export type Post = {
  id: string
  eventId: string
  guestId: string
  content?: string
  mediaId?: string
  likes: number
  createdAt: string
}

export type CreditsWallet = {
  id: string
  ownerType: 'user' | 'guest'
  ownerId: string
  balance: number
}

export type Transaction = {
  id: string
  eventId: string
  walletId: string
  amount: number
  currency: 'BRL'
  provider: 'stripe_pix' | 'stripe_card'
  status: 'pending' | 'confirmed' | 'refunded'
  createdAt: string
}

export type ModerationLog = {
  id: string
  eventId: string
  mediaId: string
  decision: 'approved' | 'rejected'
  reason?: string
  createdAt: string
}
