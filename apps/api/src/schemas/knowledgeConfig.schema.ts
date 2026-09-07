import { z } from "zod"

export const knowledgeConfigSchema = z.object({
  userId: z.string(),

  cohereApiKey: z.string().min(1),
  pineconeApiKey: z.string().min(1),
  pineconeIndexHost: z.string().min(1),

  createdAt: z.date(),
  updatedAt: z.date(),
})

export type KnowledgeConfig = z.infer<
  typeof knowledgeConfigSchema
>