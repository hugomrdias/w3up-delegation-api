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

fastify.get('/', async (request, reply) => {
  const client = createClient({
    serviceDID: 'did:key:z6MkrZ1r5XBFZjBU34qyD8fueMbMRkKw17BZaq2ivKFjnz2z',
    serviceURL: 'https://8609r1772a.execute-api.us-east-1.amazonaws.com',
    accessDID: 'did:key:z6MkkHafoFWxxWVNpNXocFdU6PL2RVLyTEgS1qTnD3bRP7V9',
    accessURL: 'https://access-api.web3.storage',
    settings: config,
  })

  const buf = await client.makeDelegation({
    to: request.query.did,
  })

  return reply.send(Buffer.from(buf))
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
