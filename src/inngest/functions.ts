import { inngest } from "./client"
import { workflowRunChannel } from "./realtime"
import { getSortedNodes } from "./utils"
import { executorRegistry } from "@/features/executions/lib/executor-registry"
import prisma from "@/lib/database"
import type { Node, Connection } from "@/generated/prisma"

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    triggers: [{ event: "workflow/execute" }],
  },
  async ({ event, step, runId }) => {
    const { workflowId, userId } = event.data as { workflowId: string; userId: string }

    const execution = await step.run("create-execution", async () => {
      return prisma.execution.create({
        data: { workflowId, status: "running" },
        select: { id: true },
      })
    })

    const rawWorkflow = await step.run("load-workflow", async () => {
      return prisma.workflow.findUnique({
        where: { id: workflowId },
        include: { nodes: true, connections: true },
      })
    })

    if (!rawWorkflow) {
      await step.run("mark-failed-no-workflow", async () => {
        return prisma.execution.update({
          where: { id: execution.id },
          data: { status: "failed" },
        })
      })
      return { success: false, error: "Workflow not found" }
    }

    // Cast needed because Inngest serializes Dates to strings in step results
    const workflow = rawWorkflow as unknown as {
      id: string
      nodes: Node[]
      connections: Connection[]
    }

    const sortedNodes = getSortedNodes(workflow.nodes, workflow.connections)
    const executionResults: Record<string, Record<string, unknown>> = {}

    for (const node of sortedNodes) {
      if (node.type === "initial") continue

      await step.realtime.publish(
        `node-running-${node.id}`,
        workflowRunChannel(runId)["node-status"],
        { nodeId: node.id, status: "running" as const }
      )

      const result = await step.run(`execute-node-${node.id}`, async () => {
        const executor = executorRegistry[node.type]
        if (!executor) return { success: false, error: `No executor for ${node.type}` }
        return executor({
          node,
          nodes: workflow.nodes,
          connections: workflow.connections,
          executionResults,
          workflowId,
          userId,
        })
      })

      if (result.output) {
        executionResults[node.id] = result.output as Record<string, unknown>
      }

      await step.realtime.publish(
        `node-done-${node.id}`,
        workflowRunChannel(runId)["node-status"],
        {
          nodeId: node.id,
          status: result.success ? ("completed" as const) : ("failed" as const),
          output: result.output as Record<string, unknown> | undefined,
        }
      )

      if (!result.success) {
        await step.run("mark-failed", async () => {
          return prisma.execution.update({
            where: { id: execution.id },
            data: { status: "failed" },
          })
        })
        return { success: false, executionId: execution.id }
      }
    }

    await step.run("mark-completed", async () => {
      return prisma.execution.update({
        where: { id: execution.id },
        data: { status: "completed" },
      })
    })

    return { success: true, executionId: execution.id }
  }
)
