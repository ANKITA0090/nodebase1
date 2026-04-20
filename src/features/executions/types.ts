import type { Node, Connection } from "@/generated/prisma"

export interface ExecutorContext {
  node: Node
  nodes: Node[]
  connections: Connection[]
  executionResults: Record<string, Record<string, unknown>>
  workflowId: string
  userId: string
}

export interface ExecutorReturnValue {
  success: boolean
  output?: Record<string, unknown>
  error?: string
}

export type Executor = (ctx: ExecutorContext) => Promise<ExecutorReturnValue>
