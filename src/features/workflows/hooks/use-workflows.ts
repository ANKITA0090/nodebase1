"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useCreateWorkflow() {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [["workflows"]] })
        router.push(`/workflows/${data.id}`)
        toast.success("Workflow created")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create workflow")
      },
    })
  )
}

export function useRemoveWorkflow() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["workflows"]] })
        toast.success("Workflow deleted")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete workflow")
      },
    })
  )
}

export function useUpdateWorkflowName() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["workflows"]] })
        toast.success("Workflow renamed")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to rename workflow")
      },
    })
  )
}

export function useUpdateWorkflow() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["workflows"]] })
        toast.success("Workflow saved")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to save workflow")
      },
    })
  )
}

export function useWorkflows(params: {
  page: number
  pageSize: number
  search: string
}) {
  const trpc = useTRPC()
  return useSuspenseQuery(
    trpc.workflows.getMany.queryOptions({
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
    })
  )
}

export function useWorkflow(id: string) {
  const trpc = useTRPC()
  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }))
}
