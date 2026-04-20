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
import { CreditCard } from "lucide-react"
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

interface StripeTriggerDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
  nodeId?: string
}

export function StripeTriggerDialogue({
  open,
  onOpenChange,
  data,
  nodeId,
}: StripeTriggerDialogueProps) {
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
            <CreditCard className="h-5 w-5" />
            <DialogTitle>Stripe Trigger</DialogTitle>
          </div>
          <DialogDescription>
            Triggers when a Stripe webhook event is received.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Variable Name</Label>
            <Input placeholder="stripeEvent" {...register("variableName")} />
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
