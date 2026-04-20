"use client"

import { WorkflowNode } from "@/components/workflow-node"
import React from "react"

interface BaseExecutionNodeProps {
  selected?: boolean
  icon?: React.ReactNode
  label: string
  description?: string
  status?: "idle" | "running" | "success" | "error"
  children?: React.ReactNode
}

export function BaseExecutionNode({
  selected,
  icon,
  label,
  description,
  status,
  children,
}: BaseExecutionNodeProps) {
  return (
    <WorkflowNode
      selected={selected}
      icon={icon}
      label={label}
      description={description}
      status={status}
      hasInput={true}
      hasOutput={true}
    >
      {children}
    </WorkflowNode>
  )
}
