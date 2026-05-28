export interface ContainerInfo {
  name: string
  image: string
}

export interface NodeMetric {
  name: string

  cpuCores: number
  memoryMB: number
}

export interface PodMetric {
  name: string
  namespace: string

  node: string
  status: string

  cpuCores: number
  memoryMB: number

  restartCount: number

  containers: ContainerInfo[]
}