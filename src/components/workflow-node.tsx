"use client"

import { BaseNode } from "@/components/react-flow/base-node"
import { BaseHandle } from "@/components/react-flow/base-handle"
import { NodeStatusIndicator } from "@/components/react-flow/node-status-indicator"
import { Position } from "@xyflow/react"
import { cn } from "@/lib/utils"
import React from "react"

interface WorkflowNodeProps {
  selected?: boolean
  icon?: React.ReactNode
  label: string
  description?: string
  status?: "idle" | "running" | "success" | "error"
  hasInput?: boolean
  hasOutput?: boolean
  children?: React.ReactNode
  className?: string
}

export function WorkflowNode({
  selected,
  icon,
  label,
  description,
  status = "idle",
  hasInput = true,
  hasOutput = true,
  children,
  className,
}: WorkflowNodeProps) {
  return (
    <BaseNode selected={selected} className={cn("min-w-[200px]", className)}>
      {hasInput && <BaseHandle type="target" position={Position.Top} />}
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium truncate">{label}</p>
              <NodeStatusIndicator status={status} />
            </div>
            {description && (
              <p className="text-xs text-muted-foreground truncate">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
      {hasOutput && <BaseHandle type="source" position={Position.Bottom} />}
    </BaseNode>
  )
}
