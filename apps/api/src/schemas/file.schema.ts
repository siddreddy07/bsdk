import { z } from "zod"

export const uploadStatusSchema = z.enum([
  "uploaded",
  "failed",
])

export const vectorStatusSchema = z.enum([
  "triggered",
  "completed",
  "failed",
])

export const filesSchema = z.object({
  files: z
    .array(
      z.object({
        assetId: z.string().min(1, "Cloudinary asset ID is required"),
        title: z.string().min(1, "Title is required"),
        originalName: z.string(),
        url: z.string().url(),
        publicId: z.string(),
        size: z.number().max(5 * 1024 * 1024),
      })
    )
    .min(1)
    .max(4),
})

export type FileInput = z.infer<
  typeof filesSchema
>["files"][number]

export type UploadStatus = z.infer<
  typeof uploadStatusSchema
>

export type VectorStatus = z.infer<
  typeof vectorStatusSchema
>