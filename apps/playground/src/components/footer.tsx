import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CohereLogo, LlamaIndexLogo, MongoDbLogo, PineconeLogo, TriggerDevLogo } from "./brand/brand-icons"

const githubHref = "https://github.com/siddreddy07/bsdk"

const formatStars = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`
  }
  return count.toString()
}

const Footer = () => {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    let active = true

    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/siddreddy07/bsdk"
        )
        if (!response.ok) return
        const data = await response.json()
        if (active) setStars(data.stargazers_count ?? 0)
      } catch {
        if (active) setStars(0)
      }
    }

    fetchStars()

    return () => {
      active = false
    }
  }, [])
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0b0d0c] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
      >
        <div className="h-40 w-[min(90vw,40rem)] rounded-full bg-[#B8D96A]/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 pb-4 sm:px-6 sm:pt-20 lg:pt-24">
        <nav aria-label="Footer" className="flex items-center gap-6 pb-8">
          <Link
            to="/docs"
            className="rounded-sm text-sm text-white/60 transition-colors outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Documentation
          </Link>
          <Button
            render={
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="outline"
            size="sm"
            className="h-8 rounded-full border-white/15 bg-white/5 px-4 text-white transition-colors hover:border-[#B8D96A]/40 hover:bg-white/10 hover:text-white focus-visible:ring-[#B8D96A]/25"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            {stars ? (
              <>
                <Star className="size-3.5 fill-current text-[#B8D96A]" />
                {formatStars(stars)}
              </>
            ) : (
              "Star us GitHub"
            )}
          </Button>
        </nav>

        <div className="w-full overflow-hidden">
          <pre
            aria-label="BSDK"
            className="
              text-center font-mono font-bold
              text-[#B8D96A]
              leading-[0.9]
              tracking-[-0.06em]
              text-[clamp(7px,1.45vw,22px)]
              select-none
            "
          >
{`██████╗  ███████╗ ██████╗  ██╗  ██╗
██╔══██╗ ██╔════╝ ██╔══██╗ ██║ ██╔╝
██████╔╝ ███████╗ ██║  ██║ █████╔╝
██╔══██╗ ╚════██║ ██║  ██║ ██╔═██╗
██████╔╝ ███████║ ██████╔╝ ██║  ██╗
╚═════╝  ╚══════╝ ╚═════╝  ╚═╝  ╚═╝`}
          </pre>
        </div>

        <p className="mt-5 flex items-center gap-2 text-sm text-white/50 sm:mt-6">
          
          Build with 
        </p>
        <div className="flex items-center text-white/50 justify-between gap-6 lg:gap-4">
          <span className="flex items-center gap-1">
            <svg
            viewBox="0 0 24 24"
            className="size-3.5 text-white/70"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="m12 1.608 12 20.784H0Z" />
          </svg>
          <p className="hidden lg:block">
          Vercel AI SDK
          </p>

          </span>
          <span className="flex items-center gap-1">
            <CohereLogo/>
          <p className="hidden lg:block">
          Cohere
          </p>

          </span>
          <span className="flex items-center gap-1">
            <PineconeLogo/>
          <p className="hidden lg:block">
          Pinecone
          </p>

          </span>
          <span className="flex items-center gap-1">
            <TriggerDevLogo/>
          <p className="hidden lg:block">
          Trigger.dev
          </p>

          </span>
          <span className="flex items-center gap-1">
            <LlamaIndexLogo/>
          <p className="hidden lg:block">
          LlamaIndex
          </p>

          </span>
          <span className="flex items-center gap-1">
            <MongoDbLogo/>
          <p className="hidden lg:block">
          Mongodb
          </p>

          </span>

        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1.5 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 sm:text-left">
          <p className="text-sm text-white/50 whitespace-nowrap">
            © {new Date().getFullYear()} Bot · Sense · Data · Knowledge. 
            <p className="hidden md:block">All rights reserved.</p>
          </p>
          <p className="text-sm text-white/50">Created by Siddharth</p>
        </div>

      </div>
      <div className="flex items-center justify-center -mt-1 mb-1 sm:hidden w-full">
        <p className="text-sm text-white/50">
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer