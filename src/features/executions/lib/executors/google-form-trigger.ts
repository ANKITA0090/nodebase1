import type { Executor } from "@/features/executions/types"

export const googleFormTriggerExecutor: Executor = async () => {
  return { success: true, output: {} }
}
