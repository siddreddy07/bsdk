import { useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import CopyButton from "./copy-button"

type Step = {
  number: string
  label: string
  title: string
  description: string
  content: ReactNode
}

const line = (parts: Array<[string, string]>) => (
  <span className="block">
    {parts.map(([cls, text], i) => (
      <span key={i} className={cls}>
        {text}
      </span>
    ))}
  </span>
)

const CodeBlock = ({
  snippet,
  children,
}: {
  snippet?: string
  children: ReactNode
}) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#070908]">
    <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
      <code>{children}</code>
    </pre>
    {snippet && (
      <div className="absolute top-2 right-2">
        <CopyButton text={snippet} />
      </div>
    )}
  </div>
)

const step02Snippet = [
  'import { createBSDK } from "@bsdk/server";',
  'import { groq } from "../bsdk/providers.js";',
  "",
  "const bsdk = createBSDK({",
  '  model: groq("qwen/qwen3.8-27b"),',
  "  system: `",
  "    You are this website's AI assistant, powered by BSDK.",
  "  `,",
  "});",
].join("\n")

const step03Snippet = [
  'import { Readable } from "node:stream";',
  'import { bsdk } from "../bsdk";',
  "",
  'app.post("/api/chat", async (req, res) => {',
  "  const response = await bsdk.chat(req.body.messages);",
  "  Readable.fromWeb(response.body).pipe(res);",
  "});",
].join("\n")

const steps: Step[] = [
  {
    number: "01",
    label: "Initialize",
    title: "Install BSDK",
    description:
      "Install the BSDK frontend and server packages, then initialize BSDK from the root of the backend/server application.",
    content: (
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="flex flex-col gap-2 p-4">
          {[
            { label: "Frontend", command: "pnpm add @bsdk/ui" },
            { label: "Backend", command: "pnpm add @bsdk/server" },
          ].map(({ label, command }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-[11px] font-medium tracking-wider text-white/40 uppercase">
                {label}
              </span>
              <code className="flex-1 font-mono text-sm text-white/80 select-all">
                {command}
              </code>
              <CopyButton text={command} />
            </div>
          ))}
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-[11px] font-medium tracking-wider text-white/40 uppercase">
              Setup
            </span>
            <code className="flex-1 font-mono text-sm text-white/80 select-all">
              pnpm dlx @bsdk/cli init
            </code>
            <CopyButton text="pnpm dlx @bsdk/cli init" />
          </div>
          <p className="text-xs leading-snug text-white/45">
            Run{" "}
            <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-white/70">
              @bsdk/cli init
            </code>{" "}
            from the root of your backend/server application.
          </p>
          <p className="text-xs leading-snug text-white/45">
            <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-white/70">
              @bsdk/cli init
            </code>{" "}
            generates the BSDK setup files, including the configuration for the
            AI provider selected during setup.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    label: "Configure",
    title: "Create your BSDK runtime",
    description:
      "After bsdk init, use the generated provider instance, choose the model, and create the BSDK runtime.",
    content: (
      <>
        <CodeBlock snippet={step02Snippet}>
          {line([
            ["k", "import"],
            ["p", " "],
            ["t", "{ createBSDK }"],
            ["k", " from "],
            ['s', '"@bsdk/server"'],
            ["p", ";"],
          ])}
          {line([
            ["k", "import"],
            ["p", " "],
            ["t", "groq"],
            ["k", " from "],
            ['s', '"../bsdk/providers.js"'],
            ["p", ";"],
          ])}
          <span className="block">&nbsp;</span>
          {line([
            ["k", "const"],
            ["p", " "],
            ["t", "bsdk"],
            ["p", " = "],
            ["t", "createBSDK"],
            ["p", "({"],
          ])}
          {line([
            ["p", "  model: "],
            ["t", "groq"],
            ["p", "("],
            ['s', '"qwen/qwen3.8-27b"'],
            ["p", "),"],
          ])}
          {line([["p", "  system: `"]])}
          <span className="block text-white/70">
            {"    "}You are this website&apos;s AI assistant, powered by BSDK.
          </span>
          <span className="block text-white/50">{"  `,"}</span>
          <span className="block text-white/50">{"});"}</span>
        </CodeBlock>
        <p className="text-xs leading-snug text-white/45">
          The provider instance comes from{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-white/70">
            bsdk/providers.ts
          </code>
          , which is generated during{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-white/70">
            @bsdk/cli init
          </code>
          .
        </p>
      </>
    ),
  },
  {
    number: "03",
    label: "Integrate",
    title: "Stream responses from your server",
    description:
      "Use the configured bsdk instance inside the backend route/controller and stream the response to the frontend.",
    content: (
      <CodeBlock snippet={step03Snippet}>
        {line([
          ["k", "import"],
          ["p", " "],
          ["t", "{ Readable }"],
          ["k", " from "],
          ['s', '"node:stream"'],
          ["p", ";"],
        ])}
        {line([
          ["k", "import"],
          ["p", " "],
          ["t", "bsdk"],
          ["k", " from "],
          ['s', '"../bsdk"'],
          ["p", ";"],
        ])}
        <span className="block">&nbsp;</span>
        {line([
          ["t", "app.post"],
          ["p", '("/api/chat", async (req, res) => {'],
        ])}
        {line([
          ["k", "  const"],
          ["p", " "],
          ["t", "response"],
          ["p", " = await bsdk.chat(req.body.messages);"],
        ])}
        {line([
          ["p", "  "],
          ["t", "Readable.fromWeb"],
          ["p", "(response.body).pipe(res);"],
        ])}
        <span className="block text-white/50">{"});"}</span>
      </CodeBlock>
    ),
  },
]

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

const IntegrationStepper = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(steps.length - 1, index))
    if (next === activeStep) return
    setDirection(next > activeStep ? 1 : -1)
    setActiveStep(next)
  }

  const active = steps[activeStep]

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-white/5 bg-[#0b0d0c] py-16 text-white sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            From install to AI in a few steps.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/60 text-pretty sm:text-lg">
            Set up BSDK, choose your model, and bring AI into your application
            without rebuilding the infrastructure around it.
          </p>
        </header>

          <div className="w-full flex items-center justify-center">
        <div className="mt-10 rounded-2xl border border-white/10 bg-transparent w-full lg:w-2/3 p-5 sm:mt-12 sm:p-6 lg:mt-16 lg:p-8">
          <nav aria-label="Integration steps">
            <ol className="flex items-center justify-center gap-1.5 sm:gap-2">
              {steps.map((step, index) => {
                const state = index === activeStep ? "active" : index < activeStep ? "done" : "idle"
                return (
                  <li key={step.label} className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={state === "active" ? "step" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-full py-1.5 pr-2.5 pl-1.5 transition-colors duration-300 focus-visible:ring-3 focus-visible:ring-ring/50 outline-none sm:pr-3",
                        state === "active" && "bg-white/[0.06]",
                        state === "idle" && "hover:bg-white/[0.03]"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors duration-300",
                          state === "active" && "border-[#B8D96A] bg-[#B8D96A] text-[#0b0d0c]",
                          state === "done" && "border-[#B8D96A]/40 bg-[#B8D96A]/10 text-[#B8D96A]",
                          state === "idle" && "border-white/15 text-white/40"
                        )}
                      >
                        {state === "done" ? (
                          <Check className="size-3" />
                        ) : (
                          step.number
                        )}
                      </span>
                      <span
                        className={cn(
                          "hidden text-sm font-medium transition-colors duration-300 sm:inline",
                          state === "active" && "text-white",
                          state === "done" && "text-[#B8D96A]",
                          state === "idle" && "text-white/40"
                        )}
                      >
                        {step.label}
                      </span>
                    </button>
                    {index < steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mx-0.5 h-px transition-colors duration-300 sm:mx-1 w-4 sm:w-6 lg:w-10",
                          index < activeStep ? "bg-[#B8D96A]/50" : "bg-white/10"
                        )}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          <div className="mt-5 flex items-center justify-center border-t border-white/10 sm:mt-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col gap-4 pt-5 sm:pt-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {active.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/55">
                      {active.description}
                    </p>
                  </div>
                  {active.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between sm:mt-8">
            <button
              type="button"
              onClick={() => goTo(activeStep - 1)}
              disabled={activeStep === 0}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-medium text-white/70 transition-colors outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="size-3.5" />
              Previous
            </button>
            {activeStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={() => goTo(0)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-medium text-white/70 transition-colors outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Start over
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goTo(activeStep + 1)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#B8D96A] px-3.5 text-sm font-medium text-[#0b0d0c] transition-colors outline-none hover:bg-[#c8e88a] focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Next
                <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
          </div>
      </div>
    </section>
  )
}

export default IntegrationStepper