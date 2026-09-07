import { useEffect, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import KnowledgeCredentials from "./knowledge-credentials"
import UploadsStep from "./uploads-step"

const stepStyles = (state: "active" | "done" | "idle") =>
  cn(
    "flex items-center gap-2 rounded-full py-1.5 pr-2.5 pl-1.5",
    state === "active" && "bg-accent/60"
  )

const dotStyles = (state: "active" | "done" | "idle") =>
  cn(
    "flex size-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300",
    state === "active" && "border-[#B8D96A] bg-[#B8D96A] text-[#0b0d0c]",
    state === "done" && "border-[#B8D96A]/40 bg-[#B8D96A]/10 text-[#B8D96A]",
    state === "idle" && "border-border text-muted-foreground"
  )

const labelStyles = (state: "active" | "done" | "idle") =>
  cn(
    "hidden text-sm font-medium transition-colors duration-300 sm:inline",
    state === "active" && "text-foreground",
    state === "done" && "text-[#B8D96A]",
    state === "idle" && "text-muted-foreground"
  )

const BotConfiguration = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const stepParam = searchParams.get("step")

  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const steps: ReactNode[] = [
    <KnowledgeCredentials key="creds" />,
    <UploadsStep key="uploads" />,
  ]
  const stepLabels = ["Credentials", "Uploads"]
  const maxStep = steps.length - 1

  const parseStep = (value: string | null) => {
    if (value === null) return 0
    const parsed = parseInt(value, 10)
    if (Number.isNaN(parsed)) return 0
    return Math.max(0, Math.min(maxStep, parsed))
  }

  useEffect(() => {
    setActiveStep(parseStep(stepParam))
  }, [stepParam, activeStep])

  const isLastStep = activeStep === maxStep

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(maxStep, index))
    if (next === activeStep) return
    setDirection(next > activeStep ? 1 : -1)
    setActiveStep(next)
    setSearchParams((prev) => {
      prev.set("step", String(next))
      return prev
    })
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col p-5 sm:p-7">
      <div className="flex items-center justify-center overflow-x-auto">
        <ol className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {stepLabels.map((label, index) => {
            const state =
              index === activeStep ? "active" : index < activeStep ? "done" : "idle"
            return (
              <li key={label} className="flex items-center">
                <span className={stepStyles(state)}>
                  <span className={dotStyles(state)}>
                    {state === "done" ? (
                      <Check className="size-3.5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className={labelStyles(state)}>{label}</span>
                </span>
                {index < stepLabels.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mx-1 h-px w-8 transition-colors duration-300 sm:mx-2 sm:w-16",
                      index < activeStep ? "bg-[#B8D96A]/50" : "bg-border"
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 overflow-hidden border-t border-border sm:mt-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeStep}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto pt-6 sm:pt-8"
          >
            {steps[activeStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => goTo(activeStep - 1)}
          disabled={activeStep === 0}
          className="rounded-full px-3.5"
        >
          <ArrowLeft className="size-3.5" />
          Previous
        </Button>
        {!isLastStep && (
          <Button
            type="button"
            size="sm"
            onClick={() => goTo(activeStep + 1)}
            className="rounded-full bg-[#B8D96A] px-3.5 text-[#0b0d0c] hover:bg-[#c8e88a]"
          >
            Next
            <ArrowRight className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default BotConfiguration