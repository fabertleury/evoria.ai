import { z } from 'zod'

export const FeaturedLinkSchema = z.object({
  icon: z.enum(['tiktok', 'instagram', 'reddit', 'whatsapp']),
  label: z.string().min(1),
  href: z.string().url(),
})

export const LandingSchema = z.object({
  hero: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    lottieSrc: z.string().url().optional(),
  }),
  novelty: z.object({ title: z.string(), subtitle: z.string(), lottieSrc: z.string().url().optional() }),
  galleryLotties: z.array(z.string().url()).max(12),
  prices: z.object({
    basic: z.object({ name: z.string(), price: z.string(), oldPrice: z.string().optional(), items: z.array(z.string()).min(1) }),
    premium: z.object({ name: z.string(), price: z.string(), oldPrice: z.string().optional(), items: z.array(z.string()).min(1), featured: z.boolean().optional() }),
  }),
  videos: z.array(z.string().url()).max(24),
  featured: z.object({ leftText: z.string(), rightText: z.string(), links: z.array(FeaturedLinkSchema).max(8) }),
})

export type LandingConfig = z.infer<typeof LandingSchema>
