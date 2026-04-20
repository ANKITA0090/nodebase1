"use client"

import { BaseNode } from "@/components/react-flow/base-node"
import { BaseHandle } from "@/components/react-flow/base-handle"
import { Position, type NodeProps } from "@xyflow/react"
import { Flag } from "lucide-react"

export function InitialNode({ selected }: NodeProps) {
  return (
    <BaseNode selected={selected} className="min-w-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Flag className="h-5 w-5" />
      </div>
      <BaseHandle type="source" position={Position.Bottom} />
    </BaseNode>
  )
}
