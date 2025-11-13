import { config } from 'dotenv'
config({ path: '../../.env' })
import express from 'express'
import auth from './routes/auth'
import events from './routes/events'
import guests from './routes/guests'
import storage from './routes/storage'
import payments from './routes/payments'
import links from './routes/links'
import qrcode from './routes/qrcode'
import media from './routes/media'
import feed from './routes/feed'
import screen from './routes/screen'
import summary from './routes/summary'
import admin from './routes/admin'
import pricing from './routes/pricing'
import wallet from './routes/wallet'
import organizations from './routes/organizations'
import host from './routes/host'
import { startWorkers } from './workers/index'

const app = express()
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf
  }
}))
app.use(express.urlencoded({ extended: false }))
app.use('/api/auth', auth)
app.use('/api/events', events)
app.use('/api/guests', guests)
app.use('/api/storage', storage)
app.use('/api/payments', payments)
app.use('/api/links', links)
app.use('/api/qrcode', qrcode)
app.use('/api/media', media)
app.use('/api/feed', feed)
app.use('/api/screen', screen)
app.use('/api/summary', summary)
app.use('/api/admin', admin)
app.use('/api/pricing', pricing)
app.use('/api/wallet', wallet)
app.use('/api/organizations', organizations)
app.use('/api/host', host)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

const port = parseInt(process.env.PORT || '8080', 10)
app.listen(port, () => {
  console.log(`api listening on http://localhost:${port}`)
})

if (process.env.ENABLE_WORKERS === 'true') {
  startWorkers().catch((e) => console.error('workers failed', e))
}
