"use client"

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type OnConnect,
  type Node,
  type Edge,
  ReactFlowProvider,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useCallback } from "react"
import { useSetAtom } from "jotai"
import { editorInstanceAtom } from "@/features/editor/store/atoms"
import { AddNodeButton } from "./add-node-button"
import { InitialNode } from "@/components/initial-node"
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node"
import { HttpRequestNode } from "@/features/executions/components/http-request/node"
import { createId } from "@paralleldrive/cuid2"

const nodeTypes = {
  initial: InitialNode,
  manual_trigger: ManualTriggerNode,
  http_request: HttpRequestNode,
}

interface WorkflowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, unknown>
}

interface WorkflowConnection {
  id: string
  fromNodeId: string
  toNodeId: string
  fromOutput: string
  toInput: string
}

interface EditorProps {
  workflowId: string
  initialNodes?: WorkflowNode[]
  initialConnections?: WorkflowConnection[]
}

function EditorInner({ initialNodes, initialConnections }: EditorProps) {
  const setEditorInstance = useSetAtom(editorInstanceAtom)

  const flowNodes: Node[] = (initialNodes || []).map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }))

  const flowEdges: Edge[] = (initialConnections || []).map((conn) => ({
    id: conn.id,
    source: conn.fromNodeId,
    target: conn.toNodeId,
    sourceHandle: conn.fromOutput,
    targetHandle: conn.toInput,
  }))

  const [nodes, , onNodesChange] = useNodesState(flowNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges)

  const onConnect: OnConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge({ ...connection, id: createId() }, eds)
      ),
    [setEdges]
  )

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={(instance) => setEditorInstance(instance)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap />
        <AddNodeButton />
      </ReactFlow>
    </div>
  )
}

export function Editor(props: EditorProps) {
  return (
    <ReactFlowProvider>
      <EditorInner {...props} />
    </ReactFlowProvider>
  )
}
