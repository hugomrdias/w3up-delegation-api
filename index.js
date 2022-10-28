import Fastify from 'fastify'
import { createClient } from '@web3-storage/w3up-client'
import fs from 'fs'
import path from 'path'

const fastify = Fastify({
  logger: true,
})

// Setting exported form w3up cli using `w3up export-settings setttings.json`
const raw = fs.readFileSync(path.join(process.cwd(), 'settings.json'), 'utf8')
const client = createClient({
  settings: JSON.parse(raw),
})

fastify.get('/', async (request, reply) => {
  const buf = await client.exportDelegation({
    to: request.query.did,
  })

  return reply.send(buf)
})

fastify.get('/list', async (request, reply) => {
  const list = await client.list()

  return list
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
