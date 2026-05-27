import { useEffect, useState } from "react"

function usePodLogs(
  namespace: string,
  pod: string,
) {

  const [logs, setLogs] =
    useState<string[]>([])

  useEffect(() => {

    if (!namespace || !pod) return

    const socket = new WebSocket(
      `ws://localhost:3000/ws/logs?namespace=${namespace}&pod=${pod}`
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