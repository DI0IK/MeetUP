FROM node:22-alpine@sha256:ad1aedbcc1b0575074a91ac146d6956476c1f9985994810e4ee02efd932a68fd AS base

# ----- Dependencies -----
FROM base AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ----- Build -----
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# ----- Runner -----
FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:7461370c8473cfcbf5def249423d5e8301b0e6b98cb256b3c8707f0201c2ea4a AS runner

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
