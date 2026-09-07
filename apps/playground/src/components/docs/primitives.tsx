import type { ReactNode } from "react"

import CopyButton from "../copy-button"

export const DocSection = ({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) => (
  <section id={id} className="mt-12 scroll-mt-28">
    <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
    {children}
  </section>
)

export const DocIntro = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 text-sm leading-relaxed text-white/60">{children}</p>
)

export const DocP = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 text-sm leading-relaxed text-white/60">{children}</p>
)

export const DocInline = ({ children }: { children: string }) => (
  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-white/85">
    {children}
  </code>
)

export const DocList = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-4 flex flex-col gap-2.5 text-sm leading-relaxed text-white/60">
    {items.map((item, index) => (
      <li key={index} className="flex gap-2.5">
        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-white/40" />
        {item}
      </li>
    ))}
  </ul>
)

export const DocCommandRow = ({ command }: { command: string }) => (
  <div className="flex w-full max-w-lg items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 py-2 pr-1.5 pl-3.5">
    <code className="font-mono text-[13px] text-white/80 select-all">
      {command}
    </code>
    <CopyButton text={command} />
  </div>
)

export const DocCodeBlock = ({
  snippet,
  fileName,
}: {
  snippet: string
  fileName?: string
}) => (
  <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-white/10 bg-[#070908]">
    {fileName && (
      <div className="border-b border-white/10 px-4 py-1.5 font-mono text-xs text-white/40">
        {fileName}
      </div>
    )}
    <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-white/80">
      <code>{snippet}</code>
    </pre>
    <div className="absolute top-2 right-2">
      <CopyButton text={snippet} />
    </div>
  </div>
)

export const DocStep = ({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) => (
  <div className="mt-7">
    <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-[#B8D96A]">
        {n}
      </span>
      {title}
    </h3>
    <div className="mt-2.5">{children}</div>
  </div>
)

export const DocNote = ({
  title = "Note",
  children,
}: {
  title?: string
  children: ReactNode
}) => (
  <div className="mt-3 w-full max-w-lg rounded-lg border border-[#B8D96A]/25 bg-[#B8D96A]/[0.06] p-4">
    <p className="text-xs font-semibold tracking-wider text-[#B8D96A] uppercase">
      {title}
    </p>
    <div className="mt-1.5 text-sm leading-relaxed text-white/65">
      {children}
    </div>
  </div>
)

export const DocStatus = ({ children }: { children: ReactNode }) => (
  <div className="mt-3 w-full max-w-lg rounded-lg border border-white/10 bg-white/[0.04] p-4">
    <p className="text-xs font-semibold tracking-wider text-white/50 uppercase">
      Status
    </p>
    <div className="mt-1.5 text-sm leading-relaxed text-white/60">
      {children}
    </div>
  </div>
)

export const DocTree = ({ snippet }: { snippet: string }) => (
  <pre className="w-full max-w-lg overflow-x-auto rounded-lg border border-white/10 bg-[#070908] p-4 font-mono text-[13px] leading-relaxed text-white/80">
    {snippet}
  </pre>
)

export const DocHeading = ({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) => (
  <h3 id={id} className="mt-7 scroll-mt-28 text-sm font-semibold text-white">
    {children}
  </h3>
)