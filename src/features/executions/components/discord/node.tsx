"use client"

import { BaseExecutionNode } from "@/features/executions/components/base-execution-node"
import { type NodeProps } from "@xyflow/react"
import { MessageSquare } from "lucide-react"
import { useState } from "react"
import { DiscordDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function DiscordNode({ selected, data, id }: NodeProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BaseExecutionNode
        selected={selected}
        icon={<MessageSquare className="h-4 w-4" />}
        label="Discord"
        description="Send Discord message"
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
      <DiscordDialogue open={open} onOpenChange={setOpen} data={data} nodeId={id} />
    </>
  )
}
