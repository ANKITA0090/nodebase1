import { LoginForm } from "@/features/auth/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - Nodebase",
}

export default function LoginPage() {
  return <LoginForm />
}
