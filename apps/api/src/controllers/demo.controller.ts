import type { Request, Response } from "express";
import { fetchPage } from "../services/fetchPage.service.js";
import { demoUpload } from "../services/demoUpload.service.js";

export async function tryWebsite(req: Request, res: Response) {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        error: "URL is required",
      });
    }

    const page = await fetchPage(url);

    return res.status(200).json({
      title: page.title,
      sourceUrl: page.sourceUrl,
      markdown: page.markdown,
    });
  } catch (error) {
    console.error("Try website error:", error);

    // Return 422 for fetch failures (website blocked access)
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch page")) {
        return res.status(422).json({
          error: "PAGE_NOT_ACCESSIBLE",
          message:
            "This page blocks automated access. Try another public page.",
        });
      }
      if (error.message.includes("Could not extract rendered page content")) {
        return res.status(422).json({
          error: "CONTENT_EXTRACTION_FAILED",
          message: "Could not extract content from this page.",
        });
      }
    }

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to process website",
    });
  }
}


export async function trainMd(req:Request, res:Response) {

  try {

    const {demoId,markdown,sourceUrl} = req.body
    if(!demoId || !markdown || !sourceUrl){
      return res.status(400).json({success:false,message:'Fileds are required'})
    }

    const uploadRes = await demoUpload(demoId,sourceUrl,markdown)


    return res.status(200).json({success:true,uploadRes,message:'Uploaded SuccessFully!'})

  } catch (error) {
    console.error('Error inside Markdown Controller')
    return res.status(500).json({ error: "Failed to Upload Markdown" })
  }

}