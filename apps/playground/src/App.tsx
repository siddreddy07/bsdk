import { Routes, Route, useSearchParams, useNavigate, useLocation } from "react-router-dom"

import Navbar from "./components/navbar"
import Footer from "./components/footer"
import ScrollToTop from "./components/scroll-to-top"
import Home from "./pages/home"
import About from "./pages/about"
import Help from "./pages/help"
import Dashboard from "./pages/dashboard"
import Docs from "./pages/docs"
import Installation from "./pages/docs/installation"
import BasicSetup from "./pages/docs/basic-setup"
import BsdkUi from "./pages/docs/bsdk-ui"
import BsdkServer from "./pages/docs/bsdk-server"
import KnowledgeSetup from "./pages/docs/knowledge-setup"
import Providers from "./pages/docs/providers"
import EnvironmentVariables from "./pages/docs/environment-variables"
import { BSDKChat } from "@bsdk/ui"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as ShadcnToaster } from "@/components/ui/toast"
import { useUserStore } from "./store/user.store"
import { useBotsStore } from "./store/bots.store"
import api from "./lib/axiosInstace"
import { bsdkConfig } from "./config/bsdk.config"

const App = () => {

      const [searchParams, setSearchParams] = useSearchParams()

      const activeBot = useBotsStore((state) => state.activeBot)
      const setActiveBot = useBotsStore((s)=>s.setActiveBot)
      const bots = useBotsStore.getState().bots
      console.log('bots : ',bots)

      const navigate = useNavigate()

const location = useLocation()


      const chatConfig = {
  ...bsdkConfig,
  botId: activeBot?.botId ?? "",
  botDescription: activeBot
    ? `Name: ${activeBot.name}\nDescription: ${activeBot.description}`
    : "",
}


console.log('Config :',chatConfig)

useEffect(() => {
  const getUser = async () => {
    try {
      const response = await api.get("/api/auth/me")
      useUserStore.getState().setUser(response.data.user)
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  const getBots = async () => {
    try {

      await useBotsStore.getState().fetchBots()


      const bots = useBotsStore.getState().bots


      if (bots.length === 0) {
        return null
      }

      const botId = searchParams.get("botId")

      const selectedBot =
        bots.find((bot) => bot.botId === botId) ?? bots[0]


      setActiveBot(selectedBot)

      return selectedBot
    } catch (error) {
      console.error("Error fetching bots:", error)
      return null
    }
  }

  const initializeApp = async () => {

    const [, bot] = await Promise.all([
      getUser(),
      getBots(),
    ])


    if (!bot) return

    if (location.pathname === "/") {
      const params = new URLSearchParams()

      params.set("botId", bot.botId)
      params.set("tab", "configuration")
      params.set("step", "0")

      navigate(`/dashboard?${params.toString()}`, {
        replace: true,
      })

      return
    }

    if (location.pathname === "/dashboard") {
      const params = new URLSearchParams(searchParams)

      if (!params.get("botId")) {
        params.set("botId", bot.botId)
      }

      if (!params.get("tab")) {
        params.set("tab", "configuration")
      }

      if (
        params.get("tab") === "configuration" &&
        !params.get("step")
      ) {
        params.set("step", "0")
      }

      setSearchParams(params, {
        replace: true,
      })
    }
  }

  initializeApp()
}, [location.pathname])

  console.log('BOt :',activeBot)


  return (
    <div className="h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/installation" element={<Installation />} />
          <Route path="/docs/basic-setup" element={<BasicSetup />} />
          <Route path="/docs/bsdk-ui" element={<BsdkUi />} />
          <Route path="/docs/bsdk-server" element={<BsdkServer />} />
          <Route path="/docs/knowledge-setup" element={<KnowledgeSetup />} />
          <Route path="/docs/providers" element={<Providers />} />
          <Route path="/docs/environment-variables" element={<EnvironmentVariables />} />
        </Routes>
      </main>
      <Footer />
      <div className="sticky bottom-5 right-5 z-50">
      <BSDKChat config={chatConfig} position="bottom-right" />
      </div>
      <Toaster position="top-center"/>
      <ShadcnToaster />
    </div>
  )
}

export default App