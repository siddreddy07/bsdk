import { useState, type ChangeEvent, type FormEvent } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { LayoutDashboard, Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"

import BsdkLogo from "./bsdk-logo"
import { AnimateIcon } from "./animate-ui/icons/icon"
import { LogIn } from "./animate-ui/icons/log-in"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { useUserStore } from "@/store/user.store"
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "@/lib/axiosInstace"
import { toast } from "sonner"
import { LoginSchema, SignUpSchema } from "@/schemas/auth.schema"
import { useBotsStore } from "@/store/bots.store"
import { useFilesStore } from "@/store/files.store"

type AuthMode = "signup" | "login"

type AuthPopoverProps = {
  triggerClassName?: string
  showAvatar?: boolean
}

const avatarUrl = (name: string) =>
  `https://api.dicebear.com/10.x/initial-face/svg?tags=animation&seed=${encodeURIComponent(
    name.trim() || "BSDK"
  )}`

const AuthPopover = ({ triggerClassName, showAvatar = true }: AuthPopoverProps) => {
  const [mode, setMode] = useState<AuthMode>("signup")
  const [triggerHovered, setTriggerHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const isSignUp = mode === "signup"

  const [loading, setLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const user = useUserStore((state) => state.user)

  const navigate = useNavigate()
  const location = useLocation()

  const isOnDashboard = location.pathname.startsWith("/dashboard")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<{
  name?: string  
  email?: string
  password?: string
}>({})

    const authSchema = isSignUp ? SignUpSchema : LoginSchema

    const activeBot = useBotsStore((state) => state.activeBot)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

      const updatedFormData = {
    ...formData,
    [name]: value,
  }
    
    setFormData(updatedFormData)



    const result = authSchema.safeParse(updatedFormData)

    const fieldErrors = result.success
    ? {}
    : result.error.flatten().fieldErrors

    setErrors((prev)=>({
      ...prev,
      [name]: fieldErrors[name as keyof typeof fieldErrors]?.[0] || "",
    }))

  }

  const resetStores = () => {
    useUserStore.getState().clearUser()
    useBotsStore.setState({ bots: [], activeBot: null })
    useFilesStore.setState({ files: [], botId: null })
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await api.post("/api/auth/logout")
      resetStores()
      toast.success("Logged out successfully.")
      setOpen(false)
      navigate("/")
    } catch {
      toast.error("Something went wrong. Please try again.")
      setOpen(false)
    } finally {
      setLoggingOut(false)
    }
  }

  const isFormValid = authSchema.safeParse(formData).success

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('FormData :',formData)

    const { name, email, password } = formData

    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill in all fields.")
      return
    }

    try {

      setLoading(true)

      const avatar = isSignUp ? avatarUrl(name) : undefined

      const response = await api.post(isSignUp ? "api/auth/register" : "api/auth/login", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        avatarUrl: avatar,
      })

      if (response.status === 200 || response.status === 201) {
         const userData = response.data.user

  useUserStore.getState().setUser(userData)

  await useBotsStore.getState().fetchBots()

  const bots = useBotsStore.getState().bots

        toast.success("Authentication successful.")
        setOpen(false)
        setFormData({
          name: "",
          email: "",
          password: "",
        })

        if (bots.length > 0) {
    const params = new URLSearchParams()

    params.set("botId", bots[0].botId)
    params.set("tab", "configuration")
    params.set("step", "0")

    navigate(`/dashboard?${params.toString()}`, {
      replace: true,
    })
  }

      } else {
        console.error('Unexpected response:', response)
        toast.error("Authentication failed. Please check your credentials and try again.")
      }

    } catch (error:any) {
     const message =
  error.response?.data?.error || "Something went wrong"

toast.error(message)
    }finally {
      setLoading(false)
    }

  }


  if (user && !showAvatar && !isOnDashboard) {
    return (
      <Link
        to={`/dashboard?step=0&tab=configuration&botId=${activeBot?.botId}`}
        onMouseEnter={() => setTriggerHovered(true)}
        onMouseLeave={() => setTriggerHovered(false)}
        className={buttonVariants({
          variant: "default",
          className: cn("rounded-full px-4 gap-2 no-underline", triggerClassName),
        })}
      >
        <AnimateIcon animate={triggerHovered}>
          <LogIn size={18} />
        </AnimateIcon>
        Go to Dashboard
      </Link>
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        onMouseEnter={() => setTriggerHovered(true)}
        onMouseLeave={() => setTriggerHovered(false)}
        className={triggerClassName}
      >
        {user && showAvatar ? (
          <span className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-300">
            <img
              src={avatarUrl(user?.name)}
              alt={user?.name}
              width={32}
              height={32}
              draggable={false}
              className="h-8 w-8 rounded-full ring-2 ring-[#B8D96A]/70"
            />
          </span>
        ) : (
          <span
            className={buttonVariants({
              variant: "default",
              className: cn("rounded-full px-4 gap-2", triggerClassName),
            })}
          >
            <AnimateIcon animate={triggerHovered}>
              <LogIn size={18} />
            </AnimateIcon>
            Get Started
          </span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-[44rem] max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2 grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d0c] text-white shadow-2xl outline-none md:grid-cols-[16rem_1fr] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
          <Dialog.Close
            className="absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full text-white/50 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </Dialog.Close>

          <div className="relative hidden min-h-[24rem] overflow-hidden md:block">
            {user ? (
              <img
                src="https://i.pinimg.com/1200x/92/a4/7d/92a47d67b8dea2e448cef95c0fed3623.jpg"
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <img
                  src={isSignUp ? "/signup.png" : "/login.png"}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/15 to-transparent p-7">
                  <p className="relative max-w-[13rem] text-2xl leading-snug font-semibold">
                    Build AI features without rebuilding the foundation.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex min-h-[24rem] flex-col justify-center gap-5 overflow-y-auto p-6 sm:p-8">
{user && showAvatar ? (
              <>
                <div className="flex flex-col items-center gap-4 text-center">
                  <img
                    src={user?.avatarUrl || avatarUrl(user.name)}
                    alt={user.name}
                    width={96}
                    height={96}
                    draggable={false}
                    className="h-24 w-24 rounded-full ring-2 ring-[#B8D96A]/60"
                  />
                  <div className="flex flex-col gap-1">
                    <Dialog.Title className="text-2xl font-semibold">
                      {user.name}
                    </Dialog.Title>
                    <p className="text-sm text-white/55">
                      You're signed in to BSDK
                    </p>
                  </div>
                </div>


                      <div className="flex flex-col items-center justify-center gap-3">
                {!isOnDashboard && (
                <Link
                  to={`/dashboard?tab=configuration&step=0&botId=${activeBot?.botId}`}
                  onClick={() => setOpen(false)}
                  className={buttonVariants({
                    variant: "default",
                    className: "w-1/2 rounded-full bg-[#B8D96A] text-black hover:bg-[#A8C95D] font-semibold gap-2 no-underline",
                  })}
                >
                  <LayoutDashboard size={18} />
                  Go to Dashboard
                </Link>
                )}

                <Button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-1/2 rounded-full border-white/15 bg-red-600 text-white hover:bg-red-400 hover:border-red-500 hover:text-red-800 font-semibold disabled:cursor-not-allowed disabled:bg-red-600/60"
                >
                  {loggingOut ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {loggingOut ? "Logging out..." : "Log out"}
                </Button>
                      </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                  <BsdkLogo
                    width={36}
                    height={36}
                    className="drop-shadow-[0_2px_8px_rgba(184,217,106,0.35)]"
                  />
                    <p className="font-semibold text-lg">BSDK</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Dialog.Title className="text-2xl font-semibold">
                      {isSignUp ? "Get Started" : "Welcome back"}
                    </Dialog.Title>
                    <p className="text-sm text-white/55">
                      {isSignUp
                        ? "Create your BSDK account"
                        : "Log in to continue with BSDK"}
                    </p>
                  </div>
                </div>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                > 
                {
                    isSignUp && (
                      <div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="auth-name"
                            className="text-sm font-medium text-white/80"
                          >
                            Name
                          </label>
                          <Input
                            id="auth-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            autoComplete="name"
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-white/25 focus-visible:ring-[#B8D96A]/25 dark:bg-white/5"
                          />
                        </div>
                        {errors.name && (
        <p className="text-sm text-red-500">{errors.name}</p>
      )}
                      </div>

                    )
                }

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="auth-email"
                      className="text-sm font-medium text-white/80"
                    >
                      Email
                    </label>
                    <Input
                      id="auth-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-white/25 focus-visible:ring-[#B8D96A]/25 dark:bg-white/5"
                    />
                  </div>
                  {errors.email && (
  <p className="text-sm text-red-500">{errors.email}</p>
)}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="auth-password"
                      className="text-sm font-medium text-white/80"
                    >
                      Password
                    </label>
                    <Input
                      id="auth-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      autoComplete={isSignUp ? "new-password" : "current-password"}
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-white/25 focus-visible:ring-[#B8D96A]/25 dark:bg-white/5"
                    />
                  </div>
                  {errors.password && (
  <p className="text-sm text-red-500">{errors.password}</p>
)}
                  <Button
  type="submit"
  disabled={!isFormValid || loading}
  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#B8D96A] px-4 py-2 font-medium text-black transition-colors hover:bg-[#A8C95D] disabled:cursor-not-allowed disabled:bg-[#B8D96A]/60"
>
  {loading && <Loader2 className="size-4 animate-spin" />}

  {loading
    ? isSignUp
      ? "Signing up..."
      : "Logging in..."
    : isSignUp
      ? "Sign up"
      : "Log in"}
</Button>
                </form>

                <p className="text-center text-sm text-white/50">
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => setMode(isSignUp ? "login" : "signup")}
                    className="font-medium text-[#B8D96A] underline-offset-4 hover:underline"
                  >
                    {isSignUp ? "Log in" : "Sign up"}
                  </button>
                </p>
              </>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AuthPopover