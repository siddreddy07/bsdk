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

        <div className="mt-3 flex items-center justify-center gap-1.5">
          <span className="text-[11px] text-white/30">Powered by</span>
          <a
            href="https://firecrawl.dev"
            target="_blank"
            rel="noreferrer"
            className="opacity-50 transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="18"
              viewBox="0 0 172 40"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M23.3606 12.8281C21.8137 13.2873 20.6476 14.3261 19.7936 15.4544C19.6102 15.6966 19.228 15.5146 19.3008 15.2178C20.936 8.49401 18.7759 2.90556 12.0422 0.154735C11.7006 0.0147436 11.345 0.321324 11.4346 0.679702C14.4977 12.9779 1.61412 11.9406 3.24224 25.8823C3.27024 26.1217 3.00145 26.2855 2.80546 26.1455C2.19509 25.7073 1.51332 24.7932 1.04575 24.1506C0.908555 23.9616 0.611769 24.0148 0.548773 24.2402C0.176391 25.5869 0 26.8553 0 28.1152C0 33.0149 2.51847 37.328 6.33048 39.8283C6.54887 39.9711 6.82886 39.7667 6.75466 39.5161C6.55867 38.8581 6.44808 38.1638 6.43968 37.4456C6.43968 37.0046 6.46768 36.5539 6.53627 36.1339C6.69587 35.0784 7.06265 34.0732 7.67862 33.1577C9.79111 29.9869 14.0259 26.9239 13.3497 22.7647C13.3063 22.5015 13.6171 22.328 13.8131 22.5085C16.7964 25.2342 17.3871 28.9005 16.8972 32.1889C16.8552 32.4745 17.2135 32.6271 17.3941 32.4031C17.8505 31.832 18.4077 31.3308 19.0138 30.9542C19.165 30.8604 19.3666 30.9318 19.424 31.0998C19.7614 32.0811 20.2626 33.0023 20.7358 33.9234C21.3013 35.0308 21.6023 36.2949 21.5547 37.6332C21.5309 38.2842 21.4231 38.9141 21.2425 39.5133C21.1655 39.7667 21.4427 39.9781 21.6653 39.8325C25.4801 37.3322 28 33.0191 28 28.1166C28 26.4129 27.7018 24.7428 27.1376 23.1777C25.9547 19.8949 22.9533 17.4297 23.712 13.1515C23.7484 12.9471 23.5594 12.7693 23.3606 12.8281Z"
                fill="#FA5D19"
              />
              <path
                d="M41 34.0521V10.9618H55.7586V14.3264H44.7969V21.0226H53.8436V24.2882H44.7969V34.0521H41Z"
                fill="white"
              />
              <path
                d="M59.9569 14.7882C58.7352 14.7882 57.7777 13.8976 57.7777 12.6441C57.7777 11.3906 58.7352 10.5 59.9569 10.5C61.1785 10.5 62.136 11.3906 62.136 12.6441C62.136 13.8976 61.1785 14.7882 59.9569 14.7882ZM58.1409 34.0521V17.1632H61.7068V34.0521H58.1409Z"
                fill="white"
              />
              <path
                d="M73.5885 17.1632H74.3809V20.4948H72.796C69.6264 20.4948 68.6029 22.9687 68.6029 25.5747V34.0521H65.0371V17.1632H68.2067L68.6029 19.7031C69.4613 18.2847 70.815 17.1632 73.5885 17.1632Z"
                fill="white"
              />
              <path
                d="M83.632 34.25C78.3163 34.25 74.9816 30.8194 74.9816 25.6406C74.9816 20.4288 78.3163 16.9653 83.3019 16.9653C88.1884 16.9653 91.457 20.066 91.5561 25.0139C91.5561 25.4427 91.5231 25.9045 91.457 26.3663H78.7125V26.5972C78.8116 29.467 80.6275 31.3472 83.4339 31.3472C85.613 31.3472 87.1979 30.2587 87.6931 28.3785H91.2589C90.6646 31.7101 87.8252 34.25 83.632 34.25ZM78.8446 23.7604H87.8582C87.561 21.2535 85.8112 19.8351 83.3349 19.8351C81.0567 19.8351 79.1087 21.3524 78.8446 23.7604Z"
                fill="white"
              />
              <path
                d="M102.033 34.25C96.9151 34.25 93.6465 30.9184 93.6465 25.6406C93.6465 20.4288 97.0142 16.9653 102.132 16.9653C106.49 16.9653 109.197 19.3733 109.891 23.1997H106.16C105.698 21.2205 104.278 20 102.066 20C99.1933 20 97.3113 22.309 97.3113 25.6406C97.3113 28.9392 99.1933 31.2153 102.066 31.2153C104.245 31.2153 105.698 29.9618 106.127 28.0156H109.891C109.23 31.842 106.358 34.25 102.033 34.25Z"
                fill="white"
              />
              <path
                d="M121.006 17.1632H121.799V20.4948H120.214C117.044 20.4948 116.021 22.9687 116.021 25.5747V34.0521H112.455V17.1632H115.625L116.021 19.7031C116.879 18.2847 118.233 17.1632 121.006 17.1632Z"
                fill="white"
              />
              <path
                d="M130.614 16.9653C135.104 16.9653 137.679 19.1094 137.679 23.1007V34.0521H134.576L134.279 31.6441C133.123 33.1615 131.505 34.25 128.831 34.25C125.133 34.25 122.657 32.4358 122.657 29.3021C122.657 25.8385 125.166 23.8924 129.92 23.8924H134.147V22.8698C134.147 20.9896 132.793 19.8351 130.449 19.8351C128.336 19.8351 126.916 20.8247 126.652 22.309H123.152C123.515 19.0104 126.355 16.9653 130.614 16.9653ZM129.425 31.4792C132.397 31.4792 134.114 29.7309 134.147 27.125V26.5312H129.722C127.51 26.5312 126.289 27.3559 126.289 29.0712C126.289 30.4896 127.477 31.4792 129.425 31.4792Z"
                fill="white"
              />
              <path
                d="M144.653 34.0521L139.139 17.1632H142.903L146.766 30.0937L150.629 17.1632H153.897L157.595 30.0937L161.59 17.1632H165.222L159.609 34.0521H155.779L152.214 22.5729L148.516 34.0521H144.653Z"
                fill="white"
              />
              <path
                d="M166.934 34.0521V10.9618H170.5V34.0521H166.934Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

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