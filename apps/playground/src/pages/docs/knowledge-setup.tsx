import { Link } from "react-router-dom"
import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocList,
  DocP,
  DocSection,
} from "../../components/docs/primitives"

const headings = [
  { id: "dashboard", label: "Dashboard configuration" },
  { id: "server", label: "Server configuration" },
]

const KnowledgeSetup = () => (
  <DocsLayout
    title="Knowledge"
    tagline="Ground the assistant in your website's content."
    headings={headings}
  >
    <DocSection id="dashboard" title="Dashboard configuration">
      <DocP>
        Knowledge requires two sides: dashboard setup and server configuration.
      </DocP>

      <DocP>
        <strong className="font-medium text-white/85">Dashboard</strong> — configure
        the Bot and its Knowledge/documents.
      </DocP>
      <DocList
        items={[
          <>
            Create a Bot from the BSDK dashboard.
          </>,
          <>
            Configure Pinecone and Cohere credentials for the Bot.
          </>,
          <>
            Upload the documents that should become part of the Bot&apos;s Knowledge.
          </>,
        ]}
      />
      <DocP>The required credentials are:</DocP>
      <DocCodeBlock
        snippet={`PINECONE_API_KEY=
PINECONE_INDEX_HOST=
COHERE_API_KEY=`}
      />
      <DocP>
        You cannot proceed to document upload for Knowledge until the required
        Pinecone and Cohere credentials are configured.
      </DocP>
      <DocP>
        For environment variable details, see{" "}
        <Link to="/docs/environment-variables" className="text-[#B8D96A] underline-offset-4 hover:underline">Environment Variables</Link>.
      </DocP>
    </DocSection>

    <DocSection id="server" title="Server configuration">
      <DocP>
        <strong className="font-medium text-white/85">Server</strong> — provide the
        Knowledge credentials required by the BSDK runtime.
      </DocP>
      <DocP>
        When Knowledge is enabled, <DocInline>createBSDK</DocInline> receives the
        Knowledge configuration:
      </DocP>
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { groq } from "./bsdk/providers";
import { knowledgeConfig } from "./bsdk/KnowledgeConfig";

const bsdk = createBSDK({
  model: groq("openai/gpt-oss-120b"),

  knowledge: {
    pinecone: knowledgeConfig.pinecone,
    cohere: knowledgeConfig.cohere,
  },
});`}
      />
      <DocP>
        For provider configuration, see{" "}
        <Link to="/docs/providers" className="text-[#B8D96A] underline-offset-4 hover:underline">AI Providers</Link>.
      </DocP>
    </DocSection>
  </DocsLayout>
)

export default KnowledgeSetup
