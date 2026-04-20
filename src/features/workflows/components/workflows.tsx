"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  EntityContainer,
  EntityEmpty,
  EntityError,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityLoading,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-components"
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useWorkflows,
} from "@/features/workflows/hooks/use-workflows"
import { useWorkflowParams } from "@/features/workflows/hooks/use-workflow-params"
import { useEntitySearch } from "@/hooks/use-entity-search"
import { formatDistanceToNow } from "date-fns"
import { GitBranch, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

// Header
export function WorkflowsHeader() {
  const { mutate: createWorkflow, isPending } = useCreateWorkflow()

  return (
    <EntityHeader
      title="Workflows"
      description="Build and manage your automation workflows"
      actions={
        <Button onClick={() => createWorkflow()} disabled={isPending} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Workflow
        </Button>
      }
    />
  )
}

// Search
export function WorkflowsSearch() {
  const { params, setParams } = useWorkflowParams()
  const { inputValue, setInputValue } = useEntitySearch(
    params.search,
    (value) => setParams({ search: value, page: 1 })
  )

  return (
    <EntitySearch
      value={inputValue}
      onChange={setInputValue}
      placeholder="Search workflows..."
    />
  )
}

// Pagination
export function WorkflowsPagination() {
  const { params, setParams } = useWorkflowParams()
  const { data } = useWorkflows(params)

  return (
    <EntityPagination
      page={params.page}
      totalPages={data.totalPages}
      onPageChange={(page) => setParams({ page })}
    />
  )
}

// Loading skeleton
export function WorkflowsLoading() {
  return <EntityLoading count={5} />
}

// Error state
export function WorkflowsError() {
  return <EntityError message="Failed to load workflows. Please try again." />
}

// Empty state
export function WorkflowsEmpty() {
  const { mutate: createWorkflow, isPending } = useCreateWorkflow()

  return (
    <EntityEmpty
      title="No workflows yet"
      description="Create your first workflow to get started with automation."
      action={
        <Button onClick={() => createWorkflow()} disabled={isPending}>
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      }
    />
  )
}

// Individual workflow item
interface WorkflowItemProps {
  workflow: {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
  }
}

export function WorkflowItem({ workflow }: WorkflowItemProps) {
  const router = useRouter()
  const { mutate: removeWorkflow, isPending } = useRemoveWorkflow()

  return (
    <EntityItem onClick={() => router.push(`/workflows/${workflow.id}`)}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <GitBranch className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{workflow.name}</p>
          <p className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(new Date(workflow.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            disabled={isPending}
            onClick={(e) => {
              e.stopPropagation()
              removeWorkflow({ id: workflow.id })
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </EntityItem>
  )
}

// List of workflows
function WorkflowListInner() {
  const { params } = useWorkflowParams()
  const { data } = useWorkflows(params)

  if (!data.workflows || data.workflows.length === 0) {
    return <WorkflowsEmpty />
  }

  return (
    <EntityList>
      {data.workflows.map((workflow) => (
        <WorkflowItem key={workflow.id} workflow={workflow} />
      ))}
    </EntityList>
  )
}

// Complete workflows list with suspense + error boundary
export function WorkflowsList() {
  return (
    <ErrorBoundary fallback={<WorkflowsError />}>
      <Suspense fallback={<WorkflowsLoading />}>
        <WorkflowListInner />
      </Suspense>
    </ErrorBoundary>
  )
}

// Main container
export function WorkflowsContainer() {
  return (
    <EntityContainer>
      <WorkflowsHeader />
      <WorkflowsSearch />
      <WorkflowsList />
      <Suspense>
        <WorkflowsPagination />
      </Suspense>
    </EntityContainer>
  )
}
