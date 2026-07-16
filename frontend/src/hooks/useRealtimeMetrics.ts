import { useEffect, useState } from "react"

import type { NodeMetric } from "../types/metrics"

function useRealtimeMetrics() {

  const [nodes, setNodes] =
    useState<NodeMetric[]>([])

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    const wsUrl = apiUrl
      .replace("https://", "wss://")
      .replace("http://", "ws://")
    const socket = new WebSocket(
      `${wsUrl}/ws/metrics`
    )

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data)

      setNodes(data.nodes)
    }

    socket.onerror = (error) => {
      console.error(error)
    }

    return () => {
      socket.close()
    }

  }, [])

  return nodes
}

export default useRealtimeMetrics