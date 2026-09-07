import { z } from "zod"
import type { Request, Response } from "express"
import { db } from "../config/db"
import { getKnowledgeConfig, knowledgeService } from "../services/knowledge.service"

export const saveKnowledgeConfigSchema = z.object({
  cohereApiKey: z.string().min(1, "Cohere API key is required").optional(),
  pineconeApiKey: z.string().min(1, "Pinecone API key is required").optional(),
  pineconeIndexHost: z.string().min(1, "Pinecone index host is required").optional(),
}).refine(
  (data) => data.cohereApiKey !== undefined || data.pineconeApiKey !== undefined || data.pineconeIndexHost !== undefined,
  { message: "At least one field must be provided" }
)

export type Config = {
  configured: boolean
  cohereConfigured: boolean
  pineconeConfigured: boolean
  pineconeIndexHost: string | null
}

export const saveKnowledgeConfig = async (
  req: Request,
  res: Response
) => {
  const result = saveKnowledgeConfigSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues[0]?.message,
    })
  }

  const userId = req.user!.userId

  const {
    cohereApiKey,
    pineconeApiKey,
    pineconeIndexHost,
  } = result.data


  const upsertKnowledge = await knowledgeService(

    cohereApiKey,
    pineconeApiKey,
    pineconeIndexHost,
userId

  )


  return res.status(200).json({
    success: true,
  })
}


export const fetchKnowledgeConfig = async(
    req:Request,
    res:Response
)=>{

    try {
        
        const userId = req.user!.userId

        const knowledgeconfig = await getKnowledgeConfig(userId)

        const config : Config = {
    configured: Boolean(
      knowledgeconfig.cohereApiKey &&
      knowledgeconfig.pineconeApiKey &&
      knowledgeconfig.pineconeIndexHost
    ),
    cohereConfigured: Boolean(knowledgeconfig.cohereApiKey),
    pineconeConfigured: Boolean(knowledgeconfig.pineconeApiKey),
    pineconeIndexHost: knowledgeconfig.pineconeIndexHost,
  } 
        return res.status(200).json(config)

    } catch (error) {
        console.error('Error inside fetchKnowledgeConfig  :',error)
         return res.status(500).json({
      error: "Failed to fetch knowledge config",
    })
    }

}