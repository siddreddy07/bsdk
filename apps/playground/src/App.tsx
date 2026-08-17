import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "./components/theme-provider"
import { Button } from "./components/ui/button"

import {BSDKChat} from "@bsdk/ui"


const App = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        setTheme(theme === "dark" ? "light" : "dark")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [theme, setTheme])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4">

      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>

      <BSDKChat/>

    </div>
  )
}

export default App
