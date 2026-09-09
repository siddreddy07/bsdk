import { createPineconeIndex } from "../config/pinecone.config"



type Vector = {
    id : string
    values: number[]
    pageContent: string
    pageNumber: number
     chunkIndex: number
}

export type DemoVector = {
  id: string;
  pageContent: string;
  chunkIndex: number;
  values: number[];
};




export async function storeVectorInPinecone(
    pineconeIndex: ReturnType<typeof createPineconeIndex>,
    botId: string,
    assetId: string,
    fileId: string,
    vectors: Vector[],
)   {
        const namespace = pineconeIndex.namespace(`bot_${botId}`)

        try {
            await namespace.upsert({
                records:vectors.map((vector) => ({
                    id:vector.id,
                    values: vector.values,
                    metadata: {
                        pageContent: vector.pageContent,
                        pageNumber: vector.pageNumber,
                        chunkIndex:vector.chunkIndex,
                        assetId: assetId,
                        fileId: fileId
                    }
                }))
            })
            console.log(`Successfully stored ${vectors.length} vectors in Pinecone for bot ${botId} and asset ${assetId}`)
        } catch (error) {
            console.error(`Error storing vectors in Pinecone for bot ${botId} and asset ${assetId}:`, error)
            throw new Error(`Failed to store vectors in Pinecone for bot ${botId} and asset ${assetId}`)
        }


    }


export async function storeDemoVectors(
  pineconeIndex: ReturnType<typeof createPineconeIndex>,
  demoId: string,
  sourceUrl: string,
  vectors: DemoVector[]
) {
  const namespace = pineconeIndex.namespace(`demo_${demoId}`);

  await namespace.upsert({
    records: vectors.map((vector) => ({
      id: vector.id,
      values: vector.values,
      metadata: {
        pageContent: vector.pageContent,
        chunkIndex: vector.chunkIndex,
        sourceUrl,
      },
    })),
  });
}


// export async function searchVectorsInPinecone(
//     botId: string,
//     queryEmbedding: number[],
//     topK: number,
// ){

//     const namespace = pineconeIndex.namespace(`bot_${botId}`)

//     try {
        
//             const result = await namespace.query({
//                 vector: queryEmbedding,
//                 topK: topK || 5,
//                 includeMetadata: true
//             })
            
//             console.log(`Successfully searched vectors in Pinecone for bot ${botId}. Found ${result.matches.length} matches.`)
        
//              return result.matches
        
//     } catch (error) {
//         console.error(`Error searching vectors in Pinecone for bot ${botId}:`, error)
//         throw new Error(`Failed to search vectors in Pinecone for bot ${botId}`)
//     }


// }