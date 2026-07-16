import type { NodeMetric, PodMetric } from "../types/metrics"
import type { DeploymentMetric } from "../types/deployments"
import type { Alert } from "../types/alerts"

export function generateAlerts(
  nodes: NodeMetric[],
  pods: PodMetric[],
  deployments: DeploymentMetric[],
): Alert[] {

  const alerts: Alert[] = []

  nodes.forEach((node) => {

    if (node.cpuCores > 2) {

      alerts.push({
        id: crypto.randomUUID(),

        severity: "warning",

        message:
          `High CPU usage on ${node.name}`,

        timestamp:
          new Date().toLocaleTimeString(),
      })
    }
  })

  nodes.forEach((node) => {

    if (node.memoryMB > 7000) {

      alerts.push({
        id: crypto.randomUUID(),

        severity: "warning",

        message:
          `High memory usage on ${node.name}`,

        timestamp:
          new Date().toLocaleTimeString(),
      })
    }
  })

  // pods.forEach((pod) => {

  //   if (pod.restartCount > 0) {

  //     alerts.push({
  //       id: crypto.randomUUID(),

  //       severity: "critical",

  //       message:
  //         `${pod.name} restarting frequently`,

  //       timestamp:
  //         new Date().toLocaleTimeString(),
  //     })
  //   }
  // })

  const unhealthyStates = [
  "Pending",
  "ImagePullBackOff",
  "ErrImagePull",
  "CrashLoopBackOff",
  "Failed",
  "Unknown",
]

pods.forEach((pod) => {

  if (
    pod.restartCount > 3 &&
    unhealthyStates.includes(pod.status)
  ) {

    alerts.push({
      id: crypto.randomUUID(),

      severity: "critical",

      message:
        `${pod.name} has restarted ${pod.restartCount} times`,

      timestamp:
        new Date().toLocaleTimeString(),
    })
  }
})

pods.forEach((pod) => {

  if (unhealthyStates.includes(pod.status)) {

    alerts.push({
      id: crypto.randomUUID(),

      severity: "critical",

      message:
        `${pod.name} unhealthy (${pod.status})`,

      timestamp:
        new Date().toLocaleTimeString(),
    })
  }
})

  deployments.forEach((deployment) => {

    if (
      deployment.availableReplicas <
      deployment.desiredReplicas
    ) {

      alerts.push({
        id: crypto.randomUUID(),

        severity: "warning",

        message:
          `${deployment.name} deployment unhealthy`,

        timestamp:
          new Date().toLocaleTimeString(),
      })
    }
  })

  return alerts
}