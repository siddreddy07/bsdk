import { CohereClientV2 } from "cohere-ai"
import { DocumentChunk } from "./document-chunker.service"
import type { DocumentPage } from "./document-parser.service"

export type EmbeddedPage = DocumentPage & {
  id: string
  values: number[]
}

export type EmbeddedChunk = DocumentChunk & {
  id: string
  values: number[]
}

export async function createFileEmbeddings(
  cohere: CohereClientV2,
  fileId: string,
  chunks: DocumentChunk[]
): Promise<EmbeddedChunk[]> {
  const response = await cohere.embed({
    model: "embed-english-v3.0",
    texts: chunks.map((chunk) => chunk.pageContent),
    inputType: "search_document",
    embeddingTypes: ["float"],
    outputDimension: 1024,
  })

  const embeddings = response.embeddings.float

  if (!embeddings || embeddings.length !== chunks.length) {
    throw new Error("Failed to generate embeddings")
  }

    return chunks.map((chunk, index) => ({
    id: `${fileId}-page-${chunk.pageNumber}-chunk-${chunk.chunkIndex}`,
    pageContent: chunk.pageContent,
    pageNumber: chunk.pageNumber,
    chunkIndex: chunk.chunkIndex,
    values: embeddings[index],
  }))
}



// export async function createQueryEmbedding(question: string) {
//   const response = await cohere.embed({
//     model: "embed-english-v3.0",
//     texts: [question],
//     inputType: "search_query",
//     embeddingTypes: ["float"],
//   })

//   const embedding = response.embeddings.float?.[0]

//   if (!embedding) {
//     throw new Error("Query embedding failed")
//   }

//   return embedding
// }