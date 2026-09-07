import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FileIcon, FileText, Menu, Pencil, ToggleLeft, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
} from "@/components/ui/menubar"
import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Clipboard } from "@/components/animate-ui/icons/clipboard"
import CreateBotPopover from "@/components/dashboard/create-bot-popover"
import { useBotsStore, type Bot } from "@/store/bots.store"
import api from "@/lib/axiosInstace"
import { toast } from "sonner"
import { useFilesStore } from "@/store/files.store"
import { FileStatusIcon } from "../fileStatusIcon"
import { ToggleLeftIcon } from "../animate-ui/icons/toggle-left"

function EditBotDrawer({
  bot,
  open,
  onOpenChange,
  onSave,
}: {
  bot: Bot
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updated: Bot) => Promise<void>
}) {
  const [name, setName] = useState(bot.name)
  const [description, setDescription] = useState(bot.description)
  const [saving, setSaving] = useState(false)

const [searchParams, setSearchParams] = useSearchParams()

const botId = searchParams.get("botId")
const files = useFilesStore((state) => state.files)
const filesBotId = useFilesStore((state) => state.botId)


const currentFiles =
  filesBotId === botId ? files : []

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave({
        ...bot,
        name: name.trim() || bot.name,
        description,
      })
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[0.4, 0.7, 0.95]}
      defaultSnapPoint={0.7}
      showSwipeHandle
    >
      <DrawerContent>
        <DrawerHeader className="flex-row items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5 text-left">
            <DrawerTitle>Edit Bot</DrawerTitle>
            <DrawerDescription>
              Update your bot&apos;s name and AI description.
            </DrawerDescription>
          </div>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="shrink-0 rounded-full bg-[#B8D96A] px-4 text-[#0b0d0c] hover:bg-[#c8e88a]"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DrawerHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4 sm:px-6">
          <div className="flex justify-center pt-2">
            <img
              src={bot.avatarUrl}
              alt={bot.name}
              width={80}
              height={80}
              draggable={false}
              className="size-20 rounded-full bg-background object-cover ring-2 ring-[#B8D96A]/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`edit-name-${bot.botId}`} className="text-sm font-medium">
              Bot name
            </Label>
            <Input
              id={`edit-name-${bot.botId}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bot name"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Files associated</Label>
              <div className="rounded-lg border border-border bg-muted/20 p-3">
  {currentFiles.length === 0 ? (
    <p className="py-2 text-sm text-muted-foreground">
      No files associated with this bot.
    </p>
  ) : (
    <div className="flex flex-wrap gap-1.5">
      {currentFiles.map((file) => (
        <span
          key={file.fileId}
          className="inline-flex max-w-28 mg:max-w-44 items-center gap-1.5 rounded-md border border-border bg-background text-[#B8D96A] px-2 py-2.5 text-xs md:text-sm"
        >
          <FileIcon/>

          <span className="truncate">
            {file.originalName}
          </span>
        </span>
      ))}
    </div>
  )}
</div>
              <p className="text-xs text-muted-foreground">
                Associated files are managed in the uploads section.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor={`edit-description-${bot.botId}`}
                className="text-sm font-medium"
              >
                AI Description
              </Label>
              <Textarea
                id={`edit-description-${bot.botId}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this bot does."
                className="min-h-40 max-h-64"
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function BotCard({
  bot,
  isActive,
  onSelect,
}: {
  bot: Bot
  isActive: boolean
  onSelect: () => void
}) {
  const [animating, setAnimating] = useState(false)

  const handleCopyBotId = () => {
    navigator.clipboard.writeText(bot.botId)
    setAnimating(false)
    requestAnimationFrame(() => setAnimating(true))
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200",
        isActive
          ? "border-[#B8D96A]/50 bg-[#B8D96A]/5"
          : "border-border bg-background/40 hover:border-border/80 hover:bg-accent/50"
      )}
    >
      <img
        src={bot.avatarUrl}
        alt={bot.name}
        width={40}
        height={40}
        draggable={false}
        className="size-10 shrink-0 rounded-lg bg-background object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {bot.name}
        </p>
        {isActive ? (
          <span
            role="button"
            tabIndex={0}
            title="Copy Bot ID"
            aria-label={`Copy Bot ID for ${bot.name}`}
            onClick={(e) => {
              e.stopPropagation()
              handleCopyBotId()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                e.stopPropagation()
                handleCopyBotId()
              }
            }}
            className="mt-0.5 inline-flex cursor-pointer items-center gap-1 rounded-md text-xs font-medium text-[#B8D96A] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D96A]/50"
          >
            Copy BotId
            <AnimateIcon animate={animating} animation="default">
              <Clipboard size={13} className="shrink-0" />
            </AnimateIcon>
          </span>
        ) : null}
      </div>
    </button>
  )
}

export default function SwitchBotDrawer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const bots = useBotsStore((state) => state.bots)
  const setActiveBot = useBotsStore((state) => state.setActiveBot)
  const updateBot = useBotsStore((state) => state.updateBot)
  const removeBot = useBotsStore((state) => state.removeBot)

  const activeBotId = searchParams.get("botId") || ""

  const activeBot = bots.find((b) => b.botId === activeBotId)

  useEffect(() => {
    if (activeBot) {
      setActiveBot(activeBot)
    } else if (!activeBotId) {
      setActiveBot(null)
    }
  }, [activeBot, activeBotId, setActiveBot])

  const handleSelectBot = (botId: string) => {
    setSearchParams((prev) => {
      prev.set("botId", botId)
      return prev
    })
    const bot = bots.find((b) => b.botId === botId)
    if (bot) setActiveBot(bot)
    setOpen(false)
  }

  const handleEditBot = async (updated: Bot) => {
    try {
      const response = await api.patch(`/api/bots/${updated.botId}`, {
        name: updated.name,
        description: updated.description,
      })
      const patched = response.data?.bot
      updateBot(
        patched
          ? {
              ...updated,
              name: patched.name,
              description: patched.description || "",
              avatarUrl: patched.botAvatarUrl || updated.avatarUrl,
            }
          : updated
      )
      if (updated.botId === activeBotId) {
        const refreshed = useBotsStore.getState().bots.find(
          (b) => b.botId === updated.botId
        )
        if (refreshed) setActiveBot(refreshed)
      }
      toast.success("Bot updated successfully.")
    } catch (error) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Failed to update bot"
      toast.error(message)
      throw error
    }
  }

  const handleDeleteBot = async (botId: string) => {
    try {
      await api.delete(`/api/bots/${botId}`)
      removeBot(botId)
      if (activeBotId === botId) {
        setActiveBot(null)
        setSearchParams((prev) => {
          prev.delete("botId")
          return prev
        })
      }
      toast.success("Bot deleted successfully.")
    } catch (error) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Failed to delete bot"
      toast.error(message)
    }
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          {activeBot ? (
            <div className="flex items-center gap-2.5 rounded-full border border-[#B8D96A]/30 bg-[#B8D96A]/5 py-1.5 pl-1.5 pr-2">
              <img
                src={activeBot.avatarUrl}
                alt={activeBot.name}
                width={28}
                height={28}
                draggable={false}
                className="size-7 rounded-full bg-background object-cover ring-2 ring-[#B8D96A]/20"
              />
              <span className="text-xs font-medium text-foreground sm:text-sm">
                {activeBot.name}
              </span>

              <div className="ml-1 hidden items-center gap-0.5 sm:flex">
                <button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-foreground"
                  aria-label={`Edit ${activeBot.name}`}
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBot(activeBot.botId)}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Delete ${activeBot.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="ml-1 sm:hidden">
                <Menubar className="bg-transparent p-0 border-0">
                  <MenubarMenu>
<MenubarTrigger
                      className="size-8 gap-0 rounded-full px-0 text-muted-foreground hover:bg-transparent aria-expanded:bg-transparent"
                      aria-label="Bot actions"
                    >
                      <Menu className="size-4" />
                    </MenubarTrigger>
                    <MenubarContent align="end" sideOffset={8}>
                      <MenubarItem onClick={() => setEditOpen(true)}>
                        <Pencil className="size-4" />
                        Edit
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem
                        variant="destructive"
                        onClick={() => handleDeleteBot(activeBot.botId)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>

              <EditBotDrawer
                key={activeBot.botId}
                bot={activeBot}
                open={editOpen}
                onOpenChange={setEditOpen}
                onSave={handleEditBot}
              />
            </div>
          ) : bots.length === 0 ? (
            <CreateBotPopover
              triggerClassName="border border-[#B8D96A]/40 bg-[#B8D96A]/5 text-[#B8D96A] hover:bg-[#B8D96A]/10 hover:border-[#B8D96A]/60"
            />
          ) : (
            <p className="text-sm text-muted-foreground">No bot selected</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="gap-2 rounded-full px-3"
          >
            <ToggleLeft size={16} className="text-[#B8D96A]" />
            Switch Bot
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" showCloseButton>
          <SheetHeader>
            <SheetTitle>Switch Bot Profile</SheetTitle>
            <SheetDescription>
              {"Choose a bot profile to manage."}
            </SheetDescription>
          </SheetHeader>

          <div className="px-4 pt-4">
            <CreateBotPopover
              triggerClassName="w-full justify-center gap-2 rounded-xl border border-dashed border-[#B8D96A]/40 bg-transparent px-4 py-2.5 text-sm font-medium text-[#B8D96A] transition-colors hover:bg-[#B8D96A]/10 hover:border-[#B8D96A]/60"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
            {bots.length === 0 ? (
              <div className="flex flex-1 items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">
                  No bot profiles available.
                </p>
              </div>
            ) : (
              bots.map((bot) => (
                <BotCard
                  key={bot.botId}
                  bot={bot}
                  isActive={bot.botId === activeBotId}
                  onSelect={() => handleSelectBot(bot.botId)}
                />
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
