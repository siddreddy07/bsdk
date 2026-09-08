export type DocsNavItem = { label: string; href: string }

export type DocsNavGroup = {
  title: string
  items: DocsNavItem[]
}

export const docsNav: DocsNavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Quick Start", href: "/docs/basic-setup" },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "BSDK Server", href: "/docs/bsdk-server" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { label: "BSDK Chat", href: "/docs/bsdk-ui" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "AI Providers", href: "/docs/providers" },
      { label: "Knowledge", href: "/docs/knowledge-setup" },
    ],
  },
]

const docOrder = docsNav.flatMap((group) => group.items)

export type DocNavLink = { label: string; href: string }

export const getDocNavContext = (href: string): { previous?: DocNavLink; next?: DocNavLink } => {
  const index = docOrder.findIndex((item) => item.href === href)
  if (index === -1) return {}
  return {
    previous: index > 0 ? docOrder[index - 1] : undefined,
    next: index < docOrder.length - 1 ? docOrder[index + 1] : undefined,
  }
}
