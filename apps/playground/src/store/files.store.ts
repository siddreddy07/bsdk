import { create } from "zustand"
import api from "@/lib/axiosInstace"

export type KnowledgeFile = {
  fileId: string
  originalName: string
  url: string
  uploadStatus:string
  vectorStatus: string
}

type FilesStore = {
  files: KnowledgeFile[]
  loading: boolean
  botId: string | null
  fetchFiles: (botId: string) => Promise<void>
  addFiles: (files: KnowledgeFile[]) => void
  removeFile: (fileId: string) => void
  clearFiles: () => void
  updateFileStatus: (
  fileId: string,
  vectorStatus: string
) => void
}

export const useFilesStore = create<FilesStore>((set,get) => ({
  files: [],
  loading: false,
  botId:null,

  fetchFiles: async (botId) => {

    if(get().botId === botId) return

    set({ loading: true })

    try {
      const { data } = await api.get(`/api/files/${botId}`)

      set({
        files: data.files,
        botId,
      })
    } finally {
      set({ loading: false })
    }
  },

  addFiles: (newFiles) =>
    set((state) => ({
      files: [...newFiles, ...state.files],
    })),

  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter(
        (file) => file.fileId !== fileId
      ),
    })),

  clearFiles: () => set({ files: [] }),

    updateFileStatus: (fileId, status) =>
  set((state) => ({
    files: state.files.map((file) =>
      file.fileId === fileId
        ? { ...file, vectorStatus:status }
        : file
    ),
  })),
}))