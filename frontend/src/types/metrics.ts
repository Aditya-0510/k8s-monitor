export interface NodeMetric {
  name: string
  cpuCores: number
  memoryMB: number
}

export interface PodMetric {
  name: string
  namespace: string
  cpuCores: number
  memoryMB: number
}