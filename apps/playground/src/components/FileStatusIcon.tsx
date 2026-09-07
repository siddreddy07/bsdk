import {
  Check,
  Database,
  FileSearch,
  Loader2,
  Scissors,
  Sparkles,
  TriangleAlert,
} from "lucide-react"

export const FileStatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "parsing":
      return (
        <FileSearch className="size-3.5 shrink-0 animate-pulse text-[#B8D96A]" />
      )

    case "chunking":
      return (
        <Scissors className="size-3.5 shrink-0 animate-pulse text-[#B8D96A]" />
      )

    case "embedding":
      return (
        <Sparkles className="size-3.5 shrink-0 animate-pulse text-[#B8D96A]" />
      )

    case "indexing":
      return (
        <Database className="size-3.5 shrink-0 animate-pulse text-[#B8D96A]" />
      )

    case "completed":
      return (
        <Check className="size-3.5 shrink-0 text-[#B8D96A]" />
      )

    case "failed":
      return (
        <TriangleAlert className="size-3.5 shrink-0 text-destructive" />
      )

    default:
      return (
        <Loader2 className="size-3.5 shrink-0 animate-spin text-muted-foreground" />
      )
  }
}