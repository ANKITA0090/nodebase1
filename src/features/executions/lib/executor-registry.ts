import type { Executor } from "@/features/executions/types"
import { manualTriggerExecutor } from "./executors/manual-trigger"
import { httpRequestExecutor } from "./executors/http-request"
import { googleFormTriggerExecutor } from "./executors/google-form-trigger"
import { stripeTriggerExecutor } from "./executors/stripe-trigger"
import { anthropicAiExecutor } from "./executors/anthropic-ai"
import { geminiAiExecutor } from "./executors/gemini-ai"
import { openAiExecutor } from "./executors/open-ai"
import { discordExecutor } from "./executors/discord"
import { slackExecutor } from "./executors/slack"

export const executorRegistry: Record<string, Executor> = {
  manual_trigger: manualTriggerExecutor,
  http_request: httpRequestExecutor,
  google_form_trigger: googleFormTriggerExecutor,
  stripe_trigger: stripeTriggerExecutor,
  anthropic_ai: anthropicAiExecutor,
  gemini_ai: geminiAiExecutor,
  open_ai: openAiExecutor,
  discord: discordExecutor,
  slack: slackExecutor,
}
