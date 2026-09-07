import { useEffect, useState, type FormEvent } from "react"
import { Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CohereLogo, PineconeLogo } from "@/components/brand/brand-icons"
import api from "@/lib/axiosInstace"
import { useKnowledgeStore } from "@/store/knowledge.store"

type KnowledgeCredentials = {
  cohereApiKey: string
  pineconeApiKey: string
  pineconeIndexHost: string
}

const emptyCredentials: KnowledgeCredentials = {
  cohereApiKey: "",
  pineconeApiKey: "",
  pineconeIndexHost: "",
}

const KnowledgeCredentials = () => {
  const [saving, setSaving] = useState(false)
  const [creds, setCreds] = useState<KnowledgeCredentials>(emptyCredentials)

  const config = useKnowledgeStore((state) => state.config)
  const fetchConfig = useKnowledgeStore((state) => state.fetchConfig)

  const cohereConfigured = config?.cohereConfigured === true
  const pineconeConfigured = config?.pineconeConfigured === true

  const updateField = (
    field: keyof KnowledgeCredentials,
    value: string
  ) => {
    setCreds((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()

    const payload: Partial<KnowledgeCredentials> = {}
    if (creds.cohereApiKey.trim()) {
      payload.cohereApiKey = creds.cohereApiKey
    }
    if (creds.pineconeApiKey.trim()) {
      payload.pineconeApiKey = creds.pineconeApiKey
    }
    if (creds.pineconeIndexHost.trim()) {
      payload.pineconeIndexHost = creds.pineconeIndexHost
    }

    if (Object.keys(payload).length === 0) {
      toast.error("Enter a credential to save")
      return
    }

    setSaving(true)
    try {
      await api.put("/api/knowledge/add-config", payload)
      await fetchConfig()
      updateField("cohereApiKey", "")
      updateField("pineconeApiKey", "")
      updateField("pineconeIndexHost", "")
      toast.success("Knowledge credentials saved")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save credentials"
      )
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  return (
    <form
      onSubmit={handleSave}
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col"
    >
      <div>
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          Knowledge Credentials
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your Cohere and Pinecone credentials.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-border bg-background/40 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/40">
                <CohereLogo />
              </span>
              <div>
                <h4 className="text-sm font-semibold">Cohere</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Embeddings for website knowledge.
                </p>
              </div>
            </div>
            {cohereConfigured && (
              <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#B8D96A]/40 bg-[#B8D96A]/10 px-2 py-0.5 text-xs font-medium text-[#B8D96A]">
                <Check className="size-3" />
                Configured
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-1.5">
            <Label htmlFor="cohere-api-key" className="text-xs font-medium">
              API Key
            </Label>
            <Input
              id="cohere-api-key"
              type="password"
              placeholder="Cohere API key"
              value={creds.cohereApiKey}
              onChange={(event) =>
                updateField("cohereApiKey", event.target.value)
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-background/40 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/40">
                <PineconeLogo />
              </span>
              <div>
                <h4 className="text-sm font-semibold">Pinecone</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Vector storage and semantic search.
                </p>
              </div>
            </div>
            {pineconeConfigured && (
              <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#B8D96A]/40 bg-[#B8D96A]/10 px-2 py-0.5 text-xs font-medium text-[#B8D96A]">
                <Check className="size-3" />
                Configured
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pinecone-api-key" className="text-xs font-medium">
                API Key
              </Label>
              <Input
                id="pinecone-api-key"
                type="password"
                placeholder="Pinecone API key"
                value={creds.pineconeApiKey}
                onChange={(event) =>
                  updateField("pineconeApiKey", event.target.value)
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="pinecone-index-host"
                className="text-xs font-medium"
              >
                Index Host
              </Label>
              <Input
                id="pinecone-index-host"
                type="text"
                placeholder="https://my-index-abc.svc.aped-4627-b74a.pinecone.io"
                value={creds.pineconeIndexHost}
                onChange={(event) =>
                  updateField("pineconeIndexHost", event.target.value)
                }
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          type="submit"
          size="sm"
          disabled={saving}
          className="rounded-full bg-[#B8D96A] px-6 text-[#0b0d0c] hover:bg-[#c8e88a]"
        >
          {saving && <Loader2 className="size-3.5 animate-spin" />}
          Save Credentials
        </Button>
      </div>
    </form>
  )
}

export default KnowledgeCredentials