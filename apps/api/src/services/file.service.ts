// src/services/file.service.ts

import { ObjectId } from "mongodb"
import { db } from "../config/db"
import type { FileInput } from "../schemas/file.schema"
import { getKnowledgeConfig } from "./knowledge.service"
import { createPineconeIndex } from "../config/pinecone.config"
import cloudinary from "../config/cloudinary.config"


export const saveFiles = async (
  userId: string,
  botId:string,
  files: FileInput[]
) => {
  const documents = files.map((file) => ({
    ...file,
    userId : new ObjectId(userId),
    botId: new ObjectId(botId),
    uploadStatus: "uploaded",
    vectorStatus: "triggered",
    createdAt: new Date(),
  }))

  const result = await db
    .collection("files")
    .insertMany(documents)



  return documents.map((document, index) => ({  fileId: result.insertedIds[index],
  originalName: document.originalName,
  url: document.url,
  uploadStatus: document.uploadStatus,
  vectorStatus: document.vectorStatus,
  }))
}

export const getFilesByUserAndBot = async (userId: string, botId: string) => {
  const files = await db
    .collection("files")
    .find(
      { userId: new ObjectId(userId), botId: new ObjectId(botId) },
      {
        projection:{
          _id:1,
          originalName:1,
          url:1,
          vectorStatus:1,
          uploadStatus:1
        }
      }

    )
    .sort({ createdAt: -1 })
    .toArray()

  return files.map((file) => ({
    fileId: file._id.toString(),
    originalName: file.originalName,
    url: file.url,
    uploadStatus: file.uploadStatus,
    vectorStatus: file.vectorStatus,
  }))
}

const deletePineconeVectors = async (
  userId: string,
  botId: string,
  fileId?: string
) => {
  try {
    const config = await getKnowledgeConfig(userId)

    if (!config.pineconeApiKey || !config.pineconeIndexHost) {
      return
    }

    const pineconeIndex = createPineconeIndex(
      config.pineconeApiKey,
      config.pineconeIndexHost
    )

    const namespace = pineconeIndex.namespace(`bot_${botId}`)

    if (fileId) {
      await namespace.deleteMany({ filter: { fileId } })
    } else {
      await namespace.deleteAll()
    }

    console.log(
      `Deleted Pinecone vectors${fileId ? ` for file ${fileId}` : ""} in namespace bot_${botId}`
    )
  } catch (error) {
    console.error(
      `Error deleting Pinecone vectors for bot ${botId}${fileId ? ` file ${fileId}` : ""}:`,
      error
    )
  }
}

export const deleteFile = async (userId: string, fileId: string) => {
  const file = await db
    .collection("files")
    .findOne({
      _id: new ObjectId(fileId),
      userId: new ObjectId(userId),
    })

  if (!file) {
    return { deletedCount: 0 }
  }

  await deletePineconeVectors(userId, file.botId.toString(), fileId)

  if (file.publicId) {
    try {
      await cloudinary.uploader.destroy(file.publicId, { resource_type: "auto" })
    } catch (error) {
      console.error(`Error deleting Cloudinary asset ${file.publicId}:`, error)
    }
  }

  return db
    .collection("files")
    .deleteOne({
      _id: new ObjectId(fileId),
      userId: new ObjectId(userId),
    })
}

export const deleteFilesByUserAndBot = async (
  userId: string,
  botId: string
) => {
  const files = await db
    .collection("files")
    .find({
      userId: new ObjectId(userId),
      botId: new ObjectId(botId),
    })
    .toArray()

  await deletePineconeVectors(userId, botId)

  if (files.length > 0) {
    try {
      await Promise.all(
        files
          .filter((file) => file.publicId)
          .map((file) =>
            cloudinary.uploader.destroy(file.publicId, { resource_type: "auto" })
          )
      )
    } catch (error) {
      console.error(`Error deleting Cloudinary assets for bot ${botId}:`, error)
    }
  }

  return db
    .collection("files")
    .deleteMany({
      userId: new ObjectId(userId),
      botId: new ObjectId(botId),
    })
}