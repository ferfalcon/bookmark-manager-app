FROM node:22-slim AS base
WORKDIR /app

# Prisma can be finicky on Alpine due to OpenSSL; Debian slim is a safer default. :contentReference[oaicite:1]{index=1}
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# ---------- deps ----------
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# ---------- build ----------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:ts

# ---------- runtime ----------
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["sh", "-c", "npm exec -- fastify start -l info -a 0.0.0.0 -p ${PORT} dist/app.js"]
