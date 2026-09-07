import { Link } from "react-router-dom"
import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocCommandRow,
  DocInline,
  DocList,
  DocP,
  DocSection,
} from "../../components/docs/primitives"
import GenericTabs from "../../components/docs/package-manager-tabs"

const headings = [
  { id: "installation", label: "Installation" },
  { id: "create-bsdk", label: "Create BSDK" },
  { id: "chat", label: "Chat" },
]

const installTabs = [
  {
    id: "npm",
    label: "npm",
    content: <DocCommandRow command="npm install @bsdk/server" />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    content: <DocCommandRow command="pnpm add @bsdk/server" />,
  },
  {
    id: "yarn",
    label: "yarn",
    content: <DocCommandRow command="yarn add @bsdk/server" />,
  },
  {
    id: "bun",
    label: "bun",
    content: <DocCommandRow command="bun add @bsdk/server" />,
  },
]

const BsdkServer = () => (
  <DocsLayout
    title="BSDK Server"
    tagline="Backend runtime for BSDK chat."
    headings={headings}
  >
    <DocSection id="installation" title="Installation">
      <GenericTabs tabs={installTabs} />
    </DocSection>

    <DocSection id="create-bsdk" title="Create BSDK">
      <DocP>
        Import the generated provider and create the runtime:
      </DocP>
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { groq } from "./bsdk/providers";

const bsdk = createBSDK({
  model: groq("openai/gpt-oss-120b"),
});`}
      />
      <DocList
        items={[
          <>
            <DocInline>model</DocInline> — the AI SDK model used for generation.
          </>,
          <>
            <DocInline>knowledge</DocInline> — optional Pinecone + Cohere
            configuration for Knowledge.
          </>,
        ]}
      />
      <DocP>
        For provider configuration, see{" "}
        <Link to="/docs/providers" className="text-[#B8D96A] underline-offset-4 hover:underline">AI Providers</Link>.
      </DocP>
    </DocSection>

    <DocSection id="chat" title="Chat">
      <DocP>
        The runtime exposes <DocInline>bsdk.chat(messages, botId, description)</DocInline>,
        which returns a streaming HTTP response. Forward it from a backend route:
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
  </DocsLayout>
)

export default BsdkServer
