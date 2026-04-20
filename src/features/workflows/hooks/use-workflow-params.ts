"use client"

import { useQueryStates } from "nuqs"
import { workflowParams } from "@/features/workflows/params"

export function useWorkflowParams() {
  const [params, setParams] = useQueryStates(workflowParams)
  return { params, setParams }
}
