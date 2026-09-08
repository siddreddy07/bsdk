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

  console.log("BEFORE embedQuery");

    const embeddings = await embedQuery(query,cohere)

    console.log("AFTER embedQuery", {
  length: embeddings.length,
  first5: embeddings.slice(0, 5),
});

    const index = await createKnowledgeIndex(pinecone)

    const stats = await index.describeIndexStats();

console.log("PINECONE STATS:", stats.namespaces);

    const scopedIndex = index.namespace(namespace)

const recordId = "6aa004992de6ad5c8ac34337-page-1-chunk-3";

const fetched = await scopedIndex.fetch({
  ids: [recordId],
});

const record =
  fetched.records?.["6aa004992de6ad5c8ac34337-page-1-chunk-3"];

console.log("FETCHED VECTOR:", {
  found: !!record,
  dimension: record?.values?.length,
  first5: record?.values?.slice(0, 5),
  metadata: record?.metadata,
});
console.log(fetched);

    const result = await scopedIndex.query({
        vector: embeddings,
        topK,
        includeMetadata:true
    })
  return result.matches  
}