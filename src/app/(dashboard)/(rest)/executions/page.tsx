import { EntityContainer, EntityEmpty, EntityHeader } from "@/components/entity-components"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Executions - Nodebase",
}

export default function ExecutionsPage() {
  return (
    <EntityContainer>
      <EntityHeader
        title="Executions"
        description="View the history of your workflow executions"
      />
      <EntityEmpty
        title="No executions yet"
        description="Run a workflow to see execution history here."
      />
    </EntityContainer>
  )
}
