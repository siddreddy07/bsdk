export const knowledgeConfig = {
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY!,
    indexHost: process.env.PINECONE_INDEX_HOST!,
  },

  cohere: {
    apiKey: process.env.COHERE_API_KEY!,
  },
};
