import type { FastifyPluginAsync } from 'fastify'
import cors from '@fastify/cors'
import fp from 'fastify-plugin'

function normalize(origin: string) {
  return origin.trim().replace(/\/+$/, '')
}

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  const DEFAULT_ORIGIN = 'http://localhost:5173'
  const originEnv = process.env.CORS_ORIGIN

  const origins = (originEnv ? originEnv.split(',') : [DEFAULT_ORIGIN])
    .map(normalize)
    .filter(Boolean)

  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true)
      cb(null, origins.includes(normalize(origin)))
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
}

export default fp(corsPlugin)
