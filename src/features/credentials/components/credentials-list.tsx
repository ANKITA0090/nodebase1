"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useCredentials, useRemoveCredential } from "@/features/credentials/hooks/use-credentials"

const CREDENTIAL_TYPE_LABELS: Record<string, string> = {
  http_request: "HTTP Request",
  anthropic_ai: "Anthropic AI",
  open_ai: "OpenAI",
  discord: "Discord",
  slack: "Slack",
}

export function CredentialsList() {
  const { data: credentials } = useCredentials()
  const { mutate: remove, isPending } = useRemoveCredential()

  if (credentials.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No credentials yet. Add one to get started.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {credentials.map((credential) => (
        <div
          key={credential.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p className="font-medium text-sm">{credential.name}</p>
            <p className="text-xs text-muted-foreground">
              {CREDENTIAL_TYPE_LABELS[credential.type] ?? credential.type}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive"
            disabled={isPending}
            onClick={() => remove({ id: credential.id })}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
