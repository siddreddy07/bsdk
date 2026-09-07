import { useState, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowLeft, ArrowRight, Menu } from "lucide-react"

import DocsSidebar from "./docs-sidebar"
import OnThisPage from "./on-this-page"
import { getDocNavContext, type DocNavLink } from "./docs-nav"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

export type DocHeading = { id: string; label: string }

const PrevLink = ({ label, href }: DocNavLink) => (
  <Link
    to={href}
    className="group inline-flex w-full sm:w-auto items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-sm text-white/70 transition-colors outline-none hover:border-white/25 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
  >
    <ArrowLeft className="size-4 shrink-0 text-white/50 transition-transform group-hover:-translate-x-0.5" />
    <span className="truncate">Previous: {label}</span>
  </Link>
)

const NextLink = ({ label, href }: DocNavLink) => (
  <Link
    to={href}
    className="group inline-flex w-full sm:w-auto items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-sm text-white/70 transition-colors outline-none hover:border-white/25 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
  >
    <span className="truncate">Next: {label}</span>
    <ArrowRight className="size-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5" />
  </Link>
)

const DocsLayout = ({
  title,
  tagline,
  headings,
  children,
}: {
  title: string
  tagline?: string
  headings: DocHeading[]
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { previous, next } = getDocNavContext(pathname)

  return (
    <div className="bg-[#0b0d0c] text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 pt-24 pb-24 sm:px-6 lg:flex-row lg:px-8">
        <div className="top-20 z-20 flex shrink-0 items-center lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full text-white"
                >
                  <Menu className="size-4" />
                  Docs
                </Button>
              }
            />
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-72 gap-0 overflow-y-auto bg-[#0b0d0c] p-4 text-white"
            >
              <SheetTitle className="px-1 pb-4 text-sm font-semibold text-white">
                Documentation
              </SheetTitle>
              <div onClick={() => setOpen(false)}>
                <DocsSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] self-start w-60 shrink-0 overflow-y-auto lg:block">
          <DocsSidebar />
        </aside>

        <article className="min-w-0 max-w-2xl flex-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          {tagline && (
            <p className="mt-3 text-lg font-medium text-white">{tagline}</p>
          )}
          {children}
          <nav
            aria-label="Docs pagination"
            className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            {previous ? <PrevLink {...previous} /> : <span aria-hidden="true" />}
            {next ? <NextLink {...next} /> : null}
          </nav>
        </article>

        <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] self-start w-52 shrink-0 overflow-y-auto xl:block">
          <OnThisPage headings={headings} />
        </aside>
      </div>
    </div>
  )
}

export default DocsLayout