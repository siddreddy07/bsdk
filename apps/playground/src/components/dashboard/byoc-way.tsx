import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

import {
  CohereLogo,
  MongoDbLogo,
  PineconeLogo,
  LlamaIndexLogo,
  TriggerDevLogo,
} from "@/components/brand/brand-icons"

function TechItem({
  name,
  description,
  logo,
  required = false,
}: {
  name: string
  description: string
  logo: ReactNode
  required?: boolean
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5 rounded-lg border px-3 py-2",
        required
          ? "border-[#B8D96A]/30 bg-[#B8D96A]/5"
          : "border-border/60 bg-background/40"
      )}
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-md",
          required ? "bg-background/80" : "bg-muted/40"
        )}
      >
        {logo}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-medium leading-tight text-foreground">
          {name}
        </span>
        <span className="block truncate text-xs leading-tight text-muted-foreground">
          {description}
        </span>
      </span>
    </li>
  )
}

const requiredTechnologies = [
  {
    name: "Cohere",
    description: "Embeddings for website knowledge",
    logo: <CohereLogo />,
  },
  {
    name: "Pinecone",
    description: "Vector storage and semantic search",
    logo: <PineconeLogo />,
  },
]

const hostedTechnologies = [
  {
    name: "MongoDB",
    description: "App and document metadata",
    logo: <MongoDbLogo />,
  },
  {
    name: "LlamaIndex",
    description: "PDF parsing",
    logo: <LlamaIndexLogo />,
  },
  {
    name: "Trigger.dev",
    description: "Background processing",
    logo: <TriggerDevLogo />,
  },
]

const ByocWay = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col">
      <div>
        <h3 className="text-base font-semibold tracking-tight">
          Infrastructure
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          What BSDK requires and what powers the hosted platform.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-[#B8D96A]/20 bg-gradient-to-b from-[#B8D96A]/[0.06] to-background/40 p-3.5">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#B8D96A]" />
            <h4 className="text-sm font-semibold text-foreground">
              Required for BSDK Knowledge
            </h4>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Required when using BSDK knowledge from your server.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {requiredTechnologies.map((tech) => (
              <TechItem key={tech.name} {...tech} required />
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-background/40 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              Hosted Platform
            </h4>
            <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              No setup needed
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Used internally by the hosted BSDK document pipeline.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {hostedTechnologies.map((tech) => (
              <TechItem key={tech.name} {...tech} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default ByocWay