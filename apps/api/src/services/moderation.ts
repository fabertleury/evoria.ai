import { config } from 'dotenv'
config({ path: '../../.env' })

export type ModerationResult = { approved: boolean; reason?: string }

export async function moderateMedia(path: string, type: 'image'|'video'|'audio'): Promise<ModerationResult> {
  const key = process.env.AI_MODERATION_API_KEY
  const endpoint = process.env.AI_MODERATION_ENDPOINT
  if (!key || !endpoint) {
    return { approved: true }
  }
  try {
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }, body: JSON.stringify({ path, type }) })
    const data = await res.json()
    return { approved: !!data.approved, reason: data.reason }
  } catch (e: any) {
    return { approved: true }
  }
}
