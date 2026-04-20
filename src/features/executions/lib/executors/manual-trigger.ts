import type { Executor } from "@/features/executions/types"

export const manualTriggerExecutor: Executor = async () => {
  return { success: true, output: {} }
}
