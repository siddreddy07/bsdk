const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
  throw new Error("FIRECRAWL_API_KEY is missing");
}

interface FirecrawlResult {
  markdown: string;
  title: string;
}

export async function fetchRenderedPage(url: string): Promise<FirecrawlResult> {
  const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      scrapeOptions: {
        onlyMainContent: true,
        formats: ["markdown"],
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch page: ${data.error ?? response.statusText}`
    );
  }

  return {
    markdown: data.data?.markdown ?? "",
    title: data.data?.metadata?.title ?? "",
  };
}
