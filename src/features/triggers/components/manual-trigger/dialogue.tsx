"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Hand } from "lucide-react"

interface ManualTriggerDialogueProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data?: Record<string, unknown>
}

export function ManualTriggerDialogue({
  open,
  onOpenChange,
  data,
}: ManualTriggerDialogueProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Hand className="h-5 w-5" />
            <DialogTitle>Manual Trigger</DialogTitle>
          </div>
          <DialogDescription>
            This trigger starts the workflow when executed manually. No additional
            configuration is required.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            When a workflow with this trigger is executed, it will run immediately
            without waiting for an external event.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
