export interface PodDetails {
  name: string
  namespace: string
  node: string
  status: string

  cpuCores: number
  memoryMB: number
}