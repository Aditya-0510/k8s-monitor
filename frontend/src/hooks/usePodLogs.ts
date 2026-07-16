import { useEffect, useState } from "react"

function usePodLogs(
  namespace: string,
  pod: string,
) {

  const [logs, setLogs] =
    useState<string[]>([])

  useEffect(() => {

    if (!namespace || !pod) return
    const apiUrl = import.meta.env.VITE_API_URL
    const wsUrl = apiUrl
      .replace("https://", "wss://")
      .replace("http://", "ws://")
    const socket = new WebSocket(
      `${wsUrl}/ws/logs?namespace=${namespace}&pod=${pod}`
    )

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data)

      setLogs((prev) => [
        ...prev,
        data.log,
      ].slice(-200))
    }

    return () => {
      socket.close()
    }

  }, [namespace, pod])

  return logs
}

export default usePodLogs