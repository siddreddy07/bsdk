import { Fragment } from "react"
import { Cpu, MessageSquareText, Search, Sparkles, type LucideIcon } from "lucide-react"

type BlockProps = {
  icon: LucideIcon
  eyebrow: string
  title: string
  tabletTitle: string
  mobileTitle: string
  body: string
  short: string
}

const blocks: BlockProps[] = [
  {
    icon: MessageSquareText,
    eyebrow: "@bsdk/ui",
    title: "UI",
    tabletTitle: "UI",
    mobileTitle: "UI",
    body: "Streaming chat interfaces and client-side AI interactions that fit directly into your application.",
    short: "Streaming interface for your app",
  },
  {
    icon: Cpu,
    eyebrow: "@bsdk/server",
    title: "Server",
    tabletTitle: "Server",
    mobileTitle: "Server",
    body: "Server-side streaming, model execution and AI tool orchestration.",
    short: "Streaming and model execution",
  },
  {
    icon: Search,
    eyebrow: "Knowledge",
    title: "Knowledge + Tools",
    tabletTitle: "Knowledge + Tools",
    mobileTitle: "Knowledge",
    body: "Ground responses in your website content and give the model tools it can call when needed.",
    short: "Ground responses in your content",
  },
  {
    icon: Sparkles,
    eyebrow: "Model",
    title: "Your Model",
    tabletTitle: "Model",
    mobileTitle: "Model",
    body: "Use Groq, Gemini, OpenAI, Anthropic or any compatible Vercel AI SDK model.",
    short: "Use your preferred AI provider",
  },
]

const DesktopBlock = ({ icon: Icon, eyebrow, title, body }: BlockProps) => (
  <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-5 lg:p-6">
    <div className="flex items-center gap-2.5">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-[#B8D96A]/20 bg-[#B8D96A]/5">
        <Icon className="size-3.5 text-[#B8D96A]" />
      </span>
      <span className="text-xs font-medium tracking-wide text-white/60">
        {eyebrow}
      </span>
    </div>
    <h3 className="mt-3 text-base font-semibold tracking-tight text-white">
      {title}
    </h3>
    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{body}</p>
  </div>
)

const CompactBlock = ({ icon: Icon, tabletTitle: title, short }: BlockProps) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-[#B8D96A]" />
      <span className="text-sm font-semibold tracking-tight text-white">
        {title}
      </span>
    </div>
    <p className="mt-1.5 text-xs leading-snug text-white/55">{short}</p>
  </div>
)

const HorizontalConnector = () => (
  <div className="flex w-12 shrink-0 items-center justify-center lg:w-14">
    <div className="relative flex w-full items-center">
      <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/15 to-white/10" />
      <div className="absolute left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#B8D96A]/70" />
    </div>
  </div>
)

const WhatBskdHandles = () => {
  return (
    <section className="border-t border-white/5 bg-[#0b0d0c] py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            The pieces you need to make AI feel native.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
            BSDK connects your interface, server runtime, knowledge and tools
            without locking you into a specific model provider.
          </p>
        </header>

        <div className="mt-10 sm:mt-12 lg:mt-16">
          <div className="hidden items-stretch lg:flex">
            {blocks.map((block, index) => (
              <Fragment key={block.title}>
                {index > 0 && <HorizontalConnector />}
                <DesktopBlock {...block} />
              </Fragment>
            ))}
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:hidden">
            {blocks.slice(0, 2).map((block) => (
              <CompactBlock key={block.title} {...block} />
            ))}
            <div className="col-span-2 flex items-center justify-center py-0.5">
              <div className="relative flex h-4 items-center justify-center">
                <div className="h-full w-px bg-white/10" />
                <div className="absolute size-1 rounded-full bg-[#B8D96A]/60" />
              </div>
            </div>
            {blocks.slice(2).map((block) => (
              <CompactBlock key={block.title} {...block} />
            ))}
          </div>

          <div className="mt-8 flex flex-col divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] sm:hidden">
            {blocks.map(({ icon: Icon, mobileTitle: title, short }) => (
              <div key={title} className="flex flex-col gap-1 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-[#B8D96A]" />
                  <span className="text-sm font-medium leading-none text-white">
                    {title}
                  </span>
                </div>
                <p className="pl-6 text-xs leading-snug text-white/55">
                  {short}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatBskdHandles