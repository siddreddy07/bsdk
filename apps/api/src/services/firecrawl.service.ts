import Firecrawl from "@mendable/firecrawl-js";

const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
  throw new Error("FIRECRAWL_API_KEY is missing");
}

const firecrawl = new Firecrawl({ apiKey });

export async function fetchRenderedPage(url: string): Promise<string> {
  const doc = await firecrawl.scrape(url, {
    formats: ["html"],
    onlyMainContent: false,
  });

  return doc.html ?? "";
}
