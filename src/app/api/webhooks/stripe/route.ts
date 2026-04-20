import { inngest } from "@/inngest/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))

  await inngest.send({
    name: "trigger/stripe",
    data: body,
  })

  return NextResponse.json({ success: true })
}
