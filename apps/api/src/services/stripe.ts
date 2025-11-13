import Stripe from 'stripe'
import { config } from 'dotenv'
config({ path: '../../.env' })

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, { apiVersion: '2023-10-16' })

export const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string
