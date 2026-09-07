import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { docsNav } from "./docs-nav"

const DocsSidebar = ({ className }: { className?: string }) => {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Documentation"
      className={cn("flex flex-col gap-8", className)}
    >
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-medium tracking-wider text-white/40 uppercase">
            {group.title}
          </p>
          <div className="mt-2 flex flex-col gap-0.5">
            {group.items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors outline-none hover:bg-white/[0.06] hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50",
                  pathname === item.href
                    ? "bg-[#B8D96A]/10 font-medium text-[#B8D96A]"
                    : "text-white/65"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

export default DocsSidebar