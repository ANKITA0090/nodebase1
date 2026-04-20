import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init"
import prisma from "@/lib/database"
import { generateSlug } from "random-word-slugs"
import { TRPCError } from "@trpc/server"
import { pagination } from "@/config/constants"
import type { PrismaClient, NodeType } from "@/generated/prisma"
import { inngest } from "@/inngest/client"

type PrismaTransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const name = generateSlug(2, { format: "title" })
    const workflow = await prisma.workflow.create({
      data: {
        name,
        userId: ctx.auth.user.id,
        nodes: {
          create: {
            type: "initial",
            position: { x: 0, y: 0 },
            data: {},
          },
        },
      },
    })
    return workflow
  }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUnique({
        where: { id: input.id },
      })
      if (!workflow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Workflow not found" })
      }
      if (workflow.userId !== ctx.auth.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" })
      }
      await prisma.workflow.delete({ where: { id: input.id } })
      return { success: true }
    }),

  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1).max(100) }))
    .mutation(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUnique({
        where: { id: input.id },
      })
      if (!workflow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Workflow not found" })
      }
      if (workflow.userId !== ctx.auth.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" })
      }
      const updated = await prisma.workflow.update({
        where: { id: input.id },
        data: { name: input.name },
      })
      return updated
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nodes: z
          .array(
            z.object({
              id: z.string(),
              type: z.string(),
              position: z.object({ x: z.number(), y: z.number() }),
              data: z.record(z.string(), z.unknown()),
            })
          )
          .optional(),
        connections: z
          .array(
            z.object({
              id: z.string(),
              fromNodeId: z.string(),
              toNodeId: z.string(),
              fromOutput: z.string().default("main"),
              toInput: z.string().default("main"),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUnique({
        where: { id: input.id },
        include: { nodes: true, connections: true },
      })
      if (!workflow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Workflow not found" })
      }
      if (workflow.userId !== ctx.auth.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" })
      }

      await prisma.$transaction(async (tx: PrismaTransactionClient) => {
        if (input.nodes !== undefined) {
          await tx.node.deleteMany({ where: { workflowId: input.id } })
          for (const node of input.nodes) {
            await tx.node.create({
              data: {
                id: node.id,
                workflowId: input.id,
                type: node.type as NodeType,
                position: node.position as object,
                data: node.data as object,
              },
            })
          }
        }

        if (input.connections !== undefined) {
          await tx.connection.deleteMany({ where: { workflowId: input.id } })
          for (const conn of input.connections) {
            await tx.connection.create({
              data: {
                id: conn.id,
                workflowId: input.id,
                fromNodeId: conn.fromNodeId,
                toNodeId: conn.toNodeId,
                fromOutput: conn.fromOutput,
                toInput: conn.toInput,
              },
            })
          }
        }
      })

      return { success: true }
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUnique({
        where: { id: input.id },
        include: {
          nodes: true,
          connections: true,
        },
      })
      if (!workflow) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Workflow not found" })
      }
      if (workflow.userId !== ctx.auth.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" })
      }
      return workflow
    }),

  execute: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUnique({ where: { id: input.id } })
      if (!workflow) throw new TRPCError({ code: "NOT_FOUND", message: "Workflow not found" })
      if (workflow.userId !== ctx.auth.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" })
      const result = await inngest.send({
        name: "workflow/execute",
        data: { workflowId: input.id, userId: ctx.auth.user.id },
      })
      return { eventId: result.ids[0] }
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().int().min(1).default(pagination.defaultPage),
        pageSize: z
          .number()
          .int()
          .min(pagination.minPageSize)
          .max(pagination.maxPageSize)
          .default(pagination.defaultPageSize),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input
      const skip = (page - 1) * pageSize

      const where = {
        userId: ctx.auth.user.id,
        ...(search
          ? { name: { contains: search, mode: "insensitive" as const } }
          : {}),
      }

      const [workflows, total] = await Promise.all([
        prisma.workflow.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { updatedAt: "desc" },
        }),
        prisma.workflow.count({ where }),
      ])

      return {
        workflows,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      }
    }),
})
