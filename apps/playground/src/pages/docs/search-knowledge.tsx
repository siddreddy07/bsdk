import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocP,
  DocSection,
  DocStatus,
} from "../../components/docs/primitives"

const headings = [
  { id: "how-it-works", label: "How it works" },
  { id: "status", label: "Status" },
]

const SearchKnowledge = () => (
  <DocsLayout
    title="searchKnowledge"
    tagline="Retrieve relevant website content when needed."
    headings={headings}
  >
    <DocSection id="how-it-works" title="How it works">
      <DocP>
        <DocInline>searchKnowledge</DocInline> lets the model retrieve relevant
        indexed website content when the user asks about the site, its products,
        docs, APIs, policies or other site-specific information.
      </DocP>
      <DocP>The simple flow:</DocP>
      <DocCodeBlock
        snippet={`User question
      ↓
searchKnowledge
      ↓
Query embedding
      ↓
Pinecone namespace
      ↓
Relevant website context
      ↓
AI response`}
      />
      <DocP>
        The question is embedded, the index is searched for the closest
        website content, and that context is folded into the response.
      </DocP>
    </DocSection>

    <DocSection id="status" title="Status">
      <DocStatus>
        <DocInline>searchKnowledge</DocInline> is the knowledge tool currently
        registered with the model. Its retrieval output is being finalized:
        today it returns a placeholder snippet while the query pipeline is wired
        up. See Knowledge Setup for the overview.
      </DocStatus>
      <DocCodeBlock
        snippet={`{
  query: string,   // the knowledge to search for
}`}
      />
    </DocSection>
  </DocsLayout>
)

export default SearchKnowledge