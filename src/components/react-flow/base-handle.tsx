"use client"

import { cn } from "@/lib/utils"
import { Handle, HandleProps } from "@xyflow/react"

export function BaseHandle({ className, ...props }: HandleProps & { className?: string }) {
  return (
    <Handle
      className={cn(
        "!h-3 !w-3 !rounded-full !border-2 !border-primary !bg-background",
        className
      )}
      {...props}
    />
  )
}
