import { useEffect, useState } from "react"
import api from "../services/api"
import type { NodeMetric, PodMetric } from "../types/metrics"

function useDashboardData() {

  const [nodeMetrics, setNodeMetrics] = useState<NodeMetric[]>([])
  const [podMetrics, setPodMetrics] = useState<PodMetric[]>([])
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)
  const [namespaces, setNamespaces] = useState<string[]>([])

  
  async function fetchData() {

    try {
      const deploymentResponse =
        await api.get("/deployments")

      setDeployments(
        deploymentResponse.data.deployments
      ) 

      const namespaceResponse =
        await api.get("/namespaces")

      setNamespaces(
        namespaceResponse.data.namespaces
      )

      const nodeResponse =
        await api.get("/metrics/nodes")

      const podResponse =
        await api.get("/metrics/pods")

      setNodeMetrics(nodeResponse.data.nodes)

      setPodMetrics(podResponse.data.pods)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  return {
    nodeMetrics,
    podMetrics,
    deployments,
    loading,
    namespaces,
  }
}

export default useDashboardData