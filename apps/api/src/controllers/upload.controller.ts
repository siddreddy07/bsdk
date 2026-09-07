import type { Request, Response } from "express"
import cloudinary from "../config/cloudinary.config"



export const createUploadSignUrl = (req:Request,res:Response)=>{

    try {

    const timestamp = Math.floor(Date.now() / 1000)
    const folder = "bsdk/documents"
    const uploadPreset = "bsdk_pdf_upload"


        const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
        upload_preset: uploadPreset,
      },
      process.env.CLOUDINARY_API_SECRET!
    )

    
    return res.status(200).json({
      timestamp,
      signature,
      folder,
      uploadPreset,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    })

    } catch (error) {
    return res.status(500).json({
      message: "Failed to create upload signature",
      error: error instanceof Error ? error.message : "Unknown error",
    })
    }

}