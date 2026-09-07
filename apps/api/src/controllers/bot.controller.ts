import { Request, Response } from "express"
import { getBotsByUser, getBotById, updateBot, createBotService, deleteBotById } from "../services/bot.service"
import { deleteFilesByUserAndBot } from "../services/file.service"
import { createBotSchema, updateBotSchema } from "../schemas/bot.schema"
import { idempotencyKeys } from "@trigger.dev/sdk"

export const getBots = async (req: Request, res: Response) => {
  try {
        

    const userId = req.user!.userId


    const bots = await getBotsByUser(userId)
    return res.json({ bots })
  } catch (error) {
    console.error("Error fetching bots:", error)
    return res.status(500).json({ error: "Failed to fetch bots" })
  }
}

export const getBot = async (req: Request, res: Response) => {
  try {
    const botId = req.params.botId as string
    const bot = await getBotById(botId)
    
    if (!bot) {
      return res.status(404).json({ error: "Bot not found" })
    }

    return res.json({ bot })
  } catch (error) {
    console.error("Error fetching bot:", error)
    return res.status(500).json({ error: "Failed to fetch bot" })
  }
}

export const patchBot = async (req: Request, res: Response) => {
  try {
    const  botId = req.params.botId as string
    const data = updateBotSchema.parse(req.body)
    const bot = await updateBot(botId, data)

    if (!bot) {
      return res.status(404).json({ error: "Bot not found" })
    }

    return res.json({ bot })
  } catch (error) {
    console.error("Error updating bot:", error)
    return res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update bot" })
  }
}


export const deleteBot = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const botId = req.params.botId as string

    if (!userId || !botId) {
      return res.status(400).json({ error: "userId and botId are required" })
    }

    await deleteFilesByUserAndBot(userId, botId)

    const result = await deleteBotById(userId, botId)

    if (!result.deletedCount) {
      return res.status(404).json({ error: "Bot not found" })
    }

    return res.json({ message: "Bot deleted successfully" })
  } catch (error) {
    console.error("Error deleting bot:", error)
    return res.status(500).json({ error: "Failed to delete bot" })
  }
}


export const createBot = async(req:Request,res:Response)=>{

  try {

      const data = createBotSchema.safeParse({
        ...req.body,
        userId: req.user!.userId,
      })
    
        if (!data.success) {
          return res.status(400).json({
            error: data.error.issues[0]?.message,
          })
        }

        const userId = req.user!.userId

        const {botId,name,description,botAvatarUrl} = req.body

        const result =  await createBotService(botId,name,userId,description,botAvatarUrl)
        return res.status(201).json({bot:result})

  } catch (error) {
    console.error("Error while creating Bot :",error)
    return res.status(400).json({success:false,error: error instanceof Error ? error.message : "Failed to update bot" })
  }

}