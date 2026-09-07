import { z } from "zod"

export const apiKeyTypeSchema = z.enum([
  "vectordb",
  "db",
  "cohere",
  "llamaindex",
])

export const UserApiConfig = z.enum([
  "byoc",
  "bsdk",
])

export const keyValueSchema = z.object({
  key: z.string().min(1, "Key name is required"),
  value: z.string().min(1, "Key value is required"),
})

export const apiKeyEntrySchema = z.object({
  type: apiKeyTypeSchema,
  values: z.array(keyValueSchema).min(1, "At least one key-value pair is required"),
})

export const createApiKeySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  botId: z.string().min(1, "Bot ID is required"),
  keys: z.array(apiKeyEntrySchema),
  type: UserApiConfig,
})

export const updateApiKeySchema = z.object({
  keys: z.array(apiKeyEntrySchema).optional(),
})

export type ApiKeyType = z.infer<typeof apiKeyTypeSchema>
export type KeyValue = z.infer<typeof keyValueSchema>
export type ApiKeyEntry = z.infer<typeof apiKeyEntrySchema>
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>
export type UpdateApiKeyInput = z.infer<typeof updateApiKeySchema>
