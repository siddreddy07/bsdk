import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocCommandRow,
  DocInline,
  DocIntro,
  DocList,
  DocP,
  DocSection,
} from "../../components/docs/primitives"

const headings = [
  { id: "run-init", label: "Run the CLI" },
  { id: "setup-mode", label: "Setup mode" },
  { id: "choose-providers", label: "Choose AI providers" },
  { id: "provider-config", label: "Provider configuration" },
  { id: "knowledge-setup", label: "Knowledge setup" },
  { id: "environment-variables", label: "Environment variables" },
]

const Initialization = () => (
  <DocsLayout
    title="Initialization"
    tagline="Scaffold BSDK into your backend application."
    headings={headings}
  >
    <DocIntro>
      Run the BSDK CLI inside the backend or project where you want BSDK
      configuration generated.
    </DocIntro>

    <DocSection id="run-init" title="Run the CLI">
      <DocCommandRow command="pnpm dlx @bsdk/cli init" />
      <DocP>Or use the equivalent for your package manager:</DocP>
      <DocCommandRow command="npx @bsdk/cli init" />
      <DocCommandRow command="yarn dlx @bsdk/cli init" />
      <DocCommandRow command="bunx @bsdk/cli init" />
    </DocSection>

    <DocSection id="setup-mode" title="Setup mode">
      <DocP>
        The CLI asks how you want to build:
      </DocP>
      <DocList
        items={[
          <>
            <strong className="font-medium text-white/85">BSDK Way</strong> —
            full setup with providers and optional knowledge.
          </>,
          <>
            <strong className="font-medium text-white/85">BYOC</strong> — bring
            your own configuration.
          </>,
        ]}
      />
    </DocSection>

    <DocSection id="choose-providers" title="Choose AI providers">
      <DocP>
        Select up to <strong className="font-medium text-white/85">3</strong>{" "}
        providers. The CLI installs the matching AI SDK packages automatically:
      </DocP>
      <DocList
        items={[
          <>
            <strong className="font-medium text-white/85">Groq</strong> —{" "}
            <DocInline>@ai-sdk/groq</DocInline>
          </>,
          <>
            <strong className="font-medium text-white/85">Gemini</strong> —{" "}
            <DocInline>@ai-sdk/google</DocInline>
          </>,
          <>
            <strong className="font-medium text-white/85">OpenAI</strong> —{" "}
            <DocInline>@ai-sdk/openai</DocInline>
          </>,
          <>
            <strong className="font-medium text-white/85">Anthropic</strong> —{" "}
            <DocInline>@ai-sdk/anthropic</DocInline>
          </>,
        ]}
      />
      <DocP>
        BSDK detects and uses the current project&apos;s package manager:{" "}
        <DocInline>npm</DocInline>, <DocInline>pnpm</DocInline>,{" "}
        <DocInline>yarn</DocInline>, or <DocInline>bun</DocInline>.
      </DocP>
    </DocSection>

    <DocSection id="provider-config" title="Provider configuration">
      <DocP>
        The CLI generates <DocInline>bsdk/providers.ts</DocInline> with the
        provider instances you selected. A generated Groq provider looks like
        this:
      </DocP>
      <DocCodeBlock
        snippet={`import { createGroq } from "@ai-sdk/groq";

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});`}
        fileName="bsdk/providers.ts"
      />
    </DocSection>

    <DocSection id="knowledge-setup" title="Knowledge setup">
      <DocP>
        You can optionally configure Pinecone for vector storage and Cohere for
        embeddings. If selected, the CLI installs the required packages and
        generates <DocInline>bsdk/KnowledgeConfig.ts</DocInline>:
      </DocP>
      <DocCodeBlock
        snippet={`export const knowledgeConfig = {
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY!,
    indexHost: process.env.PINECONE_INDEX_HOST!,
  },

  cohere: {
    apiKey: process.env.COHERE_API_KEY!,
  },
};`}
        fileName="bsdk/KnowledgeConfig.ts"
      />
      <DocP>
        The CLI configures the Knowledge dependencies and configuration. It does
        not upload, crawl, embed, or index website content.
      </DocP>
    </DocSection>

    <DocSection id="environment-variables" title="Environment variables">
      <DocP>
        Depending on your selections, add the following variables to your
        environment:
      </DocP>
      <DocCodeBlock
        snippet={`GROQ_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

PINECONE_API_KEY=
PINECONE_INDEX_HOST=
COHERE_API_KEY=`}
      />
      <DocP>
        Only add the provider keys you selected, and the Pinecone/Cohere
        variables only if you enabled Knowledge.
      </DocP>
    </DocSection>
  </DocsLayout>
)

export default Initialization
