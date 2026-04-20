declare module "topo-sort" {
  export function topoSort(graph: Map<string, string[]>): string[]
}
