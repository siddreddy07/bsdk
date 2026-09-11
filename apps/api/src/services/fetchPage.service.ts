import { fetchRenderedPage } from "./firecrawl.service.js";

export async function fetchPage(url: string) {
  const result = await fetchRenderedPage(url);

  if (!result.markdown) {
    throw new Error(`Could not extract rendered page content`);
  }

  console.log("Firecrawl extraction succeeded");

  return {
    title: result.title,
    markdown: result.markdown,
    sourceUrl: url,
  };
}
