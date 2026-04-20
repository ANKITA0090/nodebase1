import { createAnthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"
import prisma from "@/lib/database"
import { decrypt } from "@/lib/encryption"
import type { Executor } from "@/features/executions/types"

export const anthropicAiExecutor: Executor = async ({ node, userId }) => {
  const data = node.data as Record<string, unknown>
  const prompt = (data.prompt as string) || ""
  const variableName = (data.variableName as string) || "response"
  const credentialId = data.credentialId as string | undefined

  if (!credentialId) {
    return { success: false, error: "No credential selected for Anthropic AI" }
  }

  try {
    const credential = await prisma.credential.findFirst({
      where: { id: credentialId, userId, type: "anthropic_ai" },
    })

    if (!credential) {
      return { success: false, error: "Anthropic AI credential not found" }
    }

    const apiKey = decrypt(credential.value)
    const anthropic = createAnthropic({ apiKey })

    const { text } = await generateText({
      model: anthropic("claude-3-5-haiku-latest"),
      prompt,
    })

    return { success: true, output: { [variableName]: text } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Anthropic AI request failed",
    }
  }
}
