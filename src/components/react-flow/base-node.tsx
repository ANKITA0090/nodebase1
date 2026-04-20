"use client"

import { cn } from "@/lib/utils"
import React from "react"

export interface BaseNodeProps {
  className?: string
  children?: React.ReactNode
  selected?: boolean
}

export function BaseNode({
  className,
  children,
  selected,
}: BaseNodeProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "min-w-[180px]",
        selected && "ring-2 ring-primary",
        className
      )}
    >
      {children}
    </div>
  )
}
