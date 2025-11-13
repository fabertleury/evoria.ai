import { config } from 'dotenv'
config({ path: '../../.env' })

export type ModerationResult = { approved: boolean; reason?: string }

export async function moderateMedia(path: string, type: 'image'|'video'|'audio'): Promise<ModerationResult> {
  const key = process.env.AI_MODERATION_API_KEY
  const endpoint = process.env.AI_MODERATION_ENDPOINT
  if (!key && !endpoint) return { approved: true }
  try {
    if (endpoint) {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key!}` }, body: JSON.stringify({ path, type }) })
      const data = await res.json()
      return { approved: !!data.approved, reason: data.reason }
    }
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key!}` },
      body: JSON.stringify({ model: 'omni-moderation-latest', input: `type:${type} url:${path}` })
    })
    const data: any = await res.json()
    const flagged = !!data?.results?.[0]?.flagged
    const reason = flagged ? 'Conteúdo sinalizado pela moderação OpenAI' : undefined
    return { approved: !flagged, reason }
  } catch {
    return { approved: true }
  }
}
