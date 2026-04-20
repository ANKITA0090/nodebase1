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
import { FileText } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useReactFlow } from "@xyflow/react"

const schema = z.object({
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^\w+$/, "Only letters, numbers and underscores allowed"),
})

type FormValues = z.infer<typeof schema>

interface GoogleFormTriggerDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
  nodeId?: string
}

export function GoogleFormTriggerDialogue({
  open,
  onOpenChange,
  data,
  nodeId,
}: GoogleFormTriggerDialogueProps) {
  const { updateNodeData } = useReactFlow()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      variableName: (data?.variableName as string) || "",
    },
  })

  const onSubmit = (values: FormValues) => {
    if (nodeId) updateNodeData(nodeId, values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <DialogTitle>Google Form Trigger</DialogTitle>
          </div>
          <DialogDescription>
            Triggers when a Google Form is submitted via webhook.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Variable Name</Label>
            <Input placeholder="formData" {...register("variableName")} />
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
