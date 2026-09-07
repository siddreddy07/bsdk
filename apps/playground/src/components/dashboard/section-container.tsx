import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionContainerProps = {
  children?: ReactNode
  className?: string
}

const SectionContainer = ({ children, className }: SectionContainerProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-14rem)] mt-2 w-5xl flex-col overflow-hidden rounded-2xl bg-transparent",
        className
      )}
    >
      {children}
    </div>
  )
}

export default SectionContainer
