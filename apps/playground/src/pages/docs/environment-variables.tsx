import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocIntro,
  DocNote,
  DocP,
  DocSection,
} from "../../components/docs/primitives"

const headings = [
  { id: "provider-keys", label: "AI Provider keys" },
  { id: "knowledge-variables", label: "Knowledge variables" },
]

const EnvironmentVariables = () => (
  <DocsLayout
    title="Environment Variables"
    tagline="The credentials BSDK needs to run."
    headings={headings}
  >
    <DocIntro>
      Never commit real credentials. Add them to your environment (for example,{" "}
      <DocInline>.env</DocInline> with empty values as a starting point).
    </DocIntro>

    <DocSection id="provider-keys" title="AI Provider keys">
      <DocP>
        Add the key for each provider you selected during setup:
      </DocP>
      <div className="mt-3 w-full max-w-lg overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-white/50">
              <th className="px-4 py-2.5 font-medium">Provider</th>
              <th className="px-4 py-2.5 font-medium">Environment Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-medium text-white/85">Groq</td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                GROQ_API_KEY
              </td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-medium text-white/85">Gemini</td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                GEMINI_API_KEY
              </td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-medium text-white/85">OpenAI</td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                OPENAI_API_KEY
              </td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-medium text-white/85">
                Anthropic
              </td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                ANTHROPIC_API_KEY
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DocNote>
        Provider API keys belong on the server. Do not expose them in frontend
        code or client-side environment variables.
      </DocNote>
    </DocSection>

    <DocSection id="knowledge-variables" title="Knowledge variables">
      <DocP>
        When you enable Pinecone + Cohere during setup, add:
      </DocP>
      <DocCodeBlock
        snippet={`PINECONE_API_KEY=
PINECONE_INDEX_HOST=
COHERE_API_KEY=`}
      />
    </DocSection>
  </DocsLayout>
)

export default EnvironmentVariables
