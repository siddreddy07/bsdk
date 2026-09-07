import DocsLayout from "../../components/docs/layout"
import {
  DocInline,
  DocList,
  DocP,
  DocSection,
  DocStatus,
} from "../../components/docs/primitives"

const headings = [
  { id: "what-can-be-knowledge", label: "What can be knowledge" },
  { id: "ingestion-vs-retrieval", label: "Ingestion vs retrieval" },
]

const WebsiteKnowledge = () => (
  <DocsLayout
    title="Website Knowledge"
    tagline="The website content the assistant can answer from."
    headings={headings}
  >
    <DocSection id="what-can-be-knowledge" title="What can be knowledge">
      <DocP>
        Website knowledge is the content that gets embedded into the knowledge
        index and retrieved at runtime. Typical candidates:
      </DocP>
      <DocList
        items={[
          "documentation",
          "FAQs",
          "product and service information",
          "policies",
          "website content",
        ]}
      />
    </DocSection>

    <DocSection id="ingestion-vs-retrieval" title="Ingestion vs retrieval">
      <DocP>
        <strong className="font-medium text-white/85">Setup/ingestion</strong>{" "}
        is the part that prepares the content: it is configured through{" "}
        <DocInline>@bsdk/cli init</DocInline> and{" "}
        <DocInline>KnowledgeConfig.ts</DocInline> (Pinecone + Cohere), and the
        content must be embedded into the index.
      </DocP>
      <DocP>
        <strong className="font-medium text-white/85">Runtime retrieval</strong>{" "}
        is the part that answers: the <DocInline>searchKnowledge</DocInline>{" "}
        tool looks up that indexed content when the model needs it.
      </DocP>
      <DocStatus>
        Ingestion is not available yet — BSDK does not currently provide a
        crawler or document ingestion format, so no content is automatically
        indexed. See Knowledge Setup for what exists today.
      </DocStatus>
    </DocSection>
  </DocsLayout>
)

export default WebsiteKnowledge