"use client"

import { BaseTriggerNode } from "@/features/triggers/components/base-trigger-node"
import { type NodeProps } from "@xyflow/react"
import { CreditCard } from "lucide-react"
import { useState } from "react"
import { StripeTriggerDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function StripeTriggerNode({ selected, data, id }: NodeProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BaseTriggerNode
        selected={selected}
        icon={<CreditCard className="h-4 w-4" />}
        label="Stripe Trigger"
        description="Trigger workflow on Stripe event"
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
      <StripeTriggerDialogue open={open} onOpenChange={setOpen} data={data} nodeId={id} />
    </>
  )
}
