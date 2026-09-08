import { create } from "zustand"

import api from "@/lib/axiosInstace"

export type BotFile = {
  id: string
  name: string
}

export type Bot = {
  botId: string
  name: string
  avatarUrl: string
  description: string
  files: BotFile[]
}

type StoresBotDocument = {
  _id: string
  name: string
  description?: string
  botAvatarUrl?: string
  files?: BotFile[]
}

const fallbackAvatarUrl = (name: string) =>
  `https://api.dicebear.com/10.x/clay/svg?tags=animation&seed=${encodeURIComponent(
    name.trim() || "BSDK"
  )}`

const mapBotDocument = (doc: StoresBotDocument): Bot => ({
  botId: doc._id,
  name: doc.name,
  avatarUrl: doc.botAvatarUrl || fallbackAvatarUrl(doc.name),
  description: doc.description || "",
  files: doc.files || [],
})

type BotsStore = {
  bots: Bot[]
  activeBot: Bot | null
  loading: boolean
  error: string | null
  setBots: (bots: Bot[]) => void
  setActiveBot: (bot: Bot | null) => void
  addBot: (bot: Bot) => void
  updateBot: (bot: Bot) => void
  removeBot: (botId: string) => void
  fetchBots: () => Promise<void>
}

export const useBotsStore = create<BotsStore>((set) => ({
  bots: [],
  activeBot: null,
  loading: false,
  error: null,

  setBots: (bots) => set({ bots }),

  setActiveBot: (bot) => set({ activeBot: bot }),

  addBot: (bot) => set((state) => ({ bots: [bot, ...state.bots] })),

  updateBot: (bot) =>
    set((state) => ({
      bots: state.bots.map((b) => (b.botId === bot.botId ? bot : b)),
    })),

  removeBot: (botId) =>
    set((state) => ({
      bots: state.bots.filter((b) => b.botId !== botId),
    })),

  fetchBots: async () => {
    set({ loading: true, error: null })

    try {
      const response = await api.get("/api/bots")

    const documents: StoresBotDocument[] =
      response.data?.bots || []

      set({ bots: documents.map(mapBotDocument), loading: false })
    } catch (error) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Failed to fetch bots"
      set({ loading: false, error: message })
    }
  },
}))