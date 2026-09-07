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
  { id: "prerequisites", label: "Prerequisites" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "configuration", label: "Configuration" },
  { id: "props", label: "Props" },
  { id: "customizing-bubbles", label: "Customizing message bubbles" },
  { id: "trigger", label: "Trigger customization" },
]

const newProjectTabs = [
  {
    id: "npm",
    label: "npm",
    content: (
      <DocCodeBlock
        snippet={`# Next.js
npx shadcn@latest init -t next

# Vite
npx shadcn@latest init -t vite`}
      />
    ),
  },
  {
    id: "pnpm",
    label: "pnpm",
    content: (
      <DocCodeBlock
        snippet={`# Next.js
pnpm dlx shadcn@latest init -t next

# Vite
pnpm dlx shadcn@latest init -t vite`}
      />
    ),
  },
  {
    id: "yarn",
    label: "yarn",
    content: (
      <DocCodeBlock
        snippet={`# Next.js
yarn dlx shadcn@latest init -t next

# Vite
yarn dlx shadcn@latest init -t vite`}
      />
    ),
  },
  {
    id: "bun",
    label: "bun",
    content: (
      <DocCodeBlock
        snippet={`# Next.js
bunx --bun shadcn@latest init -t next

# Vite
bunx --bun shadcn@latest init -t vite`}
      />
    ),
  },
]

const existingProjectTabs = [
  {
    id: "npm",
    label: "npm",
    content: <DocCommandRow command="npx shadcn@latest init" />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    content: <DocCommandRow command="pnpm dlx shadcn@latest init" />,
  },
  {
    id: "yarn",
    label: "yarn",
    content: <DocCommandRow command="yarn dlx shadcn@latest init" />,
  },
  {
    id: "bun",
    label: "bun",
    content: <DocCommandRow command="bunx --bun shadcn@latest init" />,
  },
]

const installTabs = [
  {
    id: "npm",
    label: "npm",
    content: <DocCommandRow command="npm install @bsdk/ui" />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    content: <DocCommandRow command="pnpm add @bsdk/ui" />,
  },
  {
    id: "yarn",
    label: "yarn",
    content: <DocCommandRow command="yarn add @bsdk/ui" />,
  },
  {
    id: "bun",
    label: "bun",
    content: <DocCommandRow command="bun add @bsdk/ui" />,
  },
]

const BsdkUi = () => (
  <DocsLayout
    title="BSDK Chat"
    tagline="Embeddable frontend chat widget for BSDK."
    headings={headings}
  >
    <DocSection id="prerequisites" title="Prerequisites">
      <DocP>
        <DocInline>@bsdk/ui</DocInline> requires:
      </DocP>
      <DocList
        items={[
          <>React 19</>,
          <>Tailwind CSS v4</>,
          <>
            <DocInline>shadcn/ui</DocInline> with its theme configured — BSDK uses
            shadcn theme variables internally.
          </>,
        ]}
      />

      <DocP>If you are starting from scratch, let shadcn create a configured project for you.</DocP>
      <GenericTabs tabs={newProjectTabs} />

      <DocP >If you already have a React project, make sure it uses Tailwind CSS v4, then initialize shadcn:</DocP>
      <GenericTabs tabs={existingProjectTabs} />
    </DocSection>

    <DocSection id="installation" title="Installation">
      <GenericTabs tabs={installTabs} />
      <DocP>
        Import the stylesheet once in your global CSS:
      </DocP>
      <DocCodeBlock snippet={`@import "@bsdk/ui/styles.css";`} />
    </DocSection>

    <DocSection id="usage" title="Usage">
      <DocCodeBlock
        snippet={`import { BSDKChat } from "@bsdk/ui";

const chatConfig = {
  api: "http://localhost:8080/api/chat",
  botId: "your-bot-id",
  botDescription: "Website assistant",
};

export default function App() {
  return (
    <BSDKChat
      config={chatConfig}
      title="Ask us anything"
      welcomeText="How can we help?"
      placeholder="Type your message..."
      position="bottom-right"
    />
  );
}`}
      />
      <DocList
        items={[
          <>
            <DocInline>api</DocInline> — backend endpoint that handles BSDK chat requests.
          </>,
          <>
            <DocInline>botId</DocInline> — identifies the BSDK Bot for the conversation. Create a Bot from the BSDK dashboard and use its Bot ID here.
          </>,
          <>
            <DocInline>botDescription</DocInline> — the current Bot description/instructions sent with the conversation.
          </>,
        ]}
      />
      <DocP>
        <DocInline>http://localhost:8080/api/chat</DocInline> is only an example development endpoint. It is not a BSDK default.
      </DocP>
    </DocSection>

    <DocSection id="configuration" title="Configuration">
      <DocP>
        <DocInline>config</DocInline> is required.
      </DocP>
      <DocCodeBlock
        snippet={`const chatConfig = {
  api: "http://localhost:8080/api/chat",
  botId: "your-bot-id",
  botDescription: "Website assistant",
};`}
      />
      <div className="mt-3 w-full max-w-lg overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-white/50">
              <th className="px-4 py-2.5 font-medium">Property</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Required</th>
              <th className="px-4 py-2.5 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">api</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">Yes</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Backend BSDK chat endpoint.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">botId</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">Yes</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Identifies the BSDK Bot for the conversation. Create a Bot from the BSDK dashboard and use its Bot ID here.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">botDescription</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">Yes</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">The current Bot description/instructions sent with the conversation.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocSection>

    <DocSection id="props" title="Props">
      <div className="mt-3 w-full max-w-lg overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs text-white/50">
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Required</th>
              <th className="px-4 py-2.5 font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">config</td>
              <td className="px-4 py-2.5 text-white/60">BSDKConfig</td>
              <td className="px-4 py-2.5 text-white/60">Yes</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Backend connection and bot configuration.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">title</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Title displayed in the chat header.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">welcomeText</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Text displayed before the conversation begins.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">placeholder</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Placeholder displayed in the message input.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">theme</td>
              <td className="px-4 py-2.5 text-white/60">BSDKChatTheme</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Customizes supported chat presentation.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">triggerText</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Text displayed on the floating chat trigger.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">triggerImage</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Image used by the chat trigger.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">triggerColor</td>
              <td className="px-4 py-2.5 text-white/60">string</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Color used by the chat trigger.</td>
            </tr>
            <tr className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#B8D96A]">position</td>
              <td className="px-4 py-2.5 text-white/60">"bottom-left" | "bottom-right"</td>
              <td className="px-4 py-2.5 text-white/60">No</td>
              <td className="px-4 py-2.5 leading-relaxed text-white/60">Position of the floating chat widget.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocSection>

    <DocSection id="customizing-bubbles" title="Customizing message bubbles">
      <DocP>
        <DocInline>theme</DocInline> accepts an optional <DocInline>bubble</DocInline> function that returns classes for each message role:
      </DocP>
      <DocCodeBlock
        snippet={`<BSDKChat
  config={chatConfig}
  theme={{
    bubble: (role) =>
      role === "user"
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-foreground",
  }}
/>`}
      />
      <DocP>
        <DocInline>bubble</DocInline> receives the message role and returns the classes applied to that message bubble.
      </DocP>
    </DocSection>

    <DocSection id="trigger" title="Trigger customization">
      <DocCodeBlock
        snippet={`<BSDKChat
  config={chatConfig}
  triggerText="Ask AI"
  triggerImage="/assistant.svg"
  triggerColor="#111111"
  position="bottom-right"
/>`}
      />
    </DocSection>

    <DocP>
      For backend setup, see{" "}
      <Link to="/docs/bsdk-server" className="text-[#B8D96A] underline-offset-4 hover:underline">BSDK Server</Link>.
    </DocP>
  </DocsLayout>
)

export default BsdkUi
