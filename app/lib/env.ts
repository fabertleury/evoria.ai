import { z } from 'zod'

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16),
})

export function getEnv() {
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) throw new Error('Invalid environment config')
  return parsed.data
}
