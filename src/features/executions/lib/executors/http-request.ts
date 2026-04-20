import ky from "ky"
import Handlebars from "handlebars"
import { decode } from "html-entities"
import type { Executor } from "@/features/executions/types"

export const httpRequestExecutor: Executor = async ({ node, executionResults }) => {
  const data = node.data as Record<string, unknown>
  const method = (data.method as string) || "GET"
  const rawUrl = (data.url as string) || ""
  const variableName = (data.variableName as string) || "response"
  const rawBody = (data.body as string) || ""
  const rawHeaders = (data.headers as string) || "{}"

  const templateCtx = Object.values(executionResults).reduce<Record<string, unknown>>(
    (acc, result) => ({ ...acc, ...result }),
    {}
  )

  const url = Handlebars.compile(rawUrl)(templateCtx)
  const body = rawBody ? Handlebars.compile(rawBody)(templateCtx) : undefined
  const headersRaw = Handlebars.compile(rawHeaders)(templateCtx)

  let headers: Record<string, string> = {}
  try {
    headers = JSON.parse(headersRaw)
  } catch {
    headers = {}
  }

  try {
    const options: Parameters<typeof ky>[1] = {
      method,
      headers,
      throwHttpErrors: false,
    }

    if (body && method !== "GET" && method !== "HEAD") {
      const decodedBody = decode(body)
      options.body = decodedBody
    }

    const response = await ky(url, options)
    let responseData: unknown
    const contentType = response.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }

    return {
      success: true,
      output: { [variableName]: responseData },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "HTTP request failed",
    }
  }
}
