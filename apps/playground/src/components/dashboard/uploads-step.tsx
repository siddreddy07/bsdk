import {
  useEffect,
  useState,
  type FormEvent,
} from "react"
import { FileUp, Loader2, Plus } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { toast as shadcnToast } from "@/components/ui/toast"

import { Button } from "@/components/ui/button"

import api from "@/lib/axiosInstace"
import { uploadPdfs } from "@/services/upload.service"
import { useFilesStore } from "@/store/files.store"
import { useKnowledgeStore } from "@/store/knowledge.store"
import FileProcessingListener from "@/hooks/FileProcessingListener"
import KnowledgeFiles from "./knowledge-files"
import DocSlot from "./doc-slot"

export type DocUpload = {
  id: string
  title: string
  file: File | null
}

const MAX_DOCS = 2

const UploadsStep = () => {
  const [docs, setDocs] = useState<DocUpload[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [realtime, setRealtime] = useState<{
    batchId: string
    accessToken: string
  } | null>(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const botId = searchParams.get("botId")

  const config = useKnowledgeStore((state) => state.config)
  const hasCredentials = config?.configured === true

  const files = useFilesStore((state) => state.files)
  const fetchFiles = useFilesStore((state) => state.fetchFiles)
  const addFiles = useFilesStore((state) => state.addFiles)

  console.log('Bot Id:',botId)

  useEffect(() => {
    if (!botId) return

    console.log('Upload Step')

    fetchFiles(botId)
  }, [botId, fetchFiles])

  // Total = persisted files + currently added upload cards
  const totalDocs = files.length + docs.length

  const canAddMore = totalDocs <= MAX_DOCS

  const docsReady =
    docs.length > 0 &&
    docs.every(
      (doc) =>
        doc.title.trim() !== "" &&
        doc.file !== null
    )

  const addDoc = () => {
    if (!canAddMore) return

    setDocs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        file: null,
      },
    ])
  }

  const updateDoc = (
    id: string,
    updates: Partial<DocUpload>
  ) => {
    setDocs((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, ...updates }
          : doc
      )
    )
  }

  const removeDoc = (id: string) => {
    setDocs((prev) =>
      prev.filter((doc) => doc.id !== id)
    )
  }

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault()

    if (!botId) {
      toast.warning("Create or Choose an Existing Bot")
      return
    }

    if (!hasCredentials) {
      shadcnToast.add({
        title: "Configure Knowledge base",
        type: "warning",
        description: "Add & Save Knowledge Credentials before Uploading",
        actionProps: {
          children: "Configure",
          onClick: () => {
            setSearchParams((prev) => {
              prev.set("tab", "configuration")
              prev.set("step", "0")
              return prev
            })
          },
        },
      })
      return
    }

    if (!docsReady) return

    try {
      setUploading(true)
      setProgress(0)

      // Get the actual PDF files
      const pdfs = docs.map(
        (doc) => doc.file as File
      )

      // Upload PDFs
      const uploadedFiles = await uploadPdfs(
        pdfs,
        (_, percentage) => {
          setProgress(percentage)
        }
      )

      // Save uploaded file information in backend
      const {data} = await api.post("/api/files", {
        files: uploadedFiles,
        botId,
      })

      addFiles(data.files)

      setRealtime(data.realtime)
      // Clear temporary upload cards
      setDocs([])

      toast.success(
        "Documents uploaded successfully"
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Upload failed"
      )
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <>
      {realtime && (
        <FileProcessingListener
          batchId={realtime.batchId}
          accessToken={realtime.accessToken}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl"
      >
        {/* Page heading */}

        <div>
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
            Knowledge
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Add PDF documents to your bot&apos;s knowledge.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <KnowledgeFiles />

          {/* =========================================
              ADD DOCUMENTS
          ========================================== */}

          {canAddMore && (
            <section className="rounded-xl border border-border bg-background/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold">
                    Add documents
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    PDF files only · {totalDocs}/{MAX_DOCS}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDoc}
                  disabled={uploading || !canAddMore}
                  className="rounded-full px-3"
                >
                  <Plus className="size-3.5" />
                  Add
                </Button>
              </div>

              {/* No pending uploads */}

              {docs.length === 0 && (
                <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Click &quot;Add&quot; to select a PDF.
                  </p>
                </div>
              )}

              {/* Pending uploads */}

              {docs.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {docs.map((doc) => (
                    <DocSlot
                      key={doc.id}
                      doc={doc}
                      disabled={uploading}
                      onUpdate={(updates) =>
                        updateDoc(doc.id, updates)
                      }
                      onRemove={() =>
                        removeDoc(doc.id)
                      }
                    />
                  ))}
                </div>
              )}

              {/* Upload button */}

              {docs.length > 0 && (
                <div className="mt-5 flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!docsReady || uploading}
                    className="rounded-full bg-[#B8D96A] px-6 text-[#0b0d0c] hover:bg-[#c8e88a]"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        Uploading {progress}%
                      </>
                    ) : (
                      <>
                        <FileUp className="size-3.5" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* Max reached */}

          {!canAddMore && (
            <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Maximum of {MAX_DOCS} documents reached.
              </p>
            </div>
          )}
        </div>
      </form>
    </>
  )
}

export default UploadsStep