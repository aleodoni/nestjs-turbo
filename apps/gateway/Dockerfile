# #################### BASE
# FROM node:20-slim AS base
FROM node:lts-bullseye-slim AS base
RUN yarn global add turbo

# #################### BUILDER
FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope="gateway" --docker

# #################### INSTALLER
FROM base as installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install

# #################### PRODUCTION
FROM base as production
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile --production

# #################### SOURCER
FROM base AS sourcer
WORKDIR /app

COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=gateway... --include-dependencies --no-deps

# #################### RUNNNER
# FROM node:20-slim AS runner
FROM node:lts-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package.json .
COPY --from=production /app/yarn.lock .

COPY --from=sourcer /app/apps/ ./apps
COPY --from=sourcer /app/packages/ ./packages
