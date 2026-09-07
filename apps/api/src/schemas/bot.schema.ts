import { ObjectId } from "mongodb"
import { z } from "zod"

export const botStatusSchema = z.enum([
  "active",
  "paused",
])

export const createBotSchema = z.object({
  botId:z.string().refine((value) => ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
  name: z.string().min(1, "Bot name is required").max(100),
  description: z.string().max(500).optional(),
  userId: z.string().min(1, "User ID is required"),
  status: botStatusSchema.default("active"),
  botAvatarUrl: z.string().url().optional(),
  files: z.array(z.object({
    id:z.string(),
    fileName:z.string(),
  })).default([]),
})

export const updateBotSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  status: botStatusSchema.optional(),
  botAvatarUrl: z.string().url().optional(),
  files: z.array(z.string()).optional(),
})

export type BotStatus = z.infer<typeof botStatusSchema>
export type CreateBotInput = z.infer<typeof createBotSchema>
export type UpdateBotInput = z.infer<typeof updateBotSchema>
