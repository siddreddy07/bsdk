import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import type { DocumentPage } from "./document-parser.service"

export type DocumentChunk = {
  pageContent: string
  pageNumber: number
  chunkIndex: number
}

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
})


export type DemoChunk = {
  pageContent: string;
  chunkIndex: number;
};

export async function chunkDocumentPages(
  pages: DocumentPage[]
): Promise<DocumentChunk[]> {
  const chunks: DocumentChunk[] = []

  for (const page of pages) {
    const texts = await splitter.splitText(page.pageContent)

    texts.forEach((text, index) => {
      chunks.push({
        pageContent: text,
        pageNumber: page.pageNumber,
        chunkIndex: index,
      })
    })
  }

  return chunks
}


export async function chunkDemoMarkdown(
  markdown: string
): Promise<DemoChunk[]> {
  const texts = await splitter.splitText(markdown);

  return texts.map((text, index) => ({
    pageContent: text,
    chunkIndex: index,
  }));
}