import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocIntro,
  DocP,
  DocSection,
} from "../../components/docs/primitives"

const headings = [
  { id: "usage", label: "Usage" },
  { id: "options", label: "Options" },
  { id: "runtime", label: "Runtime" },
]

const CreateBskd = () => (
  <DocsLayout
    title="createBSDK"
    tagline="The BSDK runtime factory."
    headings={headings}
  >
    <DocIntro>
      <DocInline>createBSDK(options)</DocInline> creates the runtime used to
      stream AI responses in your server application.
    </DocIntro>

    <DocSection id="usage" title="Usage">
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { groq } from "./bsdk/providers";

const bsdk = createBSDK({
  model: groq("openai/gpt-oss-120b"),
});`}
      />
    </DocSection>

    <DocSection id="options" title="Options">
      <div className="mt-3 w-full max-w-lg overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-white/50">
              <th className="px-4 py-2.5 font-medium">Option</th>
              <th className="px-4 py-2.5 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                model
              </td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">
                The AI SDK model used for generation.
              </td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                knowledge
              </td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">
                Optional Pinecone + Cohere configuration for Knowledge.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocSection>

    <DocSection id="runtime" title="Runtime">
      <DocP>
        The returned runtime exposes the primary chat method:
      </DocP>
      <DocCodeBlock snippet={`const response = await bsdk.chat(messages, botId, description);`} />
      <DocP>
        <DocInline>bsdk.chat</DocInline> accepts the conversation messages, bot
        ID, and description, and returns a streaming HTTP response that the
        backend route forwards to the client.
      </DocP>
    </DocSection>
  </DocsLayout>
)

export default CreateBskd
