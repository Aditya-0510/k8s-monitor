import { useEffect, useState } from "react"

interface ClusterEvent {
  type: string

  object: {
    reason: string
    message: string

    involvedObject: {
      kind: string
      name: string
    }
  }
}

function useClusterEvents() {

  const [events, setEvents] =
    useState<ClusterEvent[]>([])

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    const wsUrl = apiUrl
    .replace("https://", "wss://")
    .replace("http://", "ws://")

    const socket = new WebSocket(
      `${wsUrl}/ws/events`
    )

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data)

      setEvents((prev) => [
        data,
        ...prev,
      ].slice(0, 20))
    }

    return () => {
      socket.close()
    }

  }, [])

  return events
}

export default useClusterEvents