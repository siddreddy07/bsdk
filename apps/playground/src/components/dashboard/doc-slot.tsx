import { Trash2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { DocUpload } from "./uploads-step"

type DocSlotProps = {
  doc: DocUpload
  disabled: boolean
  onUpdate: (
    updates: Partial<DocUpload>
  ) => void
  onRemove: () => void
}

const DocSlot = ({
  doc,
  disabled,
  onUpdate,
  onRemove,
}: DocSlotProps) => {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">
          Document
        </Label>

        <button
          type="button"
          disabled={disabled}
          onClick={onRemove}
          className="text-muted-foreground transition-colors hover:text-destructive"
          aria-label="Remove document"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <div className="mt-3 space-y-3">
        <Input
          placeholder="e.g. Product guide"
          value={doc.title}
          disabled={disabled}
          onChange={(event) =>
            onUpdate({
              title: event.target.value,
            })
          }
        />

        <Input
          type="file"
          accept="application/pdf"
          disabled={disabled}
          onChange={(event) => {
            const file =
              event.target.files?.[0] ?? null

            onUpdate({ file })
          }}
        />

        {doc.file && (
          <p className="truncate text-xs text-muted-foreground">
            {doc.file.name}
          </p>
        )}
      </div>
    </div>
  )
}

export default DocSlot