import { task ,metadata} from "@trigger.dev/sdk";
import { parseDocument } from "../services/document-parser.service";
import { createFileEmbeddings } from "../services/embedding.service";
import { storeVectorInPinecone } from "../services/vector.service";
import { updateFileVectorStatus } from "../controllers/file.controller";
import { chunkDocumentPages } from "../services/document-chunker.service";
import { getKnowledgeConfig } from "../services/knowledge.service";
import { createCohereClient } from "../config/cohere.config";
import { createPineconeIndex } from "../config/pinecone.config";



type ProcessDocumentPayload = {
  userId:string
  documentId: string
  botId: string
  assetId: string
  fileUrl: string
}

export const processDocument = task({
    id: "process-document",

    run: async(payload: ProcessDocumentPayload)=>{

        try {

            const config = await getKnowledgeConfig(payload.userId)

  const cohere = createCohereClient(
    config.cohereApiKey
  )

  
const pineconeIndex = createPineconeIndex(
  config.pineconeApiKey,
  config.pineconeIndexHost
)


             metadata.set("stage", "parsing")

            const pages = await parseDocument(payload.fileUrl)

            metadata.set("stage","chunking")
            
            const chunks = await chunkDocumentPages(pages)
            
            metadata.set("stage", "embedding")
    
            const embeddings = await createFileEmbeddings(cohere,payload.assetId, chunks)
            
            metadata.set("stage", "indexing")

            await storeVectorInPinecone(
                pineconeIndex,
                payload.botId,
                payload.assetId,
                payload.documentId,
                embeddings
            )

            metadata.set("stage", "completed")

            await updateFileVectorStatus(payload.documentId, "completed")
    
            console.log(`Successfully processed document ${payload.documentId} for bot ${payload.botId} and asset ${payload.assetId}. Stored ${embeddings.length} vectors in Pinecone.`)
            
        return {
          documentId: payload.documentId,
          vectorsStored: embeddings.length,
        }
            
        } catch (error) {
            console.error(`Error processing document ${payload.documentId} for bot ${payload.botId} and asset ${payload.assetId}:`, error)
            throw new Error(`Failed to process document ${payload.documentId} for bot ${payload.botId} and asset ${payload.assetId}`)
        }


    }

})