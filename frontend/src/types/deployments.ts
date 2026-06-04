export interface DeploymentMetric {
  name: string
  namespace: string

  desiredReplicas: number
  readyReplicas: number
  availableReplicas: number
  updatedReplicas: number
}