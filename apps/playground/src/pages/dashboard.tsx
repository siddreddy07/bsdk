import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SectionContainer from "@/components/dashboard/section-container"
import BotConfiguration from "@/components/dashboard/bot-configuration"
import Stats from "@/components/dashboard/stats"
import UserProfile from "@/components/dashboard/user-profile"
import SwitchBotDrawer from "@/components/dashboard/switch-bot-drawer"
import { Hammer } from "@/components/animate-ui/icons/hammer"
import { ChartSpline } from "@/components/animate-ui/icons/chart-spline"
import { User } from "@/components/animate-ui/icons/user"
import { useUserStore } from "@/store/user.store"

const VALID_TABS = ["configuration", "stats", "user-profile"] as const
type TabValue = (typeof VALID_TABS)[number]

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState<TabValue>(
    VALID_TABS.includes(initialTab as TabValue)
      ? (initialTab as TabValue)
      : "configuration"
  )
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  const user = useUserStore((s)=> s.user)

  const handleTabChange = (value: string) => {
    const tab = value as TabValue
    setActiveTab(tab)
    setSearchParams((prev) => {
      prev.set("tab", tab)
      return prev
    }, { replace: true })
  }

  return (
    <div className="flex min-h-screen rounded-full w-full flex-col items-center p-4 pt-24 sm:p-6 sm:pt-24">
      <div className="flex w-full max-w-5xl flex-col gap-4">
      <SwitchBotDrawer />
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full items-center">
        <TabsList className="mx-auto">
          <TabsTrigger
            value="configuration"
            onMouseEnter={() => setHoveredTab("configuration")}
            onMouseLeave={() => setHoveredTab(null)}
            className="group data-active:bg-[#B8D96A] data-active:text-[#0b0d0c]"
          >
            <span className="flex items-center gap-1.5">
              <Hammer
                size={16}
                animate={hoveredTab === "configuration"}
                className="text-[#B8D96A] group-data-active:text-white"
              />
              Configure
            </span>
          </TabsTrigger>
          {
            user?.role === 'admin'  && 
          <TabsTrigger
            value="stats"
            onMouseEnter={() => setHoveredTab("stats")}
            onMouseLeave={() => setHoveredTab(null)}
            className="group data-active:bg-[#B8D96A] data-active:text-[#0b0d0c]"
          >
            <span className="flex items-center gap-1.5">
              <ChartSpline
                size={16}
                animate={hoveredTab === "stats"}
                className="text-[#B8D96A] group-data-active:text-white"
              />
              Stats
            </span>
          </TabsTrigger>
          }
          <TabsTrigger
            value="user-profile"
            onMouseEnter={() => setHoveredTab("user-profile")}
            onMouseLeave={() => setHoveredTab(null)}
            className="group data-active:bg-[#B8D96A] data-active:text-[#0b0d0c]"
          >
            <span className="flex items-center gap-1.5">
              <User
                size={16}
                animate={hoveredTab === "user-profile"}
                className="text-[#B8D96A] group-data-active:text-white"
              />
              Profile
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="w-full flex items-center justify-center">
          <SectionContainer>
            <BotConfiguration />
          </SectionContainer>
        </TabsContent>

        <TabsContent value="stats" className="w-full flex items-center justify-center">
          <SectionContainer>
            <Stats />
          </SectionContainer>
        </TabsContent>

        <TabsContent value="user-profile" className="w-full flex items-center justify-center">
          <SectionContainer>
            <UserProfile />
          </SectionContainer>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}

export default Dashboard
