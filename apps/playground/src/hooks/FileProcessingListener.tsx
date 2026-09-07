import { useEffect } from "react"
import { useRealtimeBatch } from "@trigger.dev/react-hooks"
import { useFilesStore } from "@/store/files.store"


type Props = {
  batchId: string
  accessToken: string
}

const FileProcessingListener = ({
  batchId,
  accessToken,
}: Props) => {
  const { runs, error } = useRealtimeBatch(batchId, {
    accessToken,
  })

  const updateFileStatus = useFilesStore(
    (state) => state.updateFileStatus
  )

  useEffect(() => {
    runs.forEach((run) => {
      const fileId = run.payload?.documentId
      const stage = run.metadata?.stage

if (
  typeof fileId !== "string" ||
  typeof stage !== "string"
) {
  return
}

      updateFileStatus(fileId, stage)
    })
  }, [runs, updateFileStatus])

  if (error) {
    console.error("Realtime error:", error)
  }

  return null
}

export default FileProcessingListener