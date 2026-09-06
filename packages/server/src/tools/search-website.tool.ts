import { tool, type Tool } from "ai";
import { z } from "zod";

export const searchWebsiteTool : Tool = tool({
  description:
    "Find relevant pages within the website when the user is looking for a page, documentation section, product page, policy, or other website resource.",

  inputSchema: z.object({
    query: z
      .string()
      .describe("What website page or resource to search for"),
  }),

  execute: async ({ query }) => {
    // TODO:
    // Search the website's stored page index.
    // This will later use our website ingestion/crawl data.

    return {
      query,
      results: [],
    };
  },
});