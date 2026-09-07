import { CohereClientV2 } from "cohere-ai"

const apiKey = process.env.COHERE_API_KEY

if (!apiKey) {
  throw new Error("COHERE_API_KEY is missing")
}

export const cohere = new CohereClientV2({
  token: apiKey,
})

export function createCohereClient(apiKey: string) {
  return new CohereClientV2({
    token: apiKey,
  })
}