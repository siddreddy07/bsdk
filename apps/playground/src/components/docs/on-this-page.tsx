import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type DocHeading = {
  id: string
  label: string
}

const OnThisPage = ({ headings }: { headings: DocHeading[] }) => {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "")

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          )
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    )

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null)

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3">
      <p className="text-xs font-medium tracking-wider text-white/40 uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "border-l border-white/10 py-0.5 pr-2 pl-3 text-sm transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50",
                activeId === heading.id
                  ? "border-[#B8D96A]/60 font-medium text-white"
                  : "text-white/50"
              )}
            >
              {heading.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default OnThisPage