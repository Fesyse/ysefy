import { createRouteHandler } from "uploadthing/next"

import { ourFileRouter } from "./core"
import { env } from "@/env"

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    isDev: true,
    uploadthingId: env.UPLOADTHING_APP_ID,
    uploadthingSecret: env.UPLOADTHING_SECRET,
  },
  // Apply an (optional) custom config:
  // config: { ... },
})
