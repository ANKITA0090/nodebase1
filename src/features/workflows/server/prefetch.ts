import { trpc } from "@/trpc/server"
import { getQueryClient } from "@/trpc/query-client"

export async function prefetchWorkflows(params: {
  page: number
  pageSize: number
  search: string
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    trpc.workflows.getMany.queryOptions({
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
    })
  )
}

export async function prefetchWorkflow(id: string) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    trpc.workflows.getOne.queryOptions({ id })
  )
}
