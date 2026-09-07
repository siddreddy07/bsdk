import LlamaCloud from "@llamaindex/llama-cloud";

export const client = new LlamaCloud({
  apiKey: process.env.LLAMA_CLOUD_API_KEY,
});
