"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  loggerLink,
  unstable_httpBatchStreamLink as httpBatchStreamLink,
} from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"
import superjson from "superjson"

import { type AppRouter } from "@/server/api/root"
import { env } from "@/env"

const createQueryClient = () => new QueryClient()

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export const api = createTRPCReact<AppRouter>()

const httpBatchStreamLinkInit = () =>
  httpBatchStreamLink({
    transformer: superjson,
    url: getBaseUrl() + "/api/trpc",
    headers: () => {
      const headers = new Headers()
      headers.set("x-trpc-source", "nextjs-react")
      return headers
    },
  })

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() => {
    return api.createClient({
      links: [
        loggerLink({
          enabled: op =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLinkInit(),
      ],
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
