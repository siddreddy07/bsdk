import { create } from "zustand"
import api from "@/lib/axiosInstace"

export type KnowledgeConfig = {
  configured: boolean
  cohereConfigured: boolean
  pineconeConfigured: boolean
  pineconeIndexHost: string | null
}

type KnowledgeStore = {
  config: KnowledgeConfig | null
  fetchConfig: () => Promise<void>
}

export const useKnowledgeStore = create<KnowledgeStore>((set) => ({
  config: null,
  fetchConfig: async () => {
    try {
      const { data } = await api.get("/api/knowledge/get-config")
      set({ config: data })
    } catch {
      set({ config: null })
    }
  },
}))