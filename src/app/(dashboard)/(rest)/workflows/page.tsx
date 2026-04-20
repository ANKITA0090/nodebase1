import { HydrateClient } from "@/trpc/server"
import { WorkflowsContainer } from "@/features/workflows/components/workflows"
import { prefetchWorkflows } from "@/features/workflows/server/prefetch"
import { loadWorkflowParams } from "@/features/workflows/server/params-loader"

interface WorkflowsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function WorkflowsPage({ searchParams }: WorkflowsPageProps) {
  const params = await loadWorkflowParams(searchParams)
  await prefetchWorkflows(params)

  return (
    <HydrateClient>
      <WorkflowsContainer />
    </HydrateClient>
  )
}
