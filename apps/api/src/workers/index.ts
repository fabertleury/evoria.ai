import { config } from 'dotenv'
config({ path: '../../.env' })
import amqp from 'amqplib'

const url = process.env.RABBITMQ_URL as string
const prefetch = parseInt(process.env.RABBITMQ_PREFETCH || '5', 10)
const queues = {
  moderation: process.env.RABBITMQ_QUEUE_MODERATION || 'evoria.moderation',
  media: process.env.RABBITMQ_QUEUE_MEDIA || 'evoria.media',
  summary: process.env.RABBITMQ_QUEUE_SUMMARY || 'evoria.summary'
}

async function run() {
  if (!url) {
    console.error('RABBITMQ_URL não definido')
    process.exit(1)
  }
  const conn = await amqp.connect(url)
  const ch = await conn.createChannel()
  await ch.prefetch(prefetch)
  await ch.assertQueue(queues.moderation, { durable: true })
  await ch.assertQueue(queues.media, { durable: true })
  await ch.assertQueue(queues.summary, { durable: true })

  ch.consume(queues.moderation, async (msg: any) => {
    if (!msg) return
    try {
      const payload = JSON.parse(msg.content.toString())
      console.log('moderation', payload)
      ch.ack(msg)
    } catch (e) {
      ch.nack(msg, false, false)
    }
  }, { noAck: false })

  ch.consume(queues.media, async (msg: any) => {
    if (!msg) return
    try {
      const payload = JSON.parse(msg.content.toString())
      console.log('media', payload)
      ch.ack(msg)
    } catch (e) {
      ch.nack(msg, false, false)
    }
  }, { noAck: false })

  ch.consume(queues.summary, async (msg: any) => {
    if (!msg) return
    try {
      const payload = JSON.parse(msg.content.toString())
      console.log('summary', payload)
      ch.ack(msg)
    } catch (e) {
      ch.nack(msg, false, false)
    }
  }, { noAck: false })

  const shutdown = async () => {
    try { await ch.close() } catch {}
    try { await conn.close() } catch {}
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

run().catch((err) => {
  console.error('worker erro', err)
  process.exit(1)
})
