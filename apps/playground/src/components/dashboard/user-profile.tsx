import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { Trash } from "@/components/animate-ui/icons/trash"
import { LogOut } from "@/components/animate-ui/icons/log-out"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUserStore } from "@/store/user.store"
import { useBotsStore } from "@/store/bots.store"
import { useFilesStore } from "@/store/files.store"
import api from "@/lib/axiosInstace"

const avatarUrl = (name: string) =>
  `https://api.dicebear.com/10.x/initial-face/svg?tags=animation&seed=${encodeURIComponent(
    name.trim() || "BSDK"
  )}`

const setUpValues = (userName?: string) => ({
  name: userName ?? "",
})

const UserProfile = () => {
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()
  const initial = setUpValues(user?.name)

  const [values, setValues] = useState(initial)
  const [avatarName, setAvatarName] = useState(user?.name ?? "")
  const [saving, setSaving] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const updateAvatarPreview = (newName: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setAvatarName(newName)
    }, 400)
  }

  const setField = (key: keyof typeof initial, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setField(name as keyof typeof initial, value)

    if (name === "name") {
      updateAvatarPreview(value)
    }
  }

  const onCancel = () => setValues(initial)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const name = values.name.trim()

    if (!name) {
      toast.error("Name is required.")
      return
    }

    try {
      setSaving(true)

      const avatar = avatarUrl(name)

      const response = await api.patch("/api/auth/me", {
        name,
        avatarUrl: avatar,
      })

      if (response.status === 200 || response.status === 201) {
        const userData = response.data?.user
        useUserStore.getState().setUser(userData)
        setAvatarName(name)
        toast.success("Profile updated successfully.")
      } else {
        toast.error("Failed to update profile. Please try again.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const resetStores = () => {
    useUserStore.getState().clearUser()
    useBotsStore.setState({ bots: [], activeBot: null })
    useFilesStore.setState({ files: [], botId: null })
  }

  const onLogout = async () => {
    try {
      setLoggingOut(true)
      await api.post("/api/auth/logout")
      resetStores()
      toast.success("Logged out successfully.")
      navigate("/")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoggingOut(false)
    }
  }

  const onDeleteAccount = async () => {
    try {
      setDeleting(true)
      await api.delete("/api/auth/account")
      resetStores()
      toast.success("Account deleted successfully.")
      navigate("/")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-2">
      <div>
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">Profile</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, account, and security.
        </p>
      </div>

      <form className="mt-6 flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="mt-1 flex items-center justify-center gap-3 sm:mt-2 md:items-end">
          <img
            src={avatarUrl(avatarName)}
            alt={user?.name ?? "Profile"}
            width={80}
            height={80}
            draggable={false}
            className="size-20 rounded-xl bg-background object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-5 text-center">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Profile details</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Basic information about you or your brand.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-1.5 sm:max-w-sm">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-border pt-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="rounded-full px-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={saving}
            className="rounded-full bg-[#B8D96A] px-6 text-[#0b0d0c] hover:bg-[#c8e88a]"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>

      <div className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Logout</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Sign out of your account on this device.
            </p>
          </div>
          <div>
            <AnimateIcon animateOnHover asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onLogout}
                disabled={loggingOut}
                className="gap-2 rounded-full px-6"
              >
                {loggingOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
                {loggingOut ? "Logging out..." : "Log out"}
              </Button>
            </AnimateIcon>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center sm:p-5">
          <div>
            <h4 className="text-sm font-semibold text-destructive">Danger Zone</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Permanently delete your account, along with all your bots, files, and
              knowledge configuration. This action cannot be undone.
            </p>
          </div>
          <div>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <AnimateIcon animateOnHover asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="gap-2 rounded-full px-6"
                    >
                      <Trash size={16} />
                      Delete account
                    </Button>
                  </AnimateIcon>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-5" />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your account, bots, files, and
                    knowledge configuration will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={onDeleteAccount}>
                    {deleting && <Loader2 className="size-4 animate-spin" />}
                    {deleting ? "Deleting..." : "Delete account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile