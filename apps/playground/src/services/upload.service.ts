import api from "@/lib/axiosInstace"
import axios from "axios"

type UploadSignature = {
  timestamp: number
  signature: string
  folder: string
  uploadPreset: string
  cloudName: string
  apiKey: string
}

type CloudinaryResult = {
  asset_id: string
  secure_url: string
  public_id: string
  bytes: number
  format: string
}

export type UploadedDocument = {
  assetId: string
  title: string
  originalName: string
  url: string
  publicId: string
  size: number
  format: string
}

export async function uploadPdfs(
  files: File[],
  onProgress?: (fileName: string, percentage: number) => void
): Promise<UploadedDocument[]> {
  if (files.length === 0) {
    throw new Error("Select at least one PDF")
  }

  if (files.length > 4) {
    throw new Error("You can upload a maximum of 4 PDFs")
  }

  for (const file of files) {
    if (file.type !== "application/pdf") {
      throw new Error(`${file.name} is not a PDF`)
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`${file.name} must be 5 MB or smaller`)
    }
  }

  // The same signature can be used because all files
  // use the same signed upload parameters.
  const { data: signedData } = await api.post<UploadSignature>(
    "/api/upload/signature"
  )

  const uploadFile = async (file: File): Promise<UploadedDocument> => {
    const formData = new FormData()

    formData.append("file", file)
    formData.append("api_key", signedData.apiKey)
    formData.append("timestamp", String(signedData.timestamp))
    formData.append("signature", signedData.signature)
    formData.append("folder", signedData.folder)
    formData.append("upload_preset", signedData.uploadPreset)

    const { data } = await axios.post<CloudinaryResult>(
      `https://api.cloudinary.com/v1_1/${signedData.cloudName}/image/upload`,
      formData,
      {
        withCredentials: false,
        onUploadProgress: (event) => {
          if (!event.total) return

          const percentage = Math.round((event.loaded * 100) / event.total)

          onProgress?.(file.name, percentage)
        },
      }
    )

    return {
      assetId: data.asset_id,
      title: file.name.replace(/\.pdf$/i, ""),
      originalName: file.name,
      url: data.secure_url,
      publicId: data.public_id,
      size: data.bytes,
      format: data.format,
    }
  }

  return Promise.all(files.map(uploadFile))
}
