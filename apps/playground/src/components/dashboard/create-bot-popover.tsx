import {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { Loader2, Lock, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { ObjectId } from "bson"
import { useNavigate, useLocation } from "react-router-dom"
import api from "@/lib/axiosInstace"
import { useBotsStore, type Bot } from "@/store/bots.store"

const avatarUrl = (name: string) =>
  `https://api.dicebear.com/10.x/clay/svg?tags=animation&seed=${encodeURIComponent(
    name.trim() || "BSDK"
  )}`

type CreateBotPopoverProps = {
  triggerClassName?: string
}

const CreateBotPopover = ({ triggerClassName }: CreateBotPopoverProps) => {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [errors, setErrors] = useState<{ name?: string }>({})
  const [avatarName, setAvatarName] = useState("")

  const navigate = useNavigate()
  const location = useLocation()

  const MAX_BOTS = 2

  const bots = useBotsStore((state) => state.bots)
  const atLimit = bots.length >= MAX_BOTS

  // "Throttle" for the avatar preview:
  // we don't want to generate a new avatar URL on every single keystroke,
  // so we wait until the user stops typing for 400ms, then update once.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clean up the timer if the component unmounts.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const updateAvatarPreview = (newName: string) => {
    // the user is still typing, so cancel the last scheduled update
    if (timerRef.current) clearTimeout(timerRef.current)

    // schedule the update to happen 400ms after the last keystroke
    timerRef.current = setTimeout(() => {
      setAvatarName(newName)
    }, 400)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "name") {
      updateAvatarPreview(value)
      setErrors((prev) => ({
        ...prev,
        name: value.trim() ? "" : prev.name,
      }))
    }
  }

  const handleDiscard = () => {
    setFormData({ name: "", description: "" })
    setAvatarName("")
    setErrors({})
    setOpen(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (atLimit) {
      toast.error("Maximum of 2 bots reached")
      return
    }

    const name = formData.name.trim()
    if (!name) {
      setErrors({ name: "Bot name is required." })
      return
    }

    setSaving(true)

    try {
      const response = await api.post("/api/bots/create-bot", {
        botId: new ObjectId(),
        name,
        description: formData.description.trim(),
        botAvatarUrl: avatarUrl(name),
      })

      if (response.status === 201 || response.status === 200) {
        const result = response.data?.bot
        const newBot: Bot = {
          botId: result?.botId,
          name,
          avatarUrl: avatarUrl(name),
          description: formData.description.trim(),
          files: [],
        }
        useBotsStore.getState().addBot(newBot)
        toast.success("Bot created successfully.")
        handleDiscard()
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("botId", newBot.botId)
        navigate(`${location.pathname}?${searchParams.toString()}`)
      } else {
        toast.error("Failed to create bot. Please try again.")
      }
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Failed to create bot"
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Popover open={atLimit ? false : open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={atLimit}
            aria-label={
              atLimit ? "Maximum of 2 bots reached" : undefined
            }
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full bg-[#B8D96A] px-4 py-2 text-sm font-medium text-[#0b0d0c] transition-colors hover:bg-[#c8e88a] disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none",
              triggerClassName
            )}
          >
            {atLimit ? (
              <Lock className="size-4" />
            ) : (
              <Plus className="size-4" />
            )}
            Add Bot
          </button>
        }
      />
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-[calc(100vw-2rem)] max-w-sm"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold">Create a new bot</p>
            <p className="text-sm text-muted-foreground">
              Set up a bot profile to get started.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={avatarUrl(avatarName)}
              alt="Bot avatar preview"
              width={72}
              height={72}
              draggable={false}
              className="size-18 rounded-full bg-background object-cover ring-2 ring-[#B8D96A]/40 transition-opacity duration-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="create-bot-name" className="text-sm font-medium">
              Bot name
            </Label>
            <Input
              id="create-bot-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Support Agent"
              autoComplete="off"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="create-bot-description"
              className="text-sm font-medium"
            >
              AI Description
            </Label>
            <Textarea
              id="create-bot-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what this bot does."
              rows={4}
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleDiscard}
              disabled={saving}
            >
              Discard
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#B8D96A] text-[#0b0d0c] hover:bg-[#c8e88a]"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default CreateBotPopover