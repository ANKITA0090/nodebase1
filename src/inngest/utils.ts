import { topoSort } from "topo-sort"
import type { Node, Connection } from "@/generated/prisma"

export function getSortedNodes(nodes: Node[], connections: Connection[]): Node[] {
  const adjacency = new Map<string, string[]>()
  for (const node of nodes) adjacency.set(node.id, [])
  for (const conn of connections) {
    const deps = adjacency.get(conn.toNodeId) || []
    deps.push(conn.fromNodeId)
    adjacency.set(conn.toNodeId, deps)
  }
  const sorted = topoSort(adjacency)
  return sorted.map(id => nodes.find(n => n.id === id)!).filter(Boolean)
}
