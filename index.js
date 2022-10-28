import Fastify from 'fastify'
import { createClient } from '@web3-storage/w3up-client'
import fs from 'fs'
import path from 'path'

const fastify = Fastify({
  logger: true,
})

// Setting exported form w3up cli using `w3up export-settings setttings.json`
const raw = fs.readFileSync(path.join(process.cwd(), 'settings.json'), 'utf8')

const config = new Map(Object.entries(JSON.parse(raw)))
const client = createClient({
  settings: raw,
})

fastify.get('/', async (request, reply) => {
  const buf = await client.makeDelegation({
    to: request.query.did,
  })

  return reply.send(Buffer.from(buf))
})

fastify.get('/list', async (request, reply) => {
  const list = await client.list()
  console.log('🚀 ~ file: index.js ~ line 28 ~ fastify.get ~ list', list)

  return reply.send()
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
