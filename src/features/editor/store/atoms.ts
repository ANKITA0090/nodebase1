import { atom } from "jotai"
import type { ReactFlowInstance } from "@xyflow/react"

export const editorInstanceAtom = atom<ReactFlowInstance | null>(null)
