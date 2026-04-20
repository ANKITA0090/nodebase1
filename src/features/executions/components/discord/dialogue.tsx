"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useReactFlow } from "@xyflow/react"
import { Suspense } from "react"
import { useCredentials } from "@/features/credentials/hooks/use-credentials"

const schema = z.object({
  message: z.string().min(1, "Message is required"),
  credentialId: z.string().min(1, "Credential is required"),
})

type FormValues = z.infer<typeof schema>

interface DiscordDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
  nodeId?: string
}

function CredentialSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { data: credentials } = useCredentials("discord")
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select credential" />
      </SelectTrigger>
      <SelectContent>
        {credentials.map((c) => (
          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function DiscordDialogue({ open, onOpenChange, data, nodeId }: DiscordDialogueProps) {
  const { updateNodeData } = useReactFlow()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: (data?.message as string) || "",
      credentialId: (data?.credentialId as string) || "",
    },
  })

  const credentialId = watch("credentialId")

  const onSubmit = (values: FormValues) => {
    if (nodeId) updateNodeData(nodeId, values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <DialogTitle>Discord</DialogTitle>
          </div>
          <DialogDescription>
            Send a message to Discord via webhook.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Credential (Webhook URL)</Label>
            <Suspense fallback={<div className="h-9 bg-muted rounded-md animate-pulse" />}>
              <CredentialSelect value={credentialId} onChange={(v) => setValue("credentialId", v)} />
            </Suspense>
            {errors.credentialId && (
              <p className="text-xs text-destructive">{errors.credentialId.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Message</Label>
            <Textarea placeholder="Hello from Nodebase!" className="min-h-20" {...register("message")} />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
