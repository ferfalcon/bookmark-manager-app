import fp from 'fastify-plugin'
import cors from '@fastify/cors'

function normalizeOrigin(value: string) {
  return value.trim().replace(/\/+$/, '')
}

export default fp(async (app) => {
  const raw = process.env.CORS_ORIGIN ?? ''
  const allowed = raw
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean)

  app.log.info({ allowed }, 'CORS allowed origins')

  await app.register(cors, {
    origin: (origin, cb) => {
      // Requests like curl won’t send Origin; allow them.
      if (!origin) return cb(null, true)

      const incoming = normalizeOrigin(origin)

      // If no allow-list configured, allow all (dev-friendly).
      if (allowed.length === 0) return cb(null, true)

      return cb(null, allowed.includes(incoming))
    },
  })
})
