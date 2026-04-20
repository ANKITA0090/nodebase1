"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { authClient } from "@/lib/auth-client"
import { Sparkles } from "lucide-react"

export function UpgradeModal() {
  const { open, closeModal } = useUpgradeModal()

  const handleUpgrade = async () => {
    await authClient.checkout({ slug: "pro" })
    closeModal()
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center">
            Unlock premium features including unlimited workflows, advanced
            nodes, and priority support.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Unlimited workflows
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Advanced AI nodes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> HTTP request nodes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Priority support
            </li>
          </ul>
          <Button className="w-full" onClick={handleUpgrade}>
            Upgrade to Pro
          </Button>
          <Button variant="ghost" className="w-full" onClick={closeModal}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
