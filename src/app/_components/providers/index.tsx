"use client"

import { TRPCReactProvider } from "@/trpc/react"
import type { FC, PropsWithChildren } from "react"
import { ToastProvider } from "./toast-provider"
import { ThemeProvider } from "./theme-provider"
import { SessionProvider } from "next-auth/react"

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </SessionProvider>
    </TRPCReactProvider>
  )
}
