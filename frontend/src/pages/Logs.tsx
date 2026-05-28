import { useState } from "react"

import useDashboardData from "../hooks/useDashboardData"
import usePodLogs from "../hooks/usePodLogs"

function Logs() {

  const {
    podMetrics,
  } = useDashboardData()

  const [selectedPod, setSelectedPod] =
    useState("")

  const [selectedNamespace, setSelectedNamespace] =
    useState("")

  const logs = usePodLogs(
    selectedNamespace,
    selectedPod,
  )

  return (
    <div>

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        Live Pod Logs
      </h1>

      <select
        onChange={(e) => {

          const value =
            e.target.value

          const [namespace, pod] =
            value.split("|")

          setSelectedNamespace(namespace)
          setSelectedPod(pod)
        }}
        className="
          bg-slate-800
          border border-slate-700
          rounded-xl
          px-4 py-3
          mb-6
          w-full
        "
      >

        <option>
          Select Pod
        </option>

        {podMetrics.map((pod) => (

          <option
            key={pod.name}
            value={`${pod.namespace}|${pod.name}`}
          >

            {pod.namespace} / {pod.name}

          </option>

        ))}

      </select>

      <div className="
        bg-[#0d1117]
        rounded-2xl
        p-6
        h-[700px]
        overflow-y-auto
        font-mono
        text-sm
        border border-slate-800
        shadow-inner
        rounded-2xl
      ">

        {logs.map((log, index) => (

         <div
  key={index}
  className={`
    mb-1
    whitespace-pre-wrap
    break-words
    leading-6

    ${
      log.includes("ERROR")
        ? "text-red-400"

      : log.includes("WARN")
        ? "text-yellow-400"

      : log.includes("INFO")
        ? "text-blue-400"

      : "text-green-400"
    }
  `}
>

  {log}

</div>

        ))}

      </div>

    </div>
  )
}

export default Logs