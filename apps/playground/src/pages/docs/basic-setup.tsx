import { Link } from "react-router-dom"
import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocCommandRow,
  DocInline,
  DocIntro,
  DocList,
  DocNote,
  DocP,
  DocSection,
} from "../../components/docs/primitives"
import GenericTabs from "../../components/docs/package-manager-tabs"
import { PineconeLogo, CohereLogo } from "@/components/brand/brand-icons"
import { useState } from "react"

const headings = [
  { id: "initialize", label: "Initialize" },
  { id: "account", label: "Create BSDK account" },
  { id: "create-bot", label: "Create Bot" },
  { id: "configure-knowledge", label: "Configure Knowledge" },
  { id: "add-knowledge", label: "Add Knowledge" },
  { id: "environment", label: "Environment" },
  { id: "create-bsdk", label: "Create BSDK" },
  { id: "chat-route", label: "Chat route" },
  { id: "widget", label: "Widget" },
]

const cliTabs = [
  {
    id: "npm",
    label: "npm",
    content: <DocCommandRow command="npx @bsdk/cli init" />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    content: <DocCommandRow command="pnpm dlx @bsdk/cli init" />,
  },
  {
    id: "yarn",
    label: "yarn",
    content: <DocCommandRow command="yarn dlx @bsdk/cli init" />,
  },
  {
    id: "bun",
    label: "bun",
    content: <DocCommandRow command="bunx @bsdk/cli init" />,
  },
]

const envTabs = [
  {
    id: "groq",
    label: "Groq",
    content: <DocCodeBlock snippet={`GROQ_API_KEY=`} />,
  },
  {
    id: "gemini",
    label: "Gemini",
    content: <DocCodeBlock snippet={`GEMINI_API_KEY=`} />,
  },
  {
    id: "openai",
    label: "OpenAI",
    content: <DocCodeBlock snippet={`OPENAI_API_KEY=`} />,
  },
  {
    id: "anthropic",
    label: "Anthropic",
    content: <DocCodeBlock snippet={`ANTHROPIC_API_KEY=`} />,
  },
]

const createBsdkTabs = [
  {
    id: "groq",
    label: "Groq",
    content: (
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { groq } from "./bsdk/providers";

export const bsdk = createBSDK({
  model: groq("openai/gpt-oss-120b"),
});`}
      />
    ),
  },
  {
    id: "gemini",
    label: "Gemini",
    content: (
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { google } from "./bsdk/providers";

export const bsdk = createBSDK({
  model: google("gemini-2.0-flash"),
});`}
      />
    ),
  },
  {
    id: "openai",
    label: "OpenAI",
    content: (
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { openai } from "./bsdk/providers";

export const bsdk = createBSDK({
  model: openai("gpt-4o"),
});`}
      />
    ),
  },
  {
    id: "anthropic",
    label: "Anthropic",
    content: (
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { anthropic } from "./bsdk/providers";

export const bsdk = createBSDK({
  model: anthropic("claude-sonnet-4-20250514"),
});`}
      />
    ),
  },
]

const QuickStart = () => {
  const [provider, setProvider] = useState("groq")

  return (
    <DocsLayout
      title="Quick Start"
      tagline="Get a working BSDK assistant in minutes."
      headings={headings}
    >
      <DocIntro>
        This guide covers the full setup from installation to a working chat widget.
        For widget options, see <Link to="/docs/bsdk-ui" className="text-[#B8D96A] underline-offset-4 hover:underline">BSDK Chat</Link>.
      </DocIntro>

      <DocSection id="initialize" title="Install and initialize">
        <DocP>
          Install the packages and run the CLI from your backend project:
        </DocP>
        <GenericTabs tabs={cliTabs} />
        <DocList
          items={[
            <>
              Choose up to <strong className="font-medium text-white/85">3</strong>{" "}
              AI providers.
            </>,
            <>
              The CLI installs provider dependencies automatically.
            </>,
            <>
              Provider configuration is generated under{" "}
              <DocInline>bsdk/</DocInline>.
            </>,
          ]}
        />
      </DocSection>

      <DocSection id="account" title="Create BSDK account">
        <DocP>
          Sign up or log in at{" "}
          <Link to="https://bsdkdev.netlify.app" className="text-[#B8D96A] underline-offset-4 hover:underline">
            bsdk-live
          </Link>
          , then continue to the dashboard to configure your Bot.
        </DocP>
      </DocSection>

      <DocSection id="create-bot" title="Create Bot">
        <DocP>
          Create a new Bot from the dashboard.
        </DocP>
        <DocP>
          The Bot represents the assistant that will be connected to your website.
          After creation, the Bot has its own <DocInline>botId</DocInline>.
        </DocP>
        <DocP>
          This ID is later passed to the frontend:
        </DocP>
        <DocCodeBlock
          snippet={`const bsdkConfig = {
  api: "{backend-server}/api/chat",
  botId: "your-bot-id",
  botDescription: \`Name: Support Bot
Description: Helps users with account questions\`,
};`}
        />
      </DocSection>

      <DocSection id="configure-knowledge" title="Configure Knowledge">
        <DocP>
          To use document-based Knowledge with the Bot, configure Pinecone and Cohere in the dashboard.
        </DocP>
        <div className="mt-4 flex max-w-2xl flex-col gap-3">
          <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <PineconeLogo className="size-5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white/85">Pinecone</p>
                <p className="text-xs text-white/50">Vector storage</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <code className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-white/70">PINECONE_API_KEY</code>
              <code className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-white/70">PINECONE_INDEX_HOST</code>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <CohereLogo className="size-5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white/85">Cohere</p>
                <p className="text-xs text-white/50">Embeddings</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <code className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-white/70">COHERE_API_KEY</code>
            </div>
          </div>
        </div>
        <DocP>
          After configuring the credentials in the dashboard, copy them to your backend <DocInline>.env</DocInline> file:
        </DocP>
        <DocCodeBlock
          snippet={`PINECONE_API_KEY=
PINECONE_INDEX_HOST=
COHERE_API_KEY=`}
        />
        <DocNote>
          These values are referenced by <DocInline>./bsdk/KnowledgeConfig.ts</DocInline>,
          which supplies the credentials to <DocInline>createBSDK</DocInline>. See{" "}
          <Link to="/docs/knowledge-setup" className="text-[#B8D96A] underline-offset-4 hover:underline">Knowledge</Link>{" "}
          for the full setup.
        </DocNote>
      </DocSection>

      <DocSection id="add-knowledge" title="Add Knowledge">
        <DocP>
          Once the Bot&apos;s Pinecone and Cohere credentials are configured, continue to the document upload step in the{" "}
          <Link to="/dashboard" className="text-[#B8D96A] underline-offset-4 hover:underline">
            BSDK dashboard
          </Link>
          .
        </DocP>
        <DocP>
          Upload the documents that should become part of the Bot&apos;s Knowledge.
        </DocP>
        <DocNote>
          You cannot proceed to document upload for Knowledge until the required Pinecone and Cohere credentials are configured.
        </DocNote>
      </DocSection>

      <DocSection id="environment" title="Environment">
        <DocP>
          Add the API key for each provider you selected:
        </DocP>
        <GenericTabs tabs={envTabs} value={provider} onValueChange={setProvider} />
      </DocSection>

      <DocSection id="create-bsdk" title="Create BSDK">
        <DocP>
          Import the generated provider and create the runtime:
        </DocP>
        <GenericTabs tabs={createBsdkTabs} value={provider} onValueChange={setProvider} />
      </DocSection>

      <DocSection id="chat-route" title="Chat route">
        <DocP>
          Create a backend endpoint that receives messages, botId, and description,
          then calls the runtime:
        </DocP>
        <DocCodeBlock
          snippet={`app.post("/api/chat", async (req, res) => {
  const { messages, botId, description } = req.body;

  const response = await bsdk.chat(messages, botId.toString(), description);

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    return res.end();
  }

  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }

  res.end();
});`}
        />
      </DocSection>

      <DocSection id="widget" title="Widget">
        <DocP>
          Add the chat widget to your frontend and point it at the backend route:
        </DocP>
        <DocCodeBlock
          snippet={`import { BSDKChat } from "@bsdk/ui";
import "@bsdk/ui/styles.css";
import { bsdkConfig } from "@/config/bsdk.config";

<BSDKChat config={bsdkConfig} />`}
        />
        <DocP>
          <DocInline>config.api</DocInline> is the backend chat endpoint. For
          widget options, see{" "}
          <Link to="/docs/bsdk-ui" className="text-[#B8D96A] underline-offset-4 hover:underline">
            BSDK Chat
          </Link>
          .
        </DocP>
      </DocSection>
    </DocsLayout>
  )
}

export default QuickStart
