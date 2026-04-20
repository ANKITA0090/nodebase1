"use client"

import { BaseTriggerNode } from "@/features/triggers/components/base-trigger-node"
import { type NodeProps } from "@xyflow/react"
import { Hand } from "lucide-react"
import { useState } from "react"
import { ManualTriggerDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function ManualTriggerNode({ selected, data }: NodeProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BaseTriggerNode
        selected={selected}
        icon={<Hand className="h-4 w-4" />}
        label="Manual Trigger"
        description="Trigger workflow manually"
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs h-7"
          onClick={() => setOpen(true)}
        >
          Configure
        </Button>
      </BaseTriggerNode>
      <ManualTriggerDialogue open={open} onOpenChange={setOpen} data={data} />
    </>
  )
}
