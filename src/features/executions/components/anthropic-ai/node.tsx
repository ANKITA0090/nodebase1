"use client"

import { BaseExecutionNode } from "@/features/executions/components/base-execution-node"
import { type NodeProps } from "@xyflow/react"
import { Bot } from "lucide-react"
import { useState } from "react"
import { AnthropicAiDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function AnthropicAiNode({ selected, data, id }: NodeProps) {
  const [open, setOpen] = useState(false)
  const variableName = (data?.variableName as string) || ""

  return (
    <>
      <BaseExecutionNode
        selected={selected}
        icon={<Bot className="h-4 w-4" />}
        label="Anthropic AI"
        description={variableName ? `Output: ${variableName}` : "Configure Anthropic AI"}
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs h-7"
          onClick={() => setOpen(true)}
        >
          Configure
        </Button>
      </BaseExecutionNode>
      <AnthropicAiDialogue open={open} onOpenChange={setOpen} data={data} nodeId={id} />
    </>
  )
}
