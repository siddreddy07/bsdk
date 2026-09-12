import { Package, Search, Server, Zap } from "lucide-react"

import AuthPopover from "./auth-popover"
import BsdkLogo from "./bsdk-logo"
import CopyButton from "./copy-button"
import { AnimatedGridPattern } from "./ui/animated-grid-pattern"
import { Marquee } from "./ui/marquee"
import { Link } from "react-router-dom"


const runtimeNodes = [
  { label: "@bsdk/ui", icon: Package },
  { label: "Knowledge", icon: Search },
  { label: "@bsdk/server", icon: Server },
  { label: "Tools", icon: Zap },
]

const providers = [
  {
    name: "Groq",
    showName: false,
    viewBox: "0 0 1981.58 562.32",
    iconClass: "h-6 w-auto",
    path: "M1378.01.31h-.04c-109.6 0-198.78 89.18-198.78 198.78s89.18 198.78 198.78 198.78 198.78-89.18 198.78-198.81C1576.56 89.66 1487.4.5 1378.01.31m93.33 198.78c0 51.49-41.88 93.36-93.36 93.36s-93.36-41.88-93.36-93.36 41.88-93.36 93.36-93.36 93.36 41.87 93.36 93.36M908.86 180.75c.43-11.74 1.43-23.13 3.67-34.68l.05-.23c2.83-13.62 7.15-26.73 12.81-38.99 11.8-25.1 29.21-47.21 50.41-64.03 20.78-16.39 45.11-28.6 70.38-35.33 12.4-3.45 25.23-5.67 38.18-6.6 28.63-2.05 56.94 1.15 83.9 11.24 9.98 3.74 19.95 8.47 29.26 13.87l15.78 9.17-50.61 88.04-15.8-8.8c-10.95-6.1-22.78-9.84-35.16-11.11-12.97-1.17-26.36 0-38.93 3.43-11.9 3.18-23.24 8.94-32.86 16.64-9 7.25-16.26 16.51-20.96 26.71-5.08 11.01-6.98 23.13-6.98 35.17v199.17H908.85V180.75ZM873.03 187.44c-1.25-50.37-21.77-97.51-57.79-132.72C779.25 19.54 731.74.1 681.47 0h-1.63C574.85 0 488.97 85.15 488.05 190.59c-.45 51.35 19.07 99.82 54.95 136.49 35.9 36.68 83.86 57.12 135.2 57.57h58.51V282.78h-55.55c-24.09.33-46.84-8.87-64.06-25.73-17.24-16.87-26.88-39.48-27.14-63.68-.55-49.87 39.38-90.9 89.04-91.5h2.39c49.58 0 90.14 40.58 90.42 90.37v177.83c0 49.22-40.06 89.74-89.31 90.37-23.59-.18-45.76-9.55-62.43-26.43l-12.93-13.07-.05.05-51.98 91.8c34.69 31.66 79.12 49.17 126.28 49.52h2.59c50.55-.72 97.97-20.94 133.54-56.97 35.54-36.02 55.27-83.78 55.53-134.6V187.46H873v-.02ZM1790.21.29c-51.34 0-99.58 20.01-135.85 56.38-36.21 36.3-56.11 84.53-56.01 135.76 0 105.86 86.07 191.97 191.87 191.97h54.41V282.67h-54.41c-49.74 0-90.19-40.48-90.19-90.24s40.45-90.24 90.19-90.24c22.6 0 44.23 8.44 60.92 23.76 16.11 14.8 28.77 34.62 28.77 56.46v367.66h101.67V192.43c0-105.94-85.85-192.14-191.37-192.14M165.98 342.21H0L272.4 1.5l-68.75 220.11H369.6L97.23 562.32z",
  },
  {
    name: "Google Gemini",
    path: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
  },
  {
    name: "OpenAI",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
  },
  {
    name: "Anthropic",
    path: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",
  },
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0b0d0c] text-white">
      <AnimatedGridPattern
        numSquares={60}
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

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 md:pt-32 lg:pt-40 lg:pb-36">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center sm:gap-6">
          <h1 className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            The Chat SDK for AI-native websites.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/60 text-pretty sm:text-lg">
            BSDK provides the frontend and server pieces to bring AI into your
            web application while keeping full control of the model and
            provider.
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5 sm:mt-2 sm:gap-3">
            <AuthPopover showAvatar={false} triggerClassName="h-10 rounded-full bg-white px-5 text-black hover:bg-white cursor-pointer sm:h-11 sm:px-6" />
            <Link
              to={"/try"}
              className="inline-flex h-10 items-center rounded-full border border-white/15 px-5 text-sm font-medium text-white/80 transition-colors outline-none hover:bg-white/5 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 sm:h-11 sm:px-6"
            >
              Try it out
            </Link>
          </div>

          <Link to={"/docs"} className="text-white/50 block md:hidden -mb-2 underline">Explore Docs</Link>

          <div className="mt-2 flex w-full max-w-xs items-center justify-between gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1 pr-1.5 pl-2.5 sm:mt-3 sm:gap-2 sm:max-w-sm sm:py-1.5 sm:rounded-xl sm:pl-3">
            <code className="truncate select-all text-[13px] font-medium whitespace-nowrap text-white/80 sm:text-sm">
              pnpm dlx @bsdk/cli init
            </code>
            <CopyButton text="pnpm dlx @bsdk/cli init" />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/35 sm:mt-3 sm:gap-x-5">
            {[
              {
                name: "npm",
                command: "npx @bsdk/cli init",
                path: "M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z",
              },
              {
                name: "yarn",
                command: "yarn dlx @bsdk/cli init",
                path: "M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z",
              },
              {
                name: "pnpm",
                command: "pnpm dlx @bsdk/cli init",
                path: "M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM2 2h3.5v3.5H2zm8.25 0h3.498v3.5H10.25zm8.25 0H22v3.5h-3.5zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zm2 2H22v3.5h-3.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z",
              },
              {
                name: "bun",
                command: "bunx @bsdk/cli init",
                path: "M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083 5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z",
              },
            ].map(({ name, command, path }) => (
              <span
                key={name}
                title={command}
                className="flex cursor-default items-center gap-1.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={path} />
                </svg>
                <span className="text-xs font-medium text-white/45">
                  {name}
                </span>
              </span>
            ))}
          </div>
            
              <a href="https://www.producthunt.com/products/bsdk-2?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-bsdk-2" target="_blank" rel="noopener noreferrer"><img alt="BSDK - Add AI chat to any website with an embeddable SDK | Product Hunt" width="250" height="54" className="max-w-[180px] h-auto sm:max-w-[220px] md:max-w-[250px]" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1246351&amp;theme=light&amp;t=1789224070402" /></a>


        </div>

        <div className="mt-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:mt-16 sm:p-8 lg:mt-20 lg:p-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-sm font-semibold tracking-wide text-white/90">
              BSDK Runtime
            </h2>
            <p className="max-w-[22rem] text-sm leading-relaxed text-white/50 text-pretty">
              The UI, server runtime, knowledge layer and tool orchestration
              behind your website assistant.
            </p>
          </div>

          <div className="relative mx-auto my-6 h-52 w-full max-w-[16rem] sm:my-8 sm:h-60">
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="80" className="stroke-white/5" strokeWidth="1" />
              <circle
                cx="100"
                cy="100"
                r="54"
                className="stroke-white/[0.05]"
                strokeWidth="1"
                strokeDasharray="1.5 7"
                strokeLinecap="round"
              />
              <path d="M100 100 100 24" className="stroke-white/[0.08]" strokeWidth="1" />
              <path d="M100 100 176 100" className="stroke-white/[0.08]" strokeWidth="1" />
              <path d="M100 100 100 176" className="stroke-white/[0.08]" strokeWidth="1" />
              <path d="M100 100 24 100" className="stroke-white/[0.08]" strokeWidth="1" />
              <circle cx="100" cy="24" r="2.5" fill="#B8D96A" fillOpacity="0.55" />
              <circle cx="176" cy="100" r="2.5" fill="#B8D96A" fillOpacity="0.55" />
              <circle cx="100" cy="176" r="2.5" fill="#B8D96A" fillOpacity="0.55" />
              <circle cx="24" cy="100" r="2.5" fill="#B8D96A" fillOpacity="0.55" />
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8D96A]/10 blur-2xl"
              />
              <BsdkLogo
                width={48}
                height={48}
                className="relative drop-shadow-[0_0_20px_rgba(184,217,106,0.35)]"
              />
            </div>

            <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap">
              <Package className="size-3.5 text-white/40" />
              <span className="text-[11px] font-medium text-white/60">
                {runtimeNodes[0].label}
              </span>
            </div>
            <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap">
              <Zap className="size-3.5 text-white/40" />
              <span className="text-[11px] font-medium text-white/60">
                {runtimeNodes[3].label}
              </span>
            </div>
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap">
              <Server className="size-3.5 text-white/40" />
              <span className="text-[11px] font-medium text-white/60">
                {runtimeNodes[2].label}
              </span>
            </div>
            <div className="absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap">
              <Search className="size-3.5 text-white/40" />
              <span className="text-[11px] font-medium text-white/60">
                {runtimeNodes[1].label}
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto h-px w-full max-w-[20rem] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6 sm:gap-5">
            <div className="flex items-center gap-2 text-white/85">
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m12 1.608 12 20.784H0Z" />
              </svg>
              <span className="text-sm font-semibold tracking-tight">Chat SDK</span>
            </div>

            <Marquee
              pauseOnHover
              repeat={2}
              className="w-full max-w-[28rem] p-0 [--duration:32s] [--gap:2rem] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
            >
              {providers.map(({ name, path, viewBox = "0 0 24 24", iconClass = "size-5", showName = true }) => (
                <div key={name} className="flex shrink-0 items-center gap-2">
                  <svg
                    viewBox={viewBox}
                    className={`text-white/40 transition-colors duration-300 hover:text-white/80 ${iconClass}`}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                  {showName && (
                    <span className="text-sm font-medium whitespace-nowrap text-white/40 transition-colors duration-300 hover:text-white/80">
                      {name}
                    </span>
                  )}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero