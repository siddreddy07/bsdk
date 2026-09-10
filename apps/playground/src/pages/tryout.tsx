import { useState, type FormEvent } from "react"
import {
  Activity,
  ArrowRight,
  FileText,
  Globe,
  Link2,
  Loader2,
  XCircle,
  Upload,
  Check,
} from "lucide-react"
import { toast } from "sonner"
import type { AxiosError } from "axios"

import { cn } from "cn"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/lib/axiosInstace"
import { TryoutSchema } from "@/schemas/tryout.schema"
import { getTrySession, saveTryResult, markAsUploaded } from "@/lib/try-session"

type TryoutResult = {
  title: string
  sourceUrl: string
  markdown: string
}



const getUrlError = (value: string) => {
  if (!value.trim()) return null
  const parsed = TryoutSchema.safeParse({ url: value })
  if (parsed.success) return null
  return parsed.error.issues[0]?.message ?? "Enter a valid URL"
}

const Tryout = () => {
  const [url, setUrl] = useState(() => {
    const s = getTrySession();
    return s.sourceUrl || "";
  });
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TryoutResult | null>(() => {
    const s = getTrySession();
    if (s.markdown && s.sourceUrl) {
      return {
        title: "",
        sourceUrl: s.sourceUrl,
        markdown: s.markdown,
      };
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [training, setTraining] = useState(false)

  const MIN_MARKDOWN_LENGTH = 500;

  const [uploaded, setUploaded] = useState(() => {
    const s = getTrySession();
    return !!s.uploaded;
  });

  const hasFetched = !!(result?.markdown && result?.sourceUrl);
  const canFetch = !hasFetched;
  const canSend = (result?.markdown.trim().length ?? 0) >= MIN_MARKDOWN_LENGTH

  
  const handleTrain = async () => {
    if (!result) return

    if (!canSend) {
      toast.error("Not enough content found on this page.");
      return
    }

    setTraining(true)


    try {
      const { demoId } = getTrySession()

      const { data } = await api.post("/api/try/train", {
        demoId,
        markdown: result.markdown,
        sourceUrl: result.sourceUrl,
      })

      if (data?.success) {
        setUploaded(true);
        markAsUploaded();
        toast.success(data.message || "Uploaded Successfully!")
      } else {
        toast.error(data?.error || "Failed to upload markdown")
      }
    } catch (err) {
      const message =
        (err as AxiosError<{ error?: string }>).response?.data?.error ??
        "Failed to upload markdown"
      toast.error(message)
    } finally {
      setTraining(false)
    }
  }

  const handleFetch = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    const parsed = TryoutSchema.safeParse({ url })
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Enter a valid URL"
      setFieldError(message)
      toast.error("Invalid URL", { description: message })
      return
    }

    setLoading(true)
    setFieldError(null)
    setError(null)
    setResult(null)

    try {
      const { data } = await api.post("/api/try", { url: parsed.data.url })
      setResult(data)
      saveTryResult(data.markdown || "", data.sourceUrl || "")
    } catch (err) {
      const message =
        (err as AxiosError<{ error?: string }>).response?.data?.error ??
        "Failed to process website"
      setError(message)
      toast.error("Fetch failed", { description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#0b0d0c] text-white">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.2}
        duration={5}
        className="text-[#B8D96A] stroke-[#B8D96A]/10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] size-[36rem] rounded-full bg-[#B8D96A]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[#B8D96A]/[0.06] blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
        <div className="flex w-full flex-col items-center gap-4 text-center sm:gap-5">
          <h1 className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
            See what BSDK can read
            <span className="text-[#B8D96A]"> from any URL.</span>
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/60 text-pretty sm:text-lg">
            Paste a website address, hit Fetch, and get back clean markdown of
            the page content.
          </p>
        </div>

        <form
          onSubmit={handleFetch}
          className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:mt-10 sm:p-5"
        >
          <label
            htmlFor="tryout-url"
            className="mb-2 block pl-1 text-xs font-medium tracking-wide text-white/60 uppercase"
          >
            Website URL
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2">
            <div className="relative flex-1">
              <Globe className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
                <Input
                  id="tryout-url"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  spellCheck={false}
                  placeholder="https://example.com"
                  value={url}
                  readOnly={hasFetched}
                  onChange={(e) => {
                    const value = e.target.value
                    setUrl(value)
                    setFieldError(getUrlError(value))
                  }}
                  aria-invalid={fieldError ? true : undefined}
                  className={cn("h-11 w-full rounded-xl border-white/15 bg-white/5 pl-10 text-white placeholder:text-white/35 focus-visible:border-[#B8D96A]/60 focus-visible:ring-[#B8D96A]/20 aria-invalid:border-red-500/60 aria-invalid:ring-red-500/20 [&::selection]:bg-[#B8D96A]/30", hasFetched && "cursor-not-allowed opacity-60")}
                />
            </div>
            <Button
              type="submit"
              disabled={!canFetch || loading || !!fieldError || !url.trim()}
              className="h-11 shrink-0 cursor-pointer gap-2 rounded-xl bg-[#B8D96A] px-5 font-semibold text-black hover:bg-[#c8e57f] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-32"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Fetching…
                </>
              ) : (
                <>
                  Fetch
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>

          {fieldError && (
            <p className="mt-2 pl-1 text-left text-xs font-medium text-red-400">
              {fieldError}
            </p>
          )}
        </form>

        <div className="mt-6 w-full space-y-4 sm:mt-8">
          {loading && (
            <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70 backdrop-blur-xl">
              <Loader2 className="size-4 shrink-0 animate-spin text-[#B8D96A]" />
              Fetching {url.trim() || "the URL"}… converting it to markdown
            </div>
          )}

          {error && !loading && (
            <div className="flex w-full items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm backdrop-blur-xl">
              <XCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
              <p className="leading-relaxed text-red-300">{error}</p>
            </div>
          )}

          {result && !loading && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:p-5">
                <div className="flex flex-col gap-2.5">
                  <h2 className="min-w-0 break-words text-base font-semibold text-white">
                    {result.title || "Untitled"}
                  </h2>
                  <a
                    href={result.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1.5 truncate text-xs text-[#B8D96A] hover:text-[#c8e57f] hover:underline"
                  >
                    <Link2 className="size-3.5 shrink-0" />
                    <span className="truncate">{result.sourceUrl}</span>
                  </a>
                </div>
                <Button
                  size="sm"
                  onClick={handleTrain}
                  disabled={training || !canSend || uploaded}
                  className="w-full shrink-0 gap-1.5 rounded-xl bg-[#B8D96A] px-4 font-semibold text-black hover:bg-[#c8e57f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-24"
                >
                  {training ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Uploading
                    </>
                  ) : uploaded ? (
                    <>
                      <Check className="size-3.5" />
                      Uploaded
                    </>
                  ) : (
                    <>
                      <Upload className="size-3.5" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium tracking-wide text-white/40 uppercase sm:px-5">
                <FileText className="size-3.5" />
                Markdown content
              </div>
              <pre className="max-h-96 overflow-auto p-4 text-xs leading-relaxed whitespace-pre-wrap break-words text-white/55 selection:bg-[#B8D96A]/30 sm:p-5">
                {result.markdown || "No content returned."}
              </pre>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/5">
                <Globe className="size-5 text-white/40" />
              </span>
              <p className="text-sm text-white/40">
                Paste a URL above and hit{" "}
                <span className="font-medium text-white/60">Fetch</span> to see
                the page markdown here.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/35 sm:mt-14">
          <span className="flex items-center gap-1.5">
            <Activity className="size-3.5 text-[#B8D96A]/60" />
            Full page markdown, ready for BSDK
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <Globe className="size-3.5 text-[#B8D96A]/60" />
            Supports any public website
          </span>
        </div>
      </div>
    </div>
  )
}

export default Tryout