import { EntityContainer, EntityEmpty, EntityHeader } from "@/components/entity-components"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Credentials - Nodebase",
}

export default function CredentialsPage() {
  return (
    <EntityContainer>
      <EntityHeader
        title="Credentials"
        description="Manage your API keys and credentials for integrations"
      />
      <EntityEmpty
        title="No credentials yet"
        description="Add credentials to authenticate with external services."
      />
    </EntityContainer>
  )
}
