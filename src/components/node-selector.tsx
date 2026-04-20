"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Globe, Hand } from "lucide-react"
import { useReactFlow } from "@xyflow/react"
import { createId } from "@paralleldrive/cuid2"

interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availableNodes = [
  {
    type: "manual_trigger",
    label: "Manual Trigger",
    description: "Start workflow manually",
    icon: Hand,
    category: "Triggers",
  },
  {
    type: "http_request",
    label: "HTTP Request",
    description: "Make an HTTP API request",
    icon: Globe,
    category: "Actions",
  },
]

export function NodeSelector({ open, onOpenChange }: NodeSelectorProps) {
  const { addNodes, screenToFlowPosition } = useReactFlow()

  const handleAddNode = (type: string) => {
    const position = screenToFlowPosition({ x: 200, y: 200 })
    addNodes({
      id: createId(),
      type,
      position,
      data: {},
    })
    onOpenChange(false)
  }

  const categories = Array.from(new Set(availableNodes.map((n) => n.category)))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Add Node</SheetTitle>
          <SheetDescription>
            Select a node type to add to your workflow
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {category}
              </h3>
              <div className="space-y-2">
                {availableNodes
                  .filter((n) => n.category === category)
                  .map((node) => (
                    <Button
                      key={node.type}
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-3"
                      onClick={() => handleAddNode(node.type)}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <node.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{node.label}</p>
                        <p className="text-xs text-muted-foreground">{node.description}</p>
                      </div>
                    </Button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
