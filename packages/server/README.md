# @bsdk/server

Server SDK for **BSDK** — build website-aware AI assistants with streaming responses and knowledge retrieval.

## Installation

```bash
npm install @bsdk/server
```

```bash
pnpm add @bsdk/server
```

## Quick Start

```ts
import { createBSDK } from "@bsdk/server"
import { groq } from "@ai-sdk/groq"

const bsdk = createBSDK({
  model: groq("llama-3.3-70b-versatile"),
  knowledge: {
    // knowledge configuration
  },
})
```

Use `chat()` to handle a conversation:

```ts
const response = await bsdk.chat(
  messages,
  botId,
  description
)

return response
```

## API

### `createBSDK(options)`

Creates a BSDK server instance.

- `model` — AI SDK compatible language model
- `knowledge` — knowledge retrieval configuration

### `bsdk.chat(messages, namespace?, description?)`

Streams a website-aware chat response.

- `messages` — AI SDK `UIMessage[]`
- `namespace` — optional bot namespace used for isolated knowledge
- `description` — optional website/bot context

Returns a streaming `Response` compatible with the AI SDK UI message stream.

## Packages

- `@bsdk/server` — server SDK
- `@bsdk/ui` — embeddable chat UI
- BSDK CLI — command-line tooling

## License

MIT