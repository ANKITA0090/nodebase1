import "server-only"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query"
import { getQueryClient } from "./query-client"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

const queryClient = getQueryClient()

export const trpc = createTRPCOptionsProxy({
  router: appRouter,
  ctx: createTRPCContext,
  queryClient,
})

export function HydrateClient({ children }: { children: React.ReactNode }) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export function prefetch<T>(promise: Promise<T>) {
  void promise
}
