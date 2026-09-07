import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocList,
  DocP,
  DocSection,
} from "../../components/docs/primitives"

const headings = [
  { id: "what-it-does", label: "What it does" },
  { id: "example", label: "Example" },
]

const SystemPrompt = () => (
  <DocsLayout
    title="System Prompt"
    tagline="Instructions for the assistant."
    headings={headings}
  >
    <DocSection id="what-it-does" title="What it does">
      <DocP>
        Bot-specific instructions are supplied per chat via the{" "}
        <DocInline>description</DocInline> argument to{" "}
        <DocInline>bsdk.chat(messages, botId, description)</DocInline>. This
        provides instructions, not stored knowledge.
      </DocP>
      <DocList
        items={[
          <>Assistant role and greeting behavior.</>,
          <>Website scope — what to answer and what to avoid.</>,
          <>Tone — friendly, formal, concise, and so on.</>,
          <>Response formatting — Markdown, length, inline code.</>,
        ]}
      />
    </DocSection>

    <DocSection id="example" title="Example">
      <DocCodeBlock
        snippet={`const response = await bsdk.chat(
  messages,
  botId,
  \`
    You are this website's AI assistant.

    Scope:
    - Answer questions about this website and its services.
    - Do not invent website-specific information.
    - If information is unavailable, say so clearly.

    Response:
    - Answer directly.
    - Keep simple answers concise.
    - Use Markdown when it improves readability.
  \`
);`}
      />
    </DocSection>
  </DocsLayout>
)

export default SystemPrompt
