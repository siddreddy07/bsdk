import { ObjectId } from "mongodb"
import { db } from "../config/db"
import type { UpdateBotInput } from "../schemas/bot.schema"

const bots = db.collection("bots")

export const getBotsByUser = async (userId: string) => {
  const Allbots = await bots
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray()

  return Allbots

}

export const getBotById = async (botId: string) => {
  return await bots.findOne({ _id: new ObjectId(botId) })
}

export const updateBot = async (botId: string, data: UpdateBotInput) => {
  const result = await bots.findOneAndUpdate(
    { _id: new ObjectId(botId) },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
  return result
}


export const deleteBotById = async (userId: string, botId: string) => {
  return bots.deleteOne({
    _id: new ObjectId(botId),
    userId: new ObjectId(userId),
  })
}

export const createBotService = async(botId:string,name:string,userId:string,description:string,botAvatarUrl:string)=>{

  const bot = {
  _id: new ObjectId(botId),
  name,
  description,
  userId: new ObjectId(userId),
  botAvatarUrl,
  files: [],
}

await bots.insertOne(bot)

return {
  botId: bot._id,
  name: bot.name,
  description: bot.description,
  botAvatarUrl: bot.botAvatarUrl,
}

}
