"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  GitBranch,
  KeyRound,
  PlayCircle,
  Sparkles,
  Workflow,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"

const navItems = [
  {
    title: "Workflows",
    href: "/workflows",
    icon: GitBranch,
  },
  {
    title: "Credentials",
    href: "/credentials",
    icon: KeyRound,
  },
  {
    title: "Executions",
    href: "/executions",
    icon: PlayCircle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useUpgradeModal()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Workflow className="h-4 w-4" />
          </div>
          <span className="font-bold">Nodebase</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-2 p-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={openModal}
          >
            <Sparkles className="h-4 w-4" />
            Upgrade to Pro
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
