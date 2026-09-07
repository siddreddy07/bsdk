import multer from "multer"

const storage = multer.memoryStorage()

const pdfFileFilter: multer.Options["fileFilter"] = (
  _request,
  file,
  callback
) => {
  if (file.mimetype !== "application/pdf") {
    return callback(new Error("Only PDF files are allowed"))
  }

  callback(null, true)
}

export const uploadPdf = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 4,
  },
})