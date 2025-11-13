export function log(scope: string, message: string, meta?: Record<string, any>) {
  const ts = new Date().toISOString()
  // minimal structured log
  console.log(JSON.stringify({ ts, scope, message, ...(meta || {}) }))
}
