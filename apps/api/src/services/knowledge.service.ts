import { ObjectId } from "mongodb"
import { db } from "../config/db"
import { decrypt, encrypt } from "../utils/encryption"




export const knowledgeService = async(
    cohereApiKey?:string,
    pineconeApiKey?:string,
    pineconeIndexHost?:string,
userId?:string
)=>{

const updateFields: Record<string, any> = {
  updatedAt: new Date(),
};

if (cohereApiKey !== undefined) {
  updateFields.cohereApiKey = encrypt(cohereApiKey);
}

if (pineconeApiKey !== undefined) {
  updateFields.pineconeApiKey = encrypt(pineconeApiKey);
}

if (pineconeIndexHost !== undefined) {
  updateFields.pineconeIndexHost = pineconeIndexHost;
}

const knowledgeConfig = await db.collection("knowledgeConfigs").updateOne(
    { userId: new ObjectId(userId) },
    {
      $set: updateFields,
      $setOnInsert: {
        userId : new ObjectId(userId),
        createdAt: new Date(),
      },
    },
    { upsert: true }
  )

return knowledgeConfig

}


export const getKnowledgeConfig = async (userId: string) => {
  const config = await db
    .collection("knowledgeConfigs")
    .findOne({ userId: new ObjectId(userId) })

  if (!config) {
    throw new Error("Knowledge config not found")
  }

  return {
    cohereApiKey: decrypt(config.cohereApiKey),
    pineconeApiKey: decrypt(config.pineconeApiKey),
    pineconeIndexHost: config.pineconeIndexHost,
  }
}