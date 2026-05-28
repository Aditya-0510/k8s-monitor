export interface ContainerInfo {
  name: string
  image: string
}

export interface PodDetails {
  name: string
  namespace: string
  node: string
  status: string

  cpuCores: number
  memoryMB: number

  restartCount?: number

  containers?: ContainerInfo[]
}