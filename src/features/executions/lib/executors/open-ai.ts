import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import prisma from "@/lib/database"
import { decrypt } from "@/lib/encryption"
import type { Executor } from "@/features/executions/types"

export const openAiExecutor: Executor = async ({ node, userId }) => {
  const data = node.data as Record<string, unknown>
  const prompt = (data.prompt as string) || ""
  const variableName = (data.variableName as string) || "response"
  const credentialId = data.credentialId as string | undefined

  if (!credentialId) {
    return { success: false, error: "No credential selected for OpenAI" }
  }

  try {
    const credential = await prisma.credential.findFirst({
      where: { id: credentialId, userId, type: "open_ai" },
    })

    if (!credential) {
      return { success: false, error: "OpenAI credential not found" }
    }

    const apiKey = decrypt(credential.value)
    const openai = createOpenAI({ apiKey })

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
    })

    return { success: true, output: { [variableName]: text } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "OpenAI request failed",
    }
  }
}
