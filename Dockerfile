FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter api build

EXPOSE 8080

CMD ["pnpm","--filter","api","start"]