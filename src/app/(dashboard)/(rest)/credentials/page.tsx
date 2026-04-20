"use client"

import { EntityContainer, EntityHeader } from "@/components/entity-components"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState, Suspense } from "react"
import { CreateCredentialDialog } from "@/features/credentials/components/create-credential-dialog"
import { CredentialsList } from "@/features/credentials/components/credentials-list"

export default function CredentialsPage() {
  const [open, setOpen] = useState(false)

  return (
    <EntityContainer>
      <EntityHeader
        title="Credentials"
        description="Manage your API keys and credentials for integrations"
        actions={
          <Button size="sm" onClick={() => setOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Credential
          </Button>
        }
      />
      <Suspense fallback={<div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>}>
        <CredentialsList />
      </Suspense>
      <CreateCredentialDialog open={open} onOpenChange={setOpen} />
    </EntityContainer>
  )
}
