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
import { Globe } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useReactFlow } from "@xyflow/react"

const schema = z.object({
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^\w+$/, "Only letters, numbers and underscores allowed"),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  url: z.string().min(1, "URL is required"),
  body: z.string().optional(),
  headers: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface HttpRequestDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
  nodeId?: string
}

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const

export function HttpRequestDialogue({
  open,
  onOpenChange,
  data,
  nodeId,
}: HttpRequestDialogueProps) {
  const { updateNodeData } = useReactFlow()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      variableName: (data?.variableName as string) || "",
      method: ((data?.method as string) || "GET") as FormValues["method"],
      url: (data?.url as string) || "",
      body: (data?.body as string) || "",
      headers: (data?.headers as string) || "",
    },
  })

  const method = watch("method")

  const onSubmit = (values: FormValues) => {
    if (nodeId) {
      updateNodeData(nodeId, values)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <DialogTitle>HTTP Request</DialogTitle>
          </div>
          <DialogDescription>
            Configure the HTTP request settings for this node.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Variable Name</Label>
            <Input placeholder="response" {...register("variableName")} />
            {errors.variableName && (
              <p className="text-xs text-destructive">{errors.variableName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Method</Label>
            <Select value={method} onValueChange={(v) => setValue("method", v as FormValues["method"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HTTP_METHODS.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>URL</Label>
            <Input placeholder="https://api.example.com/endpoint" {...register("url")} />
            {errors.url && (
              <p className="text-xs text-destructive">{errors.url.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Body</Label>
            <Textarea
              placeholder='{"key": "{{variableName}}"}'
              className="min-h-20 font-mono text-xs"
              {...register("body")}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Headers (JSON)</Label>
            <Textarea
              placeholder='{"Content-Type": "application/json"}'
              className="min-h-15 font-mono text-xs"
              {...register("headers")}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
