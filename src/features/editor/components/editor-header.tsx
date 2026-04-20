"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useUpdateWorkflow } from "@/features/workflows/hooks/use-workflows"
import { useAtomValue } from "jotai"
import { editorInstanceAtom } from "@/features/editor/store/atoms"

interface EditorHeaderProps {
  workflowId: string
  workflowName: string
}

export function EditorHeader({ workflowId, workflowName }: EditorHeaderProps) {
  const { mutate: updateWorkflow, isPending } = useUpdateWorkflow()
  const editorInstance = useAtomValue(editorInstanceAtom)

  const handleSave = () => {
    if (!editorInstance) return

    const { nodes, edges } = editorInstance.toObject()

    updateWorkflow({
      id: workflowId,
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type || "initial",
        position: node.position,
        data: node.data as Record<string, unknown>,
      })),
      connections: edges.map((edge) => ({
        id: edge.id,
        fromNodeId: edge.source,
        toNodeId: edge.target,
        fromOutput: edge.sourceHandle || "main",
        toInput: edge.targetHandle || "main",
      })),
    })
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/workflows">Workflows</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{workflowName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto">
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isPending || !editorInstance}
        >
          <Save className="mr-2 h-4 w-4" />
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </header>
  )
}
