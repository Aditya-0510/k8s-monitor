import { useEffect, useState } from "react"

import api from "../services/api"

interface CpuPoint {
  time: string
  cpu: number
}

function useCpuHistory() {

  const [data, setData] =
    useState<CpuPoint[]>([])

  useEffect(() => {

    async function fetchHistory() {

      try {

        const response =
          await api.get(
            "/prometheus/cpu-history"
          )

        const result =
          response.data.data[0]

        if (!result) return

        const formatted =
          result.values.map(
            (value: [number, string]) => {

              return {
                time: new Date(
                  value[0] * 1000
                ).toLocaleTimeString(),

                cpu: parseFloat(value[1]),
              }
            }
          )

        setData(formatted)

      } catch (error) {

        console.error(error)
      }
    }

    fetchHistory()

  }, [])

  return data
}

export default useCpuHistory