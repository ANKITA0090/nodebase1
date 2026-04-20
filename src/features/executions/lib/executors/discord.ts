import ky from "ky"
import { decode } from "html-entities"
import prisma from "@/lib/database"
import { decrypt } from "@/lib/encryption"
import type { Executor } from "@/features/executions/types"

export const discordExecutor: Executor = async ({ node, userId }) => {
  const data = node.data as Record<string, unknown>
  const rawMessage = (data.message as string) || ""
  const credentialId = data.credentialId as string | undefined

  if (!credentialId) {
    return { success: false, error: "No credential selected for Discord" }
  }

  try {
    const credential = await prisma.credential.findFirst({
      where: { id: credentialId, userId, type: "discord" },
    })

    if (!credential) {
      return { success: false, error: "Discord credential not found" }
    }

    const webhookUrl = decrypt(credential.value)
    const message = decode(rawMessage)

    await ky.post(webhookUrl, {
      json: { content: message },
    })

    return { success: true, output: {} }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Discord webhook failed",
    }
  }
}
