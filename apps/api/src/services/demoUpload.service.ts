import { createCohereClient } from "../config/cohere.config";
import { createPineconeIndex } from "../config/pinecone.config";
import { chunkDemoMarkdown } from "./document-chunker.service";
import { createDemoEmbeddings } from "./embedding.service";
import { storeDemoVectors } from "./vector.service";

const cohereApiKey = process.env.COHERE_API_KEY || ""
const pineconeApiKey = process.env.PINECONE_API_KEY || ""
const pineconeIndexHost = process.env.PINECONE_INDEX_HOST || ""

export async function demoUpload(demoId:string,sourceUrl:string,markdown:string) {

    try {

        const cohere = createCohereClient(cohereApiKey)

        const pineconeIndex = createPineconeIndex(
          pineconeApiKey,
          pineconeIndexHost
        )

        const chunks = await chunkDemoMarkdown(markdown)

        console.log('CHunks Done')

        const embeddings = await createDemoEmbeddings(cohere,demoId, chunks)

        console.log('Embeddings Generated')
                    
        await storeDemoVectors(
            pineconeIndex,
            demoId,
            sourceUrl,
            embeddings
        )

        console.log('Pine COne Storage Done')

        return {
            demoId,
            sourceUrl,
            success:true
        }


    } catch (error) {
        
    }

}