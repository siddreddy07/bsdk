// packages/server/src/knowledge/embeddings.ts

import { CohereClient } from "cohere-ai";

export interface CohereConfig {
  apiKey: string;
}

export async function embedQuery(
  query: string,
  config: CohereConfig
) {
  const cohere = new CohereClient({
    token: config.apiKey,
  });

  const response = await cohere.v2.embed({
    texts: [query],
    model: "embed-english-v3.0",
    inputType: "search_query",
    embeddingTypes: ["float"],
    outputDimension: 1024,
  });

  const embedding = response.embeddings.float?.[0];

  if (!embedding) {
    throw new Error("Failed to generate query embedding");
  }

  return embedding;
}