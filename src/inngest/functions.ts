import { inngest } from "./client"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"

const google = createGoogleGenerativeAI()

export const executeAI = inngest.createFunction(
  {
    id: "execute-ai",
    triggers: [{ event: "execute/ai" }],
  },
  async ({ step }) => {
    const result = await step.run("gemini-generate-text", async () => {
      const response = await generateText({
        model: google("gemini-1.5-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 + 2?",
      })
      return { text: response.text }
    })

    return { gemini: result }
  }
)
