import { channel } from "inngest/realtime"
import { z } from "zod"

const nodeStatusSchema = z.object({
  nodeId: z.string(),
  status: z.enum(["running", "completed", "failed"]),
  output: z.record(z.string(), z.unknown()).optional(),
})

export type NodeStatusData = z.infer<typeof nodeStatusSchema>

export const workflowRunChannel = channel({
  name: (runId: string) => `workflow-${runId}`,
  topics: {
    "node-status": { schema: nodeStatusSchema },
  },
})
