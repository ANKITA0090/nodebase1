import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import type { Executor } from "@/features/executions/types"

export const geminiAiExecutor: Executor = async ({ node }) => {
  const data = node.data as Record<string, unknown>
  const prompt = (data.prompt as string) || ""
  const variableName = (data.variableName as string) || "response"

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
    })

    return { success: true, output: { [variableName]: text } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gemini AI request failed",
    }
  }
}
