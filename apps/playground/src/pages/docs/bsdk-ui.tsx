import { Link } from "react-router-dom"
import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocCommandRow,
  DocInline,
  DocList,
  DocNote,
  DocP,
  DocSection,
} from "../../components/docs/primitives"
import GenericTabs from "../../components/docs/package-manager-tabs"

const headings = [
  { id: "prerequisites", label: "Prerequisites" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
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
import { bsdkConfig } from "@/config/bsdk.config";

export default function App() {
  return (
    <BSDKChat
      config={bsdkConfig}
      title="Ask us anything"
      welcomeText="How can we help?"
      placeholder="Type your message..."
      position="bottom-right"
    />
  );
}`}
      />
      <DocNote>
        <DocInline>bsdkConfig</DocInline> is defined in your frontend, typically
        in <DocInline>@/config/bsdk.config.ts</DocInline>. It points the widget
        at the backend chat endpoint and provides the Bot credentials. See{" "}
        <Link to="/docs/basic-setup" className="text-[#B8D96A] underline-offset-4 hover:underline">Quick Start</Link>{" "}
        for the full setup.
      </DocNote>
      <DocP>
        You can also define the config inline:
      </DocP>
      <DocCodeBlock
        snippet={`const bsdkConfig = {
  api: "{backend-server}/api/chat",
  botId: "your-bot-id",
  botDescription: \`Name: Support Bot
Description: Helps users with account questions\`,
};

<BSDKChat config={bsdkConfig} />`}
      />
      <DocNote>
        <DocInline>botId</DocInline> is created when you create a Bot in the{" "}
        <Link to="/dashboard" className="text-[#B8D96A] underline-offset-4 hover:underline">
          BSDK dashboard
        </Link>
        .
      </DocNote>
      <DocList
        items={[
          <>
            <DocInline>api</DocInline> — backend endpoint that handles BSDK chat requests.
          </>,
          <>
            <DocInline>botId</DocInline> — identifies the BSDK Bot for the conversation. Create a Bot from the BSDK dashboard and use its Bot ID here.
          </>,
          <>
            <DocInline>description</DocInline> — the current Bot description/instructions sent with the conversation.
          </>,
        ]}
      />
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
  config={bsdkConfig}
  theme={{
    bubble: (role) =>
      role === "user"
? "bg-[#84cc16] text-white font-semibold dark:bg-[#a5cd4a] dark:text-zinc-900"
      : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100");
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
  config={bsdkConfig}
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
