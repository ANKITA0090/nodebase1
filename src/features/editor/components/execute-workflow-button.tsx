"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows"

interface ExecuteWorkflowButtonProps {
  workflowId: string
}

export function ExecuteWorkflowButton({ workflowId }: ExecuteWorkflowButtonProps) {
  const { mutate, isPending } = useExecuteWorkflow()

  return (
    <Button
      size="sm"
      onClick={() => mutate({ id: workflowId })}
      disabled={isPending}
      className="gap-1.5"
    >
      <Play className="h-4 w-4" />
      {isPending ? "Running..." : "Execute"}
    </Button>
  )
}
