import { type LanguageModel, type UIMessage } from "ai";
import { streamChat } from "./chat/chat.service.js";
import { KnowledgeConfig } from "./services/knowledge/search.js";

export interface BSDKOptions {
  model: LanguageModel;
  knowledge: KnowledgeConfig
}

export function createBSDK({ model,knowledge }: BSDKOptions) {
  return {
  async chat(messages: UIMessage[],botId?:string,description?:string) {
    const result = await streamChat(
      model,
      messages,
      knowledge,
      botId ? botId : undefined,
      description
    );

    return result.toUIMessageStreamResponse();
  },
};
}