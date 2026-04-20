"use client"

import { BaseTriggerNode } from "@/features/triggers/components/base-trigger-node"
import { type NodeProps } from "@xyflow/react"
import { FileText } from "lucide-react"
import { useState } from "react"
import { GoogleFormTriggerDialogue } from "./dialogue"
import { Button } from "@/components/ui/button"

export function GoogleFormTriggerNode({ selected, data, id }: NodeProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <BaseTriggerNode
        selected={selected}
        icon={<FileText className="h-4 w-4" />}
        label="Google Form Trigger"
        description="Trigger workflow on form submission"
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
      <GoogleFormTriggerDialogue open={open} onOpenChange={setOpen} data={data} nodeId={id} />
    </>
  )
}
