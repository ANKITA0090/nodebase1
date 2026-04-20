import type { Executor } from "@/features/executions/types"

export const stripeTriggerExecutor: Executor = async () => {
  return { success: true, output: {} }
}
