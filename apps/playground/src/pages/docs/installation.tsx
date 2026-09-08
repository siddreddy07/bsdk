import { Link } from "react-router-dom"
import DocsLayout from "../../components/docs/layout"
import {
  DocCodeBlock,
  DocCommandRow,
  DocInline,
  DocIntro,
  DocList,
  DocNote,
  DocP,
  DocSection,
} from "../../components/docs/primitives"
import GenericTabs from "../../components/docs/package-manager-tabs"

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

const existingTabs = [
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

const frontendTabs = [
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

const backendTabs = [
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

const cliTabs = [
  {
    id: "npm",
    label: "npm",
    content: <DocCommandRow command="npx @bsdk/cli init" />,
  },
  {
    id: "pnpm",
    label: "pnpm",
    content: <DocCommandRow command="pnpm dlx @bsdk/cli init" />,
  },
  {
    id: "yarn",
    label: "yarn",
    content: <DocCommandRow command="yarn dlx @bsdk/cli init" />,
  },
  {
    id: "bun",
    label: "bun",
    content: <DocCommandRow command="bunx @bsdk/cli init" />,
  },
]

const Installation = () => (
  <DocsLayout title="Installation" tagline="Add the BSDK packages to your project." headings={[
    { id: "prerequisites", label: "Prerequisites" },
    { id: "new-project", label: "New project" },
    { id: "existing-project", label: "Existing project" },
    { id: "install-ui", label: "Install @bsdk/ui" },
    { id: "backend", label: "Backend" },
    { id: "cli", label: "CLI" },
  ]}>
    <DocIntro>
      BSDK has three packages. Install each one where it is used.
    </DocIntro>

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
    </DocSection>

    <DocSection id="new-project" title="New project">
      <DocP>If you are starting from scratch, let shadcn create a configured project for you.</DocP>
      <GenericTabs tabs={newProjectTabs} />
    </DocSection>

    <DocSection id="existing-project" title="Existing project">
      <DocP>
        If you already have a React project, make sure it uses Tailwind CSS v4,
        then initialize shadcn:
      </DocP>
      <GenericTabs tabs={existingTabs} />
    </DocSection>

    <DocSection id="install-ui" title="Install @bsdk/ui">
      <GenericTabs tabs={frontendTabs} />
      <DocNote>
        Import the stylesheet once in your global CSS:
        <DocCodeBlock
          snippet={`@import "@bsdk/ui/styles.css";`}
        />
        You do not need to manually add BSDK&apos;s internal shadcn components.
      </DocNote>
      <DocP>
        For usage, see{" "}
        <Link to="/docs/bsdk-ui" className="text-[#B8D96A] underline-offset-4 hover:underline">BSDK Chat</Link>.
      </DocP>
    </DocSection>

    <DocSection id="backend" title="Backend">
      <DocP>
        In your backend project root, install <DocInline>@bsdk/server</DocInline>:
      </DocP>
      <GenericTabs tabs={backendTabs} />
    </DocSection>

    <DocSection id="cli" title="CLI">
      <DocP>
        In your backend project root, run the BSDK CLI. It is executed rather
        than installed as a dependency:
      </DocP>
      <GenericTabs tabs={cliTabs} />
      <DocP>
        See <Link to="/docs/basic-setup" className="text-[#B8D96A] underline-offset-4 hover:underline">Quick Start</Link> for the full setup flow.
      </DocP>
    </DocSection>
  </DocsLayout>
)

export default Installation
