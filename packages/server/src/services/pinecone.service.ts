import { Pinecone } from "@pinecone-database/pinecone";

export interface PineconeConfig {
  apiKey: string;
  indexHost: string;
}

export function createKnowledgeIndex(config: PineconeConfig) {
  const pinecone = new Pinecone({
    apiKey: config.apiKey,
  });

  return pinecone.index({
    host: config.indexHost,
  });
}