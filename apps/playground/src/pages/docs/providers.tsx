import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocInline,
  DocNote,
  DocP,
  DocSection,
} from "../../components/docs/primitives"
import GenericTabs from "../../components/docs/package-manager-tabs"
import { useState } from "react"

const headings = [
  { id: "supported", label: "Supported providers" },
  { id: "generated", label: "Generated provider" },
  { id: "using", label: "Using a provider" },
]

const generatedTabs = [
  {
    id: "groq",
    label: "Groq",
    content: (
      <DocCodeBlock
        snippet={`import { createGroq } from "@ai-sdk/groq";

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});`}
        fileName="bsdk/providers.ts"
      />
    ),
  },
  {
    id: "gemini",
    label: "Gemini",
    content: (
      <DocCodeBlock
        snippet={`import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});`}
        fileName="bsdk/providers.ts"
      />
    ),
  },
  {
    id: "openai",
    label: "OpenAI",
    content: (
      <DocCodeBlock
        snippet={`import { createOpenAI } from "@ai-sdk/openai";

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});`}
        fileName="bsdk/providers.ts"
      />
    ),
  },
  {
    id: "anthropic",
    label: "Anthropic",
    content: (
      <DocCodeBlock
        snippet={`import { createAnthropic } from "@ai-sdk/anthropic";

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});`}
        fileName="bsdk/providers.ts"
      />
    ),
  },
]

const usingTabs = [
  {
    id: "groq",
    label: "Groq",
    content: (
      <DocCodeBlock
        snippet={`import { createBSDK } from "@bsdk/server";
import { groq } from "./bsdk/providers";

const model = groq("llama-3.3-70b-versatile");

const bsdk = createBSDK({
  model,
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

const model = google("gemini-2.0-flash");

const bsdk = createBSDK({
  model,
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

const model = openai("gpt-4o");

const bsdk = createBSDK({
  model,
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

const model = anthropic("claude-sonnet-4-20250514");

const bsdk = createBSDK({
  model,
});`}
      />
    ),
  },
]

const Providers = () => {
  const [provider, setProvider] = useState("groq")

  return (
    <DocsLayout
      title="AI Providers"
      tagline="Configure the AI providers BSDK talks to."
      headings={headings}
    >
      <DocNote>
        Run <DocInline>npx @bsdk/cli init</DocInline> from your{" "}
        <strong className="font-medium text-white/85">backend project root</strong>.
        It will prompt you to select providers, install the required packages,
        create <DocInline>bsdk/providers.ts</DocInline>, and set up environment
        variables automatically.
      </DocNote>

      <DocSection id="supported" title="Supported providers">
        <DocP>
          The CLI allows selecting up to <strong className="font-medium text-white/85">3</strong>{" "}
          providers. The selected packages are installed automatically.
        </DocP>
        <div className="mt-3 w-full max-w-lg overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-white/50">
                <th className="px-4 py-2.5 font-medium">Provider</th>
                <th className="px-4 py-2.5 font-medium">Package</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 last:border-0">
                <td className="px-4 py-2.5 font-medium text-white/85">Groq</td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                  @ai-sdk/groq
                </td>
              </tr>
              <tr className="border-b border-white/5 last:border-0">
                <td className="px-4 py-2.5 font-medium text-white/85">
                  Google / Gemini
                </td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                  @ai-sdk/google
                </td>
              </tr>
              <tr className="border-b border-white/5 last:border-0">
                <td className="px-4 py-2.5 font-medium text-white/85">OpenAI</td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                  @ai-sdk/openai
                </td>
              </tr>
              <tr className="border-b border-white/5 last:border-0">
                <td className="px-4 py-2.5 font-medium text-white/85">
                  Anthropic
                </td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">
                  @ai-sdk/anthropic
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection id="generated" title="Generated provider">
        <DocP>
          The CLI generates <DocInline>bsdk/providers.ts</DocInline> with the
          provider instances you selected.
        </DocP>
        <GenericTabs tabs={generatedTabs} value={provider} onValueChange={setProvider} />
      </DocSection>

      <DocSection id="using" title="Using a provider">
        <DocP>
          Pass the provider instance a model ID, then pass it to BSDK:
        </DocP>
        <GenericTabs tabs={usingTabs} value={provider} onValueChange={setProvider} />
      </DocSection>
    </DocsLayout>
  )
}

export default Providers
