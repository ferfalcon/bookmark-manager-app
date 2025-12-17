# Stack

This repo is a small monorepo with two Node.js apps:

- `apps/api-server`: Fastify + Prisma (PostgreSQL)
- `apps/web-app`: React + Vite (static SPA)

## Runtimes / Package Manager

- **Node.js:** `v22.20.0`
  - Docker build images use floating tags: `node:22-slim` (API) and `node:22-alpine` (Web).
  - Dependency engine constraints:
    - `vite@7.3.0` / `@vitejs/plugin-react@5.1.2`: `node ^20.19.0 || >=22.12.0`
    - `prisma@6.19.1` / `@prisma/client@6.19.1`: `node >=18.18`
- **npm:** `10.9.3`
  - Both apps use `package-lock.json` with `lockfileVersion: 3`.

## Containers / Infra

- **Docker Engine:** `29.1.3`
- **Docker Compose:** `v2.40.3-desktop.1`
- **Compose file:** `docker-compose.yml` (runs API + Web + optional local Postgres)
- **PostgreSQL:** `16.x` (Compose image tag: `postgres:16-alpine`)

## Backend (`apps/api-server`)

- **Fastify:** `5.6.2`
- **fastify-cli:** `7.4.1` (used to start the compiled server)
- **@fastify/autoload:** `6.3.1`
- **@fastify/sensible:** `6.0.4`
- **Prisma CLI:** `6.19.1`
- **@prisma/client:** `6.19.1`
- **Prisma engines version:** `7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7`
- **TypeScript:** `5.8.3`

## Frontend (`apps/web-app`)

- **React:** `19.2.3`
- **react-dom:** `19.2.3`
- **Vite:** `7.3.0`
- **@vitejs/plugin-react:** `5.1.2`
- **TypeScript:** `5.9.3`
- **ESLint:** `9.39.2`
- **typescript-eslint:** `8.50.0`

## Production Serving

- **API:** started via `fastify start` (from `fastify-cli@7.4.1`)
- **Web:** served with `serve@14` (installed globally in `apps/web-app/Dockerfile`)

## Sources of truth

- Toolchain: run `node -v`, `npm -v`, `docker --version`, and `docker compose version`
- Backend dependencies: `apps/api-server/package-lock.json`
- Frontend dependencies: `apps/web-app/package-lock.json`
- Container images: `apps/api-server/Dockerfile`, `apps/web-app/Dockerfile`, `docker-compose.yml`
