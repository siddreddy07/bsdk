import { useState } from "react"
import { Check, Copy } from "lucide-react"

type CopyButtonProps = {
  text: string
  label?: string
}

const CopyButton = ({ text, label = "Copy to clipboard" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      title="Copy"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-white/50 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 sm:size-8"
    >
      {copied ? (
        <Check className="size-4 text-[#B8D96A]" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  )
}

export default CopyButton