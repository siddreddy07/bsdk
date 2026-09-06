import { tool, type Tool } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";

export const fetchWebPageTool : Tool = tool({
  description:
    "Fetch the current content of a specific website page when its URL is known and up-to-date page information is needed.",

  inputSchema: z.object({
    url: z.string().url().describe("The webpage URL to fetch"),
  }),

  execute: async ({ url }) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch webpage: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove content that is normally irrelevant to the answer
    $("script, style, noscript, svg").remove();

    const title = $("title").text().trim();

    const content = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    return {
      url,
      title,
      content,
    };
  },
});