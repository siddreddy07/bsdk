import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import AuthPopover from "./auth-popover"
import BsdkLogo from "./bsdk-logo"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const { pathname, hash } = useLocation()
  const [howItWorksVisible, setHowItWorksVisible] = useState(false)

  const isDocsActive = pathname.startsWith("/docs")

  useEffect(() => {
    const isHome = pathname === "/"
    const hasAnchor = hash === "#how-it-works"

    if (!isHome || !hasAnchor) return

    const section = document.getElementById("how-it-works")
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHowItWorksVisible(entry.isIntersecting)
        if (!entry.isIntersecting) {
          history.replaceState(null, "", pathname)
        }
      },
      { rootMargin: "-96px 0px -65% 0px" }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [pathname, hash])

  const isHowItWorksActive = pathname === "/" && hash === "#how-it-works" && howItWorksVisible

  const linkClassName =
    "relative hidden sm:block rounded-sm text-sm font-medium text-foreground/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 hover:text-foreground"

  const linkUnderlineClass =
    "md:after:absolute md:after:inset-x-0 md:after:-bottom-1.5 md:after:h-[2px] md:after:origin-left md:after:rounded-full md:after:bg-[#B8D96A] md:after:transition-transform md:after:duration-300 md:after:scale-x-0 hover:md:after:scale-x-100"

  const activeLinkClass = "text-foreground md:after:scale-x-100"

  return (
    <header className="fixed inset-x-0 top-0 px-2 z-40 flex justify-center pt-3">
      <nav
        aria-label="Main navigation"
        className="relative flex h-10 w-full items-center justify-between gap-2 rounded-full bg-background/40 px-4 py-2 text-foreground shadow-md shadow-black/10 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-background/30 dark:bg-white/[0.05] md:h-11 md:w-auto md:min-w-[34rem] md:px-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.06] to-transparent"
        />
        <Link
          to="/"
          aria-label="BSDK home"
          className="group relative flex shrink-0 items-center gap-2 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <BsdkLogo className="transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            BSDK
          </span>
        </Link>

        <div className="relative w-full flex items-center justify-center gap-3">
          <Link to={"/#how-it-works"}
            aria-current={isHowItWorksActive ? "page" : undefined}
            className={cn(linkClassName, linkUnderlineClass, isHowItWorksActive && activeLinkClass)}
          >
            How it works?
          </Link>
          <Link
            to="/docs"
            aria-current={isDocsActive ? "page" : undefined}
            className={cn(linkClassName, linkUnderlineClass, isDocsActive && activeLinkClass)}
          >
            Docs
          </Link>
        </div>

        <div className="relative flex flex-1 items-center justify-end">
          <AuthPopover showAvatar={true} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar