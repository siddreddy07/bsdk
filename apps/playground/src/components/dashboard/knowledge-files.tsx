import { useState } from "react"
import { FileText, Loader2 } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Trash } from "@/components/animate-ui/icons/trash"

import api from "@/lib/axiosInstace"
import { useFilesStore } from "@/store/files.store"
import { FileStatusIcon } from "../fileStatusIcon"

const MAX_DOCS = 2

const KnowledgeFiles = () => {
  const [searchParams] = useSearchParams()
  const botId = searchParams.get("botId")

  const files = useFilesStore((state) => state.files)
  const loadingFiles = useFilesStore((state) => state.loading)
  const removeFile = useFilesStore((state) => state.removeFile)
  const clearFiles = useFilesStore((state) => state.clearFiles)

  const [deletingFileIds, setDeletingFileIds] = useState<Set<string>>(
    () => new Set()
  )
  const [deletingAll, setDeletingAll] = useState(false)

  const handleDeleteFile = async (fileId: string) => {

    setDeletingFileIds((prev) => new Set(prev).add(fileId))
    try {
      await api.delete(`/api/files/${fileId}`)
      removeFile(fileId)
      toast.success("Document deleted")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete document"
      )
    } finally {
      setDeletingFileIds((prev) => {
        const next = new Set(prev)
        next.delete(fileId)
        return next
      })
    }
  }

  const handleDeleteAll = async () => {
    if (!botId || files.length === 0) return
    setDeletingAll(true)
    try {
      await api.delete(`/api/files/bot/${botId}`)
      clearFiles()
      toast.success("All documents deleted")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete documents"
      )
    } finally {
      setDeletingAll(false)
    }
  }

  return (
    <section className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#B8D96A]/10 text-[#B8D96A]">
            <FileText className="size-4" />
          </span>

          <div>
            <h4 className="text-sm font-semibold">
              Knowledge files
            </h4>

            <p className="text-xs text-muted-foreground">
              {files.length} of {MAX_DOCS} documents uploaded
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeleteAll}
            disabled={loadingFiles || deletingAll}
            className="shrink-0 rounded-full border-destructive/30 px-3 text-destructive hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
          >
            {deletingAll ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <AnimateIcon animateOnHover>
                <Trash size={13} />
              </AnimateIcon>
            )}
            Delete all
          </Button>
        )}
      </div>

      {loadingFiles && (
        <div className="mt-4 flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading documents...
        </div>
      )}

      {!loadingFiles && files.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        </div>
      )}

      {!loadingFiles && files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.fileId}
              className="group/tile relative flex min-w-0 items-center gap-1.5 rounded-lg border border-border bg-muted/20 py-1.5 pr-1.5 pl-2 transition-colors hover:border-[#B8D96A]/40 hover:bg-muted/30"
            >
              <Link
                to={file.url}
                className="flex min-w-0 flex-1 items-center gap-1.5"
              >
                <FileStatusIcon status={file.vectorStatus} />

                <span className="min-w-0 truncate text-xs text-foreground/90">
                  {file.originalName}
                </span>
              </Link>

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  handleDeleteFile(file.fileId)
                }}
                disabled={deletingFileIds.has(file.fileId)}
                aria-label={`Delete ${file.originalName}`}
                title="Delete"
                className="flex size-5 shrink-0 items-center justify-center rounded-full text-muted-foreground opacity-80 transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40 disabled:opacity-50 md:opacity-0 md:group-hover/tile:opacity-100"
              >
                {deletingFileIds.has(file.fileId) ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <AnimateIcon animateOnHover>
                    <Trash size={12} />
                  </AnimateIcon>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default KnowledgeFiles