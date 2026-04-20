import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { polar, checkout, portal } from "@polar-sh/better-auth"
import prisma from "@/lib/database"
import { polarClient } from "@/lib/polar"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: process.env.POLAR_PRODUCT_ID || "",
              slug: "pro",
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL || "/",
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
})
