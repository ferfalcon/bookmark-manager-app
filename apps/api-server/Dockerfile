# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Fastify TS template uses build:ts
RUN npm run build:ts

# ---------- runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# We need the fastify CLI at runtime because your start uses `fastify start`
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 3000

# Bind to 0.0.0.0 and use Render/Docker PORT
CMD ["sh", "-c", "npm exec -- fastify start -l info -a 0.0.0.0 -p ${PORT} dist/app.js"]
