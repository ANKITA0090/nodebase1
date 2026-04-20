import { AppHeader } from "@/components/app-header"

export default function RestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}
