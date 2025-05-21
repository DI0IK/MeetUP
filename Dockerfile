FROM node:22-alpine@sha256:c29616372680176cc197fac55bde7f2a80723328c0838a901e960c3e6d570d4b AS base

# ----- Dependencies -----
FROM base AS deps

WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --frozen-lockfile

# ----- Build -----
FROM base AS builder

WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma:generate
RUN yarn build

# ----- Runner -----
FROM base AS runner

WORKDIR /app

RUN yarn add prisma -D

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY entrypoint.sh ./

LABEL org.opencontainers.image.source="https://git.dominikstahl.dev/DHBW-WE/MeetUp"
LABEL org.opencontainers.image.title="MeetUp"
LABEL org.opencontainers.image.description="A web application for managing meetups"

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["/bin/ash", "entrypoint.sh"]
