import { Pinecone } from "@pinecone-database/pinecone"

export function createPineconeIndex(
  apiKey: string,
  indexHost: string
) {
  const pinecone = new Pinecone({
    apiKey,
  })

  return pinecone.index({
    host: indexHost,
  })
}