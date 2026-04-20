import { RegisterForm } from "@/features/auth/components/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Nodebase",
}

export default function SignUpPage() {
  return <RegisterForm />
}
