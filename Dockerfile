FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter api build

EXPOSE 8080

CMD ["pnpm","--filter","api","start"]