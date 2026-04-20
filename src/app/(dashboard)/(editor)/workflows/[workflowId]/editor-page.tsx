"use client"

import { useWorkflow } from "@/features/workflows/hooks/use-workflows"
import { Editor } from "@/features/editor/components/editor"
import { EditorHeader } from "@/features/editor/components/editor-header"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { EntityError, EntityLoading } from "@/components/entity-components"

interface EditorPageProps {
  workflowId: string
}

function EditorContent({ workflowId }: EditorPageProps) {
  const { data: workflow } = useWorkflow(workflowId)

  return (
    <div className="flex h-full flex-col">
      <EditorHeader workflowId={workflow.id} workflowName={workflow.name} />
      <div className="flex-1 overflow-hidden">
        <Editor
          workflowId={workflow.id}
          initialNodes={workflow.nodes.map((n) => ({
            id: n.id,
            type: n.type,
            position: n.position as { x: number; y: number },
            data: n.data as Record<string, unknown>,
          }))}
          initialConnections={workflow.connections.map((c) => ({
            id: c.id,
            fromNodeId: c.fromNodeId,
            toNodeId: c.toNodeId,
            fromOutput: c.fromOutput,
            toInput: c.toInput,
          }))}
        />
      </div>
    </div>
  )
}

export function EditorPage({ workflowId }: EditorPageProps) {
  return (
    <ErrorBoundary fallback={<EntityError message="Failed to load workflow" />}>
      <Suspense fallback={<EntityLoading />}>
        <EditorContent workflowId={workflowId} />
      </Suspense>
    </ErrorBoundary>
  )
}
