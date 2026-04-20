"use client"

import { cn } from "@/lib/utils"
import { NodeProps, Position } from "@xyflow/react"
import { BaseHandle } from "./base-handle"
import { Plus } from "lucide-react"

export function PlaceholderNode({ selected }: NodeProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/50 bg-background text-muted-foreground transition-colors",
        selected && "border-primary text-primary"
      )}
    >
      <BaseHandle type="target" position={Position.Top} />
      <Plus className="h-4 w-4" />
    </div>
  )
}
