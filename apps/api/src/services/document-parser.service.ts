import { client } from "../config/llama-cloud.config"




export type DocumentPage = {
  pageContent: string
  pageNumber: number
}



export async function parseDocument(fileUrl: string): Promise<DocumentPage[]> {

    const result = await client.parsing.parse({
        source_url: fileUrl,
        tier: "agentic",
        version: "latest",
        expand: ["markdown"],
    })

      return result.markdown?.pages
      .filter((page) => "markdown" in page)  
      .map((page, index) => ({
          pageContent: page.markdown,
          pageNumber: page.page_number ?? index + 1,
  })) ?? []


}