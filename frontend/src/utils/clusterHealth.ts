import type {
  PodMetric,
  NodeMetric,
} from "../types/metrics"

import type {
  DeploymentMetric,
} from "../types/deployments"

interface Result {
  score: number
  status: string
  alerts: string[]
}

export function calculateClusterHealth(
  nodes: NodeMetric[],
  pods: PodMetric[],
  deployments: DeploymentMetric[],
): Result {

  let score = 100

  const alerts: string[] = []

  // HIGH CPU

  const highCpuNodes =
    nodes.filter(
      (node) => node.cpuCores > 2
    )

  if (highCpuNodes.length > 0) {

    score -= 10

    alerts.push(
      `High CPU usage on ${highCpuNodes.length} node(s)`
    )
  }

  // HIGH MEMORY

  const highMemoryNodes =
    nodes.filter(
      (node) => node.memoryMB > 7000
    )

  if (highMemoryNodes.length > 0) {

    score -= 10

    alerts.push(
      `High memory usage detected`
    )
  }

  // POD RESTARTS

  const restartingPods =
    pods.filter(
      (pod) => pod.restartCount > 0
    )

  if (restartingPods.length > 0) {

    score -= restartingPods.length * 5

    alerts.push(
      `${restartingPods.length} pod(s) restarting`
    )
  }

  // FAILED PODS

  const failedPods =
    pods.filter(
      (pod) =>
        pod.status !== "Running"
    )

  if (failedPods.length > 0) {

    score -= failedPods.length * 10

    alerts.push(
      `${failedPods.length} unhealthy pod(s)`
    )
  }

  // DEPLOYMENT HEALTH

  const unhealthyDeployments =
    deployments.filter(
      (deployment) =>
        deployment.availableReplicas <
        deployment.desiredReplicas
    )

  if (unhealthyDeployments.length > 0) {

    score -= unhealthyDeployments.length * 10

    alerts.push(
      `${unhealthyDeployments.length} deployment(s) unhealthy`
    )
  }

  if (score < 0) {
    score = 0
  }

  let status = "Healthy"

  if (score < 90) {
    status = "Warning"
  }

  if (score < 70) {
    status = "Critical"
  }

  return {
    score,
    status,
    alerts,
  }
}