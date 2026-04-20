"use client"

import { WorkflowNode } from "@/components/workflow-node"
import React from "react"

interface BaseTriggerNodeProps {
  selected?: boolean
  icon?: React.ReactNode
  label: string
  description?: string
  children?: React.ReactNode
}

export function BaseTriggerNode({
  selected,
  icon,
  label,
  description,
  children,
}: BaseTriggerNodeProps) {
  return (
    <WorkflowNode
      selected={selected}
      icon={icon}
      label={label}
      description={description}
      hasInput={false}
      hasOutput={true}
    >
      {children}
    </WorkflowNode>
  )
}
