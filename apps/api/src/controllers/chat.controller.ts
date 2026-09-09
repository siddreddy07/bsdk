import type { Request, Response } from "express";
import { createBSDK } from "@bsdk/server";
import { groq } from "../bsdk/providers.js";
import { knowledgeConfig } from "../bsdk/KnowledgeConfig.js";



const bsdk = createBSDK({
  model: groq("openai/gpt-oss-120b"),
  knowledge:{
    pinecone: knowledgeConfig.pinecone,
    cohere: knowledgeConfig.cohere
  }
});

export async function chat(req: Request, res: Response) {
  const { messages } = req.body;

  console.log('Messages :',messages)
  
  const {botId,description} = req.body

  console.log("BOt :",{botId,description})


  const response = await bsdk.chat(messages,botId.toString(),description);

    res.status(response.status);

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    return res.end();
  }

  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    res.write(Buffer.from(value));
  }

  res.end();
}
