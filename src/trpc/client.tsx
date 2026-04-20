"use client"

import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import superjson from "superjson"
import { getQueryClient } from "./query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import type { AppRouter } from "./routers/_app"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return ""
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return "http://localhost:3000"
  })()
  return `${base}/api/trpc`
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const trpcClient = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: getUrl(),
        transformer: superjson,
      }),
    ],
  })

  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPCProvider>
  )
}
