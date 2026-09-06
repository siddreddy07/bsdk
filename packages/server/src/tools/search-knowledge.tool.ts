import {tool,type Tool} from "ai"

import {z} from "zod"

import {searchKnowledge} from "../services/knowledge/search.js"

import type {KnowledgeConfig} from "../services/knowledge/search.js"

export function createSearchKnowledgeTool (
  knowledge: KnowledgeConfig,
  namespace:string
) : Tool{
  return tool({
    description: 
    "Search the website knowledge base for information relevant to the user's question. Use this for website-specific products, services, documentation, policies, FAQs, APIs, SDKs, and other indexed website content.",

    inputSchema: z.object({
      query: z
        .string()
        .min(1)
        .describe(
          "A concise semantic search query based on the information needed."
        ),
    }),

    execute: async({query})=>{

      try {
        
        console.log("Knowledge query:", query);
        console.log("Namespace:", namespace);
    
          const matches = await searchKnowledge({
            query ,
            namespace: namespace,
            pinecone: knowledge.pinecone,
            cohere: knowledge.cohere,
    
            topK: 5,
          });
    
          console.log("Knowledge result:", matches);
    
          return matches
      } catch (error) {
            console.error("searchKnowledge failed:", error);
                return {
      success: false,
      error: "Knowledge search is temporarily unavailable.",
    };
      }


    }

  })
}