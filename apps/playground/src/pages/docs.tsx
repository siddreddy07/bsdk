import DocsLayout from "../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocIntro,
  DocList,
  DocP,
  DocSection,
} from "../components/docs/primitives"
import { Link } from "react-router-dom"

const headings = [
  { id: "what-is-bsdk", label: "What is BSDK?" },
  { id: "packages", label: "Packages" },
  { id: "start-building", label: "Start building" },
]

const Docs = () => (
  <DocsLayout
    title="BSDK"
    tagline="Bot · Sense · Data · Knowledge"
    headings={headings}
  >
    <DocIntro>
      The Chat SDK for building AI-native websites.
    </DocIntro>

    <DocSection id="what-is-bsdk" title="What is BSDK?">
      <DocP>
        BSDK gives you the building blocks to add an AI assistant to a website —
        from the chat experience and model runtime to bot configuration and
        website knowledge.
      </DocP>
      <DocP>
        Instead of wiring the UI, AI provider, streaming backend, and knowledge
        layer separately, BSDK brings them into one setup.
      </DocP>

      <DocList
        items={[
          <>
            <strong className="font-medium text-white/85">Bot</strong> — Create
            and configure the assistant that lives on your website — its identity,
            description, and behavior.
          </>,
          <>
            <strong className="font-medium text-white/85">Sense</strong> —
            Connect the assistant to AI models from providers such as Groq,
            Gemini, OpenAI, and Anthropic. Powered by Vercel AI SDK.
          </>,
          <>
            <strong className="font-medium text-white/85">Data</strong> — Keep
            the assistant connected to your application&apos;s bot and website data
            through your own backend.
          </>,
          <>
            <strong className="font-medium text-white/85">Knowledge</strong> —
            Give the assistant access to website-specific knowledge using Pinecone
            and Cohere.
          </>,
        ]}
      />

      <DocP>The flow stays simple:</DocP>
      <DocCodeBlock
        snippet={`Website
   ↓
BSDK Chat
   ↓
Your Backend
   ↓
Bot + AI Model + Knowledge`}
      />
    </DocSection>

    <DocSection id="packages" title="Packages">
      <DocP>BSDK is available through three packages:</DocP>

      <DocP>
        <DocInline>@bsdk/ui</DocInline> — The frontend package containing{" "}
        <DocInline>BSDKChat</DocInline>, the embeddable chat experience for your
        website.
      </DocP>

      <DocP>
        <DocInline>@bsdk/server</DocInline> — The backend runtime for
        configuring your model, optional knowledge layer, and handling
        conversations.
      </DocP>
      <DocCodeBlock snippet={`bsdk.chat(messages, botId, description)`} />

      <DocP>
        <DocInline>@bsdk/cli</DocInline> — The setup CLI for configuring AI
        providers and optional Knowledge dependencies.
      </DocP>
      <DocCodeBlock snippet={`npx @bsdk/cli init`} />
    </DocSection>

    <DocSection id="start-building" title="Start building">
      <DocP>A typical BSDK setup takes four steps:</DocP>
      <DocList
        items={[
          <>Install the UI and server packages.</>,
          <>Run the CLI and configure your AI provider.</>,
          <>Create your backend BSDK runtime and chat endpoint.</>,
          <>Add <DocInline>BSDKChat</DocInline> to your website and connect it to that endpoint.</>,
        ]}
      />
      <DocP>
        Continue to <Link to="/docs/installation" className="text-[#B8D96A] underline-offset-4 hover:underline">Installation</Link> to get started.
      </DocP>
    </DocSection>
  </DocsLayout>
)

export default Docs
