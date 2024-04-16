"use client"

import { TRPCReactProvider } from "@/trpc/react"
import type { FC, PropsWithChildren } from "react"
import { ToastProvider } from "./toast-provider"
import { ThemeProvider } from "./theme-provider"
import { SessionProvider } from "next-auth/react"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"

import { ourFileRouter } from "@/app/api/uploadthing/core"

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </SessionProvider>
    </TRPCReactProvider>
  )
}
