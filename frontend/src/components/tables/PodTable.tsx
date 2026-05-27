import type { PodMetric } from "../../types/metrics"
import type { PodDetails } from "../../types/pod"

import StatusBadge from "../common/StatusBadge"

interface Props {
  pods: PodMetric[]

  onSelectPod?: (
    pod: PodDetails
  ) => void
}

function PodTable({
  pods,
  onSelectPod,
}: Props) {

  return (
    <div className="
      bg-slate-800
      rounded-2xl
      p-6
      shadow-lg
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Pod Metrics
        </h2>

        <div className="
          text-sm
          text-slate-400
        ">
          Total Pods: {pods.length}
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="
              text-left
              text-slate-400
              border-b
              border-slate-700
            ">

              <th className="pb-4">
                Pod Name
              </th>

              <th className="pb-4">
                Namespace
              </th>

              <th className="pb-4">
                CPU
              </th>

              <th className="pb-4">
                Memory
              </th>

              <th className="pb-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {pods.map((pod) => {

              const status =
                pod.cpuCores > 0.05
                  ? "Warning"
                  : "Healthy"

              return (

                <tr
                  key={pod.name}

                  onClick={() =>
                    onSelectPod?.({
                      name: pod.name,
                      namespace: pod.namespace,
                      node: pod.node,
                      status: status,
                      cpuCores: pod.cpuCores,
                      memoryMB: pod.memoryMB,
                    })
                  }

                  className="
                    border-b
                    border-slate-700

                    hover:bg-slate-700/40

                    transition-colors

                    cursor-pointer
                  "
                >

                  <td className="
                    py-4
                    font-medium
                  ">
                    {pod.name}
                  </td>

                  <td className="py-4">

                    <span className="
                      bg-slate-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    ">
                      {pod.namespace}
                    </span>

                  </td>

                  <td className="py-4">

                    <span className="font-mono">
                      {pod.cpuCores.toFixed(3)} cores
                    </span>

                  </td>

                  <td className="py-4">

                    <span className="font-mono">
                      {pod.memoryMB.toFixed(1)} MB
                    </span>

                  </td>

                  <td className="py-4">

                    <StatusBadge
                      status={status}
                    />

                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default PodTable