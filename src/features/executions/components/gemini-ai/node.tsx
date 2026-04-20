"use client"

import { BaseExecutionNode } from "@/features/executions/components/base-execution-node"
import { type NodeProps } from "@xyflow/react"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import { GeminiAiDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function GeminiAiNode({ selected, data, id }: NodeProps) {
  const [open, setOpen] = useState(false)
  const variableName = (data?.variableName as string) || ""

  return (
    <>
      <BaseExecutionNode
        selected={selected}
        icon={<Sparkles className="h-4 w-4" />}
        label="Gemini AI"
        description={variableName ? `Output: ${variableName}` : "Configure Gemini AI"}
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
      <GeminiAiDialogue open={open} onOpenChange={setOpen} data={data} nodeId={id} />
    </>
  )
}
