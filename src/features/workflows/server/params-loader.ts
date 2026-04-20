import { workflowParamsCache } from "@/features/workflows/params"

export async function loadWorkflowParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>
) {
  return workflowParamsCache.parse(await searchParams)
}
