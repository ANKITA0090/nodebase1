"use client"

import { BaseExecutionNode } from "@/features/executions/components/base-execution-node"
import { type NodeProps } from "@xyflow/react"
import { Globe } from "lucide-react"
import { useState } from "react"
import { HttpRequestDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function HttpRequestNode({ selected, data }: NodeProps) {
  const [open, setOpen] = useState(false)
  const method = (data?.method as string) || "GET"
  const url = (data?.url as string) || ""

  return (
    <>
      <BaseExecutionNode
        selected={selected}
        icon={<Globe className="h-4 w-4" />}
        label="HTTP Request"
        description={url ? `${method} ${url}` : "Configure HTTP request"}
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
      <HttpRequestDialogue open={open} onOpenChange={setOpen} data={data} />
    </>
  )
}
