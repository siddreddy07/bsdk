import type { Request, Response } from "express"
import cloudinary from "../config/cloudinary.config"

export type UploadedFile = {
  originalname: string
  buffer: Buffer
  size: number
  mimetype: string
}

const uploadBuffer = (file: UploadedFile) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "bsdk/documents",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          return reject(error)
        }

        if (!result) {
          return reject(new Error("PDF upload failed"))
        }

        resolve({
          originalName: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          size: file.size,
          mimeType: file.mimetype,
        })
      }
    )

    uploadStream.end(file.buffer)
  })
}

export const uploadDocuments = async (
  request: Request,
  response: Response
) => {
  try {
    const files = (request as Request & { files?: UploadedFile[] }).files

    if (!files?.length) {
      return response.status(400).json({
        message: "Please upload at least one PDF",
      })
    }

    const documents = await Promise.all(
      files.map((file) => uploadBuffer(file))
    )

    return response.status(201).json({
      message: "PDFs uploaded successfully",
      documents,
    })
  } catch (error) {
    return response.status(500).json({
      message: "Failed to upload PDFs",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}