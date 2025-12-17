import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async (app) => {
  const raw = process.env.CORS_ORIGIN
  const origins =
    raw?.split(',').map((s) => s.trim()).filter(Boolean) ?? []

  await app.register(cors, {
    // If CORS_ORIGIN is set, restrict. Otherwise allow all (dev-friendly).
    origin: origins.length > 0 ? origins : true,
  })
})
