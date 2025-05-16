FROM node:22-alpine@sha256:152270cd4bd094d216a84cbc3c5eb1791afb05af00b811e2f0f04bdc6c473602 AS base

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
RUN yarn build

# ----- Runner -----
FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:92c2a6c01faeda49fab04f4c3c2fd3c652271bf19e99e5a0e8f2974622b9274f AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

LABEL org.opencontainers.image.source="https://git.dominikstahl.dev/DHBW-WE/MeetUp"
LABEL org.opencontainers.image.title="MeetUp"
LABEL org.opencontainers.image.description="A web application for managing meetups"

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["server.js"]
