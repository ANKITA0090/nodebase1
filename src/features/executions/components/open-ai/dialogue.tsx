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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bot } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useReactFlow } from "@xyflow/react"
import { Suspense } from "react"
import { useCredentials } from "@/features/credentials/hooks/use-credentials"

const schema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^\w+$/, "Only letters, numbers and underscores allowed"),
  credentialId: z.string().min(1, "Credential is required"),
})

type FormValues = z.infer<typeof schema>

interface OpenAiDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
  nodeId?: string
}

function CredentialSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { data: credentials } = useCredentials("open_ai")
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

export function OpenAiDialogue({ open, onOpenChange, data, nodeId }: OpenAiDialogueProps) {
  const { updateNodeData } = useReactFlow()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: (data?.prompt as string) || "",
      variableName: (data?.variableName as string) || "",
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
            <Bot className="h-5 w-5" />
            <DialogTitle>OpenAI</DialogTitle>
          </div>
          <DialogDescription>
            Generate text using OpenAI GPT models.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Credential</Label>
            <Suspense fallback={<div className="h-9 bg-muted rounded-md animate-pulse" />}>
              <CredentialSelect value={credentialId} onChange={(v) => setValue("credentialId", v)} />
            </Suspense>
            {errors.credentialId && (
              <p className="text-xs text-destructive">{errors.credentialId.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Prompt</Label>
            <Textarea placeholder="Enter your prompt here..." className="min-h-20" {...register("prompt")} />
            {errors.prompt && (
              <p className="text-xs text-destructive">{errors.prompt.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Variable Name</Label>
            <Input placeholder="aiResponse" {...register("variableName")} />
            {errors.variableName && (
              <p className="text-xs text-destructive">{errors.variableName.message}</p>
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
