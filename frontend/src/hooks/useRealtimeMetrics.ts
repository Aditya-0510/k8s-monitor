import { useEffect, useState } from "react"

import type { NodeMetric } from "../types/metrics"

function useRealtimeMetrics() {

  const [nodes, setNodes] =
    useState<NodeMetric[]>([])

  useEffect(() => {

    const socket = new WebSocket(
      "ws://localhost:3000/ws/metrics"
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