# BSDK — The Chat SDK for AI-native websites

**Bot · Sense · Data · Knowledge**

BSDK provides the frontend and server pieces to bring AI into your web application
while keeping full control of the model and provider. It ships a drop-in React chat
widget, a streaming server runtime with knowledge retrieval and tool orchestration,
and a CLI to scaffold everything into your project.

This repository is the BSDK monorepo, managed with [pnpm workspaces](https://pnpm.io/workspaces)
and [Turborepo](https://turborepo.com).

## Features

- **Drop-in chat UI** — `@bsdk/ui` embeds a streaming, customizable chat widget into any React 19 + Tailwind CSS v4 (shadcn/ui) app.
- **Website-aware server runtime** — `@bsdk/server` streams model responses grounded in your website, with an optional knowledge search tool.
- **Knowledge + Tools** — ground answers in your website content stored in a vector database (Pinecone) with Cohere embeddings.
- **Bring your own model** — works with Groq, Gemini, OpenAI, Anthropic, or any Vercel AI SDK compatible language model.
- **RAG document pipeline** — the API parses PDFs (LlamaCloud), chunks pages, generates Cohere embeddings, and indexes them per bot into Pinecone using Trigger.dev background tasks.
- **Bot management** — the API and playground dashboard let users create and configure bots, upload knowledge documents, and wire chat clients.

## Monorepo structure

```
.
├── apps/
│   ├── api/              # Express + MongoDB backend (auth, bots, documents, chat, knowledge, uploads)
│   └── playground/       # Vite + React 19 site: marketing pages, docs, and bot dashboard
├── packages/
│   ├── ui/               # @bsdk/ui — embeddable React chat widget (BSDKChat)
│   ├── server/           # @bsdk/server — streaming chat runtime, knowledge retrieval, tools
│   ├── cli/              # @bsdk/cli — `bsdk init` project scaffolding
│   ├── eslint-config/    # @repo/eslint-config — shared ESLint configs
│   └── typescript-config/# @repo/typescript-config — shared tsconfig presets
├── compose.yaml          # Docker Compose: API + MongoDB
├── Dockerfile            # Multi-stage build image for the API
├── turbo.json            # Turborepo task pipeline
└── pnpm-workspace.yaml   # Workspace roots: apps/* and packages/*
```

### Apps

| App | Description | Stack |
| --- | --- | --- |
| `apps/api` | REST API powering bots, chat, knowledge and documents. Routes under `/api/*`: `auth`, `bots`, `chat`, `embed`, `documents`, `upload`, `files`, `knowledge`. | Express 5, MongoDB, Vercel AI SDK, Trigger.dev, Multer, Cloudinary |
| `apps/playground` | Public marketing site, documentation, and the bot dashboard where users configure bots and upload knowledge. | Vite, React 19, Tailwind CSS v4, shadcn/ui, Zustand, React Router |

### Packages

| Package | Description |
| --- | --- |
| `@bsdk/ui` | Drop-in `BSDKChat` widget with a customizable trigger, theme, and streaming messages. Requires React 19, Tailwind CSS v4, and shadcn/ui. |
| `@bsdk/server` | `createBSDK()` server SDK. `bsdk.chat()` streams a response grounded in your website via the AI SDK, exposing a `searchKnowledge` tool backed by Pinecone + Cohere. |
| `@bsdk/cli` | `bsdk init` scaffolds your project: installs AI SDK provider packages, generates provider/knowledge config, and sets up Pinecone + Cohere. |
| `@repo/eslint-config`, `@repo/typescript-config` | Shared internal configs for the monorepo. |

## Tech stack

- **Orchestration:** Turborepo, pnpm workspaces
- **Backend:** Node.js, Express 5, MongoDB driver, JWT auth, express-rate-limit, Multer, Cloudinary
- **AI:** Vercel AI SDK (`ai`, `@ai-sdk/*`), Groq, Cohere, LlamaCloud (document parsing)
- **Knowledge / vector search:** Pinecone, Cohere embeddings (`embed-english-v3.0`)
- **Background jobs:** Trigger.dev (`process-document` task)
- **Frontend:** React 19, Vite, Tailwind CSS v4, shadcn/ui, Zustand, React Router, sonner
- **Infra:** Docker / Docker Compose, GitHub Actions CI, Render (API), Cloudflare Workers (playground static hosting)

## Prerequisites

- Node.js `>=18` (the CI pipeline uses Node 22)
- [pnpm](https://pnpm.io/installation) `9.x` (repo pinned to `pnpm@9.0.0`)
- MongoDB (local or Atlas) — or use the provided `compose.yaml`
- API keys for the services you enable: Groq (or your chosen provider), Cohere, Pinecone, and optionally LlamaCloud + Cloudinary

## Getting started

Install dependencies from the repo root:

```sh
pnpm install
```

### Run the API locally

```sh
cd apps/api
cp .env.example .env   # create your own .env (see Environment variables)
pnpm dev               # tsx watch → http://localhost:8080
```

### Run the playground

```sh
cd apps/playground
pnpm dev               # Vite dev server
```

`apps/playground/.env` drives the BSDK chat config:

```
VITE_BSDK_API_URL=
VITE_BSDK_BOT_ID=
VITE_BSDK_BOT_DESC=
```

### Run everything with Turborepo

```sh
pnpm dev              # dev servers for all apps in watch mode
pnpm build            # build all apps and packages
pnpm lint             # lint all workspaces
pnpm check-types      # type-check all workspaces
pnpm format           # prettier --write
```

Target a single workspace:

```sh
pnpm --filter api dev
pnpm turbo build --filter=@bsdk/ui
pnpm turbo build --filter=playground
```

## Using BSDK in your own project

BSDK is built from these packages:

```sh
# Frontend
pnpm add @bsdk/ui
@import "@bsdk/ui/styles.css";   # add to your global CSS

# Backend
pnpm add @bsdk/server

# Scaffold
pnpm dlx @bsdk/cli init
```

Minimal usage:

```tsx
// UI
import { BSDKChat } from "@bsdk/ui";

<BSDKChat
  config={{ api: "https://your-api.com/chat", botId: "your-bot-id", botDescription: "..." }}
/>
```

```ts
// Server
import { createBSDK } from "@bsdk/server";
import { groq } from "@ai-sdk/groq";

const bsdk = createBSDK({ model: groq("llama-3.3-70b-versatile"), knowledge });
await bsdk.chat(messages, botId, description);
```

See the playground docs (`/docs`) for the full installation, quick-start, and provider guides, and the per-package READMEs in `packages/*`.

## API overview

Mounted in `apps/api/src/server.ts` with JWT auth via `requireAuth`:

| Route | Description |
| --- | --- |
| `/api/auth` | Register, login, refresh, logout, delete account, `GET /me`, `PATCH /me` |
| `/api/bots` | List, get, create, patch and delete bots |
| `/api/chat` | `POST /` — stream a chat response through `@bsdk/server` |
| `/api/knowledge` | Get/update per-user Pinecone + Cohere knowledge config (encrypted at rest) |
| `/api/documents` | `POST /upload` — upload PDFs (up to 4) for RAG ingestion |
| `/api/upload`, `/api/files`, `/api/embed` | File upload (Multer + Cloudinary), file metadata & vector status, embed endpoints |

Uploaded documents flow through a Trigger.dev `process-document` task: **parse** (LlamaCloud) → **chunk** → **embed** (Cohere) → **index** into a per-bot Pinecone namespace.

## Environment variables

The API reads these (see `apps/api/.env*` for the full set):

```
PORT                # default 8080
CLIENT_URL          # CORS origin, e.g. the playground URL
MONGODB_URI
MONGODB_DB
JWT_SECRET
GROQ_API_KEY        # or your chosen provider's key
PINECONE_API_KEY
PINECONE_INDEX
PINECONE_INDEX_HOST
COHERE_API_KEY
LLAMA_CLOUD_API_KEY
CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET / CLOUDINARY_CLOUD_NAME
TRIGGER_SECRET_KEY
BSDK_ENCRYPTION_KEY # used to encrypt stored provider keys
```

> Do not commit real credentials. If you have existing `.env` files in your working
> tree that contain live keys, rotate and remove them.

## Docker

The root `compose.yaml` starts the API (built via the root `Dockerfile`) and MongoDB:

```sh
docker compose up
```

- API → `http://localhost:8080`
- MongoDB → `localhost:27017` (volume `mongo_data`)
- The API container reads `apps/api/.env.docker`

## CI/CD

`.github/workflows/api-ci.yml` runs on pushes and PRs to `main`:

1. `pnpm install --frozen-lockfile`
2. Build the API (`pnpm --filter api build`)
3. Build the Docker image
4. On push to `main`: tag and push to GitHub Container Registry (`ghcr.io`)
5. Trigger a Render deploy via a deploy hook

The playground is deployed as static assets via Cloudflare (see `wrangler.jsonc`).

## Contributing

This is a pnpm + Turborepo workspace. Before opening a PR:

- Keep the CI-pipeline scripts green: `pnpm build`, `pnpm lint`, `pnpm check-types`
- Run `pnpm format` to match the prettier config
- Cover `apps/api` and `packages/server` changes in the `api-ci` workflow path

## License

MIT. See the individual `packages/*` licenses for per-package terms.