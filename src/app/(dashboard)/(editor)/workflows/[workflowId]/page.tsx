import { HydrateClient } from "@/trpc/server"
import { prefetchWorkflow } from "@/features/workflows/server/prefetch"
import { EditorPage } from "./editor-page"

interface WorkflowEditorPageProps {
  params: Promise<{ workflowId: string }>
}

export default async function WorkflowEditorPage({ params }: WorkflowEditorPageProps) {
  const { workflowId } = await params
  await prefetchWorkflow(workflowId)

  return (
    <HydrateClient>
      <EditorPage workflowId={workflowId} />
    </HydrateClient>
  )
}
