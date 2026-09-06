import {embedQuery, type CohereConfig} from "./embeddings.js"
import {createKnowledgeIndex, type PineconeConfig} from "../pinecone.service.js"


interface SearchKnowledgeOptions {
  query: string;
  namespace: string;

  pinecone: PineconeConfig;
  cohere: CohereConfig;

  topK?: number;
}

export interface KnowledgeConfig {
  pinecone: PineconeConfig;
  cohere: CohereConfig;
}

export async function searchKnowledge({ 
query,
namespace,
pinecone,
cohere,
topK = 5,
} : SearchKnowledgeOptions) {

    const embeddings = await embedQuery(query,cohere)

    const index = await createKnowledgeIndex(pinecone)

    const scopedIndex = index.namespace(`bot_${namespace}`)

    const result = await scopedIndex.query({
        vector: embeddings,
        topK,
        includeMetadata:true
    })
  return result.matches  
}