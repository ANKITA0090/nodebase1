"use client"

import { Button } from "@/components/ui/button"
import { Panel } from "@xyflow/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { NodeSelector } from "@/components/node-selector"

export function AddNodeButton() {
  const [selectorOpen, setSelectorOpen] = useState(false)

  return (
    <>
      <Panel position="bottom-right">
        <Button
          size="icon"
          className="h-10 w-10 rounded-full shadow-lg"
          onClick={() => setSelectorOpen(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </Panel>
      <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen} />
    </>
  )
}
