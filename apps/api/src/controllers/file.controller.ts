
import type { Request, Response } from "express"
import { filesSchema, VectorStatus } from "../schemas/file.schema"
import {
  saveFiles,
  getFilesByUserAndBot,
  deleteFile as deleteFileRecord,
  deleteFilesByUserAndBot,
} from "../services/file.service"
import { processDocument } from "../trigger/process-document"
import { ObjectId } from "mongodb"
import { db } from "../config/db"
import { auth } from "@trigger.dev/sdk"

export const getFiles = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId

    const {botId} = req.params

    if (!userId || !botId) {
      return res.status(400).json({ error: "userId and botId are required" })
    }

    const files = await getFilesByUserAndBot(userId as string, botId as string)
    return res.json({ files })
  } catch (error) {
    console.error("Error fetching files:", error)
    return res.status(500).json({ error: "Failed to fetch files" })
  }
}

export const createFiles = async (
  request: Request,
  response: Response
) => {
  try {
const data = filesSchema.safeParse(request.body);

if (!data.success) {
  return response.status(400).json({
    error: data.error.issues[0]?.message,
  });
}

const { files } = data.data;
const { botId } = request.body;

    const userId = request.user?.userId || '1234'

    const savedFiles = await saveFiles(userId,botId, files)

    const batch = await processDocument.batchTrigger(
      savedFiles.map((file) => ({
        payload: {
          userId,
          documentId: file.fileId.toString(),
          botId: botId || '5678',
          assetId: file.fileId.toString(),
          fileUrl: file.url,
        }
      }))
    )

    const accessToken = await auth.createPublicToken({
  scopes: {
    read: {
      batch: [batch.batchId],
    },
  },
  expirationTime: "1h",
})

    console.log(`Triggered processDocument for ${savedFiles.length} files for user ${userId}`)

    return response.status(201).json({
      message: "Files saved successfully",
      files: savedFiles,
      realtime:{
        batchId:batch.batchId,
        accessToken
      }
    })
  } catch (error) {
    console.error(`Error creating files for user ${request.user?.userId}:`, error)
    return response.status(400).json({
      message: error instanceof Error ? error.message : "An error occurred",
    })
  }
}



export const deleteFile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const fileId = req.params.fileId as string

    if (!userId || !fileId) {
      return res.status(400).json({ error: "userId and fileId are required" })
    }


    const result = await deleteFileRecord(userId, fileId)

    if (!result.deletedCount) {
      return res.status(404).json({ error: "File not found" })
    }

    return res.json({ message: "File deleted successfully" })
  } catch (error) {
    console.error("Error deleting file:", error)
    return res.status(500).json({ error: "Failed to delete file" })
  }
}

export const deleteAllFiles = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId
    const botId = req.params.botId as string

    if (!userId || !botId) {
      return res.status(400).json({ error: "userId and botId are required" })
    }

    const result = await deleteFilesByUserAndBot(userId, botId)

    return res.json({
      message: "Files deleted successfully",
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Error deleting files:", error)
    return res.status(500).json({ error: "Failed to delete files" })
  }
}

export const updateFileVectorStatus = async (documentId: string, status: VectorStatus) => {
  try {

     const result = await db.collection("files").updateOne(
    { _id: new ObjectId(documentId) },
    {
      $set: {
        vectorStatus: status,
        updatedAt: new Date(),
      },
    }
  )

  console.log({
    documentId,
    matched: result.matchedCount,
    modified: result.modifiedCount,
  })

  } catch (error) {
    console.error(`Error updating file status for file ${documentId}:`, error)
    throw new Error(`Failed to update file status for file ${documentId}`)
  }
}
