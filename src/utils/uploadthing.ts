import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"

import type { OurFileRouter } from "@/app/api/uploadthing/core"

export const UploadButtonPrimitive = generateUploadButton<OurFileRouter>()
export const UploadDropzonePrimitive = generateUploadDropzone<OurFileRouter>()
