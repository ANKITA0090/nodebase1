import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import prisma from "@/lib/database"
import { TRPCError } from "@trpc/server"
import { encrypt } from "@/lib/encryption"
import { CredentialType } from "@/generated/prisma"

export const credentialsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        type: z.nativeEnum(CredentialType),
        value: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const credential = await prisma.credential.create({
        data: {
          userId: ctx.auth.user.id,
          name: input.name,
          type: input.type,
          value: encrypt(input.value),
        },
      })
      return { id: credential.id, name: credential.name, type: credential.type, createdAt: credential.createdAt }
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const credential = await prisma.credential.findUnique({ where: { id: input.id } })
      if (!credential) throw new TRPCError({ code: "NOT_FOUND" })
      if (credential.userId !== ctx.auth.user.id) throw new TRPCError({ code: "FORBIDDEN" })
      await prisma.credential.delete({ where: { id: input.id } })
      return { success: true }
    }),

  getMany: protectedProcedure
    .input(z.object({ type: z.nativeEnum(CredentialType).optional() }))
    .query(async ({ ctx, input }) => {
      const credentials = await prisma.credential.findMany({
        where: {
          userId: ctx.auth.user.id,
          ...(input.type ? { type: input.type } : {}),
        },
        select: { id: true, name: true, type: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      })
      return credentials
    }),
})
