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
import { Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useReactFlow } from "@xyflow/react"

const schema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^\w+$/, "Only letters, numbers and underscores allowed"),
})

type FormValues = z.infer<typeof schema>

interface GeminiAiDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
  nodeId?: string
}

export function GeminiAiDialogue({ open, onOpenChange, data, nodeId }: GeminiAiDialogueProps) {
  const { updateNodeData } = useReactFlow()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: (data?.prompt as string) || "",
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
            <Sparkles className="h-5 w-5" />
            <DialogTitle>Gemini AI</DialogTitle>
          </div>
          <DialogDescription>
            Generate text using Google Gemini AI.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Prompt</Label>
            <Textarea
              placeholder="Enter your prompt here..."
              className="min-h-20"
              {...register("prompt")}
            />
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
