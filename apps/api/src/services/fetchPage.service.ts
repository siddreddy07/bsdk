import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";
import { fetchRenderedPage } from "./lightpanda.service.js";

const lpdopts = {
  host: "127.0.0.1",
  port: 9222,
};

export type lpdoptsType = {
    host:string,
    port:number
}

function extractMarkdown(html: string, url: string) {
  const dom = new JSDOM(html, { url });

  const article = new Readability(dom.window.document).parse();

  if (!article?.textContent?.trim()) {
    return null;
  }

  const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });

  const markdown = turndown.turndown(article.content ?? "").trim();

  if (!markdown) {
    return null;
  }

  return {
    title: article.title ?? "",
    markdown,
    sourceUrl: url,
  };
}

export async function fetchPage(url: string) {
  // Fast/cheap path
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  const html = await response.text();

  const result = extractMarkdown(html, url);

  if (result) {
    console.log("Static extraction succeeded");
    return result;
  }

  // SPA fallback
  console.log("Static extraction failed → using Lightpanda");

  const renderedHtml = await fetchRenderedPage(url,lpdopts);

  const renderedResult = extractMarkdown(renderedHtml, url);

  if (!renderedResult) {
    throw new Error("Could not extract rendered page content");
  }

  console.log("Lightpanda extraction succeeded");

  return renderedResult;
}