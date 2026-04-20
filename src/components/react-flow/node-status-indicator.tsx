"use client"

import { cn } from "@/lib/utils"

type NodeStatus = "idle" | "running" | "success" | "error"

interface NodeStatusIndicatorProps {
  status?: NodeStatus
  className?: string
}

export function NodeStatusIndicator({
  status = "idle",
  className,
}: NodeStatusIndicatorProps) {
  return (
    <div
      className={cn(
        "h-2 w-2 rounded-full",
        status === "idle" && "bg-muted-foreground",
        status === "running" && "animate-pulse bg-yellow-500",
        status === "success" && "bg-green-500",
        status === "error" && "bg-red-500",
        className
      )}
    />
  )
}
