import type { FastifyPluginAsync } from 'fastify'

const readyzRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/readyz', async () => {
    await fastify.prisma.$queryRaw`SELECT 1`
    return { status: 'ok' }
  })
}

export default readyzRoute
