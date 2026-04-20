"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCreateCredential } from "@/features/credentials/hooks/use-credentials"
import { CredentialType } from "@/generated/prisma"

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.nativeEnum(CredentialType),
  value: z.string().min(1, "Value is required"),
})

type FormValues = z.infer<typeof schema>

const CREDENTIAL_TYPE_LABELS: Record<CredentialType, string> = {
  http_request: "HTTP Request",
  anthropic_ai: "Anthropic AI",
  open_ai: "OpenAI",
  discord: "Discord",
  slack: "Slack",
}

interface CreateCredentialDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCredentialDialog({ open, onOpenChange }: CreateCredentialDialogProps) {
  const { mutate, isPending } = useCreateCredential()

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", type: CredentialType.http_request, value: "" },
  })

  const type = watch("type")

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Credential</DialogTitle>
          <DialogDescription>
            Store an API key or secret securely.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input placeholder="My Discord Webhook" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setValue("type", v as CredentialType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CredentialType).map((t) => (
                  <SelectItem key={t} value={t}>{CREDENTIAL_TYPE_LABELS[t]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Value</Label>
            <Input type="password" placeholder="API key or webhook URL" {...register("value")} />
            {errors.value && <p className="text-xs text-destructive">{errors.value.message}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
