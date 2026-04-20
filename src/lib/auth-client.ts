import { createAuthClient } from "better-auth/react"
import { polarClient as polarPlugin } from "@polar-sh/better-auth"

export const authClient = createAuthClient({
  plugins: [polarPlugin()],
})
