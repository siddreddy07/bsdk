# BSDK CLI

Set up BSDK in your project from the command line.

## Usage

Run BSDK using your preferred package manager:

```bash
# npm
npx bsdk init

# pnpm
pnpm dlx bsdk init

# yarn
yarn dlx bsdk init

# bun
bunx bsdk init
```

The CLI automatically detects your package manager and uses it when installing dependencies.

## AI Providers

During setup, choose up to **3 AI providers**:

- Groq
- Gemini
- OpenAI
- Anthropic

BSDK installs the required AI SDK packages and generates the provider configuration for you.

For example, selecting Groq generates:

```ts
import { createGroq } from "@ai-sdk/groq";

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});
```

Add the corresponding API key to your environment:

```env
GROQ_API_KEY=
```

## Knowledge

BSDK can optionally configure knowledge search using:

- **Pinecone** — Vector database
- **Cohere** — Embeddings

If enabled, the CLI installs the required dependencies and generates the knowledge configuration:

```ts
export const knowledgeConfig = {
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY!,
    indexHost: process.env.PINECONE_INDEX_HOST!,
  },

  cohere: {
    apiKey: process.env.COHERE_API_KEY!,
  },
};
```

Add the required environment variables:

```env
PINECONE_API_KEY=
PINECONE_INDEX_HOST=
COHERE_API_KEY=
```

## Package Managers

BSDK supports:

| Package Manager | Run |
| --- | --- |
| npm | `npx bsdk init` |
| pnpm | `pnpm dlx bsdk init` |
| Yarn | `yarn dlx bsdk init` |
| Bun | `bunx bsdk init` |

That's it. Run the CLI, choose your providers and knowledge setup, and BSDK generates the required configuration for your project.