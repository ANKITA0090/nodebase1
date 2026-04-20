import { NodeType } from "@/generated/prisma"

export const nodeComponents = {
  [NodeType.initial]: /* will be imported in editor */ null,
  [NodeType.manual_trigger]: null,
  [NodeType.http_request]: null,
} satisfies Record<string, unknown>

export type RegisteredNodeType = keyof typeof nodeComponents
