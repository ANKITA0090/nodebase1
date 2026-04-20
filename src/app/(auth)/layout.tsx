import { AuthLayout } from "@/features/auth/components/auth-layout"
import { requireUnauth } from "@/lib/auth-utils"

export default async function Layout({ children }: { children: React.ReactNode }) {
  await requireUnauth()
  return <AuthLayout>{children}</AuthLayout>
}
