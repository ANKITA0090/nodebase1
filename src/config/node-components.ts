import { NodeType } from "@/generated/prisma"

export const nodeComponents = {
  [NodeType.initial]: null,
  [NodeType.manual_trigger]: null,
  [NodeType.http_request]: null,
  [NodeType.google_form_trigger]: null,
  [NodeType.stripe_trigger]: null,
  [NodeType.anthropic_ai]: null,
  [NodeType.gemini_ai]: null,
  [NodeType.open_ai]: null,
  [NodeType.discord]: null,
  [NodeType.slack]: null,
} satisfies Record<string, unknown>

export type RegisteredNodeType = keyof typeof nodeComponents
