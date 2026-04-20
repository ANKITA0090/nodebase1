"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { CredentialType } from "@/generated/prisma"

export function useCreateCredential() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.credentials.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["credentials"]] })
        toast.success("Credential created")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create credential")
      },
    })
  )
}

export function useRemoveCredential() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.credentials.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["credentials"]] })
        toast.success("Credential deleted")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete credential")
      },
    })
  )
}

export function useCredentials(type?: CredentialType) {
  const trpc = useTRPC()
  return useSuspenseQuery(trpc.credentials.getMany.queryOptions({ type }))
}
