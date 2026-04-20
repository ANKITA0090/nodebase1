import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server"
import { pagination } from "@/config/constants"

export const workflowParams = {
  page: parseAsInteger.withDefault(pagination.defaultPage),
  pageSize: parseAsInteger.withDefault(pagination.defaultPageSize),
  search: parseAsString.withDefault(""),
}

export const workflowParamsCache = createSearchParamsCache(workflowParams)
