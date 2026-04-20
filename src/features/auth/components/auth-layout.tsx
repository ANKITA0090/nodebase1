import { cn } from "@/lib/utils"
import { Workflow } from "lucide-react"
import React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/50 p-6 md:p-10">
      <div className={cn("w-full max-w-sm space-y-6", className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Workflow className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Nodebase</span>
        </div>
        {children}
      </div>
    </div>
  )
}
